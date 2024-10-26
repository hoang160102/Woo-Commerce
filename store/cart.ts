import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import CartItem from "~/models/user/cart/CartItem.model";
const toast = useToast();
interface Cart {
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
}
export const useCartStore = defineStore("cart-store", () => {
  const userCart = ref<any>([]);
  const getUserCart = async (id: string) => {
    const { data } = await useFetch(`/api/cart/${id}`);
    userCart.value = data.value;
  };
  const addProductToCart = async (
    cartId: string,
    productId: string,
    color: string,
    size: string,
    qty: number
  ) => {
    const data: any = await $fetch(`/api/cart/${cartId}`, {
      method: "put",
      body: {
        productId,
        color,
        size,
        qty,
      },
    });
    console.log(data)
    userCart.value.items.push(data.items[data.items.length -1])
  };
  return {
    addProductToCart,
    getUserCart,
    userCart,
  };
});
