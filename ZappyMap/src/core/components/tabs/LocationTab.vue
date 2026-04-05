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
  <div v-if="restaurant?.location" class="space-y-4">
    <ul class="flex flex-wrap gap-4 items-center">
      <li v-if="restaurant.location.country" class="flex gap-x-2 items-center text-gray-700">
        <Earth :size="20" />
        <span>{{ restaurant.location.country }}</span>
      </li>
      <li v-if="restaurant.location.address" class="flex gap-x-2 items-center text-gray-700">
        <Building2 :size="20" />
        <span>{{ restaurant.location.address }}</span>
      </li>
    </ul>

    <div 
      ref="mapContainer" 
      class="w-full h-[300px] rounded-xl border border-gray-200 z-0"
    ></div>
    <div>
      <p class="flex gap-x-2">
        <MapPin :size="20" />
        <span>{{ restaurant.location.address }}</span>
      </p>
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