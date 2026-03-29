import { useFetch } from "@/core/composables/useFetch";
import { RestaurantService } from "@/core/services/api-restaurant.service";
import { AuthService } from "@/core/services/api.service";
import type { FetchOptions } from "@/types/response-types";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';
import { useAuthStore } from "./auth";

export const useRestaurantStore = defineStore('restaurant', () => {

  
  const data = ref<any>(null);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);
  const restaurantData = ref<any>(null);
  const restaurantError = ref<any>(null);
  const restaurantLoading = ref<boolean>(false);

  const restaurants = computed(() => (restaurantData.value as any)?.data || []);

  /**
   * Acción: Obtener Restaurantes
   * Agregamos los parámetros necesarios para que la función sea dinámica.
   */
 const getRestaurant = async (): Promise<void | null> => {
    try {
      restaurantLoading.value = true;
      restaurantError.value = null;

      const token = await useAuthStore().getToken();
      
      if (!token) {
        restaurantError.value = new Error("No token available");
        return null;
      }

      const {url,options} = RestaurantService.getRestaurant(token);

      const { 
        data: fetchedData, 
        error: fetchedError, 
        execute: executeRestaurant
      } = useFetch(url,options);

      await executeRestaurant();

      if (fetchedError.value) {
        console.error("Error obteniendo el restaurante:", fetchedError.value);
        restaurantError.value = fetchedError.value;
        return null;
      }

      if (fetchedData.value) {
        restaurantData.value = fetchedData.value; // Actualizamos el estado con la respuesta de la API
        data.value = fetchedData.value;
      } else {
        console.warn("No se recibió data al obtener el restaurante.");
        return null;
      }

    } catch (error) {
      console.error("Error obteniendo el restaurante:", error);
      restaurantError.value = error;
      return null;
    } finally {
      restaurantLoading.value = false;
    }
  };


  return {
    restaurants,
    error: readonly(restaurantError),
    loading: readonly(restaurantLoading),
    getRestaurant,
  }
});