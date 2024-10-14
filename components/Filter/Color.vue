<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useProductStore } from "~/store/products";
const productStore = useProductStore()
const { getAllProducts } = productStore
const allProducts = ref<any[]>([]);
const allColors = ref<string[]>([])
const getProducts = async () => {
  await getAllProducts()
  allProducts.value = productStore.productsList.products || [];
  if(allProducts.value && allProducts.value.length > 0) {
    const colors = allProducts.value.flatMap((prod: any) => {
      return prod.color
    })
    allColors.value = [...new Set(colors)]
    console.log(allColors.value)
  }
}
getProducts()
watch(
  () => productStore.productsList,
  (newVal: any) => {
    allProducts.value = newVal.products;
  },
  { immediate: true }
);
const checkColors = defineModel<string[]>();
const isToggleColor = ref<boolean>(true);
const toggleColor = (): void => {
  isToggleColor.value = !isToggleColor.value;
};
</script>
<template>
  <div class="color-filter pb-8 mt-8 border-b border-gray-300 border-solid">
    <div class="title flex justify-between">
      <div class="font-semibold">Color</div>
      <FontAwesomeIcon
        :class="{ 'rotate-180': isToggleColor }"
        @click="toggleColor"
        class="cursor-pointer icon"
        :icon="faAngleUp"
      />
    </div>
    <div
      class="mt-3 relative pr-3 transition-all duration-300 ease-in overflow-hidden gap-4 max-h-[240px] grid grid-cols-5 md:grid-cols-6 gap-1.5"
      :style="{ maxHeight: isToggleColor ? '500px' : '0px' }"
    >
      <label
        v-for="color in allColors"
        :key="color"
        :style="{ backgroundColor: color }"
        class="w-8 h-8 rounded cursor-pointer border-2 flex justify-center items-center"
      >
        <input
          type="checkbox"
          :value="color"
          v-model="checkColors"
          class="sr-only peer"
        />
        <FontAwesomeIcon
          :icon="faCheck"
          :class="[
            { 'text-black': color === 'black' },
            { 'text-white': color !== 'white' },
          ]"
          class="fa-sm hidden peer-checked:block"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.icon {
  transition: all 0.3s ease-in-out;
}
</style>
