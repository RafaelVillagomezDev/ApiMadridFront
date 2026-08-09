

const API_ENDPOINTS = {
  USER_TOKEN: "http://localhost:3000/api/v1/user/token",
  USER_LOGIN: "http://localhost:3000/api/v1/user/login",
  USER_REGISTER: "http://localhost:3000/api/v1/user/register",

};
 
export const AuthService = {
  getUserTokenConfig: () => ({
    url: API_ENDPOINTS.USER_TOKEN,
    options: {
      method: "POST", headers: {
        "Content-Type": "application/json",  // Aplicamos el Bearer solo si existe el token en usuario
      }
    },
  }),
  userLoginConfig: (data: { email: string; password: string }) => ({
    url: API_ENDPOINTS.USER_LOGIN,
    options: {
      method: "POST", headers: {
        "Content-Type": "application/json",  // Aplicamos el Bearer solo si existe el  User token
      },
      body: JSON.stringify(data)
    },
  }),
  userRegisterConfig: (data: { name: string; email: string; password: string }) => ({
    url: API_ENDPOINTS.USER_REGISTER,
    options: {
      method: "POST", headers: {
        "Content-Type": "application/json",  // Aplicamos el Bearer solo si existe el token
      },
      body: JSON.stringify(data)
    },
  })


};


