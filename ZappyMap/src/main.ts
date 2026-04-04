import '@/core/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './core/router/routes'
import VueSplide from '@splidejs/vue-splide';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueSplide)
app.use(router)
app.mount('#app')
