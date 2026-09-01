<script setup lang="ts">
import Banner from "@/core/components/base/Banner.vue";
import Card from "@/core/components/base/Card.vue";
import FilterTab from "@/core/components/base/FilterTab.vue";
import GridCard from "@/core/components/base/GridCard.vue";
// Opcional: si tienes un componente Spinner propio impórtalo aquí
// import Spinner from "@/core/components/base/Spinner.vue"; 

import { useFavouritesStore } from "@/stores/favourites";
import { useRestaurantStore } from "@/stores/restaurant";
import type { OptionTab, OptionTabPropsData } from "@/types/options-type";
import type { Restaurant } from "@/types/restaurant-type";

import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const storeRestaurant = useRestaurantStore();
const storeFavourites = useFavouritesStore();

// Extraemos loading y error directamente del store
const { restaurants, filteredRestaurants, loading, error } = storeToRefs(storeRestaurant);

const textQuantity = computed(() => {
  const count = restaurants.value.length;
  return count === 1 ? "restaurante" : "restaurantes";
});

const bannerData = computed(() => ({
  titleStart: "Tenemos",
  titleEnd: "más de ",
  titleHighlight: `${restaurants.value.length} ${textQuantity.value}.`,
  subtitle: "¡Explora y encuentra tu próximo lugar favorito para comer!",
}));

const categorias: OptionTab[] = [
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
];

function handleToggleFavourite(item: Restaurant | undefined) {
  if (!item) return;
  storeFavourites.toggleFavourite(item);
}

const isFav = (item: Restaurant | undefined) => {
  if (!item) return false;
  return storeFavourites.isFavourite(item.id);
};

type CriteriosFiltroInput = Record<string, OptionTabPropsData[]>;
const filtrosActivos = ref<CriteriosFiltroInput>({ type_food: [], price: [] });

const fetchDataRestaurantByFilter = async (valores: CriteriosFiltroInput) => {
  try {
    filtrosActivos.value = valores;
    await storeRestaurant.setCriteriaFilters(valores);
  } catch (err) {
    console.error("Error al obtener los restaurantes filtrados:", err);
  }
};
</script>

<template>
  <section class="p-4 flex md:justify-center md:items-center">
    <Banner :content="bannerData" />
  </section>

  <FilterTab :isOpen="true" :data="categorias" @update:selection="fetchDataRestaurantByFilter" />

  <!-- CONTENEDOR RELATIVO PARA MANEJAR EL OVERLAY -->
  <div class="relative min-h-[300px]">
    
    <!-- ESTADO DE CARGA (Overlay superpuesto) -->

    <div 
      v-if="loading" 
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-300 rounded-lg"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-800"></div>
    </div>

    <!-- ESTADO DE ERROR -->
    <div v-if="error" class="flex flex-col items-center justify-center py-20 space-y-2">
      <div class="text-red-500 text-4xl">⚠️</div>
      <h3 class="text-lg font-bold text-gray-800">Ocurrió un error</h3>
      <p class="text-gray-600">{{ error.message || 'No se pudieron cargar los datos.' }}</p>
      <button @click="fetchDataRestaurantByFilter(filtrosActivos)" class="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
        Reintentar
      </button>
    </div>

    <!-- ESTADO VACÍO (SIN RESULTADOS) -->
    <div v-else-if="!loading && filteredRestaurants && filteredRestaurants.length === 0" class="flex flex-col items-center justify-center py-20">
      <span class="text-4xl">🍽️</span>
      <h3 class="mt-4 text-lg font-bold text-gray-800">Sin resultados</h3>
      <p class="text-gray-500">No encontramos restaurantes que coincidan con tus filtros.</p>
    </div>

    <!-- ESTADO DE ÉXITO -->
   
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

  </div>
</template>