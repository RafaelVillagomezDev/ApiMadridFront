const API_ENDPOINTS = {
  RESTAURANT: "http://localhost:3000/api/v1/restaurant/",
};


export const RestaurantService = {

  getRestaurant: (token: string | null) => ({
    url: API_ENDPOINTS.RESTAURANT,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Aplicamos el Bearer solo si existe el token
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    },
  })
};


