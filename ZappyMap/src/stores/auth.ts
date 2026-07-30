import { useFetch } from "@/core/composables/useFetch";
import { AuthService } from "@/core/services/api.service";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const token = computed(() => authData.value?.data?.user?.token || null);
  const dataMemory = computed(() => authData.value);
  const csrfToken = ref<string | null>(sessionStorage.getItem('csrf_token'));

  const {
    data: authData,
    loading,
    error,
    headers, 
    execute: executeAuth
  } = useFetch(
    AuthService.getTokenConfig().url,
    AuthService.getTokenConfig().options
  );

  /**
   * Funcion para obtener el token de autenticación. Maneja errores y casos donde la API responde sin token.
   * @returns token 
   */
  const getToken = async (): Promise<string | null> => {

    await executeAuth();

    if (error.value) return null;

    // NUEVA LÓGICA CSRF: Atrapamos el token de los headers
    
    const incomingCsrf = headers.value?.get('x-new-csrf-token');
    
    if (incomingCsrf) {
      csrfToken.value = incomingCsrf; // Lo guardamos en Pinia
      sessionStorage.setItem('csrf_token', incomingCsrf); // Lo guardamos en el navegador
      
      
    }

    if (!token.value) {
      console.warn("La API respondió OK pero el token es nulo.");
      return null;
    }

    return token.value; 

  };

  return {
    data: readonly(dataMemory),
    token,
    csrfToken: readonly(csrfToken), 
    error: readonly(error),
    loading: readonly(loading),
    getToken,
  };
});