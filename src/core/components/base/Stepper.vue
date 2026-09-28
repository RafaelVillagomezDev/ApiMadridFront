<script setup lang="ts">

export interface Step {
    id: number;
    name: string;
}

defineProps<{
    steps: Step[];
    currentStep: number;
}>();
</script>

<template>
    <div class="flex items-center w-full">
        <template v-for="(step, index) in steps" :key="step.id">

            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors" :class="[
                    step.id <= currentStep
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-400 font-bold border border-slate-200'
                ]">
                    <span v-if="step.id < currentStep">✓</span>
                    <span v-else>{{ step.id }}</span>
                </div>

                <span class="text-sm hidden sm:block transition-colors" :class="[
                    step.id <= currentStep
                        ? 'font-semibold text-slate-900'
                        : 'font-medium text-slate-400'
                ]">
                    {{ step.name }}
                </span>
            </div>

            <div v-if="index < steps.length - 1" class="flex-1 h-[2px] mx-3 sm:mx-4 transition-colors"
                :class="step.id < currentStep ? 'bg-slate-900' : 'bg-slate-200'"></div>

        </template>
    </div>
</template>