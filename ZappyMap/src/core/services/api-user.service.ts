const API_ENDPOINTS = {
  USER_TOKEN: "/api/v1/user/token",
  USER_LOGIN: "/api/v1/user/login",
  USER_REGISTER: "/api/v1/user/register",
  UPLOAD_IMAGE: "/api/v1/image/create/restaurant/",
  LOGOUT_USER:"/api/v1/user/logout"
};

export const UserService = {
  uploadImage: (
    restaurantId: string,
    formData: FormData,
    token: string,
    csrfToken: string
  ) => ({
    url: `${API_ENDPOINTS.UPLOAD_IMAGE}${restaurantId}`,
    options: {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
      },
    },
  }),
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
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
        },
        body: JSON.stringify(data)
      },
    }),

  logoutUserConfig: (token?: string | null,
    csrfToken?: string | null) => ({
      url: API_ENDPOINTS.LOGOUT_USER,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {})
        }
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