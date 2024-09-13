// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/main.css", 'vue-toastification/dist/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [// (_options, nuxt) => {
  //   nuxt.hooks.hook("vite:extendConfig", (config) => {
  //     // @ts-expect-error
  "@vueuse/nuxt", //     config.plugins.push(vuetify({ autoImport: true }));
  //   });
  // },
  "@primevue/nuxt-module", "nuxt-rating", "@pinia/nuxt", "@primevue/nuxt-module", "nuxt-mail"],
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
  plugins: [
    { src: '~/plugins/mongoose.ts', mode: 'server' },
    '~/plugins/toastification.ts'
  ],
  mail: {
    message: {
      from: '2001140025@s.hanu.edu.vn',
      to: 'hoang160102@gmail.com'
    },
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: '2001140025@s.hanu.edu.vn',
        pass: '2001140025'
      }
    }
  }
});