<script setup lang="ts">
import { Teleport } from 'vue';
import { ref } from 'vue'
import Nav from '../base/Nav.vue';
import { House } from 'lucide-vue-next';
const isOpen = defineModel()



const routerCustom = ref([{
    linkCustom: '/home',
    linkTitle: 'Inicio',
    linkIcon: House
}])


</script>

<template>

    <Teleport to="body">
        <Transition>
            <div class="fixed top-0 block md:hidden bg-ghost w-2/4 h-screen" v-if="isOpen">
                <div class="p-6 flex items-center justify-center flex-col">
                    <Nav :routerCustom="routerCustom" customClassRouterLink="text-slate-900 text-xl flex flex-row items-center gap-1 cursor-pointer"   />
                </div>

            </div>
        </Transition>
    </Teleport>

</template>