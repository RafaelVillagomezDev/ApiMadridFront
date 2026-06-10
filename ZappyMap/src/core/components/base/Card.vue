<script setup lang="ts"
  generic="T extends { imageSm?: string | null; imageMd?: string | null; titleAlt?: string | null; id?: string | null }">
  import { Heart } from "lucide-vue-next";
  import { ImageOff } from "lucide-vue-next";
  const props = defineProps<{
    content?: T;
    toggleFavourite: Function;
    isFavourite: boolean;
  }>();

  const executeToggleFavourite = () => {
    props.toggleFavourite();
  };
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div v-if="props.content?.imageSm" class="flex flex-col h-full">
      <slot name="cardImage" :data="props.content">
        <div class="relative">
          <router-link :to="`/restaurant/${props.content?.id || ''}`">
            <picture class="block w-full aspect-video overflow-hidden rounded-t-lg">
              <source v-if="props.content.imageMd" :srcset="props.content.imageMd" media="(min-width: 768px)" />
              <img :src="props.content.imageSm" :alt="props.content.titleAlt || 'Card Image'"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </picture>
          </router-link>
          <button @click="executeToggleFavourite"
            class="p-1 cursor-pointer inline-flex items-center top-2 right-2 bg-gray-300ation-ed-full text-xs font-semibold text-white absolute">
            <Heart :size="18" :class="[
              props.isFavourite
                ? 'fill-red-500 text-red-500 scale-110'
                : 'text-slate-600 group-hover:text-red-400 scale-100',
            ]" />
          </button>
        </div>
      </slot>

      <slot name="cardText" :data="props.content">
        <div class="p-4 flex-grow">
          <h3 class="text-base font-semibold text-blue-600 uppercase">
            {{ props.content?.titleAlt || "Título del restaurante" }}
          </h3>
        </div>
      </slot>
    </div>

    <div v-else class="flex flex-col h-full">
      <div
        class="w-full aspect-video flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-t-lg">
        <slot name="placeholder">

          <div class="flex flex-col items-center text-gray-400">
            <router-link :to="`/restaurant/${props.content?.id || ''}`">
              <div class="flex flex-col items-center">
                <ImageOff :size="32" />
                <p class="text-xs mt-1">No hay imagen</p>
              </div>
            </router-link>
          </div>
        </slot>
      </div>

      <slot name="cardText" :data="props.content">
        <div class="p-4 bg-white flex-grow">
          <div class="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </slot>
    </div>
  </div>
</template>
