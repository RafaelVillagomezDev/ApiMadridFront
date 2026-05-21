<script setup lang="ts">
import { ref, watch } from "vue";
import { Star } from "lucide-vue-next";
import { Utensils, CircleChevronDown, CircleChevronUp , HandCoins} from "lucide-vue-next";
import OptionsTab from "./OptionsTab.vue";
import type {OptionTab} from "@/types/options-type";
import Seeker from "./Seeker.vue";
const isActive  = ref(false);
const isActivePrice = ref(false);

const props = defineProps<{
  data: OptionTab[];
}>();

const seleccion = ref([]);
const seleccionPrice = ref([]);
const limpiarFiltros = () => {
  seleccion.value = [];
  seleccionPrice.value = [];
};


// 1. Definimos el emit para el "Abuelo"
const emit = defineEmits<{
  (e: 'update:selection', value: { type_food: any[]; price: any[] }): void;
}>();

watch([seleccion, seleccionPrice], ([nuevaComida, nuevoPrecio]) => {
  emit('update:selection', {
    type_food: nuevaComida,
    price: nuevoPrecio
  });
}, { deep: true });

</script>

<template>
  <section class="w-full sticky top-0 z-50 p-6 bg-white">
    <div class="flex flex-wrap gap-3 items-center">
      <button
        class="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
        <span class="inline-flex items-center gap-x-1">
          <Star :size="15" /> Mejor valorados
        </span>
      </button>

      <div class="relative">
        <button @click="isActive = !isActive"
          class="  px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors inline-flex items-center gap-x-1 hover:bg-gray-200">
          <span class="inline-flex items-center gap-x-1">
            <Utensils :size="15" /> Tipo de comida
          </span>
          <component :is="isActive ? CircleChevronUp : CircleChevronDown" :size="15" class="ml-1 text-gray-400" />
        </button>

        <OptionsTab  v-if="isActive && props.data?.[0]" :data="props.data[0]?.data" v-model="seleccion" :is-open="isActive"
          class=" absolute top-full left-0 mt-2 z-[60] min-w-[220px] bg-white shadow-2xl rounded-xl border border-gray-100" />

      </div>

      <div class="relative">
        <button @click="isActivePrice = !isActivePrice"
          class="  px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors inline-flex items-center gap-x-1 hover:bg-gray-200">
          <span class="inline-flex items-center gap-x-1">
            <HandCoins :size="15" /> Precio
          </span>
          <component :is="isActivePrice ? CircleChevronUp : CircleChevronDown" :size="15" class="ml-1 text-gray-400" />
        </button>

        <OptionsTab v-if="isActivePrice && props.data?.[1]" :data="props.data[1]?.data" v-model="seleccionPrice" :is-open="isActivePrice"
          class=" absolute top-full left-0 mt-2 z-[60] min-w-[220px] bg-white shadow-2xl rounded-xl border border-gray-100" />

      </div>


      <button @click="limpiarFiltros"
        class="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors">
        Borrar
      </button>
      <Seeker />
    </div>
  </section>
</template>
