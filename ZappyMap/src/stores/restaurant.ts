import { defineStore } from "pinia";
import { computed, readonly } from 'vue';

import { RestaurantService } from "@/core/services/api-restaurant.service";
import { useAuthStore } from "./auth";
import { useFetch } from "@/core/composables/useFetch";


export const useRestaurantStore = defineStore('restaurant', () => {

  // Inyectamos el store de dependencia (DIP)
  const authStore = useAuthStore();

  // Lo dejamos vacío inicialmente porque lo configuraremos en el 'execute'
  const {
    data: restaurantResponse,
    error: apiError,
    loading: apiLoading,
    execute: executeFetch
  } = useFetch();


  const restaurants = computed(() => restaurantResponse.value?.data || []);

  /**
   * Acción: Obtener Restaurantes
   */
  const getRestaurant = async () => {

    const token = await authStore.getToken();

    if (!token) {
      throw new Error("No se pudo recuperar un token válido.");
    }
    // Obtenemos la configuración del servicio (Estructura desacoplada)
    const { url, options } = RestaurantService.getRestaurant(token);

    // Ejecutamos la petición usando la configuración
    await executeFetch(url, options);

  };

  return {
    restaurants,
    error: readonly(apiError),
    loading: readonly(apiLoading),
    getRestaurant,
  };
});