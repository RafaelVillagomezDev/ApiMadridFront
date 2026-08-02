import restaurantRoutes from '@/modules/restaurant/router/routes-restaurant'
import registerRoutes from '@/modules/app/router/routes-general'
import userRoutes from '@/modules/user/router/routes-user'
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
    restaurantRoutes,
    registerRoutes,
    userRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@modules/app/views/NotFound.vue'),
      props: true
    }
  ]
})

export default router