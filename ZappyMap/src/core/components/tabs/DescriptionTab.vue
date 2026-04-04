<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-type';
import { Mails, Utensils, Phone, PanelsTopLeft } from 'lucide-vue-next';

interface Props {
    restaurant: Restaurant | undefined;
}

defineProps<Props>();

// Estilo común para los iconos y contenedores (DRY)
const itemClass = "flex gap-x-2 items-center text-gray-700 hover:text-emerald-600 transition-colors";
const iconClass = "w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-emerald-500";
</script>

<template>
    <div v-if="restaurant" class="space-y-6">
        <p class="text-gray-600 leading-px  text-sm md:text-base">
            {{ restaurant.description }}
        </p>

        <div class="pt-2">
            <h2 class="font-bold text-lg border-b pb-2 mb-4">Detalles</h2>

            <ul class="space-y-3">
                <li v-if="restaurant.email">
                    <a :href="`mailto:${restaurant.email}`" :class="itemClass">
                        <Mails :class="iconClass" />
                        <span class="truncate">{{ restaurant.email }}</span>
                    </a>
                </li>

                <li v-if="restaurant.type_food">
                    <p class="flex gap-x-2 items-center text-gray-700">
                        <Utensils :class="iconClass" />
                        <span class="capitalize">{{ restaurant.type_food }}</span>
                    </p>
                </li>

                <li v-if="restaurant.phone">
                    <a :href="`tel:${restaurant.phone}`" :class="itemClass">
                        <Phone :class="iconClass" />
                        <span>{{ restaurant.phone }}</span>
                    </a>
                </li>

                <li v-if="restaurant.web">
                    <a :href="restaurant.web" target="_blank" rel="noopener noreferrer" :class="itemClass">
                        <PanelsTopLeft :class="iconClass" />
                        <span class="truncate">Visitar sitio web</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div v-else class="animate-pulse text-gray-400">
        Cargando detalles...
    </div>
</template>