<script setup lang="ts">
import type { OptionTabProps } from "@/types/options-type";
import { computed } from "vue";

// 1. Definimos las props normales
const props = defineProps<{
  data: OptionTabProps[];
  isOpen: boolean;
}>();

// 2. Definimos el modelo para los valores seleccionados
const selected = defineModel<(string | number | boolean)[]>({ default: [] });

// 3. Extraemos el bloque actual de forma segura
const bloqueActual = computed(() => props.data?.[0]);

// 4. Extraemos el título de la categoría dinámicamente
const nombreCategoria = computed(() => {
  if (!bloqueActual.value) return "Filtros";
  // Buscamos la propiedad que sea un string (ej: 'TypeFood' o 'Precio')
  const stringProp = Object.values(bloqueActual.value).find(val => typeof val === "string");
  return stringProp || "Filtros";
});

// 5. Extraemos el array interno de opciones
const opcionesFiltradas = computed(() => {
  if (!bloqueActual.value) return [];
  const listaOpciones = Object.values(bloqueActual.value).find(val => Array.isArray(val));
  return (listaOpciones || []) as any[];
});
</script>

<template>
  <form 
    v-if="isOpen" 
    class="p-4 bg-white rounded-lg shadow-sm w-40 md:w-64 border border-gray-200"
    @submit.prevent
  >
    <h3 class="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
      {{ nombreCategoria }}
    </h3>

    <div class="space-y-3">
      <label 
        v-for="item in opcionesFiltradas" 
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
      </label>
    </div>
  </form>
</template>