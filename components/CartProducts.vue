<script lang="ts" setup>
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useProductStore } from "~/store/products";
const productStore = useProductStore()
const { getProductById } = productStore
const product = ref<any>(null)
const props = defineProps<{
  id: string
}>()
watchEffect(async() => { 
  await getProductById(props.id)
  console.log(productStore.productById)
})

</script>
<template>
  <div class="flex px-3 py-2 align-center justify-between">
    <div class="product align-center flex">
      <img
        class="w-[64px] h-[64px] rounded-lg"
        src="../public/products/products.png"
        alt=""
      />
      <div class="info ml-3">
        <div class="name">T-shirt</div>
        <div class="price text-xs font-semibold">19.00$</div>
      </div>
    </div>
    <div class="inline-flex gap-2 flex-col items-end">
      <div
        class="flex rounded bg-white text-sm leading-none shadow-sm shadow-gray-200 isolate"
      >
        <button
          title="Decrease Quantity"
          aria-label="Decrease Quantity"
          type="button"
          class="focus:outline-none border-r w-6 h-6 border rounded-l border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon :icon="faMinus" class="fa-sm" />
        </button>
        <input
          type="number"
          min="0"
          aria-label="Quantity"
          class="flex items-center justify-center w-8 px-2 text-right text-xs focus:outline-none border-y border-gray-300"
        /><button
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
        <button class="mr-2 pr-2 border-r-2" type="button">
          Move to Wishlist</button>
        <button
          title="Remove Item"
          aria-label="Remove Item"
          type="button"
          class="flex items-center gap-1 hover:text-red-500 cursor-pointer"
        >
          <FontAwesomeIcon :icon="faTrashCan" class="fa-sm" />
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