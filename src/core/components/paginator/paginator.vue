<script setup lang="ts">
import { computed } from 'vue';

// 1. Recibimos las props (se mantienen igual)
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();


const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>();

// Lógica para calcular las páginas visibles con puntos suspensivos
const visiblePages = computed(() => {
  const current = props.currentPage;
  const total = props.totalPages;

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total];
  } 
  else if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total];
  } 
  else {
    return [1, '...', current - 1, current, current + 1, '...', total];
  }
});

// Manejador de clics
const changePage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= props.totalPages && page !== props.currentPage) {
 
    emit('update:currentPage', page);
  }
};
</script>

<template>

  <div v-if="totalPages > 1" class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
    <div class="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200 pt-4">
      
      <!-- Botón Anterior -->
      <div 
        @click="changePage(currentPage - 1)"
        class="flex items-center text-gray-600 hover:text-slate-600 cursor-pointer transition-colors duration-200"
        :class="{ 'opacity-50 pointer-events-none': currentPage === 1 }"
      >
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="text-sm ml-3 font-medium leading-none">Anterior</p>                    
      </div>

      <!-- Números de Paginación dinámicos -->
      <div class="sm:flex hidden items-center gap-1">
        <template v-for="(page, index) in visiblePages" :key="index">
          
          <p 
            v-if="typeof page === 'number'"
            @click="changePage(page)"
            class="text-sm font-medium leading-none cursor-pointer px-3 py-2 rounded-md transition-colors duration-200"
            :class="
              currentPage === page 
                ? 'bg-slate-600 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-slate-600 hover:text-white'
            "
          >
            {{ page }}
          </p>
          
          <span 
            v-else
            class="text-sm font-medium leading-none px-2 py-2 text-gray-400 cursor-default select-none"
          >
            {{ page }}
          </span>

        </template>
      </div>

      <!-- Botón Siguiente -->
      <div 
        @click="changePage(currentPage + 1)"
        class="flex items-center text-gray-600 hover:text-slate-600 cursor-pointer transition-colors duration-200"
        :class="{ 'opacity-50 pointer-events-none': currentPage === totalPages }"
      >
        <p class="text-sm font-medium leading-none mr-3">Siguiente</p>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

    </div>
  </div>
</template>