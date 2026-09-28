<script setup lang="ts">
import { ref } from 'vue';
import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router';


const store = userStore();
const errorMessage = ref<string | null>(null);
const router = useRouter();

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


    errorMessage.value = null;

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as { email: string; password: string };

    const login = await store.login(data);

    if (login.success) {
        emit('close');
        router.push({ name: 'user-view' });
    } else {
        errorMessage.value = login.message;
    }
};
</script>

<template>
    
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

            <!-- Contenedor del Modal -->
            <div
                class="relative w-full max-w-md bg-[#13131a] rounded-2xl shadow-2xl overflow-hidden z-10 p-6 md:p-8 border border-white/10">

                <!-- Botón de Cierre (X) -->
                <button type="button" @click="emit('close')"
                    class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
                    aria-label="Cerrar modal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Cabecera del Modal -->
                <header class="mb-6 text-center md:text-left">
                    <h1 class="text-white text-2xl md:text-3xl font-semibold mb-2">Iniciar sesión</h1>
                    <p class="text-gray-400 text-sm">
                        ¿No tienes una cuenta?
                        <RouterLink to="/user/register" @click="emit('close')"
                            class="text-white hover:underline transition-colors font-medium">
                            Regístrate
                        </RouterLink>
                    </p>
                </header>

                <!-- Formulario de Login -->
                <form @submit="handleLogin" class="space-y-4">

                    <!-- Email -->
                    <div>
                        <label for="email" class="sr-only">Email</label>
                        <input id="email" name="email" type="email" placeholder="Correo electrónico" required
                            class="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-vibe border border-transparent focus:border-transparent">
                    </div>

                    <!-- Password -->
                    <div class="relative">
                        <label for="password" class="sr-only">Contraseña</label>
                        <input id="password" name="password" :type="isPasswordVisible ? 'text' : 'password'"
                            placeholder="Contraseña" required
                            class="w-full bg-[#1c1c24] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-vibe select-none">

                        <!-- Botón para alternar visibilidad de contraseña -->
                        <button type="button" @mousedown="showPassword" @mouseup="hidePassword"
                            @mouseleave="hidePassword" @touchstart.prevent="showPassword" @touchend="hidePassword"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Toggle password visibility">
                            <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>

                    <!-- 🔥 BLOQUE DE ERROR -->
                    <div 
                        v-if="errorMessage" 
                        class="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ errorMessage }}</span>
                    </div>

                    <!-- 🔥 Botón de Envío actualizado -->
                    <button 
                        type="submit"
                        :disabled="store.loading"
                        class="w-full flex justify-center items-center gap-2 bg-emerald-vibe text-white rounded-lg p-3 font-medium hover:bg-emerald-600 transition-colors mt-6 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                        
                        <!-- Spinner animado -->
                        <svg v-if="store.loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>

                        <!-- Texto dinámico -->
                        <span>{{ store.loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}</span>
                    </button>
                </form>

            </div>
        </div>
    </Teleport>
</template>