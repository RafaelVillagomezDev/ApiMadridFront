

const API_ENDPOINTS = {
  ANONYMUS_TOKEN: "http://localhost:3000/api/v1/anonymous/token",

};
 
export const AuthService = {
  getTokenConfig: () => ({
    url: API_ENDPOINTS.ANONYMUS_TOKEN,
    options: {
      method: "POST", headers: {
        "Content-Type": "application/json",  // Aplicamos el Bearer solo si existe el token
      }
    },
  })
};


