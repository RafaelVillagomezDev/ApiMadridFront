<script setup lang="ts">
import banner_brindis_md from "@core/assets/images/banner/banner_brindis_md.webp"
import banner_brindis_sm from "@core/assets/images/banner/banner_brindis_sm.webp"
</script>

<template>
    <div class="bg-night-blue overflow-hidden w-full flex flex-col rounded-3xl md:flex-row md:w-3/4 md:h-96 shadow-2xl">
        
        <div class="w-full h-1/2 md:h-full md:flex-1">
            <picture>
                <source :srcset="banner_brindis_md" media="(min-width: 768px)">
                <img 
                    :src="banner_brindis_sm" 
                    alt="banner brindis" 
                    loading="eager"
                    class="w-full h-full object-cover" 
                />
            </picture>
        </div>

        <div class="w-full h-1/2 md:h-full md:flex-1 grid place-content-center p-6 text-center">
            <p class="text-alice text-2xl font-bold text-balance md:text-3xl lg:text-4xl">
                <span class="text-emerald-vibe">Elige</span> cualquiera de nuestras diferentes 
                <span class="text-emerald-vibe">opciones</span>
            </p>
            <p class="text-alice/70 mt-2 md:text-xl text-balance">
                Busca, disfruta y ¡diviértete!
            </p>
        </div>
    </div>
</template>