
<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from 'vue';

import type { Restaurant } from '@/types/restaurant-type';
import { Building2, Earth, MapPin } from 'lucide-vue-next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  restaurant: Restaurant;
}

const props = defineProps<Props>();

const restaurant = computed<Restaurant>(() => props.restaurant);
const location = computed(() => props.restaurant.location);

const mapContainer = ref<HTMLDivElement | null>(null);

let map: L.Map | null = null;
let marker: L.Marker | null = null;

const initMap = async (): Promise<void> => {
  await nextTick();

  const loc = location.value;
  const container = mapContainer.value;

  if (
    !loc ||
    !Number.isFinite(loc.latitude) ||
    !Number.isFinite(loc.longitude) ||
    !container
  ) {
    return;
  }

  // Limpiar una instancia anterior antes de crear otra.
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }

  map = L.map(container).setView(
    [loc.latitude, loc.longitude],
    15,
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  marker = L.marker([loc.latitude, loc.longitude])
    .addTo(map)
    .bindPopup(restaurant.value.name || 'Restaurante');

  marker.openPopup();

  await nextTick();
  map.invalidateSize();
};

onMounted(() => {
  void initMap();
});

watch(
  () => props.restaurant,
  () => {
    void initMap();
  },
  { deep: true },
);

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }
});
</script>

<template>
  <div
    v-if="restaurant && location"
    class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
  >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100"
    >
      <div
        v-if="location.address"
        class="flex items-start gap-x-3 p-2"
      >
        <div class="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <MapPin class="text-emerald-600" :size="20" />
        </div>

        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Dirección
          </span>
          <span class="text-gray-700 font-medium text-sm md:text-base leading-tight">
            {{ location.address }}
          </span>
        </div>
      </div>

      <div
        v-if="location.county"
        class="flex items-start gap-x-3 p-2"
      >
        <div class="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <Building2 class="text-emerald-600" :size="20" />
        </div>

        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Ciudad
          </span>
          <span class="text-gray-700 font-medium text-sm md:text-base leading-tight">
            {{ location.county }}
          </span>
        </div>
      </div>

      <div
        v-if="location.country"
        class="flex items-start gap-1 p-2"
      >
        <div class="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <Earth class="text-emerald-600" :size="20" />
        </div>

        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            País / Región
          </span>
          <span class="text-gray-700 font-medium text-sm md:text-base leading-tight">
            {{ location.country }}
          </span>
        </div>
      </div>
    </div>

    <div class="relative group">
      <div
        class="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-[22px] blur opacity-25 group-hover:opacity-50 transition duration-1000"
      ></div>

      <div
        ref="mapContainer"
        class="relative w-full h-[350px] rounded-[20px] border-4 border-white shadow-xl overflow-hidden z-0"
      >
        <div
          class="absolute inset-0 bg-gray-100 flex items-center justify-center pointer-events-none"
        >
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"
          ></div>
        </div>
      </div>

      <a
        v-if="
          Number.isFinite(location.latitude) &&
          Number.isFinite(location.longitude)
        "
        :href="`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100 text-xs font-bold text-gray-700 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"
      >
        <MapPin :size="14" />
        Abrir en Google Maps
      </a>
    </div>

    <div
      v-if="location.address"
      class="flex items-center justify-center gap-2 text-gray-400 text-xs italic"
    >
      <Building2 :size="14" />
      <span>Ubicación de {{ restaurant.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.relative {
  z-index: 0;
}

:deep(.leaflet-control-container) {
  z-index: 10;
}
</style>
