<script setup lang="ts">
import { ref } from 'vue';
import { userStore } from '@/stores/user';
const store = userStore();


defineProps<{
    isOpen: boolean;
}>();


const emit = defineEmits<{
    (e: 'close'): void;
}>();

const isPasswordVisible = ref(false);

const showPassword = () => {
    isPasswordVisible.value = true;
};

const hidePassword = () => {
    isPasswordVisible.value = false;
};

const handleLogin = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData)  as { email: string; password: string };;
    
    const login = await store.login(data);

    console.log("Login response:", login);
    console.log("Datos de inicio de sesión:", data);
};
</script>

<template>
    <!-- Teleport para renderizar el modal fuera del flujo normal y montarlo en el body -->
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <!-- Backdrop / Fondo oscuro con difuminado -->
            <div 
                class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
                @click="emit('close')"
            ></div>

            <!-- Contenedor del Modal -->
            <div class="relative w-full max-w-md bg-[#13131a] rounded-2xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 border border-white/10">
                
                <!-- Botón de Cierre (X) -->
                <button 
                    type="button" 
                    @click="emit('close')"
                    class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
                    aria-label="Cerrar modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Cabecera del Modal -->
                <header class="mb-6 text-center md:text-left">
                    <h1 class="text-white text-2xl md:text-3xl font-semibold mb-2">Iniciar sesión</h1>
                    <p class="text-gray-400 text-sm">
                        ¿No tienes una cuenta?
                        <RouterLink to="/user/register" class="text-white hover:underline transition-colors font-medium">
                            Regístrate
                        </RouterLink>
                    </p>
                </header>

                <!-- Formulario de Login -->
                <form @submit="handleLogin" class="space-y-4">
                    
                    <!-- Email -->
                    <div>
                        <label for="email" class="sr-only">Email</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="Correo electrónico"
                            required
                            class="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-vibe border border-transparent focus:border-transparent"
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
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>

                    <!-- Botón de Envío -->
                    <button 
                        type="submit"
                        class="w-full bg-emerald-vibe text-white rounded-lg p-3 font-medium hover:bg-emerald-600 transition-colors mt-6 cursor-pointer"
                    >
                        Iniciar sesión
                    </button>
                </form>

            </div>
        </div>
    </Teleport>
</template>