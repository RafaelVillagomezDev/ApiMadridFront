<script setup lang="ts">
import type { RouterCustomLink } from '@/types/router-types';
import { RouterLink } from 'vue-router';


interface RouterNavbar {
    routerCustom: RouterCustomLink[]
}

defineProps<RouterNavbar>();

</script>

<template>
    <nav class="flex flex-row gap-1">
        <RouterLink class="text-slate-900" v-for="item in routerCustom" :key="item.linkCustom" :to="item.linkCustom">
            {{ item.linkTitle }}
        </RouterLink>
    </nav>
</template>