// plugins/toastification.ts
import { defineNuxtPlugin } from '#app';
import Toast from 'vue-toastification';
// Import the CSS file of Vue Toastification
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    // You can customize your toast options here
    position: 'top-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
  });
});
