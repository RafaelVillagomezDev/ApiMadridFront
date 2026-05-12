<script setup lang="ts">
import type { OptionTab } from "@/types/options-type";

// 1. Definimos las props normales (data e isOpen)
defineProps<OptionTab>();

// 2. Definimos el modelo para los valores seleccionados
// Esto crea automáticamente una prop 'modelValue' y el emit 'update:modelValue'
const selected = defineModel<(string | number | boolean)[]>({ default: [] });


</script>

<template>
  <form 
    v-if="isOpen" 
    class="p-4 bg-white rounded-lg shadow-sm w-64 border border-gray-200"
    @submit.prevent
  >
    <h3 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
      Categorías
    </h3>

    <div class="space-y-3">
      <label 
        v-for="item in data" 
        :key="item.id" 
        class="flex items-center group cursor-pointer"
      >
        <input
          type="checkbox"
          :value="item.value"
          v-model="selected" 
          class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
          {{ item.name }}
        </span>
        <span class="ml-auto text-xs text-gray-400 font-medium">
          {{ item.value }}
        </span>
      </label>
    </div>
  </form>
</template>