<script setup lang="ts">
import Banner from "@/core/components/base/Banner.vue";
import Card from "@/core/components/base/Card.vue";
import FilterTab from "@/core/components/base/FilterTab.vue";
import GridCard from "@/core/components/base/GridCard.vue";
import { useFavouritesStore } from "@/stores/favourites";
import { useRestaurantStore } from "@/stores/restaurant";
import type { Restaurant } from "@/types/restaurant-type";
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

const props = defineProps<Restaurant>();
const store = useFavouritesStore();



const handleToggleFavourite = (item: Restaurant | undefined) => {
  if (!item) return;
  store.toggleFavourite(item);
};

const isFav = (item: Restaurant | undefined) => {
  if (!item) return false;
  return store.isFavourite(item.id);
};
</script>

<template>
  <section class="p-4 flex md:justify-center md:items-center">
    <Banner :content="bannerData" />
  </section>
 
  <FilterTab  />
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
      :toggleFavourite="() => handleToggleFavourite(item)"
      :isFavourite="isFav(item)"
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
