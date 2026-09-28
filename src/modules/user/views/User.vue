<script setup lang="ts">
import { onMounted } from "vue";
import { useFetch } from "@/core/composables/useFetch";
import { userStore } from "@/stores/user";
import CardCarrousell from "@/core/components/base/CardCarrousell.vue";
const store = userStore();

// Añadimos el token CSRF a las cabeceras
const { data, error, loading, execute } = useFetch(
  "http://localhost:3000/api/v1/restaurant/",
  {
    method: "GET",
    headers: {
      // store.token and store.csrfToken can be string | null — coalesce to empty string to satisfy TS
      Authorization: `Bearer ${store.token ?? ""}`,
      "x-csrf-token": store.csrfToken ?? "", // 🔥 Enviamos el token CSRF para pasar el middleware
    },
  }
);

onMounted(async () => {
  console.log("Llamando a http://localhost:3000/api/v1/restaurant/");
  await execute();
});
</script>

<template>
  <div style="padding: 20px">
    <!-- Estado de carga -->
    <div v-if="loading" style="color: gray">⏳ Cargando restaurantes...</div>

    <!-- Si todo falla y el router no nos echa -->
    <div
      v-else-if="error"
      style="color: red; border: 1px solid red; padding: 10px; margin-top: 10px"
    >
      <h3>❌ Error al cargar</h3>
      <p>{{ error.message }}</p>
    </div>

    <!-- Si tenemos éxito, mostramos el JSON tal cual -->
    <div v-else-if="data">
      <section v-if="data.data.length > 0">
        <CardCarrousell :restaurants="data.data" :title="'Restaurantes'" :showMore="true">
          <template #header>
            <h2 class="text-2xl font-bold text-gray-800 mb-6 px-6">Restaurantes</h2>
          </template>
        </CardCarrousell>
      </section>
    </div>
  </div>
</template>
