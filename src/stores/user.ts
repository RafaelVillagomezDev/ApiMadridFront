import { useFetch } from "@/core/composables/useFetch";
import { getFullUrl } from "@core/utils/getFullUrl"; // 👈 Importamos la utilidad de entornos
import router from "@/core/router/routes";
import { UserService } from "@/core/services/api-user.service";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const userStore = defineStore('user', () => {

    const token = ref<string | null>(localStorage.getItem('user_jwt'));
    const csrfToken = ref<string | null>(sessionStorage.getItem('csrf_token'));
    const isLogged = computed(() => !!token.value);

    const setCsrf = (newToken: string) => {
        csrfToken.value = newToken;
        sessionStorage.setItem('csrf_token', newToken);
    };

    // INSTANCIA PARA EL REGISTER
    const {
        data: registerData,
        loading: registerLoading,
        headers: registerHeaders,
        error: registerError,
        execute: executeRegister
    } = useFetch();

    // INSTANCIA PARA EL LOGIN 
    const {
        data: loginData,
        loading: loginLoading,
        error: loginError,
        headers: loginHeaders,
        execute: executeLogin
    } = useFetch();

    // INSTANCIA PARA EL CSRF 
    const {
        error: csrfError,
        headers: csrfHeaders,
        execute: executeCsrf
    } = useFetch();

    // INSTANCIA PARA EL REFRESH 
    const {
        data: refreshData,
        error: refreshError,
        headers: refreshHeaders,
        execute: executeRefresh
    } = useFetch();

    // INSTANCIA PARA SUBIR IMÁGENES
    const {
        data: uploadData,
        loading: uploadLoading,
        error: uploadError,
        execute: executeUpload
    } = useFetch();

    // INSTANCIA PARA LOGOUT
    const {
        data: dataLogout,
        loading: logoutLoading, // Renombrado para claridad
        error: logoutError,
        execute: executeLogoutCall // Renombrado para evitar pisar la función del store
    } = useFetch();

    const dataMemory = computed(() => loginData.value);

    const registerUser = async (userData: { name: string ,surname: string,email: string; password: string;}) => {
        const csrfSuccess = await fetchCsrf();

        if (!csrfSuccess) {
            return { success: false, message: csrfError.value?.message || "Error de seguridad CSRF." };
        }

        const registerConfig = UserService.userRegisterConfig(
            userData,
            null,
            csrfToken.value
        );

        await executeRegister(registerConfig.url, registerConfig.options);

        if (registerError.value) {
            return {
                success: false,
                message: registerError.value?.message || "Ocurrió un error al registrar el usuario."
            };
        }

        const rotatedCsrf = registerHeaders.value?.get('x-new-csrf-token') || registerHeaders.value?.get('x-csrf-token');
        if (rotatedCsrf) {
            setCsrf(rotatedCsrf);
        }

        return {
            success: true,
            message: registerData.value?.message || "Registro correcto"
        };
    }

    const uploadImage = async (restaurantId: string, formData: FormData) => {
        if (!token.value || !csrfToken.value) {
            return { success: false, message: "Permisos insuficientes para subir la imagen." };
        }

        const uploadConfig = UserService.uploadImage(
            restaurantId,
            formData,
            token.value,
            csrfToken.value
        );

        await executeUpload(uploadConfig.url, uploadConfig.options);

        if (uploadError.value) {
            console.error("Error al subir la imagen:", uploadError.value);
            return { success: false, message: uploadError.value.message };
        }

        return { success: true, data: uploadData.value };
    };

    const fetchCsrf = async (): Promise<boolean> => {
        const csrfOptions = {
            method: 'GET',
            credentials: 'include' as RequestCredentials,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        // 👈 Usamos getFullUrl para que funcione en local y producción
        await executeCsrf(getFullUrl('/api/v1/csrf'), csrfOptions);

        if (csrfError.value) {
            console.error("Error al obtener el CSRF:", csrfError.value);
            return false;
        }

        const incomingCsrf = csrfHeaders.value?.get('x-new-csrf-token') || csrfHeaders.value?.get('x-csrf-token');

        if (incomingCsrf) {
            setCsrf(incomingCsrf);
            return true;
        }

        console.warn("No se encontró el token CSRF en las cabeceras.");
        return false;
    };

    const login = async (credentials: { email: string; password: string }) => {
        const csrfSuccess = await fetchCsrf();

        if (!csrfSuccess) {
            return { success: false, message: csrfError.value?.message || "Error de seguridad CSRF." };
        }

        const loginConfig = UserService.userLoginConfig(
            credentials,
            null,
            csrfToken.value
        );

        await executeLogin(loginConfig.url, loginConfig.options);

        if (loginError.value) {
            return {
                success: false,
                message: loginError.value?.message || "Ocurrió un error al iniciar sesión."
            };
        }

        const rotatedCsrf = loginHeaders.value?.get('x-new-csrf-token') || loginHeaders.value?.get('x-csrf-token');
        if (rotatedCsrf) {
            setCsrf(rotatedCsrf);
        }

        const receivedToken = loginData.value?.data?.user?.token;

        if (!receivedToken) {
            return { success: false, message: "Error interno: La API no devolvió el token." };
        }

        token.value = receivedToken;
        localStorage.setItem('user_jwt', receivedToken);

        const apiSuccessMessage = loginData.value?.message || "Login correcto";

        return {
            success: true,
            message: apiSuccessMessage
        };
    };

    const logoutUser = async () => {
        const logoutOption = UserService.logoutUserConfig(token.value, csrfToken.value);
        await executeLogoutCall(logoutOption.url, logoutOption.options);

        if (logoutError.value) {
            return {
                success: false,
                message: logoutError.value?.message || "Ocurrió un error al cerrar sesión"
            };
        }

        token.value = null;
        csrfToken.value = null;
        localStorage.removeItem('user_jwt');
        sessionStorage.removeItem('csrf_token');

        router.push({ name: 'user-login' });

        return { success: true, data: dataLogout.value };
    };

    const refreshSession = async (): Promise<boolean> => {
        const refreshOptions = {
            method: 'POST',
            credentials: 'include' as RequestCredentials,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-csrf-token': csrfToken.value || ''
            }
        };

        // 👈 Usamos getFullUrl también aquí
        await executeRefresh(getFullUrl('/api/v1/auth/refresh'), refreshOptions);

        if (refreshError.value) {
            console.warn("No se pudo renovar la sesión. Expulsando...");
            logoutUser();
            return false;
        }

        const receivedToken = refreshData.value?.data?.user?.token;

        if (receivedToken) {
            token.value = receivedToken;
            localStorage.setItem('user_jwt', receivedToken);
        } else {
            logoutUser();
            return false;
        }

        const rotatedCsrf = refreshHeaders.value?.get('x-new-csrf-token') || refreshHeaders.value?.get('x-csrf-token');
        if (rotatedCsrf) {
            setCsrf(rotatedCsrf);
        }

   
        return true;
    };

    return {
        data: dataMemory,
        token,
        csrfToken: readonly(csrfToken),
        error: readonly(loginError),
        loading: readonly(loginLoading),
        loadingRegister: readonly(registerLoading),
        uploadLoading: readonly(uploadLoading),
        logoutLoading: readonly(logoutLoading), // Mapeado correctamente con el alias
        isLogged: readonly(isLogged),
        login,
        fetchCsrf,
        refreshSession,
        logoutUser,
        setCsrf,
        uploadImage,
        registerUser
    };
});