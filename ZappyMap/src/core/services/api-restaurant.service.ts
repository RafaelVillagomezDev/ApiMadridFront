import type { FiltersRestaurant } from "@/types/router-types";

const API_ENDPOINTS = {
  RESTAURANT: "http://localhost:3000/api/v1/restaurant/",

};


export const RestaurantService = {

  getRestaurant: (
    token: string | null,
    filters: FiltersRestaurant={}
  ) => {

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {

      if (value === undefined || value === null || value === '') {
        return;
      }

      if (Array.isArray(value)) {

        value.forEach((item) => {

          if (item !== undefined && item !== null && item !== '') {
            params.append(key, String(item));
          }

        });

        return;
      }

      params.append(key, String(value));

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
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {})
        }
      }
    };

  },
  createRestaurant: (token: string | null, restaurantData: any) => {
    return {
      url: `${API_ENDPOINTS.RESTAURANT+"create"}`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {})
        },
        body: restaurantData
        
      }
    };
  }
};


