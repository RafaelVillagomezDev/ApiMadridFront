<script setup lang="ts">
import { computed } from 'vue';
import { House, Utensils, Store, User, CircleUserRound } from 'lucide-vue-next';
import { userStore } from '@/stores/user'; // Ajusta la ruta a tu store
import { storeToRefs } from 'pinia';
import MenuBurguer from '@/core/components/modal/MenuBurguer.vue'; 


const isOpen = defineModel<boolean>();

const store = userStore();
const { isLogged } = storeToRefs(store);


const routerGuest = [
    { linkCustom: '/user/login', linkTitle: 'Iniciar sesión', linkIcon: User },
    { linkCustom: '/home', linkTitle: 'Inicio', linkIcon: House },
    { linkCustom: '/general/register', linkTitle: 'Registrar sitio', linkIcon: Store },
    { linkCustom: '/restaurant', linkTitle: 'Restaurantes', linkIcon: Utensils },
];

const routerLogged = [
    { linkCustom: '/user', linkTitle: 'Area personal', linkIcon: CircleUserRound },
    { linkCustom: '/home', linkTitle: 'Inicio', linkIcon: House },
    { linkCustom: '/restaurant', linkTitle: 'Restaurantes', linkIcon: Utensils },
    { linkCustom: '/user/register/site', linkTitle: 'Registrar sitio', linkIcon: Store },
];

// Computamos reactivamente qué array enviar dependiendo de si está logueado
const activeLinks = computed(() => {
    return isLogged.value ? routerLogged : routerGuest;
});
</script>

<template>
    <!-- Pasamos el v-model bidireccional y los enlaces ya calculados -->
    <MenuBurguer v-model="isOpen" :links="activeLinks" />
</template>