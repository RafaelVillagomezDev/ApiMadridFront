<script setup lang="ts">
import Banner from "@/core/components/base/Banner.vue";
import Card from "@/core/components/base/Card.vue";
import FilterTab from "@/core/components/base/FilterTab.vue";
import GridCard from "@/core/components/base/GridCard.vue";
import Paginator from '@/core/components/paginator/paginator.vue';

import { useFavouritesStore } from "@/stores/favourites";
import { useRestaurantStore } from "@/stores/restaurant";
import type { OptionTab, OptionTabPropsData } from "@/types/options-type";
import type { Restaurant } from "@/types/restaurant-type";

import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const storeRestaurant = useRestaurantStore();
const storeFavourites = useFavouritesStore();

// Extraemos las variables del store
const { restaurants, filteredRestaurants, loading, error, totalItems, pageItems, totalPages, currentPage } = storeToRefs(storeRestaurant);

const textQuantity = computed(() => {
  const count = totalItems.value;
  return count === 1 ? "restaurante" : "restaurantes";
});

const bannerData = computed(() => ({
  titleStart: "Tenemos",
  titleEnd: "más de ",
  titleHighlight: `${totalItems.value} ${textQuantity.value}.`,
  subtitle: "¡Explora y encuentra tu próximo lugar favorito para comer!",
}));

const categorias = ref<OptionTab[]>([
  {
    isOpen: false, 
    data: [
      {
        categoria: "Tipo de comida",
        opciones: [
          { id: 1, name: "Italiana", value: "italiana" },
          { id: 2, name: "China", value: "china" },
          { id: 3, name: "Mexicana", value: "mexicana" },
          { id: 4, name: "Japonesa", value: "japonesa" },
          { id: 5, name: "India", value: "india" },
          { id: 6, name: "Española", value: "española" },
          { id: 7, name: "Turca", value: "turca" },
        ]
      }
    ]
  },
  {
    isOpen: false,
    data: [
      {
        categoria: "Precio",
        opciones: [
          { id: 1, name: "Bajo", value: "bajo" },
          { id: 2, name: "Medio", value: "medio" },
          { id: 3, name: "Alto", value: "alto" },
        ]
      }
    ]
  }
]);

function handleToggleFavourite(item: Restaurant | undefined) {
  if (!item) return;
  storeFavourites.toggleFavourite(item);
}

const isFav = (item: Restaurant | undefined) => {
  if (!item) return false;
  return storeFavourites.isFavourite(item.id);
};

type CriteriosFiltroInput = Record<string, OptionTabPropsData[] | number | string>;
const filtrosActivos = ref<Record<string, OptionTabPropsData[]>>({ type_food: [], price: [] });

const fetchDataRestaurantByFilter = async (valores: Record<string, OptionTabPropsData[]>) => {
  try {
    filtrosActivos.value = valores;
    
    const parametrosConPaginacion: CriteriosFiltroInput = {
      ...valores,
      page: 1, 
      limit: 3 
    };

    await storeRestaurant.setCriteriaFilters(parametrosConPaginacion);
  } catch (err) {
    console.error("Error al obtener los restaurantes filtrados:", err);
  }
};

const handlePageChange = async (newPage: number) => {
  try {
    const parametrosConPaginacion: CriteriosFiltroInput = {
      ...filtrosActivos.value,
      page: newPage,
      limit: 3
    };
    await storeRestaurant.setCriteriaFilters(parametrosConPaginacion);
  } catch (err) {
    console.error("Error al cambiar de página:", err);
  }
};

// 🔥Computed bidireccional para el v-model
const currentPageModel = computed({
 
  get: () => currentPage.value,
  // Cuando el paginador intenta cambiar la página, ejecutamos la función de la API
  set: (newValue: number) => {
    handlePageChange(newValue);
  }
});

</script>

<template>
  <section class="p-4 flex md:justify-center md:items-center">
    <Banner :content="bannerData" />
  </section>

  <FilterTab :isOpen="true" :data="categorias" @update:selection="fetchDataRestaurantByFilter" />

  <div class="relative min-h-[300px]">
    
    <!-- ESTADOS DE CARGA Y ERROR ... -->
    <div v-if="loading" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-300 rounded-lg">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800"></div>
    </div>

    <div v-if="error" class="flex flex-col items-center justify-center py-20 space-y-2">
      <div class="text-red-500 text-4xl">⚠️</div>
      <h3 class="text-lg font-bold text-gray-800">Ocurrió un error</h3>
      <p class="text-gray-600">{{ error.message || 'No se pudieron cargar los datos.' }}</p>
      <button @click="fetchDataRestaurantByFilter(filtrosActivos)" class="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
        Reintentar
      </button>
    </div>

    <div v-else-if="!loading && filteredRestaurants && filteredRestaurants.length === 0" class="flex flex-col items-center justify-center py-20">
      <span class="text-4xl">🍽️</span>
      <h3 class="mt-4 text-lg font-bold text-gray-800">Sin resultados</h3>
      <p class="text-gray-500">No encontramos restaurantes que coincidan con tus filtros.</p>
    </div>
   
    <GridCard v-else-if="filteredRestaurants && filteredRestaurants.length > 0">
      <Card 
        v-for="item in filteredRestaurants" 
        :key="item.id" 
        :content="{
          imageSm: item.images[0]?.url ,
          imageMd: item.images[0]?.url,
          titleAlt: item.name,
          id: item.id,
        }" 
        :toggleFavourite="() => handleToggleFavourite(item)" 
        :isFavourite="isFav(item)"
      >
        <template #cardText>
          <div class="px-4 py-6">
            <span class="p-2 bg-gray-700 rounded-2xl text-white text-xs">
              {{ item.address }}
            </span>
            <h3 class="mt-4 text-base font-bold text-gray-800 uppercase">
              {{ item.name }}
            </h3>
          </div>
        </template>
      </Card>
    </GridCard>


    <Paginator 
      :total-items="totalItems"
      :page-items="pageItems"
      :total-pages="totalPages"
      v-model:current-page="currentPageModel"
    />
  </div>
</template>