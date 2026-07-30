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
  <section v-if="restaurants.length > 0">
    <CardCarrousell :restaurants="restaurants">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 px-6">Restaurantes</h2>
      </template>
    </CardCarrousell>
  </section>
  <section v-else-if="storeRestaurant.loading">
    <p>Cargando restaurantes...</p>
  </section>
  <section v-else>
    <p>No hay restaurantes disponibles.</p>
  </section>
</template>
