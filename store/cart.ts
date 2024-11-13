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
    qty: number,
    price: number,
    sale: number
  ) => {
    try {
      const data: any = await $fetch(`/api/cart/${cartId}`, {
        method: "put",
        body: {
          productId,
          color,
          size,
          qty,          
          price,
          sale
        },
      });
      userCart.value = data
      toast.success('Add to cart successfully')
    }
    catch(err) {
      toast.error(`Unexpected Error. Please try again`)
    }
  };
  const updateQuantity = async (qty: number, cartId: string, productId: string) => {
    const data: any = await $fetch(`/api/cart/${cartId}`, {
      method: 'put',
      body: {
        productId,
        qty,
        cartId
      }
    })
    userCart.value = data
  }
  const deleteCartItem = async (cartId: string, itemId: string) => {
    const data: any = await $fetch(`/api/cart/${cartId}`, {
      method: 'delete',
      body: {
        itemId
      }
    })
    userCart.value = data
  }
  const clearCart = async (cartId: string) => {
    const data: any = await $fetch(`/api/cart/${cartId}`, {
      method: 'delete'
    })
    userCart.value = data
  }
  return {
    updateQuantity,
    addProductToCart,
    getUserCart,
    deleteCartItem,
    clearCart, 
    userCart,
  };
});
