<script setup lang="ts">

import { ref, computed } from 'vue';
import DescriptionTab from '@core/components/tabs/DescriptionTab.vue';
import DetailTab from '@core/components/tabs/DetailTab.vue';
import type { Restaurant } from '@/types/restaurant-type';

interface Props {
  restaurant: Restaurant | undefined;
}

const props = defineProps<Props>();


const activeTab = ref('home');

const tabs = {
  Descripción: DescriptionTab,
  Detalles: DetailTab
};

const currentComponent = computed(() => {
  return tabs[activeTab.value as keyof typeof tabs] || DescriptionTab;
});

</script>

<template>
  <div class="flex flex-col w-full">
    <nav class="flex space-x-8 border-b border-gray-200 min-h-[48px]">
      <button v-for="(_, key) in tabs" :key="key" @click="activeTab = key"
        class="pb-4 px-2 text-sm md:text-md font-medium transition-all relative"
        :class="activeTab === key ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'">
        {{ key }}
        <div v-if="activeTab === key" class="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500"></div>
      </button>
    </nav>

    <div class="py-8 min-h-[450px] w-full">
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <component :is="currentComponent" :restaurant="restaurant" :restaurantId="restaurant?.id" />
        </KeepAlive>
      </Transition>
    </div>
  </div>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>