const generalRoutes = {
    path: '/user',
    component: () => import('@modules/user/views/UserRender.vue'),
    children: [

         {
            path: '', 
            name: 'user-view',
            component: () => import('@modules/user/views/User.vue'),
        },
        
        {
            path: 'register', 
            name: 'user-register',
            component: () => import('@modules/user/views/RegisterUser.vue'),
        },
        
        
    ]
}
export default generalRoutes