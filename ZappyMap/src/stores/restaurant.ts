import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

import { RestaurantService } from "@/core/services/api-restaurant.service";
import { useAuthStore } from "./auth";
import { useFetch } from "@/core/composables/useFetch";
import type { Restaurant } from "@/types/restaurant-type";
import router from "@/core/router/routes";


export const useRestaurantStore = defineStore('restaurant', () => {

  // Inyectamos el store de dependencia (DIP)
  const authStore = useAuthStore();

  const restaurants = ref<Restaurant[]>([]);
  const restaurantSearchResults = ref<Restaurant[]>([]);
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
   * Acción de busqqueda de restaurantes mediante filtros
   * - Obtiene un token válido del store de autenticación.
   * - Si no se obtiene un token, lanza un error.
   * - Si se obtiene el token, configura la petición usando el servicio desacoplado y ejecuta la petición.
   * - Si se obtienen resultados, actualiza el estado de búsqueda y redirige al detalle del primer restaurante encontrado.
   * - Maneja errores y estados de carga a través del composable useFetch.
   * @returns void
   */

  const searchRestaurant = async () => {
    const token = await authStore.getToken();
    let restaurantIdSearchResults = [];

    if (!token) {
      throw new Error("No se pudo recuperar un token válido.");
    }
    const { url, options } = RestaurantService.getRestaurant(token, filters.value);

    await executeFetch(url, options);

    if (restaurantResponse.value?.data) {
      restaurantSearchResults.value = restaurantResponse.value.data;
      restaurantIdSearchResults = restaurantSearchResults.value.map(restaurant => restaurant.id);
      await router.push({
        name: 'restaurant-detail',
        params: { id: restaurantIdSearchResults[0] }
      });

    }

  }

  const searchRestarutantByFilter = async (
    filter: string,
    values: string[]
  ) => {

    const token = await authStore.getToken();

    if (!token) {
      throw new Error("No se pudo recuperar un token válido.");
    }

    const filterObject = {
      [filter]: values
    };

    const { url, options } = RestaurantService.getRestaurant(
      token,
      filterObject
    );

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
    filters: filters,
    restaurants: restaurants,
    restaurantSearchResults: restaurantSearchResults,
    error: readonly(apiError),
    loading: readonly(apiLoading),
    getRestaurant,
    getRestaurantById,
    searchRestaurant,
    searchRestarutantByFilter
  };
}, {
  persist: {
    key: 'restaurant-store',
    storage: localStorage,
    pick: ['restaurants'],
  }

});