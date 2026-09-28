<script lang="ts" setup>
import { computed } from 'vue';
import { useFavouritesStore } from '@/stores/favourites';
import type { Restaurant } from '@/types/restaurant-type';
import { HeartPlus } from 'lucide-vue-next';

interface Props {
  restaurant: Restaurant | undefined;
  loading?: boolean; 
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

const store = useFavouritesStore();
const isFav = computed(() => store.isFavourite(props.restaurant?.id));

// Computed para comprobar si el restaurante tiene imágenes válidas
const hasImages = computed(() => {
  return props.restaurant?.images && props.restaurant.images.length > 0;
});

const handleToggleFavourite = (item: Restaurant | undefined) => {
  if (!item) return;
  store.toggleFavourite(item);
};
</script>

<template>
  <div class="grid gap-4" :class="[
    (hasImages && props.restaurant!.images.length > 1)
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1'
  ]">
    
    <div class="col-span-1 md:col-span-2">
      <slot name="image_description">
        <div class="flex flex-row gap-2 justify-between items-center">
          <div v-if="props.loading || !props.restaurant?.name" class="h-7 w-48 bg-slate-200 animate-pulse rounded-md"></div>
          <h1 v-else class="mb-2 text-xl font-bold text-gray-800">
            {{ props.restaurant.name }}
          </h1>

          <div @click="handleToggleFavourite(props.restaurant)"
            class="flex gap-x-1 md:gap-x-2 cursor-pointer items-center group select-none active:scale-[0.98] transition-transform duration-100">
            <div class="relative flex items-center justify-center">
              <HeartPlus class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-all duration-300 ease-out active:scale-125"
                :class="[
                  isFav
                    ? 'fill-red-500 text-red-500 scale-110'
                    : 'text-slate-600 group-hover:text-red-400 scale-100'
                ]" />
              <span v-if="isFav"
                class="absolute inset-0 rounded-full bg-red-500/30 animate-ping pointer-events-none"></span>
            </div>
            <p class="text-sm md:text-base font-medium transition-colors duration-300"
              :class="{ 'text-red-600': isFav, 'text-slate-600': !isFav }">
            </p>
          </div>
        </div>
      </slot>
    </div>

    <div class="w-full aspect-[16/10] md:h-full min-h-[250px] md:min-h-[350px]">
      <slot name="image_main">
        <div v-if="props.loading || !hasImages" class="w-full h-full bg-slate-200 animate-pulse rounded-lg flex items-center justify-center">
          <span class="text-sm text-slate-400 font-medium">Sin imágenes disponibles</span>
        </div>
        <img v-else :src="props.restaurant?.images[0]?.url" class="w-full h-full object-cover rounded-lg"
          :alt="props.restaurant?.name" />
      </slot>
    </div>

    <div v-if="hasImages && props.restaurant!.images.length > 1"
      class="hidden md:grid grid-cols-1 grid-rows-2 gap-4 h-full min-h-[350px]">
      <slot name="grid_images">
        <img v-for="(img, index) in props.restaurant!.images.slice(1, 3)" :key="index" :src="img.url"
          :alt="props.restaurant!.name + ' image ' + (index + 2)" class="w-full h-full object-cover rounded-lg">
      </slot>
    </div>
  </div>
</template>

<style scoped>
:deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>