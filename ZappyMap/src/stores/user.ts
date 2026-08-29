import { useFetch } from "@/core/composables/useFetch";
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


    const dataMemory = computed(() => loginData.value);

  
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
   
        await executeCsrf('/api/v1/csrf', csrfOptions);

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

        // Usamos el ejecutor del Login
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
    }

    const logoutLocal = () => {
        token.value = null;
        csrfToken.value = null;
        localStorage.removeItem('user_jwt');
        sessionStorage.removeItem('csrf_token');
        
        router.push({ name: 'user-login' });
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

        await executeRefresh('/api/v1/auth/refresh', refreshOptions);

        if (refreshError.value) {
            console.warn("No se pudo renovar la sesión. Expulsando...");
            logoutLocal();
            return false;
        }

        const receivedToken = refreshData.value?.data?.user?.token;
        
        if (receivedToken) {
            token.value = receivedToken;
            localStorage.setItem('user_jwt', receivedToken);
        } else {
            logoutLocal();
            return false;
        }

        const rotatedCsrf = refreshHeaders.value?.get('x-new-csrf-token') || refreshHeaders.value?.get('x-csrf-token');
        if (rotatedCsrf) {
            setCsrf(rotatedCsrf); 
        }

        console.log("¡Sesión renovada con éxito!");
        return true;
    };

    return {
        data: dataMemory, 
        token, 
        csrfToken: readonly(csrfToken),
        error: readonly(loginError),
        loading: readonly(loginLoading),
        uploadLoading: readonly(uploadLoading), 
        isLogged: readonly(isLogged),
        login,
        fetchCsrf,
        refreshSession, 
        logoutLocal,    
        setCsrf,
        uploadImage
    };
});