<script setup lang="ts">
import { ref } from 'vue';


const isPasswordVisible = ref(false);


const showPassword = () => {
    isPasswordVisible.value = true;
};

const hidePassword = () => {
    isPasswordVisible.value = false;
};


</script>

<template>
    <div class="bg-night-blue min-h-screen flex  ">
        <div class="w-full bg-[#13131a] overflow-hidden shadow-2xl flex flex-col md:flex-row">

            <!-- SECTION 1: Banner Visual -->
            <section class="w-full md:w-1/2 relative flex flex-col">
                <!-- Navegación superior -->
                <header class="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                    <RouterLink to="/" class="flex items-center gap-2">
                        <img src="@assets/icons/logo.svg" class="w-10 h-10 object-contain" alt="Logo" />
                        <h1 class="text-xl font-bold text-alice">ZappyMap</h1>
                    </RouterLink>

                    <RouterLink to="/"
                        class="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors">
                        Inicio →
                    </RouterLink>
                </header>

                <!-- Contenedor de Imagen -->
                <div class="relative h-full min-h-[400px] md:min-h-full">
                    <img src="@assets/images/background/register_zappymap.webp" alt="Desert landscape"
                        class="w-full h-full absolute inset-0 object-cover">
                    <div class="absolute inset-0 bg-purple-900/30"></div>

                    <!-- Textos sobre la imagen -->
                    <article class="absolute bottom-12 left-12 text-white pr-8">
                        <h2 class="text-2xl md:text-4xl font-semibold mb-2">Creando momentos</h2>
                        <h2 class="text-2xl md:text-4xl font-semibold">Desarrollando conexiones</h2>

                    </article>
                </div>
            </section>

            <!-- SECTION 2: Formulario de Registro -->
            <section class="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                <div class="max-w-md mx-auto w-full">

                    <!-- Cabecera del formulario -->
                    <header class="mb-8">
                        <h1 class="text-white text-2xl md:text-4xl font-semibold mb-2">Registrarse</h1>
                        <p class="text-gray-400">
                            ¿Ya tienes una cuenta?
                            <RouterLink to="/login" class="text-white hover:underline transition-colors">Iniciar sesión
                            </RouterLink>
                        </p>
                    </header>

                    <!-- Formulario -->
                    <form class="space-y-4">
                        <!-- Nombres -->
                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="w-full md:w-1/2">
                                <label for="firstName" class="sr-only">Nombre</label>
                                <input id="firstName" type="text" placeholder="Nombre"
                                    class="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-vibe">
                            </div>
                            <div class="w-full md:w-1/2">
                                <label for="lastName" class="sr-only">Apellido</label>
                                <input id="lastName" type="text" placeholder="Apellido"
                                    class="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-vibe">
                            </div>
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="email" class="sr-only">Email</label>
                            <input id="email" type="email" placeholder="Email"
                                class="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-vibe">
                        </div>

                        <!-- Password -->
                     
                        <div class="relative">
                            <label for="password" class="sr-only">Contraseña</label>

                            
                            <input id="password" :type="isPasswordVisible ? 'text' : 'password'"
                                placeholder="Contraseña"
                                class="w-full bg-[#1c1c24] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-vibe select-none">

                            <!-- Añadimos los eventos al botón -->
                            <button type="button" @mousedown="showPassword" @mouseup="hidePassword"
                                @mouseleave="hidePassword" @touchstart.prevent="showPassword" @touchend="hidePassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                aria-label="Toggle password visibility">

                               
                                <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <!-- Icono Ojo Abierto -->
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <!-- Icono Ojo Cerrado/Tachado -->
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>

                        <!-- Términos -->
                        <div class="flex items-center space-x-2 pt-2">
                            <input id="terms" type="checkbox"
                                class="w-4 h-4 rounded bg-[#1c1c24] border-gray-600 text-purple-600 focus:ring-purple-600 focus:ring-offset-0 cursor-pointer">
                            <label for="terms" class="text-gray-400 text-sm cursor-pointer select-none">
                                Acepto los <a href="#" class="text-white hover:underline">Terminos y condiciones</a>
                            </label>
                        </div>

                        <!-- Botón de Registro -->
                        <button type="submit"
                            class="w-full bg-emerald-vibe text-white rounded-lg p-3 font-medium hover:bg-purple-700 transition-colors mt-6">
                            Registrarse
                        </button>
                    </form>
                </div>
            </section>

        </div>
    </div>
</template>
