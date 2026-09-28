/// <reference types="vite/client" />

//Forzmamos a typescript a reconocer el modulo de splidejs para evitar errores de importacion
declare module '@splidejs/vue-splide' {
  import { DefineComponent } from 'vue';
  import { Options } from '@splidejs/splide';

  export const VueSplide: {
    install: (app: any) => void;
  };

  export const Splide: DefineComponent<{
    options?: Options;
    hasTrack?: boolean;
    tag?: string;
  }>;

  export const SplideSlide: DefineComponent<{
    tag?: string;
  }>;

  export default VueSplide;
}