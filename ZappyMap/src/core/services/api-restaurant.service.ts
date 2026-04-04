import type { FiltersRestaurant } from "@/types/router-types";

const API_ENDPOINTS = {
  RESTAURANT: "http://localhost:3000/api/v1/restaurant/",
};


export const RestaurantService = {

  getRestaurant: (token: string | null, filters: FiltersRestaurant={} ) => {
   const params = new URLSearchParams();

    // Ahora Object.entries no fallará aunque no envíes filtros
    Object.entries(filters).forEach(([key, value]) => {
      // Solo agregamos al query string si el valor no es null, undefined o string vacío
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    const finalUrl = queryString 
      ? `${API_ENDPOINTS.RESTAURANT}?${queryString}` 
      : API_ENDPOINTS.RESTAURANT;
    return {
      url: finalUrl,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Aplicamos el Bearer solo si existe el token
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      }
    }

  }
};


