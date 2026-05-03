<script lang="ts" setup>
import { computed } from 'vue';
import { useFavouritesStore } from '@/stores/favourites';
import type { Restaurant } from '@/types/restaurant-type';
import { HeartPlus } from 'lucide-vue-next';

interface Props {
  restaurant: Restaurant | undefined;
}

const props = defineProps<Props>();
const store = useFavouritesStore();
const isFav = computed(() => store.isFavourite(props.restaurant?.id));
const handleToggleFavourite = (item: Restaurant | undefined) => {
  if (!item) return;
  store.toggleFavourite(item);
};

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
:deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>