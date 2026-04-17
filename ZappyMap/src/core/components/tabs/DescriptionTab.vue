<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-type';
import { Mails, Utensils, Phone, PanelsTopLeft, CreditCard, Wallet } from 'lucide-vue-next';
import Visa from "@assets/icons/visa.svg";
import Mastercard from "@assets/icons/mastercard.svg"
import ApplePay from "@assets/icons/apple_pay.svg"
import Cash from "@assets/icons/cash.svg"
interface Props {
    restaurant: Restaurant | undefined;
}

defineProps<Props>();

// Estilo común para los iconos y contenedores (DRY)
const itemClass = "flex gap-x-2 items-center text-gray-700 hover:text-emerald-600 transition-colors";
const iconClass = "w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-emerald-500";
</script>

<template>
    <div v-if="restaurant" class="space-y-8 animate-in fade-in duration-500">
        <section>
            <p class="text-gray-600 leading-relaxed text-sm md:text-base break-words">
                {{ restaurant.description }}
            </p>
        </section>

        <section class="pt-2" v-if="restaurant?.menus.length > 0">
            <h2 class="font-bold text-xl text-gray-800 border-b border-gray-100 pb-3 mb-4">Carta</h2>

            <p
                class="text-gray-500 text-sm md:text-base mb-6 leading-snug line-clamp-2 md:line-clamp-none hover:line-clamp-none transition-all">
                Disfruta de la gran variedad de platos que ofrece <span class="font-medium text-gray-700">{{
                    restaurant?.name }}</span> y vive el momento.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="menu in restaurant?.menus" :key="menu.id"
                    class="p-5 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:shadow-md transition-all">

                    <div class="mb-4">
                        <h3 class="font-bold text-emerald-800 text-lg">Menú {{ menu.name }}</h3>
                        <p v-if="menu.description" class="text-xs text-gray-500 line-clamp-2">{{ menu.description }}</p>
                    </div>

                    <div class="space-y-4">
                        <div v-for="(dish, index) in menu?.dishes" :key="index" class="group">
                            <div class="flex justify-between items-start gap-4">
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center gap-2 mb-0.5">
                                        <span
                                            class="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                                            {{ dish.name }}
                                        </span>
                                        <span
                                            class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                                            {{ dish.category }}
                                        </span>
                                    </div>
                                    <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">
                                        "{{ dish.description }}"
                                    </p>
                                </div>

                                <div class="flex-shrink-0">
                                    <span
                                        class="font-semibold text-gray-900 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
                                        {{ Number(dish.price) }}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pt-2">
            <h2 class="font-bold text-xl text-gray-800 border-b border-gray-100 pb-3 mb-5">Detalles</h2>

            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div v-if="restaurant.email" class="flex items-start gap-x-3">
                    <dt :class="iconClass" aria-hidden="true">
                        <Mails class="w-full h-full" />
                    </dt>
                    <dd class="min-w-0 flex-1">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider font-bold">Email</span>
                        <a :href="`mailto:${restaurant.email}`"
                            class="text-gray-700 hover:text-emerald-600 transition-colors break-all text-sm md:text-base block">
                            {{ restaurant.email }}
                        </a>
                    </dd>
                </div>

                <div v-if="restaurant.type_food" class="flex items-start gap-x-3">
                    <dt :class="iconClass" aria-hidden="true">
                        <Utensils class="w-full h-full" />
                    </dt>
                    <dd class="flex-1">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider font-bold">Cocina</span>
                        <span class="text-gray-700 capitalize text-sm md:text-base">{{ restaurant.type_food }}</span>
                    </dd>
                </div>

                <div v-if="restaurant.phone" class="flex items-start gap-x-3">
                    <dt :class="iconClass" aria-hidden="true">
                        <Phone class="w-full h-full" />
                    </dt>
                    <dd class="flex-1">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider font-bold">Contacto</span>
                        <a :href="`tel:${restaurant.phone}`"
                            class="text-gray-700 hover:text-emerald-600 transition-colors text-sm md:text-base">
                            {{ restaurant.phone }}
                        </a>
                    </dd>
                </div>

                <div v-if="restaurant.web" class="flex items-start gap-x-3">
                    <dt :class="iconClass" aria-hidden="true">
                        <PanelsTopLeft class="w-full h-full" />
                    </dt>
                    <dd class="flex-1 min-w-0">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider font-bold">Web oficial</span>
                        <a :href="restaurant.web" target="_blank" rel="noopener noreferrer"
                            class="text-emerald-600 hover:underline transition-colors text-sm md:text-base truncate block font-medium">
                            Visitar sitio web
                        </a>
                    </dd>
                </div>
            </dl>
        </section>
        <section class="pt-2">
            <h2 class="font-bold text-xl text-gray-800 border-b border-gray-100 pb-3 mb-5">Métodos de pago</h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div class="flex items-start gap-x-3">
                    <dt :class="iconClass" aria-hidden="true">
                        <CreditCard class="w-full h-full" />
                    </dt>
                    <dd class="min-w-0 flex-1">
                        <span class="block text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
                            Tarjetas
                        </span>

                        <dl class="flex gap-x-3">
                            <div class="flex items-center p-1 border border-gray-100 rounded-md bg-white shadow-sm">
                                <img :src=Visa alt="Visa" class="w-5 md:w-8 h-auto object-contain" />
                            </div>

                            <div class="flex items-center p-1 border border-gray-100 rounded-md bg-white shadow-sm">
                                <img :src=Mastercard alt="Mastercard" class="w-5 md:w-8 h-auto object-contain" />
                            </div>
                            <div class="flex items-center p-1 border border-gray-100 rounded-md bg-white shadow-sm">
                                <img :src=ApplePay alt="ApplePay" class="w-5 md:w-8 h-auto object-contain" />
                            </div>
                        </dl>
                    </dd>
                </div>

                <div class="flex items-start gap-x-3">
                    <dt :class="iconClass" aria-hidden="true">
                        <Wallet class="w-full h-full" />
                    </dt>
                    <dd class="flex-1">
                        <span class="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Otros métodos de
                            pago</span>
                        <dl class="flex gap-x-3">
                            <div class="flex items-center p-1 border border-gray-100 rounded-md bg-white shadow-sm">
                                <img :src=Cash alt="Cash" class="w-5 md:w-7 h-auto object-contain" />
                            </div>
                        </dl>
                    </dd>
                </div>
            </dl>
        </section>
    </div>

    <div v-else class="space-y-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-32 bg-gray-100 rounded-xl w-full"></div>
        <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="grid grid-cols-2 gap-4">
                <div class="h-10 bg-gray-100 rounded"></div>
                <div class="h-10 bg-gray-100 rounded"></div>
            </div>
        </div>
    </div>
</template>