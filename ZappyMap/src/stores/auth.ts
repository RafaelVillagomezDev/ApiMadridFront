import { useFetch } from "@/core/composables/useFetch";
import { AuthService } from "@/core/services/api.service";
import { defineStore } from "pinia";
import { computed, readonly, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const data = ref<any>(null);

  const token = computed(() => data.value?.data?.user?.token || null);

  const {
    data: authData,
    loading,
    error,
    execute: executeAuth
  } = useFetch(
    AuthService.getTokenConfig().url,
    AuthService.getTokenConfig().options
  );

  const getToken = async (): Promise<string | null> => {
    try {
      await executeAuth();

      if (error.value) {
        console.error("Error obteniendo el token:", error.value);
        return null;
      }

      if (authData.value) {
        data.value = authData.value;
        return token.value;
      }

      return null;

    } catch (err) {
      console.error("Error obteniendo el token:", err);
      return null;
    }
  };

  return {
    data: readonly(data),
    token,
    error: readonly(error),
    loading: readonly(loading),
    getToken,
  };
});