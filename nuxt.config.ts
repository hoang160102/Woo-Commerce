// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@vueuse/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@primevue/nuxt-module",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
