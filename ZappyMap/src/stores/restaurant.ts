import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

import { RestaurantService } from "@/core/services/api-restaurant.service";
import { useAuthStore } from "./auth";
import { useFetch } from "@/core/composables/useFetch";
import type { Restaurant } from "@/types/restaurant-type";


export const useRestaurantStore = defineStore('restaurant', () => {

  // Inyectamos el store de dependencia (DIP)
  const authStore = useAuthStore();

  const restaurants = ref<Restaurant[]>([]);
  const searchQuery = ref<string>("");
  const filters = ref({
    name: '',
    address: '',
    type_food: ''
  });
  // Lo dejamos vacío inicialmente porque lo configuraremos en el 'execute'
  const {
    data: restaurantResponse,
    error: apiError,
    loading: apiLoading,
    execute: executeFetch
  } = useFetch();




  /**
   * Acción: Obtener Restaurantes
   * - Obtiene un token válido del store de autenticación.
   * - Si no se obtiene un token, lanza un error.
   * - Si se obtiene el token, configura la petición usando el servicio desacoplado y ejecuta la petición.
   * - Maneja errores y estados de carga a través del composable useFetch.
   * @returns void
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
    if (restaurantResponse.value?.data) {
      restaurants.value = restaurantResponse.value.data;
    }
  };

  /**
   * ACCIÓN: Buscar un restaurante por ID
   */
  const getRestaurantById = (id: string): Restaurant | undefined => {
    return restaurants.value.find((restaurant: Restaurant) => restaurant.id === id);
  };



  return {
    restaurants: restaurants,
    error: readonly(apiError),
    loading: readonly(apiLoading),
    getRestaurant,
    getRestaurantById,
    searchQuery: searchQuery
  };
}, {
  persist: {
    key: 'restaurant-store',
    storage: localStorage,
    pick: ['restaurants'],
  }
  
});