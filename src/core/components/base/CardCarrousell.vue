<script lang="ts" setup>
import type { Restaurant } from '@/types/restaurant-type';
import { UtensilsCrossed } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

interface Props {
  restaurants: Restaurant[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  restaurants: () => [],
  loading: false
});
</script>

<template>
  <div class="py-4 md:p-8">
    <div class="max-w-full overflow-hidden">
      <slot name="header"></slot>

      <splide v-if="props.restaurants.length > 0 && !props.loading" :options="{
        type: 'slide',
        drag: 'free',
        snap: true,
        arrows: false,
        pagination: false,
        gap: '1.5rem',
        autoWidth: true,
        padding: { left: '1.5rem', right: '1.5rem' },
        breakpoints: {
          640: {
            padding: { left: '1rem', right: '1rem' },
          }
        }
      }" class="pb-10">
        <splide-slide v-for="restaurant in props.restaurants" :key="restaurant.id">
          <div
            class="flex flex-col h-full w-70 md:w-[320px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">

            <RouterLink :to="`/restaurant/${restaurant.id}`" class="w-full h-48 block overflow-hidden bg-slate-100">
              <!-- Imagen normal -->
              <img v-if="restaurant.images?.[0]?.url" :src="restaurant.images[0].url" :alt="restaurant.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-t-lg" />

              <!-- Fallback con borde punteado e icono -->
              <div v-else
                class="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-t-lg">
                <div class="flex flex-col items-center text-gray-400">
                  <RouterLink :to="`/restaurant/${restaurant.id}`"
                    class="flex flex-col items-center hover:text-gray-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-image-off">
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"></path>
                      <line x1="13.5" x2="6" y1="13.5" y2="21"></line>
                      <line x1="18" x2="21" y1="12" y2="15"></line>
                      <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"></path>
                      <path d="M21 15V5a2 2 0 0 0-2-2H9"></path>
                    </svg>
                    <p class="text-xs mt-1">No hay imagen</p>
                  </RouterLink>
                </div>
              </div>
            </RouterLink>

            <div class="p-5 flex flex-col grow">
              <span
                class="inline-flex items-center gap-0.5 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                <UtensilsCrossed class="w-4" />{{ restaurant.type_food }}
              </span>
              <h3 class="mt-1 text-xl font-bold text-gray-900 line-clamp-1">{{ restaurant.name }}</h3>
              <p class="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2">
                {{ restaurant.description }}
              </p>

              <RouterLink :to="`/restaurant/${restaurant.id}`"
                class="mt-auto pt-4 text-blue-500 font-medium hover:text-blue-700 transition-colors text-sm">
                Leer más →
              </RouterLink>
            </div>
          </div>
        </splide-slide>
      </splide>

      <div v-else class="flex gap-x-6 overflow-hidden px-6 pb-10">
        <div v-for="i in 4" :key="i"
          class="flex flex-col h-[380px] w-70 md:w-[320px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          <div class="w-full h-48 bg-slate-200"></div>

          <div class="p-5 flex flex-col grow gap-y-3">
            <div class="h-3 w-20 bg-slate-200 rounded"></div>
            <div class="h-5 w-3/4 bg-slate-200 rounded mt-1"></div>
            <div class="space-y-2 mt-1">
              <div class="h-3 w-full bg-slate-200 rounded"></div>
              <div class="h-3 w-5/6 bg-slate-200 rounded"></div>
            </div>
            <div class="h-4 w-16 bg-slate-200 rounded mt-auto"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.splide__list {
  display: flex !important;
  align-items: stretch;
}

.splide__track {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

:deep(.splide__slide) {
  height: auto !important;
  display: flex;
}
</style>