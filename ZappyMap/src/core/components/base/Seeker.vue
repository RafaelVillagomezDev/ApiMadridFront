<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant';
import { storeToRefs } from 'pinia';
const store= useRestaurantStore();
const { searchQuery } = storeToRefs(store);
const handleSearch = () => {
  console.log("Enviando al store:", searchQuery.value);
  // Aquí podrías llamar a store.getRestaurant() si quieres filtrar
};
</script>
<template>
    <form  @submit.prevent="handleSearch"  class="w-full max-w-sm flex row " >
        <input  name="search"  type="search" placeholder="Encuentra un plan .."  v-model="searchQuery" aria-label="Buscar contenido en el sitio" class="flex-1 py-2 px-4 border-gray-400 border-2 rounded-tl-md rounded-bl-md focus:outline-none focus:ring-0 " >
        <button type="submit"  class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-tr-md rounded-br-md cursor-pointer">Buscar</button>
    </form>
</template>