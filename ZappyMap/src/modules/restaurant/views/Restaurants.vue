<script setup lang="ts">
import Banner from "@/core/components/base/Banner.vue";
import Card from "@/core/components/base/Card.vue";
import GridCard from "@/core/components/base/GridCard.vue";
import { useRestaurantStore } from "@/stores/restaurant";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const storeRestaurant = useRestaurantStore();
const { restaurants } = storeToRefs(storeRestaurant);

const bannerData = computed(() => ({
  titleStart: "Tenemos",
  titleEnd: "más de ",
  titleHighlight: `${restaurants.value.length} restaurantes.`,
  subtitle: "¡Explora y encuentra tu próximo lugar favorito para comer!",
}));
</script>

<template>
  <section class="p-4 flex md:justify-center md:items-center">
    <Banner :content="bannerData" />
  </section>
  <GridCard v-if="restaurants">
    <Card
      v-for="item in restaurants"
      :key="item.id"
      :content="{
        imageSm: item.images[0]?.url,
        imageMd: item.images[0]?.url,
        titleAlt: item.name,
        id: item.id,
      }"
    >
      <template #cardText>
        <div class="px-4 py-6">
          <span class="p-2 bg-gray-700 rounded-2xl text-ghost text-xs">{{
            item.address
          }}</span>
          <h3 class="mt-4 text-base font-bold text-gray-800 uppercase">
            {{ item.name }}
          </h3>
        </div>
      </template>
    </Card>
  </GridCard>
</template>
