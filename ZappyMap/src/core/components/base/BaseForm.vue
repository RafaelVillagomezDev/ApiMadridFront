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


props.fields.forEach(field => {
    formData[field.name] = '';
});


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

            <input v-else :type="field.type" :id="field.name" v-model="formData[field.name]"
                :placeholder="field.placeholder" :required="field.required"
                class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
        </div>

        <button type="submit"
            class="mt-4 w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            {{ submitText }}
        </button>
    </form>
</template>