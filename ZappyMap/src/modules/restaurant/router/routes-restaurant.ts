const restaurantRoutes = {
    path: '/restaurant',
    component: () => import('@modules/restaurant/views/RestaurantRender.vue'),
    children: [
        {
            path: '', // Esta es la ruta /restaurant
            name: 'restaurant-list',
            component: () => import('@modules/restaurant/views/Restaurants.vue'),
        },
        {
            path: ':id',
            name: 'restaurant-detail',
            component: () => import('@modules/restaurant/views/RestaurantDetail.vue'),
            props: true
        },
    ]
}
export default restaurantRoutes