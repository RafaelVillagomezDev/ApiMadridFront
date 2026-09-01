import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { userStore } from '@/stores/user'; 
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

  // 1. NUEVAS VARIABLES DE PAGINACIÓN
  const totalItems = ref<number>(0);
  const pageItems = ref<number>(0);
  const totalPages = ref<number>(1);
  const currentPage = ref<number>(1);

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

  // FUNCIÓN AUXILIAR PARA ACTUALIZAR LA PAGINACIÓN
  const setPaginationData = (response: any) => {
    if (response) {
      totalItems.value = response.total_items || 0;
      pageItems.value = response.page_items || 0;
      totalPages.value = response.total_pages || 1;
      currentPage.value = response.current_page || 1;
    }
  };

  const getRestaurant = async () => {
    const token = await authStore.getToken();
    if (!token) throw new Error("No se pudo recuperar un token válido.");

    const { url, options } = RestaurantService.getRestaurant(token);
    await executeFetch(url, options);

    if (restaurantResponse.value?.data) {
      restaurants.value = restaurantResponse.value.data;

      setPaginationData(restaurantResponse.value);
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
      setPaginationData(restaurantResponse.value);
      
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
      // Actualizar paginación
      setPaginationData(restaurantResponse.value);
    }
  };

  const getRestaurantById = (id: string): Restaurant | undefined => {
    return restaurants.value.find((restaurant: Restaurant) => restaurant.id === id);
  };

 async function setCriteriaFilters(criteria: OptionTabProps): Promise<void> {
    activeTabsCriteria.value = criteria;
    console.log('📦 criteria en store:', JSON.stringify(criteria, null, 2));

    const queryParams: Record<string, any> = {};

    Object.keys(criteria).forEach((key) => {
      const valuesFilter = criteria[key as keyof OptionTabProps] as any;

      if (!valuesFilter || (Array.isArray(valuesFilter) && valuesFilter.length === 0)) {
        return; 
      }

      if (Array.isArray(valuesFilter)) {
        queryParams[key] = valuesFilter.map((opcion) => 
          opcion && typeof opcion === 'object' ? (opcion.value ?? opcion.id) : opcion
        );
      } else {
        queryParams[key] = valuesFilter;
      }
    });

    await router.push({
      path: router.currentRoute.value.path, 
      query: queryParams 
    });

    try {
      const token = await authStore.getToken();
      if (!token) throw new Error("No se pudo recuperar un token válido para filtrar.");

      const { url, options } = RestaurantService.getRestaurant(token, queryParams);

      await executeFetch(url, options);

      if (restaurantResponse.value?.data) {
        restaurants.value = restaurantResponse.value.data;
        // Actualizar paginación
        setPaginationData(restaurantResponse.value);
      }
    } catch (err) {
      console.error("Error al obtener los restaurantes filtrados:", err);
    }
  }

  const filteredRestaurants = computed<Restaurant[]>(() => {
    const listaOriginal = restaurants.value;
    const criteria = activeTabsCriteria.value as FilterCriteria;

    if (!criteria || Object.keys(criteria).length === 0) {
      return listaOriginal;
    }

    return listaOriginal.filter((restaurante) => {
      return Object.keys(criteria).every((key) => {
        const valuesFilter = criteria[key];

        if (!valuesFilter || (Array.isArray(valuesFilter) && valuesFilter.length === 0)) {
          return true;
        }
       
        const valorRestaurante = restaurante[key as keyof Restaurant];

        if (valorRestaurante === undefined || valorRestaurante === null) {
          return false;
        }

        if (Array.isArray(valuesFilter)) {
          return valuesFilter.some((opcion) => {
            const valorFiltro = opcion && typeof opcion === 'object'
              ? (opcion.value ?? opcion.id)
              : opcion;
         
            const normalize = (v: unknown) => String(v).toLowerCase().trim();

            if (Array.isArray(valorRestaurante)) {
              return valorRestaurante.map(normalize).includes(normalize(valorFiltro));
            }

            return normalize(valorRestaurante) === normalize(valorFiltro);
          });
        }

        if (Array.isArray(valorRestaurante)) {
          return valorRestaurante.includes(valuesFilter);
        }

        return String(valorRestaurante).toLowerCase().trim() ===
          String(valuesFilter).toLowerCase().trim();
      });
    });
  });

  const createRestaurant = async (restaurantData: Partial<Restaurant>) => {
    const storeUser = userStore();
    const { token, csrfToken } = storeToRefs(storeUser);
  
    if (!token.value || !csrfToken.value) {
        throw new Error("Permisos insuficientes: No se pudo recuperar un token o CSRF válido.");
    }

    const { url, options } = RestaurantService.createRestaurant(
        token.value, 
        csrfToken.value, 
        restaurantData
    );
    
    await executeFetch(url, options);

    if (restaurantResponse.value?.data) {
        restaurants.value.push(restaurantResponse.value.data);
        return { data: restaurantResponse.value.data }; 
    }
    
    throw new Error("No se recibió respuesta del servidor al crear el restaurante.");
  };

  return {
    filters,
    restaurants,
    filteredRestaurants,
    restaurantSearchResults,
    

    totalItems: readonly(totalItems),
    pageItems: readonly(pageItems),
    totalPages: readonly(totalPages),
    currentPage: readonly(currentPage),
    
    error: readonly(apiError),
    loading: readonly(apiLoading),
    getRestaurant,
    getRestaurantById,
    searchRestaurant,
    searchRestarutantByFilter,
    setCriteriaFilters,
    createRestaurant
  };
}, {
  persist: {
    key: 'restaurant-store',
    storage: localStorage,
    pick: ['restaurants'],
  }
});