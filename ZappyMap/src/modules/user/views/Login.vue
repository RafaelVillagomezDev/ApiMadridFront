<script setup lang="ts">
import { ref } from 'vue';

const isPasswordVisible = ref(false);

const showPassword = () => {
    isPasswordVisible.value = true;
};

const hidePassword = () => {
    isPasswordVisible.value = false;
};

const handleLogin = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    console.log("Datos de inicio de sesión:", data);
    // Aquí puedes realizar la llamada a tu API o Store de Pinia
};
</script>

<template>
    <div class="bg-night-blue min-h-screen flex">
        <div class="w-full bg-[#13131a] overflow-hidden shadow-2xl flex flex-col md:flex-row">

            <!-- SECTION 1: Banner Visual (Columna izquierda) -->
            <section class="w-full md:w-1/2 relative flex flex-col justify-between p-8 md:p-12 min-h-[300px] md:min-h-screen">
                <!-- Imagen de fondo y gradiente -->
                <img src="@assets/images/background/login.webp" alt="Desert landscape"
                    class="w-full h-full absolute inset-0 object-cover">
                <div class="absolute inset-0 bg-purple-900/30"></div>

                <!-- Cabecera / Navegación superior dentro del banner -->
                <div class="relative z-10 flex justify-between items-center">
                    <RouterLink to="/" class="flex items-center gap-2">
                        <img src="@assets/icons/logo.svg" class="w-10 h-10 object-contain" alt="Logo" />
                        <h1 class="text-xl font-bold text-alice">ZappyMap</h1>
                    </RouterLink>

                    <RouterLink to="/"
                        class="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors">
                        Inicio →
                    </RouterLink>
                </div>

                <!-- Textos sobre la imagen -->
                <article class="relative z-10 my-auto py-10 text-white pr-8">
                    <h2 class="text-2xl md:text-4xl font-semibold mb-2">Conectando con tus</h2>
                    <h2 class="text-2xl md:text-4xl font-semibold">lugares favoritos</h2>
                </article>

                <p class="relative z-10 text-sm text-gray-400">
                    Tu comunidad local te espera.
                </p>
            </section>

            <!-- SECTION 2: Formulario de Login (Columna derecha) -->
            <section class="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
                <div class="max-w-md mx-auto w-full">

                    <!-- Cabecera del formulario -->
                    <header class="mb-8">
                        <h1 class="text-white text-2xl md:text-4xl font-semibold mb-2">Iniciar sesión</h1>
                        <p class="text-gray-400">
                            ¿Aún no tienes una cuenta?
                            <RouterLink to="/user/register" class="text-white hover:underline transition-colors">
                                Regístrate aquí
                            </RouterLink>
                        </p>
                    </header>

                    <!-- Formulario -->
                    <form @submit="handleLogin" class="space-y-4">
                        
                        <!-- Email -->
                        <div>
                            <label for="email" class="sr-only">Correo electrónico</label>
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="Correo electrónico"
                                required
                                class="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-vibe"
                            >
                        </div>

                        <!-- Password -->
                        <div class="relative">
                            <label for="password" class="sr-only">Contraseña</label>
                            <input 
                                id="password" 
                                name="password" 
                                :type="isPasswordVisible ? 'text' : 'password'"
                                placeholder="Contraseña"
                                required
                                class="w-full bg-[#1c1c24] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-vibe select-none"
                            >

                            <!-- Botón para alternar visibilidad de contraseña -->
                            <button 
                                type="button" 
                                @mousedown="showPassword" 
                                @mouseup="hidePassword"
                                @mouseleave="hidePassword" 
                                @touchstart.prevent="showPassword" 
                                @touchend="hidePassword"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                aria-label="Toggle password visibility"
                            >
                                <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <!-- Icono Ojo Abierto -->
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <!-- Icono Ojo Cerrado/Tachado -->
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>

                        <!-- Enlace de contraseña olvidada opcional -->
                        <div class="text-right">
                            <a href="#" class="text-xs text-gray-400 hover:text-white transition-colors">¿Has olvidado tu contraseña?</a>
                        </div>

                        <!-- Botón de Envío -->
                        <button 
                            type="submit"
                            class="w-full bg-emerald-vibe text-white rounded-lg p-3 font-medium hover:bg-purple-700 transition-colors mt-6 cursor-pointer"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                </div>
            </section>

        </div>
    </div>
</template>