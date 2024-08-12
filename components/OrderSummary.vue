<script setup lang="ts">

</script>
<template>
  <div
    class="summary bg-white rounded-lg shadow-lg mb-8 w-full min-h-[280px] p-4 sm:p-8 relative md:max-w-md md:top-32 md:sticky"
  >
    <h2 class="text-xl font-semibold leading-none">Order Summary</h2>
    <div class="flex flex-col flex-1 mt-4 gap-4">
      <CartProducts v-for="n in 6" :key="n"></CartProducts>
    </div>
    <div class="total-cart p-4 my-4">
      <div class="subtotal flex justify-between">
        <span class="text-sm text-gray-500 font-medium">Subtotal</span>
        <span class="text-sm text-gray-500 font-semibold">€111.50</span>
      </div>
      <div class="shipping mt-1 flex justify-between">
        <span class="text-sm text-gray-500 font-medium">Shipping</span>
        <span class="text-sm text-gray-500 font-semibold">€11.50</span>
      </div>
      <div class="total mt-4 flex justify-between">
        <span class="text-sm text-gray-500 font-medium">Total</span>
        <span class="text-lg text-gray-600 font-semibold">€11.50</span>
      </div>
    </div>
    <button type="submit" class="bg-violet-400 w-full font-semibold rounded-lg shadow-md bg-violet-500 hover:bg-violet-700 text-lg px-7 text-white text-center py-3">Checkout</button>
  </div>
</template>
