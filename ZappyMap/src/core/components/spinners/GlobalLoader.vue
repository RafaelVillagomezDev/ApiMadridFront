<template>

    <div class="absolute inset-0 z-[9999] flex items-center justify-center bg-alice backdrop-blur-sm">
        
       
        <div class="relative w-20 h-20">
            <!-- Círculo exterior (Gira a la derecha con tu color emerald-vibe) -->
            <div class="absolute inset-0 border-4 border-t-emerald-vibe border-r-transparent border-b-emerald-vibe border-l-transparent rounded-full animate-spin"></div>
            
            <!-- Círculo interior (Gira a la izquierda usando valores arbitrarios de Tailwind) -->
            <div class="absolute inset-2 border-4 border-t-transparent border-r-purple-600 border-b-transparent border-l-purple-600 rounded-full animate-[spin_1s_linear_infinite_reverse]"></div>
        </div>
        
    </div>
</template>