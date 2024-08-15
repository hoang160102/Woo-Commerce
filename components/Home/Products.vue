<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const props = defineProps<{
  id: number;
  name: string;
  inStock: number;
  price: number;
  sale: number;
  rating: number;
}>();
</script>
<template>
  <div class="relative product-card">
    <span v-if="sale !== price" class="red-badge absolute top-2 right-2">-{{ Math.floor((price - sale) / price * 100) }} %</span>
    <NuxtLink to="/">
      <img class="rounded-lg" src="../../public/products/products.png" alt="" />
    </NuxtLink>
    <div class="p-1">
      <div class="inline-flex items-center">
        <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
        <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
        <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
        <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
        <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
      </div>
    </div>
    <NuxtLink to="/" class="mb-2 hover:text-purple-600 font-light">{{
      name
    }}</NuxtLink>
    <div class="flex font-semibold text-sm">
      <span
        :class="{ 'line-through': sale !== price }"
        class="text-gray-400 font-normal"
        >€{{ price }}.00</span
      >
      <span v-if="sale !== price" class="ml-2">€{{ sale }}.00</span>
    </div>
  </div>
</template>

<style scoped>
.red-badge {
  border-radius: 0.375rem;
  z-index: 10;
  --tw-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--tw-bg-opacity));
  font-size: 0.75rem;
  letter-spacing: -0.025em;
  line-height: 1.5rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  --tw-text-opacity: 1;
  background: #000 linear-gradient(0deg, #f87171, #f87171);
  color: rgb(255 255 255);
}
</style>
