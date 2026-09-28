<template>
    <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
        
        <div class="hidden md:flex relative flex-col justify-center p-12 lg:p-20 w-full h-full text-white overflow-hidden bg-slate-900">
            <slot name="box_left"></slot>
        </div>

        <div class="flex flex-col justify-center px-8 py-12 lg:px-16 w-full max-w-xl mx-auto">
            <slot name="box_right"></slot>
        </div>

    </div>
</template>