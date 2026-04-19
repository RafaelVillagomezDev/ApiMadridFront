<script setup lang="ts">
import logo from '@core/assets/icons/logo.svg';
import { Menu, Heart } from 'lucide-vue-next';


defineProps<{
    isMenuOpen: boolean;
    isFavOpen: boolean;
}>();


const emit = defineEmits<{
    (e: 'update:isMenuOpen', value: boolean): void;
    (e: 'update:isFavOpen', value: boolean): void;
}>();
</script>

<template>
    <nav class="flex flex-row h-16 justify-between items-center px-6 bg-white border-b border-slate-200/50">
        <div class="flex flex-row gap-2 items-center">
            <img :src="logo" class="w-10 h-10 object-contain" alt="Logo" />
            <h1 class="text-xl font-bold text-slate-900">ZappyMap</h1>
        </div>

        <div class="flex items-center gap-2.5">
            <button type="button" aria-label="Abrir favoritos" @click="emit('update:isFavOpen', true)"
                class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Heart :size="19" :class="{ 'fill-red-500 text-red-500': isFavOpen }" />
            </button>

            <button type="button" aria-label="Abrir menú" @click="emit('update:isMenuOpen', true)"
                class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Menu :size="19" />
            </button>
        </div>
    </nav>
</template>