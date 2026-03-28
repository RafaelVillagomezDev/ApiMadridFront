import { useFetch } from "@/core/composables/useFetch";
import { API_ENDPOINTS } from "@/core/services/api.service";
import type { FetchMethod, Response } from "@/types/response-types";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const useRestaurantStore = defineStore('restaurant', () => {


  const options = { method: "POST" as const };
  const currentEndpoint = ref<string>("");
  const currentMethod = ref<FetchMethod>("GET");
  const { data, error, loading, execute } = useFetch(currentEndpoint, options); //Fetch personalizado para manejar errores y estados de carga
  const dataMemory = computed(() => data.value ?? []);


  /**
   * Función para obtener el token de un endpoint específico. Actualiza el endpoint actual y ejecuta la solicitud.
   * @param endpointKey 
   * @returns 
   */

  const getToken = async (endpointKey: keyof typeof API_ENDPOINTS, method: FetchMethod): Promise<void|null> => {
    try {

      if (!data) {
        throw new Error("No se pudo obtener el token: data es null");
      }
      if (loading.value) return;
      
      currentEndpoint.value = API_ENDPOINTS[endpointKey] ?? "";
      currentMethod.value = method;
      await execute();

    } catch (error) {
      console.error(`Error obteniendo el token para ${endpointKey}:`, error);
      return null;
    }
  };

  return {
    data: dataMemory,
    error: readonly(error),
    loading: readonly(loading),
    getToken,
  }

});