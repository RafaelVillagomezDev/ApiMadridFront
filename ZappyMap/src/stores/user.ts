import { useFetch } from "@/core/composables/useFetch";
import { UserService } from "@/core/services/api-user.service"
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const userStore = defineStore('user', () => {

    const token = computed(() => userData.value?.data?.user?.token || null);
    const dataMemory = computed(() => userData.value);
    const csrfToken = ref<string | null>(sessionStorage.getItem('csrf_token'));

    const {
        data: userData,
        loading,
        error,
        headers,
        execute: executeUser
    } = useFetch(
        UserService.getUserTokenConfig().url,
        UserService.getUserTokenConfig().options
    );

    /**
     * Función para obtener el token de autenticación enviando las credenciales.
     */
    const getTokenUser = async (credentials: { email: string; password: string }): Promise<string | null> => {

        await executeUser(undefined, {
            method: 'POST',
            body: credentials
        });

        if (error.value) {
            console.error("Error al obtener el token de usuario:", error.value.message || error.value);
            return null;
        }

        const incomingCsrf = headers.value?.get('X-New-CSRF-Token') || headers.value?.get('x-new-csrf-token') || headers.value?.get('x-csrf-token');

        if (incomingCsrf) {
            csrfToken.value = incomingCsrf;
            sessionStorage.setItem('csrf_token', incomingCsrf);
        }

        if (!token.value) {
            console.warn("La API respondió OK pero el token es nulo.");
            return null;
        }

        return token.value;
    };

    const fetchCsrf = async (): Promise<boolean> => {
        const csrfOptions: any = {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        await executeUser('http://localhost:3000/api/v1/csrf', csrfOptions);

        if (error.value) {
            console.error("Error al obtener el CSRF:", error.value);
            return false;
        }

        // EXTRAER DEL JSON: Navegamos por userData.value -> data -> csrfToken
        const incomingCsrf = userData.value?.data?.csrfToken;

        if (incomingCsrf) {
            csrfToken.value = incomingCsrf;
            sessionStorage.setItem('csrf_token', incomingCsrf);
            return true;
        }

        console.warn("No se encontró csrfToken en el cuerpo de la respuesta.");
        return false;
    };

    const login = async (credentials: { email: string; password: string }) => {

        // 1. Primero pedimos el CSRF inicial limpio con GET /v1/csrf para inicializar la cookie y el header
        const csrfSuccess = await fetchCsrf();

        if (!csrfSuccess) {
            console.error("Error al obtener el token CSRF inicial.");
            return false;
        }

        const loginConfig = UserService.userLoginConfig(credentials);

      

        // 2. Ejecutamos el login enviando el token CSRF obtenido en los headers
        await executeUser(loginConfig.url, {
            ...loginConfig.options,
            headers: {
                ...loginConfig.options.headers,
                ...(csrfToken.value ? { "x-csrf-token": csrfToken.value } : {})
            }
        });

        if (error.value) {
            console.error("Error al iniciar sesión:", error.value.message);
            return false;
        }

        if (!token.value) {
            console.warn("La API respondió OK pero el token de sesión es nulo.");
            return false;
        }

        console.log("¡Inicio de sesión exitoso! Token de usuario obtenido:", token.value);
        return true;
    }

    return {
        data: readonly(dataMemory),
        token,
        csrfToken: readonly(csrfToken),
        error: readonly(error),
        loading: readonly(loading),
        getTokenUser,
        login,
        fetchCsrf
    };
});


