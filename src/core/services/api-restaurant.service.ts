import { getFullUrl } from "@core/utils/getFullUrl";
import type { FiltersRestaurant } from "@/types/router-types";

const API_ENDPOINTS = {
  RESTAURANT: "/api/v1/restaurant",
};

export const RestaurantService = {
  getRestaurant: (
    token: string | null,
    filters: FiltersRestaurant = {},
    csrfToken?: string | null
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
   const basePath = queryString
  ? `${API_ENDPOINTS.RESTAURANT}/?${queryString}`
  : API_ENDPOINTS.RESTAURANT;

    return {
      url: getFullUrl(basePath),
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
        }
      }
    };
  },

  getRestaurantById: (
    id: string,
    token?: string | null,
    csrfToken?: string | null
  ) => ({
    url: getFullUrl(`${API_ENDPOINTS.RESTAURANT}/${encodeURIComponent(id)}`),
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
      }
    }
  }),

  createRestaurant: (token: string | null, csrfToken: string | null, restaurantData: any) => {
    return {
      url: getFullUrl(`${API_ENDPOINTS.RESTAURANT}/create`),
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
        },
        body: JSON.stringify(restaurantData) 
      }
    };
  }
};