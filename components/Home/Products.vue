<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
  <div class="relative product-card">
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
    <NuxtLink to="/" class="mb-2 hover:text-purple-600 font-light"
      >Hoodie Ninja</NuxtLink
    >
    <div class="flex font-semibold text-sm">
      <span class="text-gray-300 line-through font-normal">€50.00</span
      ><span class="ml-2">€45.00</span>
    </div>
  </div>
</template>
