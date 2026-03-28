import { readonly, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

type ErrorType = 'NOT_FOUND' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN';

interface AppError {
    message: string;
    type: ErrorType;
    status?: number;
}

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
}

interface FetchResponse<T> {
    data: Ref<T | null>;
    error: Ref<AppError | null>; // Ahora usamos nuestro objeto AppError
    loading: Ref<boolean>;
    execute: () => Promise<void>;
}

export function useFetch<T = any>(
    url: MaybeRefOrGetter<string>,
    options: FetchOptions = {}
): FetchResponse<T> {
    const data = ref<T | null>(null) as Ref<T | null>;
    const error = ref<AppError | null>(null); // Estado inicial nulo
    const loading = ref<boolean>(false);

    let controller: AbortController | null = null;

    const fetchData = async () => {
        if (controller) controller.abort();
        controller = new AbortController();

        const currentUrl = toValue(url);
        if (!currentUrl) return;

        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(currentUrl, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body) : null,
                signal: controller.signal
            });

            // Si la respuesta no es 2xx, lanzamos error con el status
            if (!response.ok) {
                const type: ErrorType = response.status === 404 ? 'NOT_FOUND' : 'SERVER_ERROR';
                throw { message: `Error ${response.status}`, type, status: response.status };
            }

            data.value = await response.json();

        } catch (err: any) {
            if (err.name === 'AbortError') return;

            // 1. Mapeo inteligente del error
            let finalError: AppError;

            if (err.type) {
                // Es un error que lanzamos nosotros arriba (SERVER_ERROR / NOT_FOUND)
                finalError = err;
            } else if (err instanceof TypeError) {
                // Error de red (CORS, sin internet, DNS fallido)
                finalError = {
                    message: 'No se pudo conectar con el servidor',
                    type: 'NETWORK_ERROR'
                };
            } else {
                finalError = {
                    message: err.message || 'Error desconocido',
                    type: 'UNKNOWN'
                };
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
        error: readonly(error),
        loading: readonly(loading),
        execute: fetchData
    };
}