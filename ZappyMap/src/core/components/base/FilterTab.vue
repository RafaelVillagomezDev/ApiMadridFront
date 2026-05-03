<script setup lang="ts"  generic="T extends { id: string  }">
import { ref } from "vue";
import { Circle, Option, Star } from "lucide-vue-next";

import { Utensils, CircleChevronDown, CircleChevronUp } from "lucide-vue-next";
import OptionsTab from "./OptionsTab.vue";
const isActive = ref(false);

const props = defineProps<{
  data: T;
}>();


</script>

<template>
  <section class="w-full sticky top-0 z-50 p-6 bg-white">
    <div class="flex flex-wrap gap-3 items-center">
      <button
        class="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
      >
        <span class="inline-flex items-center gap-x-1">
          <Star :size="15" /> Mejor valorados
        </span>
      </button>

      <div class="relative">
        <button
          @click="isActive = !isActive"
          class="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors inline-flex items-center gap-x-1 hover:bg-gray-200"
        >
          <span class="inline-flex items-center gap-x-1">
            <Utensils :size="15" /> Tipo de comida
          </span>
          <component
            :is="isActive ? CircleChevronUp : CircleChevronDown"
            :size="15"
            class="ml-1 text-gray-400"
          />
        </button>

        <OptionsTab
          v-if="isActive"
          :data="props.data"
          :is-open="isActive"
          class="absolute top-full left-0 mt-2 z-[60] min-w-[220px] bg-white shadow-2xl rounded-xl border border-gray-100"
        />
      </div>
      <button
        class="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
      >
        Borrar
      </button>
    </div>
  </section>
</template>
