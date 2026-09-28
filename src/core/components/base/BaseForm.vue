<script setup lang="ts">
import type { FormField } from '@/types/form-type';
import { useForm, Field as VeeField } from 'vee-validate';

const props = withDefaults(defineProps<{
    fields: FormField[];
    submitText?: string;
    validationSchema?: any; // 🔥 Recibimos el esquema de Zod del componente padre
}>(), {
    submitText: 'Enviar'
});

const emit = defineEmits<{
    (e: 'submit', formData: Record<string, any>): void
}>();

const initialValues: Record<string, any> = {};
props.fields.forEach(field => {
    initialValues[field.name] = field.type === 'file' ? null : '';
});

// 2. Le inyectamos los initialValues a VeeValidate
const { handleSubmit, setFieldValue, errors } = useForm({
    validationSchema: props.validationSchema,
    initialValues: initialValues // 🔥 ESTO SOLUCIONA EL ERROR
});



// Función especial para manejar la subida de archivos
const handleFileChange = (event: Event, fieldName: string) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        // Guardamos el archivo directamente en el estado interno de VeeValidate
        setFieldValue(fieldName, target.files[0]);
    } else {
        setFieldValue(fieldName, null);
    }
};

// 🔥 Esta función SOLO se ejecutará si Zod da luz verde a todos los campos
const onSubmit = handleSubmit((values) => {
    emit('submit', values);
});
</script>

<template>
    <!-- Quitamos el .prevent porque VeeValidate ya lo maneja internamente -->
    <form @submit="onSubmit" class="flex flex-col gap-5">

        <div v-for="field in fields" :key="field.name" class="flex flex-col gap-1.5">
            <label :for="field.name" class="text-sm font-medium text-slate-700">
                {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>

            <!-- 🔥 VeeField intercepta el estado del input -->
            <VeeField :name="field.name" v-slot="{ field: veeField }">
                
                <select v-if="field.type === 'select'" :id="field.name" v-bind="veeField"
                    class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    :class="{ 'border-red-500 focus:ring-red-500': errors[field.name] }">
                    <option value="" disabled>{{ field.placeholder || 'Selecciona una opción' }}</option>
                    <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </option>
                </select>

                <textarea v-else-if="field.type === 'textarea'" :id="field.name" v-bind="veeField"
                    :placeholder="field.placeholder" 
                    :rows="field.rows || 4"
                    class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y w-full"
                    :class="{ 'border-red-500 focus:ring-red-500': errors[field.name] }">
                </textarea>

                <input v-else-if="field.type === 'file'" 
                    type="file" 
                    :id="field.name" 
                    :accept="field.accept" 
                    @change="(e) => handleFileChange(e, field.name)"
                    class="block w-full text-sm text-slate-500 border border-slate-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                    :class="{ 'border-red-500 focus:ring-red-500': errors[field.name] }"
                />

                <input v-else :type="field.type" :id="field.name" v-bind="veeField"
                    :placeholder="field.placeholder"
                    class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full"
                    :class="{ 'border-red-500 focus:ring-red-500': errors[field.name] }"
                />
            </VeeField>

            <!-- 🔥 Pintamos el error de Zod justo debajo del input afectado -->
            <span v-if="errors[field.name]" class="text-xs text-red-500 font-medium">
                {{ errors[field.name] }}
            </span>
        </div>

        <button type="submit"
            class="mt-4 w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            {{ submitText }}
        </button>
    </form>
</template>