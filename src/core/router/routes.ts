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

router.beforeEach((to, from, next) => {
    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    

    const isAuthenticated = localStorage.getItem('user_jwt') !== null;

    if (requiresAuth && !isAuthenticated) {
      
        next({ name: 'user-login' });
    } else if (to.name === 'user-login' && isAuthenticated) {
      
        next({ name: 'user-view' });
    } else {
        next();
    }
});

export default router