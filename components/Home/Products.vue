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
    <span v-if="sale !== price" class="red-badge absolute top-2 right-2"
      >-{{ Math.floor(((price - sale) / price) * 100) }} %</span
    >
    <NuxtLink to="/">
      <img class="rounded-lg" src="../../public/products/products.png" alt="" />
    </NuxtLink>
    <div class="py-2">
      <NuxtRating
        :readonly="true"
        :ratingValue="props.rating"
        activeColor="#ffd700"
      ></NuxtRating>
    </div>
    <NuxtLink to="/" class="mb-2 hover:text-purple-600 font-light">{{
      name
    }}</NuxtLink>
    <div class="flex font-semibold text-sm">
      <span
        :class="[
          {
            'line-through': sale !== price,
            'text-gray-400': sale !== price,
            'text-black': sale === price,
            'font-normal': sale !== price,
          },
        ]"
        >€{{ price }}.00</span
      >
      <div v-if="sale !== price" class="ml-2">€{{ sale }}.00</div>
    </div>
  </div>
</template>

<style scoped>
.red-badge {
  border-radius: 0.375rem;
  z-index: 5;
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
