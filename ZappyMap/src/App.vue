<script setup lang="ts">
import NavbarLayout from '@/core/layout/NavbarLayout.vue';
import FooterLayout from './core/layout/FooterLayout.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <NavbarLayout />
    </header>
    <main class="grow p-8">
      <RouterView />
    </main>
    <FooterLayout />
  </div>
</template>