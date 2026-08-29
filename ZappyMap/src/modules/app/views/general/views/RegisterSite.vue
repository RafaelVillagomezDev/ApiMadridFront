<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import linkedin from '@assets/icons/linkedin.svg';
import github from '@assets/icons/github.svg';
import bannerRegister from "@assets/images/banner/banner_register_site.webp"
</script>

<template>
  <section class="bg-night-blue">
    <div class="container px-6 py-12 mx-auto">
      <div class="text-center">
        <p class="font-medium text-emerald-500 dark:text-emerald-400">Contáctanos</p>

        <h1 class="mt-2 text-2xl font-semibold text-emerald-600 md:text-3xl dark:text-emerald-400">
          Estamos aquí para ayudarte
        </h1>

        <p class="mt-3 text-gray-500 dark:text-gray-400">
          ¿Tienes dudas sobre cómo añadir tus lugares al mapa? Escríbenos.
        </p>
      </div>

      <img
        class="object-cover w-full h-64 mt-10 rounded-lg lg:h-96"
        :src="bannerRegister"/>
      <div class="p-8 mt-12 text-center rounded-2xl bg-emerald-50 dark:bg-gray-800">
        <h2 class="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
          Haz que tu lugar destaque en el mapa
        </h2>
        <p class="max-w-2xl mx-auto mt-4 text-gray-500 dark:text-gray-400">
          Regístrate en nuestra plataforma para poder registrar tus propios sitios, restaurantes o negocios locales. Date a conocer y compártelos con toda nuestra comunidad. ¡Es rápido y totalmente gratuito!
        </p>
        
        <RouterLink
          to="/user/register"
          class="inline-flex items-center justify-center px-8 py-3 mt-6 text-sm font-medium tracking-wide text-white transition-colors duration-300 bg-emerald-600 rounded-xl hover:bg-emerald-500 focus:ring focus:ring-emerald-300 focus:ring-opacity-80 shadow-md"
        >
          Crear cuenta y registrar un sitio
        </RouterLink>
      </div>

      <!-- Ajustado a lg:grid-cols-4 para 4 tarjetas simétricas -->
      <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-4 sm:grid-cols-2">
        <!-- Tarjeta 1: Email -->
        <div class="p-4 rounded-lg bg-emerald-50 md:p-6 dark:bg-gray-800">
          <span
            class="inline-block p-3 text-black-400 rounded-lg bg-emerald-100/80"
            
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </span>

          <h2 class="mt-4 text-base font-medium text-emerald-600 dark:text-emerald-400">
            Envíanos un correo
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Respondemos lo antes posible.
          </p>
          <a 
            href="mailto:yandry75@gmail.com" 
            class="mt-2 block text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            yandry75@gmail.com
          </a>
        </div>

        <!-- Tarjeta 2: Visítanos -->
        <div class="p-4 rounded-lg bg-emerald-50 md:p-6 dark:bg-gray-800">
          <span
            class="inline-block p-3 text-black-400 rounded-lg bg-emerald-100/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </span>

          <h2 class="mt-4 text-base font-medium text-emerald-600 dark:text-emerald-400">
            Nuestra ubicación
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Desde donde gestionamos la plataforma.
          </p>
          <span class="mt-2 block text-sm text-emerald-600 dark:text-emerald-400">
            Madrid, España
          </span>
        </div>

        <!-- Tarjeta 3: LinkedIn -->
        <div class="p-4 rounded-lg bg-emerald-50 md:p-6 dark:bg-gray-800">
          <span
            class="inline-block p-3 text-emerald-500 rounded-lg bg-emerald-100/80"
          >
            <img :src="linkedin" alt="LinkedIn Logo" class="w-5 h-5 object-contain" />
          </span>

          <h2 class="mt-4 text-base font-medium text-emerald-600 dark:text-emerald-400">
            LinkedIn
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Conecta conmigo en la red profesional.
          </p>
          <a 
            href="https://www.linkedin.com/in/rafaelvillagomez/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-2 block text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Rafael Villagómez
          </a>
        </div>

        <!-- Tarjeta 4: GitHub -->
        <div class="p-4 rounded-lg bg-emerald-50 md:p-6 dark:bg-gray-800">
          <span
            class="inline-block p-3 text-emerald-500 rounded-lg bg-emerald-100/80 "
          >
            <img :src="github" alt="GitHub Logo" class="w-5 h-5 object-contain" />
          </span>

          <h2 class="mt-4 text-base font-medium text-emerald-600 dark:text-emerald-400">
            GitHub
          </h2>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Revisa mis repositorios y proyectos.
          </p>
          <a 
            href="https://github.com/RafaelVillagomezDev" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-2 block text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            RafaelVillagomezDev
          </a>
        </div>
      </div>
    </div>
  </section>
</template>