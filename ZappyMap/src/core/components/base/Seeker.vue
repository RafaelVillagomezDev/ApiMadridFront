<script setup lang="ts">
import { useRestaurantStore } from '@/stores/restaurant';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store= useRestaurantStore();
const {filters} = storeToRefs(store);
let timeout: ReturnType<typeof setTimeout>;


const handleSearch = async () => {
    await store.searchRestaurant();
    
};



const handleInput = () => {

  clearTimeout(timeout);

  timeout = setTimeout(async() => {
    console.log("Buscando ahora que el usuario paró:", filters.value.name);
    await store.searchRestaurant();
  }, 500); 
};

</script>
<template>
    <form  @submit.prevent="handleSearch"  class="w-full max-w-sm flex row " >
        <input @input="handleInput"  name="search"  type="search" placeholder="Encuentra un plan .."  v-model="filters.name" aria-label="Buscar contenido en el sitio" class="flex-1 py-2 px-4 border-gray-400 border-2 rounded-tl-md rounded-bl-md focus:outline-none focus:ring-0 " >
        <button type="submit"  class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-tr-md rounded-br-md cursor-pointer">Buscar</button>
    </form>
</template>