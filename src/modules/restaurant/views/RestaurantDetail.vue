<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import GridImages from "@/core/components/base/GridImages.vue";
import NavTab from "@/core/components/base/NavTab.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import type { Restaurant } from "@/types/restaurant-type";

const route = useRoute();
const storeRestaurant = useRestaurantStore();

const restaurant = ref<Restaurant | undefined>(undefined);
const loading = ref(true);
const error = ref<string | null>(null);

// Escuchamos directamente el parámetro de la ruta actual
watch(
  () => route.params.id,
  async (newId) => {
    const idToFetch = Array.isArray(newId) ? newId[0] : newId;
    if (!idToFetch) return;

    loading.value = true;
    error.value = null;
    restaurant.value = undefined; // Limpiamos para forzar el re-render de hijos

    try {
      restaurant.value = await storeRestaurant.getRestaurantById(idToFetch);
    } catch (err: any) {
      error.value = err?.message ?? "Error al cargar el restaurante";
      restaurant.value = undefined;
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="max-w-[1136px] mx-auto px-4 py-1 w-full">
    <!-- Estado de carga -->
    <div
      v-if="loading"
      class="w-full h-[300px] md:h-[410px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400"
    >
      Cargando restaurante...
    </div>

    <!-- Error o no encontrado -->
    <div v-else-if="error || !restaurant" class="w-full py-12 text-center text-gray-500">
      {{ error || "No se ha encontrado el restaurante." }}
    </div>

    <!-- Datos cargados correctamente -->
    <template v-else>
      <div class="w-full h-[300px] md:h-[410px] overflow-hidden rounded-xl">
        <GridImages class="w-full h-full object-cover" :restaurant="restaurant" />
      </div>

      <div class="grid grid-cols-4 lg:grid-cols-10 gap-4 pt-6">
        <NavTab
          class="col-span-4 lg:col-start-1 lg:col-end-9 w-full"
          :restaurant="restaurant"
        />
      </div>
    </template>
  </div>
</template>
