<script setup lang="ts">
const isOpen = defineModel<boolean>()
import { useFavouritesStore } from '@/stores/favourites';
import { X, Trash } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
const closeNav = () => {
    isOpen.value = false;
}

const store = useFavouritesStore()
const { favourites } = storeToRefs(store)

</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-[100] flex justify-end">
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
                    <div class="p-6 flex flex-col border-b-1 border-night-blue">
                        <button @click="closeNav()" type="button"
                            class="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900">
                            <X :size="28" />
                        </button>
                        <div class="p-5">
                            <h3 class="font-bold text-center">Favoritos</h3>
                            <p class="font-light text-center ">¿Por qué no empezar a divertirnos?</p>
                        </div>

                    </div>
                    <div class="p-5">
                        <h3 class="mb-4 font-bold text-slate-800">Mis Favoritos</h3>

                        <div class="grid grid-cols-2 w-full gap-y-6 gap-x-4 justify-between">


                            <div v-for="item in favourites" :key="item.id"
                                class="bg-white border border-slate-100 p-3 w-full max-w-[150px] rounded-2xl shadow-sm">

                                <div class="relative aspect-square mb-2 group">
                                    <RouterLink :to="`/restaurant/${item.id}`">
                                        <div class="w-full h-full rounded-xl overflow-hidden bg-slate-50">
                                            <img v-if="item.images?.[0]" :src="item.images[0].url"
                                                class="w-full h-full object-cover" />
                                        </div>
                                    </RouterLink>


                                    <button @click="store.removeFavourite(item.id)" type="button"
                                        aria-label="eliminar favorito"
                                        class="absolute top-[-25px] right-[-22px] flex items-center justify-center w-7 h-7 rounded-full bg-white text-red-500 shadow-md border border-slate-100 hover:bg-red-500 hover:text-white transition-all active:scale-90 z-10">
                                        <Trash :size="12" />
                                    </button>
                                </div>

                                <p class="text-sm font-semibold truncate px-1">{{ item.name }}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>