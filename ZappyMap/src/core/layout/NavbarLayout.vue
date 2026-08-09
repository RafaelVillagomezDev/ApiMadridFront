<script setup lang="ts">
import { useFavouritesStore } from '@/stores/favourites';
import logo from '@core/assets/icons/logo.svg';
import { Menu, Heart,Store,User} from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import LoginModal from '@/modules/user/modal/LoginUser.vue';
import { ref } from 'vue';

const isLoginModalOpen = ref(false);

defineProps<{
    isMenuOpen: boolean;
    isFavOpen: boolean;
}>();

const store = useFavouritesStore();
const { totalFavourites } = storeToRefs(store);

const emit = defineEmits<{
    (e: 'update:isMenuOpen', value: boolean): void;
    (e: 'update:isFavOpen', value: boolean): void;
}>();
</script>

<template>
    <nav class="flex flex-row h-16 justify-between items-center px-6 bg-white border-b border-slate-200/50">
        <div class="flex flex-row gap-2 items-center">
            <RouterLink to="/" class="flex items-center gap-2">
                <img :src="logo" class="w-10 h-10 object-contain" alt="Logo" />
                <h1 class="text-xl font-bold text-slate-900">ZappyMap</h1>
            </RouterLink>
        </div>

        <div class="flex items-center gap-2.5">
            <RouterLink to="/general/register" class="hidden md:flex p-2 hover:bg-slate-100  bg-emerald-500 rounded-full transition-colors  items-center gap-1">
                 <span>Registrar sitio</span>
                <Store :size="20" />
            </RouterLink>
             <button @click="isLoginModalOpen = true" class="hidden md:flex p-2 hover:bg-  bg-slate-800 rounded-full transition-colors  items-center gap-1">
                <User :size="20" class="text-white " />
            </button>
            <button type="button" aria-label="Abrir favoritos" @click="emit('update:isFavOpen', true)"
                class="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Heart :size="20" :class="{ 'fill-red-500 text-red-500': isFavOpen || totalFavourites > 0 }" />

                <span v-if="totalFavourites > 0"
                    class="absolute top-1 right-0 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {{ totalFavourites }}
                </span>
            </button>

            <button type="button" aria-label="Abrir menú" @click="emit('update:isMenuOpen', true)"
                class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Menu :size="20" />
            </button>
        </div>
    </nav>
    <LoginModal :isOpen="isLoginModalOpen" @close="isLoginModalOpen = false" />
</template>