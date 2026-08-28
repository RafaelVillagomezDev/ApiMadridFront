const generalRoutes = {
    path: '/user',
    component: () => import('@modules/user/views/UserRender.vue'),
    children: [

         {
            path: '', 
            name: 'user-view',
            component: () => import('@modules/user/views/User.vue'),
            meta: { 
                requiresAuth: true 
            }
        },
        {
            path: 'register/site', 
            name: 'user-register-site',
            component: () => import('@modules/user/views/RegisterSite.vue'),
            meta: { 
                requiresAuth: true 
            }
        },
        
        {
            path: 'register', 
            name: 'user-register',
            component: () => import('@modules/user/views/RegisterUser.vue'),
        },
        {
            path: 'login', 
            name: 'user-login',
            component: () => import('@modules/user/views/Login.vue'),
        },
        
        
    ]
}
export default generalRoutes