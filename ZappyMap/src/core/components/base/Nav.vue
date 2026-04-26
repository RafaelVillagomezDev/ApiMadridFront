<script setup lang="ts">
import type { RouterCustomLink } from '@/types/router-types';
import { RouterLink } from 'vue-router';


interface RouterNavbar {
    routerCustom: RouterCustomLink[],
    customClassRouterLink?: string;
    customClassNav?:string
}

withDefaults(defineProps<RouterNavbar>(), {
    customClassRouterLink: "text-slate-900",
    customClassNav:"gap-1"
});

</script>

<template>
    <nav  :class="customClassNav">
        <RouterLink :class="customClassRouterLink" v-for="item in routerCustom" :key="item.linkCustom"
            :to="item.linkCustom">
            <slot>
                <component :is="item.linkIcon" v-if="item.linkIcon" class="w-5 h-5" />
            </slot>
            {{ item.linkTitle }}
        </RouterLink>
    </nav>
</template>