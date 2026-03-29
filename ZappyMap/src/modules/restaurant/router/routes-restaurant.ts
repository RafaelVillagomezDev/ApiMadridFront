const restaurantRoutes = {
    path: '/restaurant',
    name: 'restaurant',
    component: () => import('@modules/restaurant/views/Restaurant.vue'),
    children: [
        {
            path: ':id',
            name: 'restaurant-detail',
            component: () => import('@modules/restaurant/views/RestaurantDetail.vue'),
            props: true
        },
        
    ]
}
export default restaurantRoutes