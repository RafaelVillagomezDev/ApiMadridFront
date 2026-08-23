import { readonly, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

type ErrorType = 'NOT_FOUND' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN' | 'UNAUTHORIZED';

interface AppError {
    message: string;
    type: ErrorType;
    status?: number;
}

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
    headers?: Record<string, string>;
    body?: any;
    _isRetry?: boolean; // Flag interno para evitar bucles infinitos
}

interface FetchResponse<T> {
    data: Ref<T | null>;
    error: Ref<AppError | null>;
    loading: Ref<boolean>;
    headers: Ref<Headers | null>;
    execute: (urlOverride?: string, optionsOverride?: FetchOptions) => Promise<void>;
}

export function useFetch<T = any>(
    url?: MaybeRefOrGetter<string>,
    options: MaybeRefOrGetter<FetchOptions> = {}
): FetchResponse<T> {
    const data = ref<T | null>(null) as Ref<T | null>;
    const error = ref<AppError | null>(null);
    const loading = ref<boolean>(false);
    const headers = ref<Headers | null>(null);

    let controller: AbortController | null = null;

    const fetchData = async (urlOverride?: string, optionsOverride?: FetchOptions) => {
        const currentUrl = urlOverride || toValue(url);
        const currentOptions = optionsOverride || toValue(options);

        if (!currentUrl) {
            console.warn("useFetch: No URL provided for execution.");
            return;
        }

        if (controller) controller.abort();
        controller = new AbortController();

        loading.value = true;
        error.value = null;

        try {
            const method = currentOptions.method?.toUpperCase() || 'GET';
            const isGetOrHead = ['GET', 'HEAD'].includes(method);

            const fetchConfig: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...currentOptions.headers,
                },
                signal: controller.signal,
                credentials: 'include', 
                body: !isGetOrHead && currentOptions.body 
                ? (typeof currentOptions.body === 'string' 
                    ? currentOptions.body 
                    : JSON.stringify(currentOptions.body)) 
                : null
            };

            const response = await fetch(currentUrl, fetchConfig);
            
            const incomingCsrf = response.headers.get('x-new-csrf-token') || response.headers.get('x-csrf-token');
            if (incomingCsrf) {
                // Importamos el store dinámicamente para actualizar el token
                const { userStore } = await import('@/stores/user');
                const store = userStore();
                store.setCsrf(incomingCsrf);
            }
            // 🔥 BLOQUE 401: Intercepción y Refresh
            if (response.status === 401 && !currentOptions._isRetry) {
                // Importación dinámica (Lazy Load) para evitar referencias circulares con el Store
                const { userStore } = await import('@/stores/user'); 
                const store = userStore();

                // Evitamos que las rutas de auth (como login o el propio refresh) entren en el bucle
                if (!currentUrl.includes('/auth/')) {
                    const refreshed = await store.refreshSession();

                  if (refreshed) {
                        const retryOptions: FetchOptions = {
                            ...currentOptions,
                            _isRetry: true,
                            headers: {
                                ...currentOptions.headers, // Trae el Content-Type, etc.
                                'Authorization': `Bearer ${store.token}`, // Inyecta el NUEVO JWT
                                ...(store.csrfToken && { 'x-csrf-token': store.csrfToken }) // 🔥
                            }
                        };
                        
                        // Retornamos la ejecución recursiva para procesar la nueva respuesta
                        return await fetchData(currentUrl, retryOptions);
                    }
                }
            }

            if (!response.ok) {
                let serverMessage = `Error ${response.status}: ${response.statusText}`;
                
                try {
                    const errorClone = response.clone();
                    const errorText = await errorClone.text();

                    try {
                        const errorData = JSON.parse(errorText);
                        serverMessage = errorData.message || errorData.error || serverMessage;
                    } catch {
                        if (errorText && errorText.length < 200 && !errorText.includes('<html')) {
                            serverMessage = errorText;
                        }
                    }
                } catch (e) {
                    console.error("Error leyendo stream de error:", e);
                }

                let type: ErrorType = 'SERVER_ERROR';
                if (response.status === 404) type = 'NOT_FOUND';
                if (response.status === 401) type = 'UNAUTHORIZED';

                throw { message: serverMessage, type, status: response.status };
            }

            // Para peticiones exitosas (200 OK)
            // Aseguramos que la respuesta tenga contenido antes de hacer parse JSON
            const textResponse = await response.text();
            if (textResponse) {
                data.value = JSON.parse(textResponse);
            }
            headers.value = response.headers;

        } catch (err: any) {
            if (err.name === 'AbortError') return;

            let finalError: AppError;
            if (err.type) {
                finalError = err;
            } else if (err instanceof TypeError) {
                finalError = { message: 'No se pudo conectar con el servidor', type: 'NETWORK_ERROR' };
            } else {
                finalError = { message: err.message || 'Error desconocido', type: 'UNKNOWN' };
            }

            error.value = finalError;
            data.value = null;
        } finally {
            if (!controller?.signal.aborted) {
                loading.value = false;
            }
        }
    };

    return {
        data,
        error: readonly(error) as Ref<AppError | null>,
        loading: readonly(loading),
        headers: readonly(headers),
        execute: fetchData
    };
}