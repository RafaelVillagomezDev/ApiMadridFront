<script setup lang="ts">
import NavbarLayout from '@core/layout/NavbarLayout.vue';
import FooterLayout from '@core/layout/FooterLayout.vue';
import Favourites from '@core/components/modal/Favourites.vue';
import MenuBurguer from '@core/components/modal/MenuBurguer.vue';


import GlobalLoader from '@core/components/spinners/GlobalLoader.vue';

import { computed, ref } from 'vue';
import { useRoute, type RouteRecordNameGeneric } from 'vue-router';

const route = useRoute();

const isMenuOpen = ref(false);
const isFavOpen = ref(false);

const routesWithoutLayout = [
  { name: 'not-found' },
  { name: 'login' },
  { name: 'user-register' },
  { name: 'user-login' }
];

// 👇 Añadido | null | undefined para evitar errores de TS
const checkRouteNeedsHide = (currentRouteName: RouteRecordNameGeneric | null | undefined) => {
  return routesWithoutLayout.some(routeObj => routeObj.name === currentRouteName);
};

const hideLayout = computed(() => checkRouteNeedsHide(route.name));

const mainClass = computed(() => hideLayout.value ? '' : 'grow');
</script>

<template>

  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        
  
        <template #default>
          
          <div>
            <div class="flex min-h-screen flex-col">
              
        
              <header v-if="!hideLayout">
                <NavbarLayout v-model:isMenuOpen="isMenuOpen" v-model:isFavOpen="isFavOpen" />
              </header>


              <main :class="[mainClass]">
                <component :is="Component" />
              </main>

          
              <FooterLayout v-if="!hideLayout" />
            </div>

            <!-- Modales -->
            <Favourites v-if="isFavOpen" v-model="isFavOpen" />
            <MenuBurguer v-if="isMenuOpen" v-model="isMenuOpen" />
          </div>
        </template>

      
        <template #fallback>
          <GlobalLoader />
        </template>

      </Suspense>
    </template>
  </RouterView>
</template>