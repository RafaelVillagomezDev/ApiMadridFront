import { readonly, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';
import type { s } from 'vue-router/dist/router-CWoNjPRp.mjs';

type ErrorType = 'NOT_FOUND' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN';

interface AppError {
    message: string;
    type: ErrorType;
    status?: number;
}

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string ;
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
    options: MaybeRefOrGetter<FetchOptions> = {}
): FetchResponse<T> {
    const data = ref<T | null>(null) as Ref<T | null>;
    const error = ref<AppError | null>(null);
    const loading = ref<boolean>(false);

    let controller: AbortController | null = null;

    const fetchData = async () => {
        const currentUrl = toValue(url);
        const currentOptions = toValue(options);

        // 1. Validaciones previas
        if (!currentUrl) return;
        if (controller) controller.abort();
        controller = new AbortController();

        loading.value = true;
        error.value = null;

        try {
            // 2. Preparar cuerpo (No enviar body en GET/HEAD)
            const isGet = !currentOptions.method || currentOptions.method === 'GET';
            const fetchConfig: RequestInit = {
                method: currentOptions.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...currentOptions.headers,
                },
                signal: controller.signal,
                body: isGet ? null : (currentOptions.body ? JSON.stringify(currentOptions.body) : null)
            };

            const response = await fetch(currentUrl, fetchConfig);

            if (!response.ok) {
                let serverMessage = `Error ${response.status}: ${response.statusText}`;
                
                try {
                    // CLONAMOS la respuesta para no agotar el stream original
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

            // 3. Respuesta Exitosa
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
        error: readonly(error),
        loading: readonly(loading),
        execute: fetchData
    };
}