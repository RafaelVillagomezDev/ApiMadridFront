<script setup lang="ts">
import type { Restaurant } from '@/types/restaurant-type';

interface Props {
  restaurant: Restaurant | undefined;
}

defineProps<Props>();
</script>

<template>
    {{restaurant?.description}}
    <h1>Soy description</h1>
</template>