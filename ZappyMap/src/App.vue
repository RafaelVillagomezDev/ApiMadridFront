<script setup lang="ts">
import NavbarLayout from '@core/layout/NavbarLayout.vue';
import FooterLayout from '@core/layout/FooterLayout.vue';
import { ref } from 'vue';
import Favourites from './core/components/modal/Favourites.vue';
import MenuBurguer from './core/components/modal/MenuBurguer.vue';



const isModalVisible = ref(false)
const isModalFavourite = ref(false)

</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <NavbarLayout v-model:isMenuOpen="isModalVisible" v-model:isFavOpen="isModalFavourite" />
    </header>
    <main class="grow p-8">
      <RouterView />
    </main>
    <FooterLayout />
  </div>
  <Favourites v-if="isModalFavourite" v-model="isModalFavourite" />
  <MenuBurguer v-if="isModalVisible != null" v-model="isModalVisible" />
</template>