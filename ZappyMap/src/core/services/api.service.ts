import { getFullUrl } from "@core/utils/getFullUrl";

const API_ENDPOINTS = {
  ANONYMUS_TOKEN: "/api/v1/anonymous/token",
};
 
export const AuthService = {
  getTokenConfig: () => ({
    url: getFullUrl(API_ENDPOINTS.ANONYMUS_TOKEN),
    options: {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }
    },
  })
};