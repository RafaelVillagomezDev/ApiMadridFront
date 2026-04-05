<script setup lang="ts">
import GridImages from '@/core/components/base/GridImages.vue';
import { useRestaurantStore } from '@/stores/restaurant';
import { computed } from 'vue';
import NavTab from '@/core/components/base/NavTab.vue';
const props = defineProps<{ id: string }>();
const storeRestaurant = useRestaurantStore();
const restaurant = computed(() => storeRestaurant.getRestaurantById(props.id));



</script>

<template>
    <div class="max-w-[1136px] mx-auto px-4 w-full">
    <div class="w-full h-[300px] md:h-[410px] overflow-hidden rounded-xl">
        <GridImages 
            v-if="restaurant" 
            class="w-full h-full object-cover"
            :restaurant="restaurant" 
        />
    </div>

    <div class="grid grid-cols-4 lg:grid-cols-10 gap-4 pt-6">
        <NavTab 
            class="col-span-4 lg:col-start-1 lg:col-end-9 w-full" 
            :restaurant="restaurant" 
        />
    </div>
</div>
</template>