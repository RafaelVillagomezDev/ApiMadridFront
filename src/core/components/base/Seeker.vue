<script setup lang="ts">
import { useDebounce } from '@/core/composables/useDebounce';
import { useSearchValidation } from '@/core/composables/useSearchValidation';
import { useRestaurantStore } from '@/stores/restaurant';
import { storeToRefs } from 'pinia';
const store = useRestaurantStore();
const { filters } = storeToRefs(store);


const { isInvalid, errorMessage } = useSearchValidation(filters.value);

const handleSearch = async () => {
  if (isInvalid.value || !filters.value.name.trim()) return;
  await store.searchRestaurant();

};

const handleInput = () => {

  if (isInvalid.value) return;

  if (!filters.value.name.trim()) {
    console.log("Input vacío, no se busca.");
    return;
  }

  useDebounce(async () => {
    await store.searchRestaurant()
  }, 500)

};

</script>
<template>
  <div class="relative w-full max-w-sm mx-auto">
    <form @submit.prevent="handleSearch" class="w-full max-w-xs flex">

      <input @input="handleInput" name="search_mobile" type="search" placeholder="Busca un plan" v-model="filters.name"
        aria-label="Buscar contenido en el sitio"
        class="md:hidden flex-1 min-w-0 py-2 px-4 border-gray-400 border-2 rounded-l-md focus:outline-none focus:ring-0">

      <input @input="handleInput" name="search_desktop" type="search" placeholder="Encuentra un plan .."
        v-model="filters.name" aria-label="Buscar contenido en el sitio"
        class="hidden md:block flex-1 min-w-0 py-2 px-4 border-gray-400 border-2 rounded-l-md focus:outline-none focus:ring-0">

      <button type="submit" :disabled="isInvalid"
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-r-md cursor-pointer shrink-0">
        Buscar
      </button>
    </form>
    <p v-if="isInvalid" class="text-red-500 text-xs mt-1 absolute translate-y-10 bottom-4">
      {{ errorMessage }}
    </p>
  </div>

</template>