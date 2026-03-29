import { useFetch } from "@/core/composables/useFetch";
import { AuthService } from "@/core/services/api.service";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const data = ref<any>(null);
  const token = computed(() => data.value?.data?.user?.token || null);
  const dataMemory = computed(() => authData.value);


  const {
    data: authData,
    loading,
    error,
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

    // API funcionó pero no trajo token
    if (!token.value) {
      console.warn("La API respondió OK pero el token es nulo.");
      return null;
    }
   
    return data.value?.data?.user?.token || null;

  };

  return {
    data: readonly(dataMemory),
    token,
    error: readonly(error),
    loading: readonly(loading),
    getToken,
  };
});