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
  descripción: DescriptionTab,
  detalles:DetailTab
};

const currentComponent = computed(() => {
  return tabs[activeTab.value as keyof typeof tabs] || DescriptionTab;
});

</script>

<template>
  <div class="p-2">
    <nav class="flex gap-4 border-b border-gray-200 mb-6">
      <button 
        v-for="(_, key) in tabs" 
        :key="key"
        @click="activeTab = key"
        :class="[
          'py-2 px-4 capitalize transition-colors',
          activeTab === key ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'
        ]"
      >
        {{ key }}
      </button>
    </nav>

    <main class="content">
      <KeepAlive>
        <component :is="currentComponent" :restaurant="restaurant" />
      </KeepAlive>
    </main>
  </div>
</template>