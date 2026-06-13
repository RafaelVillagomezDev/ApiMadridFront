<script setup lang="ts">
import type { FormField } from '@/types/form-type';
import { reactive } from 'vue';

const props = withDefaults(defineProps<{
    fields: FormField[];
    submitText?: string;
}>(), {
    submitText: 'Enviar'
});

const emit = defineEmits<{
    (e: 'submit', formData: Record<string, any>): void
}>();

const formData = reactive<Record<string, any>>({});

// Inicializamos los campos
props.fields.forEach(field => {
    formData[field.name] = field.type === 'file' ? null : '';
});

// Función especial para manejar la subida de archivos
const handleFileChange = (event: Event, fieldName: string) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        // Guardamos el objeto File real en el estado
        formData[fieldName] = target.files[0];
    } else {
        formData[fieldName] = null;
    }
};

const handleSubmit = () => {
    emit('submit', { ...formData });
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">

        <div v-for="field in fields" :key="field.name" class="flex flex-col gap-1.5">
            <label :for="field.name" class="text-sm font-medium text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>

            <select v-if="field.type === 'select'" :id="field.name" v-model="formData[field.name]"
                :required="field.required"
                class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                <option value="" disabled>{{ field.placeholder || 'Selecciona una opción' }}</option>
                <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                </option>
            </select>

            <textarea v-else-if="field.type === 'textarea'" :id="field.name" v-model="formData[field.name]"
                :placeholder="field.placeholder" 
                :required="field.required"
                :rows="field.rows || 4"
                class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y w-full">
            </textarea>

            <input v-else-if="field.type === 'file'" 
                type="file" 
                :id="field.name" 
                :required="field.required"
                :accept="field.accept" 
                @change="(e) => handleFileChange(e, field.name)"
                class="block w-full text-sm text-slate-500 border border-slate-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" 
            />

            <input v-else :type="field.type" :id="field.name" v-model="formData[field.name]"
                :placeholder="field.placeholder" :required="field.required"
                class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full" 
            />
        </div>

        <button type="submit"
            class="mt-4 w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            {{ submitText }}
        </button>
    </form>
</template>