import { readonly, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

type ErrorType = 'NOT_FOUND' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN';

interface AppError {
    message: string;
    type: ErrorType;
    status?: number;
}

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
    headers?: Record<string, string>;
    body?: any;
}

interface FetchResponse<T> {
    data: Ref<T | null>;
    error: Ref<AppError | null>;
    loading: Ref<boolean>;
    // Execute ahora acepta parámetros opcionales
    execute: (urlOverride?: string, optionsOverride?: FetchOptions) => Promise<void>;
}

export function useFetch<T = any>(
    url?: MaybeRefOrGetter<string>,
    options: MaybeRefOrGetter<FetchOptions> = {}
): FetchResponse<T> {
    const data = ref<T | null>(null) as Ref<T | null>;
    const error = ref<AppError | null>(null);
    const loading = ref<boolean>(false);

    let controller: AbortController | null = null;

    // CORRECCIÓN: Aceptamos los overrides
    const fetchData = async (urlOverride?: string, optionsOverride?: FetchOptions) => {
        // Prioridad: 1. El parámetro de la función | 2. El parámetro inicial del composable
        const currentUrl = urlOverride || toValue(url);
        const currentOptions = optionsOverride || toValue(options);

        // 1. Validaciones previas
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
                // CORRECCIÓN: Lógica de body más limpia
                body: !isGetOrHead && currentOptions.body 
                    ? JSON.stringify(currentOptions.body) 
                    : null
            };

            const response = await fetch(currentUrl, fetchConfig);

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

                const type: ErrorType = response.status === 404 ? 'NOT_FOUND' : 'SERVER_ERROR';
                throw { message: serverMessage, type, status: response.status };
            }

            data.value = await response.json();

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
        execute: fetchData
    };
}