<script setup lang="ts">
import { ref } from 'vue';
import Stepper from '@core/components/base/Stepper.vue';
import BaseForm from '@core/components/base/BaseForm.vue';
import SplitLayout from '@core/layout/SplitLayout.vue';
import type { FormField } from '@/types/form-type';
import { useRestaurantStore } from '@/stores/restaurant';
import { userStore } from '@/stores/user';
import { createRestaurantStepOneSchema, createRestaurantStepTwoSchema } from '@/modules/restaurant/schemas/register_restaurant.schema';


const formData = ref<Record<string, any>>({});
const currentStep = ref(1);


const createdRestaurantId = ref<string | null>(null); 

const formSteps = [
    { id: 1, name: 'Información' },
    { id: 2, name: 'Ubicación' },
    { id: 3, name: 'Fotos' }
];

const storeRestaurant = useRestaurantStore();
const storeUser = userStore(); 


const stepOneFields: FormField[] = [
    {
        name: 'name',
        label: 'Nombre del sitio',
        type: 'text',
        placeholder: 'Ej. Restaurante Sevilla ',
        required: true
    },
    {
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        placeholder: 'tu@email.com',
        required: true
    },
    {
        name: 'phone',
        label: 'Número de teléfono',
        type: 'text',
        placeholder: 'Ej. 61 XXX XXX',
        required: true
    },
    {
        name: 'address',
        label: 'Dirección',
        type: 'text',
        placeholder: 'Ej. Calle Principal, 123 , Madrid',
        required: true
    },
    {
        name: 'web',
        label: 'Sitio web',
        type: 'text',
        placeholder: 'Ej. https://www.tusitio.com',
        required: false
    },
    {
        name: 'type_food',
        label: 'Tipo de comida',
        type: 'select',
        placeholder: 'Selecciona una opción',
        required: true,
        options: [
            { label: 'Italiana', value: 'italiana' },
            { label: 'China', value: 'china' },
            { label: 'Mexicana', value: 'mexicana' },
            { label: 'Japonesa', value: 'japonesa' },
            { label: 'India', value: 'india' },
            { label: 'Española', value: 'española' },
            { label: 'Turca', value: 'turca' }
        ]
    },
    {
        name: 'description',
        label: 'Descripción',
        type: 'textarea',
        placeholder: 'Ej. Restaurante de comida italiana...',
        required: false
    },
];

const stepTwoFields: FormField[] = [
    { name: 'address', label: 'Dirección', type: 'text', placeholder: 'Ej. Calle Principal, 123', required: true },
    { name: 'city', label: 'Ciudad', type: 'text', placeholder: 'Ej. Madrid', required: true },
    { name: 'zip_code', label: 'Código Postal', type: 'text', placeholder: 'Ej. 28001', required: true }
];

const stepThreeFields: FormField[] = [
    { name: 'image', label: 'Imagen del sitio', type: 'file', placeholder: '', required: false }
];

const processStep = async (stepData: Record<string, any>) => {
    
    formData.value = { ...formData.value, ...stepData };
    const data = formData.value;

    if (currentStep.value === 1) {
        currentStep.value = 2;
        
    } else if (currentStep.value === 2) {

        try {
            const dataRestaurant = { ...data };
            
            const response = await storeRestaurant.createRestaurant(dataRestaurant) as unknown as {
                data?: { id?: string };
            };
            
        
            if (response.data?.id) {
                createdRestaurantId.value = response.data.id;
                console.log("Restaurante creado con éxito. ID:", createdRestaurantId.value);
                
                
                currentStep.value = 3;
            } else {
                console.error("No se pudo obtener el ID del restaurante creado.");
            }
        } catch (error) {
            console.error("Error al enviar los datos del restaurante al backend:", error);
        }
        
    } else if (currentStep.value === 3) {
        
        try {
            const { image } = data;
            
            if (image && createdRestaurantId.value) {
                const uploadData = new FormData();
               
                
                uploadData.append('images', image);
                
                const uploadResult = await storeUser.uploadImage(createdRestaurantId.value, uploadData);
                
                if (uploadResult.success) {
                    console.log("¡Sitio e imágenes registradas con éxito!", uploadResult.data);
                    
                } else {
                    console.error("Error al subir las imágenes:", uploadResult.message);
                }
            } else {
                console.log("Formulario completado (sin imagen o sin ID de restaurante).");
            }
        } catch (error) {
            console.error("Excepción al subir la imagen:", error);
        }
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};
</script>

<template>

    <SplitLayout>
         <template #box_left>
            <img src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1000&auto=format&fit=crop"
                class="absolute inset-0 w-full h-full object-cover" alt="Personas disfrutando en un local" />

            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-slate-900/60"></div>

            <div class="relative z-10 flex flex-col gap-8">

                <span
                    class="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium w-fit border border-blue-400/30">
                    Impulsa tu crecimiento local
                </span>

                <h2 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                    Haz que te encuentren,<br>
                    <span class="text-blue-400">fácil y rápido.</span>
                </h2>

                <p class="text-xl text-slate-200 max-w-lg leading-relaxed">
                    ZappyMap es el escaparate digital perfecto para tu proyecto. Al registrar tu establecimiento, te
                    unes a una plataforma diseñada para que:
                </p>

                <ul class="space-y-4 text-lg text-slate-100">
                    <li class="flex items-center gap-3">
                        <span class="text-blue-400 text-2xl">🚀</span>
                        <span>Puedas dar <strong>máxima visibilidad a tu negocio</strong> frente a miles de usuarios
                            activos en tu ciudad.</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-blue-400 text-2xl">📍</span>
                        <span>Convertir<strong> tu local</strong> en el nuevo punto de referencia de tu zona.</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-blue-400 text-2xl">🌟</span>
                        <span><strong>Darte a conocer sin esfuerzo</strong>, atrayendo nuevos clientes poteciales
                            directamente a tu puerta.</span>
                    </li>
                </ul>

                <p class="text-sm text-slate-400 mt-4">
                    Tu próximo gran cliente te está buscando. Solo falta que des el primer paso.
                </p>
            </div>
        </template>

        <template #box_right>
            <div class="flex flex-col gap-6 mb-8">
                <div class="hidden sm:flex items-center gap-2">
                    <img src="@core/assets/icons/logo.svg" class="w-12 h-16 object-contain" alt="Logo" />
                    <span class="text-xl font-bold text-slate-900">ZappyMap</span>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-slate-900">Registrar sitio</h1>
                    <p class="text-slate-600 mt-2">Agrega un nuevo sitio a ZappyMap para compartirlo con la comunidad.
                    </p>
                </div>
            </div>

            <div class="mb-10">
                <Stepper :steps="formSteps" :currentStep="currentStep" />
            </div>

            <div class="relative">
                <BaseForm v-if="currentStep === 1" :fields="stepOneFields"  :validation-schema="createRestaurantStepOneSchema" submitText="Continuar a Ubicación"
                    @submit="processStep" />

                <BaseForm v-else-if="currentStep === 2" :fields="stepTwoFields" :validation-schema="createRestaurantStepTwoSchema"  submitText="Subir imagenes"
                    @submit="processStep" />

                <BaseForm v-else-if="currentStep === 3" :fields="stepThreeFields"   submitText="Registrar sitio"
                    @submit="processStep" />

                <button v-if="currentStep > 1" @click="prevStep"
                    class="mt-4 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors w-full text-center">
                    Volver al paso anterior
                </button>
            </div>
        </template>
    </SplitLayout>
       
</template>