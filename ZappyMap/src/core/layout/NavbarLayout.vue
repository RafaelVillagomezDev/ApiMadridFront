<script setup lang="ts">
import logo from '@core/assets/icons/logo.svg';
import Nav from '../components/base/Nav.vue';
import { ref } from 'vue'
import { Menu ,XLineTop } from 'lucide-vue-next'
import MenuBurguer from '../components/modal/MenuBurguer.vue';
// Creamos el objeto tipo ref
const routerCustom = ref([{
    linkCustom: '/home',
    linkTitle: 'Inicio'
},])

const isModalVisible = ref(false)


</script>

<template>
    <section class="flex flex-row h-16 justify-between items-center px-6 bg-ghost border-b border-slate-200/50">

        <div class="flex flex-row gap-2 items-center">
            <img :src="logo" class="w-10 h-10 object-contain" alt="Logo" />
            <h1 class="text-xl font-bold text-slate-900 ">ZappyMap</h1>
        </div>

        <div class="flex items-center">
            <Nav class="hidden md:block "  :routerCustom="routerCustom"/>

            <button v-if="!isModalVisible" type="button" aria-label="Abrir menú" @click="isModalVisible = true">
                 <Menu class="block sm:hidden" />
            </button>
            <button v-if="isModalVisible" type="button" aria-label="Abrir menú" @click="isModalVisible = false">
                 <XLineTop class="block sm:hidden" />
            </button>
            
            <MenuBurguer  v-if="isModalVisible!=null" v-model="isModalVisible" />
        </div>

    </section>
</template>