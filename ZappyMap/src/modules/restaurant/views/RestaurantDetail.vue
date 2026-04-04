<script setup lang="ts">
import GridImages from '@/core/components/base/GridImages.vue';
import { useRestaurantStore } from '@/stores/restaurant';

import { computed } from 'vue';
const props = defineProps<{ id: string }>();
const storeRestaurant = useRestaurantStore();
const restaurant = computed(() => storeRestaurant.getRestaurantById(props.id));



</script>

<template>
  
    <div >
        
        <GridImages v-if="restaurant" class="max-w-[1136px] h-[410px] mx-auto w-full overflow-hidden p-4 md:p-8" :restaurant="restaurant"/>
            
            
    </div>
</template>