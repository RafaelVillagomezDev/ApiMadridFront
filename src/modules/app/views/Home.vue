<script setup lang="ts">
import Banner from "@/core/components/base/Banner.vue";
import CardCarrousell from "@/core/components/base/CardCarrousell.vue";
import SeekerLayout from "@/core/layout/SeekerLayout.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import banner_brindis_md from "@core/assets/images/banner/banner_brindis_md.webp";
import banner_brindis_sm from "@core/assets/images/banner/banner_brindis_sm.webp";

const storeRestaurant = useRestaurantStore();
const { restaurants } = storeToRefs(storeRestaurant);

const bannerData = {
  imageSm: banner_brindis_md,
  imageMd: banner_brindis_sm,
  titleStart: "Elige",
  titleEnd: "cualquiera de nuestras diferentes",
  titleHighlight: "opciones",
  subtitle: "Busca, disfruta y ¡diviértete!",
};

const fetchData = async () => {
  try {
    await storeRestaurant.getRestaurant();
  } catch (error) {
    console.error("Error al obtener los restaurantes:", error);
  }
  
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <SeekerLayout />
  <section class="p-2 md:p-8 flex md:justify-center md:items-center">
    <Banner :content="bannerData" />
  </section>
  <section v-if="restaurants.length > 100">
    <CardCarrousell :restaurants="restaurants">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 px-6">Restaurantes</h2>
      </template>
    </CardCarrousell>
  </section>
 <!-- Sección de Carrusel (Cuando hay datos) -->
  <section v-if="restaurants.length > 0">
    <CardCarrousell :restaurants="restaurants">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 px-6">Restaurantes</h2>
      </template>
    </CardCarrousell>
  </section>


  <section v-else-if="storeRestaurant.loading" class="min-h-[350px] flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-800 mb-4"></div>
    <p class="text-sm text-gray-500">Cargando restaurantes...</p>
  </section>


  <section v-else class="min-h-[350px] flex flex-col items-center justify-center py-16 px-4 text-center">

    <div class="bg-gray-100 p-4 rounded-full mb-4 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    

    <h3 class="text-lg font-semibold text-gray-700 mb-1">No hay restaurantes disponibles</h3>
    <p class="text-sm text-gray-500 max-w-sm mb-6">
      Parece que no pudimos encontrar opciones en este momento. Intenta recargar la página o vuelve más tarde.
    </p>


    <button 
      @click="fetchData" 
      class="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
    >
      Volver a intentar
    </button>
  </section>
</template>
