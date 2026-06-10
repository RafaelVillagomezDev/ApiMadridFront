const generalRoutes = {
    path: '/general',
    component: () => import('@modules/app/views/general/views/RegisterRender.vue'),
    children: [
        {
            path: '', // Esta es la ruta /general
            name: 'general-register',
            component: () => import('@modules/app/views/general/views/RegisterSite.vue'),
        },
        
        
    ]
}
export default generalRoutes