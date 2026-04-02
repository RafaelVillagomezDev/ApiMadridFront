import restaurantRoutes from '@/modules/restaurant/router/routes-restaurant'
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
    {
      path: '/restaurant/:id', 
      name: 'restaurant-detail',
      component: () => import('@modules/restaurant/views/RestaurantDetail.vue'),
      props: true 
    },
    restaurantRoutes
  ]
})

export default router