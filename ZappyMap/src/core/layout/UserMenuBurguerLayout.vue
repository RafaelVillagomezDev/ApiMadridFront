<script setup lang="ts">

import { Store, CircleUserRound } from 'lucide-vue-next';
import { LogOut } from 'lucide-vue-next';
import { userStore } from '@/stores/user';
import { storeToRefs } from 'pinia';


const store = userStore();
import MenuBurguer from '@/core/components/modal/MenuBurguer.vue';


const isOpenMenuUser = defineModel<boolean>();


const handleLogout=()=>{
    store.logoutUser(); 
    isOpenMenuUser.value = false; 
}


const activeLinks = [
    { linkCustom: '/user', linkTitle: 'Area personal', linkIcon: CircleUserRound },
    { linkCustom: '/user/register/site', linkTitle: 'Registrar sitio', linkIcon: Store },
];


</script>

<template>
    <MenuBurguer v-model="isOpenMenuUser" :links="activeLinks">
        <template #footer-action>
            <button type="button" @click="handleLogout"
                class="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md">
                <LogOut :size="20" />
                <span>Cerrar Sesión</span>
            </button>
        </template>
    </MenuBurguer>
</template>