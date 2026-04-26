<script setup lang="ts">
import { ref } from 'vue'
import Nav from '../base/Nav.vue';
import { House, Utensils, X } from 'lucide-vue-next'; // Cambié XLineTop por X de lucide si no la tenías

const isOpen = defineModel<boolean>()

const routerCustom = ref([
    { linkCustom: '/home', linkTitle: 'Inicio', linkIcon: House },
    { linkCustom: '/restaurant', linkTitle: 'Restaurantes', linkIcon: Utensils }
])

const customClassRouterLink = ref("text-slate-900 text-xl flex flex-row items-center gap-2 cursor-pointer");
const customClassNav =ref("flex flex-col gap-y-4")
const closeNav = () => {
    isOpen.value = false;
}
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-[100]">
            
            <Transition
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div 
                    class="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                    @click="closeNav"
                ></div>
            </Transition>

            <Transition
                enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="-translate-x-full"
                enter-to-class="translate-x-0"
                leave-active-class="transition-transform duration-200 ease-in"
                leave-from-class="translate-x-0"
                leave-to-class="-translate-x-full"
            >
                <div class="relative w-3/4 max-w-sm h-screen bg-white shadow-2xl overflow-y-auto pt-10">
                    <div class="p-6 flex flex-col">
                        <button 
                            @click="closeNav" 
                            type="button" 
                            class="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900"
                        >
                            <X :size="28" />
                        </button>
                        
                        <Nav 
                            :routerCustom="routerCustom" 
                            :customClassRouterLink="customClassRouterLink" 
                            :customClassNav="customClassNav"
                        />
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

