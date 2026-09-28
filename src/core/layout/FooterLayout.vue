<script setup lang="ts">
import { ref } from 'vue'
import linkedin from '@assets/icons/linkedin.svg';
import github from '@assets/icons/github.svg';


interface SocialLink {
    name: string;
    url: string;
    ariaLabel: string;
    icon: string;
}


const footerSections = ref([
    {
        title: 'Acerca de ZappyMap',
        links: [
            { title: 'Restaurantes', path: '/restaurant' },
        ]
    },
])


const socialLinks = ref<SocialLink[]>([
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/rafaelvillagomez/',
        ariaLabel: 'Ir al perfil de LinkedIn de Rafael Villagómez',
        icon: linkedin
    },
    {
        name: 'GitHub',
        url: 'https://github.com/RafaelVillagomezDev',
        ariaLabel: 'Ver el perfil de GitHub',
        icon: github
    }
]);
</script>

<template>
    <footer class="relative w-full border-t border-stone-100  bg-ghost">
        <div class="mx-auto w-full max-w-7xl px-8">

            <div class="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">

                <ul v-for="section in footerSections" :key="section.title">
                    <p class="font-sans text-base mb-2 font-semibold opacity-50 uppercase tracking-wider text-xs">
                        {{ section.title }}
                    </p>

                    <li v-for="link in section.links" :key="link.title">
                        <RouterLink :to="link.path"
                            class="font-sans text-base py-1 inline-block hover:text-blue-600 transition-colors duration-200">
                            {{ link.title }}
                        </RouterLink>
                    </li>
                </ul>

            </div>

            <div
                class="flex w-full flex-col items-center justify-center gap-4 border-t border-stone-200 py-6 md:flex-row md:justify-between">
                <small class="font-sans text-sm text-stone-500 text-center">
                    © {{ new Date().getFullYear() }} <RouterLink to="/" class="hover:underline font-bold">ZappyMap</RouterLink>. Todos los
                    derechos reservados.
                </small>

                <div class="flex gap-2">
                    <a v-for="social in socialLinks" :key="social.name" :href="social.url"
                        :aria-label="social.ariaLabel" target="_blank" rel="noopener noreferrer"
                        class="grid place-items-center border border-stone-200 w-9 h-9 rounded-md text-stone-600 hover:bg-stone-50 transition-all">
                        <img :src="social.icon" :alt="social.name"
                            class="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>
