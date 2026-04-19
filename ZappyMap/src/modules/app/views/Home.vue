<script setup lang="ts">
import Banner from '@/core/components/base/Banner.vue';
import CardCarrousell from '@/core/components/base/CardCarrousell.vue';
import SeekerLayout from '@/core/layout/SeekerLayout.vue';
import { useRestaurantStore } from '@/stores/restaurant';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const storeRestaurant = useRestaurantStore();
const { restaurants } = storeToRefs(storeRestaurant);



const fetchData = async () => {
  await storeRestaurant.getRestaurant();
};

onMounted(() => {
  fetchData();
});

</script>

<template>
  <SeekerLayout />
  <section class="p-8 flex md:justify-center md:items-center ">
    <Banner />
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