<script setup lang="ts">
import type { OptionTab } from "@/types/options-type";
defineProps<OptionTab>();
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-sm w-64 border border-gray-200">
    <h3 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
      Categorías
    </h3>

    <div class="space-y-3">
      <!-- Opción 1 -->
      <label class="flex items-center group cursor-pointer">
        <input
          type="checkbox"
          class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span
          class="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors"
          >Electrónica</span
        >
        <span class="ml-auto text-xs text-gray-400 font-medium">12</span>
      </label>

      <!-- Opción 2 -->
      <label class="flex items-center group cursor-pointer">
        <input
          type="checkbox"
          class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span
          class="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors"
          >Ropa y Calzado</span
        >
        <span class="ml-auto text-xs text-gray-400 font-medium">45</span>
      </label>

      <!-- Opción 3 -->
      <label class="flex items-center group cursor-pointer">
        <input
          type="checkbox"
          checked
          class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span
          class="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors"
          >Hogar</span
        >
        <span class="ml-auto text-xs text-gray-400 font-medium">8</span>
      </label>
    </div>
  </div>
</template>
