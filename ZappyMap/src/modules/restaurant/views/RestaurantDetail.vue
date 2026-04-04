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
    <div >
        <GridImages v-if="restaurant" class="max-w-[1136px] h-[410px] mx-auto w-full overflow-hidden"
            :restaurant="restaurant" />
        <div class="grid grid-cols-8 pt-4">
            <NavTab class="col-start-1 md:col-start-2  col-end-9 md:col-end-5 w-full overflow-hidden " :restaurant="restaurant" />
        </div>
    </div>
</template>