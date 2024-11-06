<script setup lang="ts">
import { useCartStore } from "~/store/cart";
interface User {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing_info_id: string;
  shipping_info_id: string;
  orders: string[];
  profile_img: string;
  wishList: string[];
  refreshToken: string;
  tokenExpire: Date;
  isVerified: boolean;
}
interface ShippingMethod {
  name: string;
  price: number;
}
const props = defineProps<{
  price: number;
}>();
const cartStore = useCartStore();
const { getUserCart } = cartStore;
const userCookie: any = useCookie("currentUser");
const currentUser: any = ref<User | null>(userCookie.value);
const cartItems = ref<any>(null);
watchEffect(async () => {
  await getUserCart(currentUser.value.cart);
  cartItems.value = cartStore.userCart.items;
});
watch(
  () => cartStore.userCart,
  (newCart: any) => {
    cartItems.value = newCart.items;
  },
  { immediate: true, deep: true }
);
const subtotal = computed(() => {
  if (cartItems.value) {
    return cartItems.value.reduce(
      (acc: any, item: any) => acc + item.price * item.qty,
      0
    );
  }
});
const totalPrice = computed(() => {
  if (subtotal.value) {
    return subtotal.value + props.price;
  }
});
const totalQuantity = computed(() => {
  if (cartItems.value) {
    return cartItems.value.reduce((acc: any, item: any) => acc + item.qty, 0);
  }
});
</script>
<template>
  <div
    v-if="cartItems"
    class="summary bg-white rounded-lg shadow-lg mb-8 w-full min-h-[280px] p-4 sm:p-8 relative lg:max-w-md lg:top-32 lg:sticky"
  >
    <h2 class="text-xl font-semibold leading-none">Order Summary</h2>
    <div class="flex flex-col flex-1 mt-4 gap-4">
      <CartProducts
        v-for="product in cartItems"
        :key="product['product_id']"
        :id-product="product['product_id']"
        :id="product['_id']"
        :qty="product.qty"
        :size="product.size"
        :color="product.color"
      ></CartProducts>
    </div>
    <div class="total-cart p-4 my-4">
      <div class="subtotal flex justify-between">
        <span class="text-sm text-gray-500 font-medium">Subtotal</span>
        <span class="text-sm text-gray-500 font-semibold"
          >{{ subtotal.toFixed(2) }}$</span
        >
      </div>
      <div class="shipping mt-1 flex justify-between">
        <span class="text-sm text-gray-500 font-medium">Shipping</span>
        <span class="text-sm text-gray-500 font-semibold"
          >{{ props.price.toFixed(2) }}$</span
        >
      </div>
      <div class="total mt-4 flex justify-between">
        <span class="text-sm text-gray-500 font-medium">Total</span>
        <span class="text-lg text-gray-600 font-semibold"
          >{{ totalPrice.toFixed(2) }}$</span
        >
      </div>
    </div>
    <button
      type="submit"
      class="bg-violet-400 w-full font-semibold rounded-lg shadow-md bg-violet-500 hover:bg-violet-700 text-lg px-7 text-white text-center py-3"
    >
      Checkout
    </button>
  </div>
</template>
