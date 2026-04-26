<script setup lang="ts">
interface BannerContent {
  imageSm?: string;
  imageMd?: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  subtitle: string;
}

const props = withDefaults(
  defineProps<{
    content?: BannerContent;
  }>(),
  {
    content: () => ({
      imageSm: "",
      titleStart: "Elige",
      titleHighlight: "opciones",
      titleEnd: "cualquiera de nuestras diferentes",
      subtitle: "Busca, disfruta y ¡diviértete!",
    }),
  }
);
</script>

<template>
  <div
    class="bg-night-blue overflow-hidden w-full flex flex-col justify-center rounded-3xl md:flex-row md:w-full md:h-96 shadow-2xl"
  >
    <slot name="imagebanner" v-if="props.content.imageSm">
      <div class="w-full h-1/2 md:h-full md:flex-1">
        <picture>
          <source
            :srcset="props.content.imageMd || props.content.imageSm"
            media="(min-width: 768px)"
          />
          <img
            :src="props.content.imageSm"
            alt="banner promocional"
            loading="eager"
            class="w-full h-full object-cover"
          />
        </picture>
      </div>
    </slot>
    <div
      class="w-full h-1/2 md:h-full md:flex-1 grid place-content-center p-6 text-center"
    >
      <p class="text-alice text-2xl font-bold text-balance md:text-3xl lg:text-4xl">
        <span class="text-emerald-vibe">{{ props.content.titleStart }}</span>
        {{ props.content.titleEnd }}
        <span class="text-emerald-vibe">{{ props.content.titleHighlight }}</span>
      </p>
      <p class="text-alice/70 mt-2 md:text-xl text-balance">
        {{ props.content.subtitle }}
      </p>
    </div>
  </div>
</template>
