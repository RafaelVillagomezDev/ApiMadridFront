const API_ENDPOINTS = {
  USER_TOKEN: "http://localhost:3000/api/v1/user/token",
  USER_LOGIN: "http://localhost:3000/api/v1/user/login",
  USER_REGISTER: "http://localhost:3000/api/v1/user/register",
};

export const UserService = {
  getUserTokenConfig: () => ({
    url: API_ENDPOINTS.USER_TOKEN,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    },
  }),

  userLoginConfig: (data: { email: string; password: string }, token?: string | null,
    csrfToken?: string | null) => ({
      url: API_ENDPOINTS.USER_LOGIN,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
        },
        body: JSON.stringify(data)
      },
    }),

  userRegisterConfig: (
    data: { name: string; email: string; password: string },
    token?: string | null,
    csrfToken?: string | null
  ) => ({
    url: API_ENDPOINTS.USER_REGISTER,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
      },
      body: JSON.stringify(data)
    },
  })
};