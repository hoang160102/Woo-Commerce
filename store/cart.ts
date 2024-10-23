import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useCartStore = defineStore("cart-store", () => {
  const cartList = ref<any>([]);
  const count = ref<number>(cartList.value.length);
  const addProductToCart = async (product: any) => {
    count.value++;
  };
  return {
    cartList,
    count,
    addProductToCart,
  };
});
