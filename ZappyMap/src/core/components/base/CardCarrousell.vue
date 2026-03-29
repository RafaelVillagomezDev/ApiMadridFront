<script lang="ts" setup>
import type { Restaurant } from '@/types/restaurant-type';

interface Props {
  restaurant: Restaurant[]; 
}

const props = defineProps<Props>();




</script>


<template>
  <div class="bg-gray-100  p-4 md:p-8">
    <div class="max-w-full overflow-hidden"> <h2 class="text-2xl font-bold text-gray-800 mb-6 px-6">Proyectos Recientes</h2>

      <splide :options="{
        type   : 'slide',    /* 'slide' es más estable para filas largas que 'loop' si hay pocas cards */
        drag   : 'free',     /* Permite desplazamiento fluido como en Netflix */
        snap   : true,
        arrows : false,
        pagination: false,
        gap    : '1.5rem',
        autoWidth: true,     /* Cards mantienen su tamaño y fluyen en fila */
        padding: { left: '1.5rem', right: '1.5rem' }, /* Espaciado en los extremos */
        breakpoints: {
          640: {
            padding: { left: '1rem', right: '1rem' },
          }
        }
      }" class="pb-10 ">
        <splide-slide v-for="restaurant in props.restaurant" :key="restaurant.id"  >
          <div class="w-70 md:w-[320px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <img :src="restaurant.images[0]?.url" :alt="restaurant.name" class="w-full h-48 object-cover">
            <div class="p-5">
              <span class="text-xs font-semibold text-blue-600 uppercase tracking-wide">Categoría</span>
              <h3 class="mt-1 text-xl font-bold text-gray-900 line-clamp-1">{{ restaurant.name }}</h3>
              <p class="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2">
                {{ restaurant.description }}
              </p>
              <button class="mt-4 text-blue-500 font-medium hover:text-blue-700 transition-colors text-sm">
                Leer más →
              </button>
            </div>
          </div>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<style>

/* FUERZA A SPLIDE A NO ROMPER LA FILA:
  A veces Tailwind o resets de CSS externos aplican flex-wrap.
*/
.splide__list {
  display: flex !important;
  
}

/* Asegura que el track no corte las sombras de las cards */
.splide__track {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>