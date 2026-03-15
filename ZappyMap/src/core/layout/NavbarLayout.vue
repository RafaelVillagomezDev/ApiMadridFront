<script setup lang="ts">
import logo from '@/core/assets/icons/logo.svg';
</script>

<template>
   <section class="flex flex-row h-16 justify-between items-center px-6 bg-ghost border-b border-slate-200/50">
    
    <div class="flex flex-row gap-2 items-center">
        <img :src="logo" class="w-10 h-10 object-contain" alt="Logo" />
        <h1 class="text-xl font-bold text-slate-900 ">ZappyMap</h1>
    </div>

    <div class="flex items-center">
        <span class="text-sm font-medium text-slate-600 bg-card px-3 py-1 rounded-full border border-slate-200">
            pepe
        </span>
    </div>

</section>
</template>