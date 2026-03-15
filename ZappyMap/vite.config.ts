/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@schemas': fileURLToPath(new URL('./src/modules/shop/schemas', import.meta.url)),
    },
  },
  // Configuración de Vitest integrada
  test: {
    globals: true,
    environment: 'jsdom',
    // Esto asegura que busque en tus nuevas carpetas __tests__
    include: ['src/**/__tests__/**/*.{test,spec}.ts'],
  },

})