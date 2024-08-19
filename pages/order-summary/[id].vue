<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
  <main
    class="w-full bg-gray-100 min-h-[600px] flex p-4 text-gray-800 md:bg-white md:rounded-xl md:mx-auto md:shadow-lg md:my-24 md:mt-8 md:max-w-3xl md:p-16 flex-col"
  >
    <div class="title align-center flex">
      <button class="px-3 py-1 border rounded-lg">
        <FontAwesomeIcon :icon="faAngleLeft" class="fa-sm" />
      </button>
      <div class="text-xl ml-4 font-semibold">Order Summary</div>
    </div>
    <hr class="my-8" />
    <div class="flex w-full">
      <div class="flex w-full justify-between">
        <div>
          <div class="mb-2 text-xs text-gray-400 uppercase">Order</div>
          <div class="leading-none">#2668</div>
        </div>
        <div>
          <div class="mb-2 text-xs text-gray-400 uppercase">Date</div>
          <div class="leading-none">August 12, 2024</div>
        </div>
        <div>
          <div class="mb-2 text-xs text-gray-400 uppercase">Status</div>
          <span class="order-FAILED order-status">FAILED</span>
        </div>
        <div>
          <div class="mb-2 text-xs text-gray-400 uppercase">Payment Method</div>
          <div class="leading-none">Credit Card</div>
        </div>
      </div>
    </div>
    <hr class="my-8" />
    <div class="product w-full">
      <div class="flex w-full justify-between">
        <div class="info-product align-center flex">
          <img
            class="w-[64px] rounded-lg"
            src="../../public/products/t-shirt.avif"
            alt=""
          />
          <div class="name ml-7">T-Shirt</div>
        </div>
        <div class="qty-price align-center flex">
          <div class="qty mr-7">Qty. 1</div>
          <div class="price">$18.00</div>
        </div>
      </div>
    </div>
    <hr class="my-8" />
    <div class="subtotal my-1 flex justify-between">
      <div>Subtotal</div>
      <div>$18.00</div>
    </div>
    <div class="tax flex my-1 justify-between">
      <div>Tax</div>
      <div>$0.00</div>
    </div>
    <div class="shipping my-1 flex justify-between">
      <div>Shipping</div>
      <div>$10.00</div>
    </div>
    <hr class="my-8" />
    <div class="total my-1 flex justify-between">
      <div>Total</div>
      <div>$18.00</div>
    </div>
  </main>
</template>

<style scoped>
.order-status {
  border-radius: 0.375rem;
  border-width: 1px;
  display: inline-block;
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  line-height: 1;
  padding: 0.375rem;
}
</style>
