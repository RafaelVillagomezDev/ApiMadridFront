<script setup lang="ts">
import { ref } from 'vue';
import Stepper from '@core/components/base/Stepper.vue';
import BaseForm from '@core/components/base/BaseForm.vue';
import SplitLayout from '@core/layout/SplitLayout.vue';
import type { FormField } from '@/types/form-type';



const currentStep = ref(1);

const formSteps = [
    { id: 1, name: 'Información' },
    { id: 2, name: 'Ubicación' },
    { id: 3, name: 'Fotos' }
];



// Array para defincion de campos del formulario
const stepOneFields: FormField[] = [
    {
        name: 'siteName',
        label: 'Nombre del sitio',
        type: 'text',
        placeholder: 'Ej. Parque Central',
        required: true
    },
    {
        name: 'category',
        label: 'Categoría',
        type: 'select',
        placeholder: 'Selecciona una categoría',
        required: true,
        options: [
            { label: 'Restaurante', value: 'restaurante' },
            { label: 'Parque', value: 'parque' },
            { label: 'Museo', value: 'museo' }
        ]
    }
];

// Esta función recibe el objeto con los datos ya ordenados
const onFormSubmit = (data: Record<string, any>) => {
    console.log("Datos listos para enviar al backend o guardar en store:", data);
    // Aquí puedes llamar a tu API o pasar al siguiente paso
};
</script>

<template>
    <SplitLayout>
        
        <template #box_left>
            <img 
                src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1000&auto=format&fit=crop" 
                class="absolute inset-0 w-full h-full object-cover" 
                alt="Personas disfrutando en un local" 
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-slate-900/60"></div>

            <div class="relative z-10 flex flex-col gap-8">
                
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium w-fit border border-blue-400/30">
                    Impulsa tu crecimiento local
                </span>

                <h2 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                    Haz que te encuentren,<br>
                    <span class="text-blue-400">fácil y rápido.</span>
                </h2>

                <p class="text-xl text-slate-200 max-w-lg leading-relaxed">
                    ZappyMap es el escaparate digital perfecto para tu proyecto. Al registrar tu establecimiento, te unes a una plataforma diseñada para que:
                </p>

                <ul class="space-y-4 text-lg text-slate-100">
                    <li class="flex items-center gap-3">
                        <span class="text-blue-400 text-2xl">🚀</span>
                        <span>Puedas dar <strong>máxima visibilidad a tu negocio</strong> frente a miles de usuarios activos en tu ciudad.</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-blue-400 text-2xl">📍</span>
                        <span>Convertir<strong> tu local</strong>  en el nuevo punto de referencia de tu zona.</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="text-blue-400 text-2xl">🌟</span>
                        <span><strong>Darte a conocer sin esfuerzo</strong>, atrayendo nuevos clientes poteciales directamente a tu puerta.</span>
                    </li>
                </ul>

                <p class="text-sm text-slate-400 mt-4">
                    Tu próximo gran cliente te está buscando. Solo falta que des el primer paso.
                </p>
            </div>
        </template>

        <template #box_right>
            <div class="flex flex-col gap-6 mb-8">
                <div>
                    <img src="@core/assets/icons/logo.svg" class="w-16 h-16 object-contain" alt="Logo" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-slate-900">Registrar sitio</h1>
                    <p class="text-slate-600 mt-2">Agrega un nuevo sitio a ZappyMap para compartirlo con la comunidad.</p>
                </div>
            </div>

            <div class="mb-10">
                <Stepper :steps="formSteps" :currentStep="currentStep" />
            </div>
            
            <BaseForm 
                :fields="stepOneFields" 
                submitText="Siguiente" 
                @submit="onFormSubmit" 
            />
        </template>

    </SplitLayout>
</template>