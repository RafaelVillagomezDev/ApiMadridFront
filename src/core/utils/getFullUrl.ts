/** Función auxiliar para construir la URL completa usando tu variable de entorno */
export const getFullUrl = (endpoint: string) => `${import.meta.env.VITE_API_URL}${endpoint}`;