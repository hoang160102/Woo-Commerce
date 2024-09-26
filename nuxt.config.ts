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
  "@primevue/nuxt-module", "nuxt-rating", "@pinia/nuxt", "@primevue/nuxt-module", "nuxt-nodemailer"],
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
    '~/plugins/toastification.ts',
  ],
  nodemailer: {
    from: '"Clothing Store" hoang160102@gmail.com>',
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: true,
    auth: {
      user: '2001140025@s.hanu.edu.vn',
      pass: '',
    },
  },
});