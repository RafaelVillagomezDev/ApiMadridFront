<script lang="ts" setup>
import type { Restaurant } from '@/types/restaurant-type';
import { UtensilsCrossed } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

interface Props {
  restaurants: Restaurant[];
}

const props = defineProps<Props>();




</script>


<template>
  <div class="p-4 md:p-8">
    <div class="max-w-full overflow-hidden">
      <slot name="header"></slot>
      <splide v-if="props.restaurants.length > 0" :options="{
        type: 'slide',    /* 'slide' es más estable para filas largas que 'loop' si hay pocas cards */
        drag: 'free',     /* Permite desplazamiento fluido como en Netflix */
        snap: true,
        arrows: false,
        pagination: false,
        gap: '1.5rem',
        autoWidth: true,     /* Cards mantienen su tamaño y fluyen en fila */
        padding: { left: '1.5rem', right: '1.5rem' }, /* Espaciado en los extremos */
        breakpoints: {
          640: {
            padding: { left: '1rem', right: '1rem' },
          }
        }
      }" class="pb-10 ">
        <splide-slide v-for="restaurant in props.restaurants" :key="restaurant.id">
          <div
            class=" flex flex-col  h-full w-70 md:w-[320px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <RouterLink :to="`/restaurant/${restaurant.id}`">
              <img :src="restaurant.images[0]?.url" :alt="restaurant.name" class="w-full h-48 object-cover">
            </RouterLink>

            <div class="p-5 flex flex-col grow">
              <span
                class=" inline-flex items-center gap-0.5 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                <UtensilsCrossed class="w-4" />{{ restaurant.type_food }}
              </span>
              <h3 class="mt-1 text-xl font-bold text-gray-900 line-clamp-1">{{ restaurant.name }}</h3>
              <p class="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2 ">
                {{ restaurant.description }}
              </p>

              <RouterLink :to="`/restaurant/${restaurant.id}`"
                class=" mt-auto text-blue-500 font-medium hover:text-blue-700 transition-colors text-sm">
                Leer más →
              </RouterLink>
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
  align-items: stretch;
}

/* Asegura que el track no corte las sombras de las cards */
.splide__track {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

:deep(.splide__slide) {
  height: auto !important;
  /* Permite que el slide crezca */
  display: flex;
  /* Hace que la card interna pueda usar h-full */
}
</style>