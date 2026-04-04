<script lang="ts" setup>
import type { Restaurant } from '@/types/restaurant-type';
import { Heart } from 'lucide-vue-next';

interface Props {
  restaurant: Restaurant | undefined;
}

const props = defineProps<Props>();


</script>



<template>
  <div class="grid gap-y-4" :class="[
    (props.restaurant?.images && props.restaurant.images.length > 1)
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1'
  ]">
    <slot name="image_description">
      <div class="flex flex-row gap-2 justify-between items-center">
        <h1 v-if="props.restaurant?.name" class="mb-2 text-xl font-bold">
          {{ props.restaurant.name }}
        </h1>
        <div class="flex gap-x-1 md:gap-x-2 cursor-pointer items-center">
          <Heart class="w-[16px] h-[16px] md:w-5 md:h-5 flex-shrink-0" />
          <p class="text-sm md:text-base">Guardar</p>
        </div>
      </div>

    </slot>
    <div class="w-full h-full">

      <slot name="image_main">
        <img :src="props.restaurant?.images[0]?.url" class="w-full h-full object-cover rounded"
          :alt="props.restaurant?.name" />
      </slot>
    </div>

    <div v-if="props.restaurant?.images && props.restaurant.images.length > 1"
      class="hidden md:grid grid-cols-1 grid-rows-2 gap-4 h-full">
      <slot name="grid_images">
        <img v-for="(img, index) in props.restaurant.images.slice(1, 3)" :key="index" :src="img.url"
          :alt="props.restaurant.name + ' image ' + (index + 2)" class="w-full h-full object-cover rounded">
      </slot>
    </div>
  </div>
</template>

<style scoped>
/* Importante: Para que las imágenes dentro de los slots no deformen el layout,
   nos aseguramos de que las imágenes tengan: width: 100% y height: 100% con object-cover. 
   Usamos deep por que vienen de un slot
*/
:deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  /* Opcional, para redondear esquinas */
}
</style>