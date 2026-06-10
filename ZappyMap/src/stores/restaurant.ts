import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

import { RestaurantService } from "@/core/services/api-restaurant.service";
import { useAuthStore } from "./auth";
import { useFetch } from "@/core/composables/useFetch";
import type { Restaurant } from "@/types/restaurant-type";
import router from "@/core/router/routes";
import type { OptionTabProps } from "@/types/options-type";

export const useRestaurantStore = defineStore('restaurant', () => {

  const authStore = useAuthStore();


  const restaurants = ref<Restaurant[]>([]);
  const restaurantSearchResults = ref<Restaurant[]>([]);


  const activeTabsCriteria = ref<OptionTabProps>({});

  const filters = ref({
    name: '',
    address: '',
    type_food: ''
  });

  interface FilterCriteria {
    [key: string]: any[] | any;
  }

  const {
    data: restaurantResponse,
    error: apiError,
    loading: apiLoading,
    execute: executeFetch
  } = useFetch();

  const getRestaurant = async () => {
    const token = await authStore.getToken();
    if (!token) throw new Error("No se pudo recuperar un token válido.");

    const { url, options } = RestaurantService.getRestaurant(token);
    await executeFetch(url, options);

    if (restaurantResponse.value?.data) {

      restaurants.value = restaurantResponse.value.data;
    }
  };

  const searchRestaurant = async () => {
    const token = await authStore.getToken();
    let restaurantIdSearchResults = [];

    if (!token) throw new Error("No se pudo recuperar un token válido.");
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
  };

  const searchRestarutantByFilter = async (filter: string, values: string[]) => {
    const token = await authStore.getToken();
    if (!token) throw new Error("No se pudo recuperar un token válido.");

    const filterObject = { [filter]: values };
    const { url, options } = RestaurantService.getRestaurant(token, filterObject);

    await executeFetch(url, options);

    if (restaurantResponse.value?.data) {
      restaurants.value = restaurantResponse.value.data;
    }
  };

  const getRestaurantById = (id: string): Restaurant | undefined => {
    return restaurants.value.find((restaurant: Restaurant) => restaurant.id === id);
  };


  function setCriteriaFilters(criteria: OptionTabProps): void {
    activeTabsCriteria.value = criteria;
  }


  const filteredRestaurants = computed<Restaurant[]>(() => {
    const listaOriginal = restaurants.value;
    const criteria = activeTabsCriteria.value as FilterCriteria;
    debugger;
    // Si no hay criterios o la lista base está vacía, devolvemos todo rápido
    if (!criteria || Object.keys(criteria).length === 0) {
      return listaOriginal;
    }

    return listaOriginal.filter((restaurante) => {

      // REGLA AND: El restaurante debe pasar TODOS los bloques de filtros activos
      return Object.keys(criteria).every((key) => {
        const valuesFilter = criteria[key];

        // Si el filtro de esta categoría está vacío (ej: array vacío o null), se ignora (pasa el filtro)
        if (!valuesFilter || (Array.isArray(valuesFilter) && valuesFilter.length === 0)) {
          return true;
        }

        // Acceso seguro a la propiedad del restaurante evitando 'any'
        const valorRestaurante = restaurante[key as keyof Restaurant];

        // Si el restaurante no cuenta con esa propiedad, no puede cumplir el filtro
        if (valorRestaurante === undefined || valorRestaurante === null) {
          return false;
        }

        // Si el filtro de la categoría es un Array (Selección múltiple -> REGLA OR)
        if (Array.isArray(valuesFilter)) {
          return valuesFilter.some((opcion) => {
           
            const valorFiltro = opcion && typeof opcion === 'object'
              ? (opcion.id ?? opcion.value)
              : opcion;

  
            if (Array.isArray(valorRestaurante)) {
              return valorRestaurante.includes(valorFiltro);
            }

        
            return valorRestaurante === valorFiltro;
          });
        }


        if (Array.isArray(valorRestaurante)) {
          return valorRestaurante.includes(valuesFilter);
        }

        // Comparación simple directa uno a uno
        return valorRestaurante === valuesFilter;
      });
    });
  });

  return {
    filters,
    restaurants,
    filteredRestaurants,
    restaurantSearchResults,
    error: readonly(apiError),
    loading: readonly(apiLoading),
    getRestaurant,
    getRestaurantById,
    searchRestaurant,
    searchRestarutantByFilter,
    setCriteriaFilters
  };
}, {
  persist: {
    key: 'restaurant-store',
    storage: localStorage,
    pick: ['restaurants'],
  }
});