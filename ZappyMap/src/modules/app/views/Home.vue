<script setup lang="ts">
import Banner from '@/core/components/base/Banner.vue';
import CardCarrousell from '@/core/components/base/CardCarrousell.vue';
import SeekerLayout from '@/core/layout/SeekerLayout.vue';
import { useRestaurantStore } from '@/stores/restaurant';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const storeRestaurant= useRestaurantStore()


const {data}= storeToRefs(storeRestaurant)

const fetchData = async () => {
   await storeRestaurant.getToken("ANONYMUS_TOKEN", "POST");
};

onMounted(() => {
  fetchData();
});

</script>

<template>
    <SeekerLayout />
    <section class="p-8 flex md:justify-center md:items-center ">
        <Banner />
    </section>
    <section >
        <CardCarrousell/>
        {{ console.log(data) }}
    </section>
</template>