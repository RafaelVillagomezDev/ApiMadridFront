<script setup lang="ts">
import { ref } from 'vue';
import Seeker from '../components/base/Seeker.vue';
import Nav from '../components/base/Nav.vue';
const routerCustom = ref([{
    linkCustom: '/home',
    linkTitle: 'Inicio',
}, {
    linkCustom: '/restaurant',
    linkTitle: 'Restaurantes',
}])


const customClassRouterLink = ref(`
  
  px-4 py-2 
  rounded-full 
  text-slate-900 
  font-medium
  transition-all 
  duration-300
  bg-blue-100 
  text-blue-700
  flex items-center gap-2
`);

</script>
<template>
    <div class="w-full p-8 mx-w-xl flex flex-col items-center gap-y-8">
        <p class="text-2xl text-slate-900 font-bold md:text-5xl">¿Que plan tenemos ?</p>
        <Seeker />
        <Nav class="flex" :routerCustom="routerCustom" :customClassRouterLink="customClassRouterLink" />
    </div>

</template>