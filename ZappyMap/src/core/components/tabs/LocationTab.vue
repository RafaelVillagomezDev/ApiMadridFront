<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Restaurant } from '@/types/restaurant-type';
import { Building2, Earth, MapPin } from 'lucide-vue-next';
import L from 'leaflet';


interface Props {
  restaurant: Restaurant | undefined;
}

const props = defineProps<Props>();

// Referencia al elemento del DOM
const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;

const initMap = () => {
  if (!props.restaurant?.location || !mapContainer.value) return;

  const { latitude, longitude } = props.restaurant.location;

  // 1. Inicializar el mapa
  map = L.map(mapContainer.value).setView([latitude, longitude], 15);

  // 2. Añadir la capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // 3. Añadir el marcador
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup(props.restaurant.name || 'Restaurante')
    .openPopup();
};

onMounted(() => {
  initMap();
});

// Por si el restaurante cambia sin recargar la página
watch(() => props.restaurant, () => {
  if (map) {
    map.remove(); // Limpiar el mapa anterior
    initMap();
  }
}, { deep: true });
</script>

<template>
  <div v-if="restaurant?.location" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
      <div v-if="restaurant.location.address" class="flex items-start gap-x-3 p-2">
        <div class="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <MapPin class="text-emerald-600" :size="20" />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Dirección</span>
          <span class="text-gray-700 font-medium text-sm md:text-base leading-tight">
            {{ restaurant.location.address }}
          </span>
        </div>
      </div>
       <div v-if="restaurant.location.county" class="flex items-start gap-x-3 p-2">
        <div class="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <Building2 class="text-emerald-600" :size="20" />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ciudad</span>
          <span class="text-gray-700 font-medium text-sm md:text-base leading-tight">
            {{ restaurant.location.county }}
          </span>
        </div>
      </div>

      <div v-if="restaurant.location.country" class="flex items-start gap-x-3 p-2">
        <div class="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <Earth class="text-emerald-600" :size="20" />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">País / Región</span>
          <span class="text-gray-700 font-medium text-sm md:text-base leading-tight">
            {{ restaurant.location.country }}
          </span>
        </div>
      </div>
    </div>

    <div class="relative group">
      <div
        class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-[22px] blur opacity-25 group-hover:opacity-50 transition duration-1000">
      </div>

      <div ref="mapContainer"
        class="relative w-full h-[350px] rounded-[20px] border-4 border-white shadow-xl overflow-hidden z-0">
        <div v-if="!map" class="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>

      <a :href="`https://www.google.com/maps/search/?api=1&query=${restaurant.location.latitude},${restaurant.location.longitude}`"
        target="_blank"
        class="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100 text-xs font-bold text-gray-700 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2">
        <MapPin :size="14" />
        Abrir en Google Maps
      </a>
    </div>

    <div v-if="restaurant.location.address" class="flex items-center justify-center gap-2 text-gray-400 text-xs italic">
      <Building2 :size="14" />
      <span>Ubicación verificada por {{ restaurant.name }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Leaflet necesita una altura explícita para mostrarse */
#mapContainer {
  height: 300px;
}

/* Evitar problemas de z-index con menús de navegación */
:deep(.leaflet-control-container) {
  z-index: 10;
}
</style>