
import { useFetch } from "@/core/composables/useFetch";
import { AuthService } from "@/core/services/api.service";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {


  const data = ref<any>(null);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);


  const dataMemory = computed(() => data.value ?? []);
  const token = computed(() => data.value?.data?.user?.token || null);




  const {
    data: authData,
    loading: authLoading,
    error: authError,
    execute: executeAuth
  } = useFetch(AuthService.getTokenConfig().url, AuthService.getTokenConfig().options);  //Fetch personalizado para manejar errores y estados de carga


  /**
   * Función para obtener el token de un endpoint específico. Actualiza el endpoint actual y ejecuta la solicitud.
   * @param endpointKey 
   * @returns 
   */

  const getToken = async (): Promise<void | null> => {
    try {
      await executeAuth();

      if (authError.value) {
        console.error("Error obteniendo el token:", authError.value);
        return null;
      }

      if (authData.value) {
        data.value = authData.value; // Actualizamos el estado con la respuesta de la API
      } else {
        console.warn("No se recibió data al obtener el token.");
        return null;
      }

      return token.value; // Devolvemos el token obtenido

    } catch (error) {
      console.error("Error obteniendo el token:", error);
      return null;
    }
  };



  return {

    data: readonly(dataMemory),
    error: readonly(error),
    loading: readonly(loading),
    token: token,
    getToken,
  }

});