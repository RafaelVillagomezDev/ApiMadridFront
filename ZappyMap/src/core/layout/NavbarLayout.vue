<script setup lang="ts">
import logo from '@core/assets/icons/logo.svg';

import { ref } from 'vue'
import { Menu, Heart } from 'lucide-vue-next'
import MenuBurguer from '../components/modal/MenuBurguer.vue';
import Favourites from '../components/modal/Favourites.vue';


const isModalVisible = ref(false)
const isModalFavourite = ref(false)

</script>

<template>
    <section class="flex flex-row h-16 justify-between items-center px-6 bg-ghost border-b border-slate-200/50">
        <div class="flex flex-row gap-2 items-center">
            <img :src="logo" class="w-10 h-10 object-contain" alt="Logo" />
            <h1 class="text-xl font-bold text-slate-900 ">ZappyMap</h1>
        </div>
        <div class="flex items-center gap-2.5">

            <button v-if="!isModalVisible" type="button" aria-label="Abrir menú" @click="isModalVisible = true">
                <Menu :size="19" />
            </button>
            <button v-if="!isModalFavourite" type="button" aria-label="Abrir favoritos"
                @click="isModalFavourite = true">
                <Heart :size="19" />
            </button>
            <Favourites v-if="isModalFavourite" v-model="isModalFavourite" />
            <MenuBurguer v-if="isModalVisible != null" v-model="isModalVisible" />
        </div>
    </section>
</template>