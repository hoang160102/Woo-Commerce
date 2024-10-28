<script lang="ts" setup>
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useProductStore } from "~/store/products";
import { useCartStore } from "~/store/cart";
const productStore = useProductStore();
const cartStore = useCartStore();
const { getProductById } = productStore;
const { updateQuantity, deleteCartItem } = cartStore;
const userCookie: any = useCookie("currentUser");
const product = ref<any>(null);
const props = defineProps<{
  id: string;
  idProduct: string;
  qty: number;
  size: string;
  color: string;
}>();
const qty = ref<number>(props.qty);
watch(
  () => props.qty,
  (newQty: number) => {
    qty.value = newQty;
  }
);
watchEffect(async () => {
  await getProductById(props.idProduct);
  product.value = productStore.productById;
});
const decreaseQty = async () => {
  qty.value--;
  if (qty.value === 0) {
    await deleteCartItem(userCookie.value.cart, props.id);
  }
  await updateQuantity(qty.value, userCookie.value.cart, props.id);
};
const increaseQty = async () => {
  qty.value++;
  await updateQuantity(qty.value, userCookie.value.cart, props.id);
};

const deleteItem = async () => {
  await deleteCartItem(userCookie.value.cart, props.id);
};
</script>
<template>
  <div class="flex px-3 py-2 align-center justify-between">
    <div v-if="product" class="product align-center flex">
      <img
        class="w-[64px] object-cover h-[70px] rounded-lg"
        :src="product.product_images[0]"
        alt=""
      />
      <div class="info ml-3">
        <div class="name">{{ product.name }}</div>
        <div class="flex my-1">
          <div class="capitalize text-gray-600 text-xs">Color: {{ color }},</div>
          <div class="text-gray-600 text-xs ml-1">Size: {{ size }}</div>
        </div>
        <div class="price text-xs font-semibold">
          {{ (product.price * qty).toFixed(2) }}$
        </div>
      </div>
    </div>
    <div class="inline-flex gap-2 flex-col items-end">
      <div
        class="flex rounded bg-white text-sm leading-none shadow-sm shadow-gray-200 isolate"
      >
        <button
          title="Decrease Quantity"
          aria-label="Decrease Quantity"
          @click="decreaseQty"
          type="button"
          class="focus:outline-none border-r w-6 h-6 border rounded-l border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon :icon="faMinus" class="fa-sm" />
        </button>
        <input
          v-model="qty"
          type="number"
          aria-label="Quantity"
          class="flex items-center justify-center w-8 px-2 text-right text-xs focus:outline-none border-y border-gray-300"
        /><button
          @click="increaseQty"
          title="Increase Quantity"
          aria-label="Increase Quantity"
          type="button"
          class="focus:outline-none border-l w-6 h-6 border rounded-r hover:bg-gray-50 border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <FontAwesomeIcon :icon="faPlus" class="fa-sm" />
        </button>
      </div>
      <div
        class="text-xs text-gray-400 group-hover:text-gray-700 flex leading-none items-center"
      >
        <button
          title="Remove Item"
          aria-label="Remove Item"
          type="button"
          @click="deleteItem"
          class="flex items-center gap-1 hover:text-red-500 cursor-pointer"
        >
          <FontAwesomeIcon :icon="faTrashCan" class="fa-lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
