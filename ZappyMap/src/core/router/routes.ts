import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: () => import('@modules/app/views/Home.vue'),
    },
    {
      path: '/home',
      redirect: '/'
    },
  ]
})

export default router