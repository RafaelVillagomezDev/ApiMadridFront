<script setup lang="ts">
import NavbarLayout from '@core/layout/NavbarLayout.vue';
import FooterLayout from '@core/layout/FooterLayout.vue';
import Favourites from './core/components/modal/Favourites.vue';
import MenuBurguer from './core/components/modal/MenuBurguer.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isMenuOpen = ref(false);
const isFavOpen = ref(false);

const isNotFound = computed(() => route.name === 'not-found');
const mainClass = computed(() => isNotFound.value ? '' : 'grow p-8');
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header v-if="!isNotFound">
      <NavbarLayout v-model:isMenuOpen="isMenuOpen" v-model:isFavOpen="isFavOpen" />
    </header>

    <main :class="mainClass">
      <RouterView />
    </main>

    <FooterLayout v-if="!isNotFound" />
  </div>

  <Favourites v-if="isFavOpen" v-model="isFavOpen" />
  <MenuBurguer v-if="isMenuOpen" v-model="isMenuOpen" />
</template>