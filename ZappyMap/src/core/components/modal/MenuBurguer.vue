<script setup lang="ts">
import { ref, computed } from 'vue'
import Nav from '@/core/components/base/Nav.vue';
import { X } from 'lucide-vue-next';

// Definimos la estructura de los enlaces
interface NavLink {
    linkCustom: string;
    linkTitle: string;
    linkIcon: any;
    action?: () => void;
}

// Recibimos los enlaces y clases opcionales
const props = defineProps<{
    links: NavLink[];
    customClassRouterLink?: string;
    customClassNav?: string;
}>();

const isOpenMenu = defineModel<boolean>();

const closeNav = () => {
    isOpenMenu.value = false;
}

// Inyectamos automáticamente la acción de cerrar el menú en todos los enlaces
const processedLinks = computed(() => {
    return props.links.map(link => ({
        ...link,
        action: link.action || closeNav 
    }));
});

// Clases por defecto si el padre no envía unas personalizadas
const defaultClassRouterLink = ref("text-slate-900 text-xl flex flex-row items-center gap-2 cursor-pointer");
const defaultClassNav = ref("flex flex-col gap-y-4");
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpenMenu" class="fixed inset-0 z-[100]">

            <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeNav"></div>
            </Transition>

            <Transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
                leave-active-class="transition-transform duration-200 ease-in" leave-from-class="translate-x-0"
                leave-to-class="-translate-x-full">
                <div class="relative w-3/4 max-w-sm h-screen bg-white shadow-2xl overflow-y-auto pt-10">
                    <div class="p-6 flex flex-col h-full">
                        <button @click="closeNav" type="button"
                            class="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900">
                            <X :size="28" />
                        </button>

                        <Nav :routerCustom="processedLinks" 
                             :customClassRouterLink="customClassRouterLink || defaultClassRouterLink"
                             :customClassNav="customClassNav || defaultClassNav" />
                             
                        <!-- Slot con nombre -->
                        <div class="mt-8">
                            <slot name="footer-action"></slot>
                        </div>
                        
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>