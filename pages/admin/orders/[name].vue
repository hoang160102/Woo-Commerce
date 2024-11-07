<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "auth-admin"
});
</script>

<template>
  <section class="mt-4">
    <div class="flex w-full flex-col md:flex-row">
      <div class="left-content w-2/3">
        <div class="all-item p-4 border rounded-lg">
          <div class="title bg-gray-100 font-semibold px-3 py-2 rounded-lg">
            All item
          </div>
          <div class="products" v-for="n in 3" :key="n">
            <div
              class="flex w-full rounded-lg p-3 justify-between align-center"
            >
              <img src="../../../public/products/products.png" alt="" />
              <div class="name">
                <div class="text-sm text-gray-600">Product Name</div>
                <div>Kristin Watson</div>
              </div>
              <div class="Quanity">
                <div class="text-sm text-gray-600">Quanity</div>
                <div>1</div>
              </div>
              <div class="Price">
                <div class="text-sm text-gray-600">Price</div>
                <div>$123</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-total mt-4 p-4 border rounded-lg">
          <div class="flex w-full rounded-lg p-3 justify-between align-center">
            <div class="font-semibold">Cart Totals</div>
            <div class="font-semibold">Price</div>
          </div>
          <div class="flex w-full rounded-lg p-3 justify-between align-center">
            <div class="">Subtotal:</div>
            <div class="">$70.13</div>
          </div>
          <div class="flex w-full rounded-lg p-3 justify-between align-center">
            <div class="">Shipping:</div>
            <div class="">$10.00</div>
          </div>
          <div class="flex w-full rounded-lg p-3 justify-between align-center">
            <div class="font-semibold">Total price:</div>
            <div class="font-semibold">$90.58</div>
          </div>
        </div>
      </div>
      <div class="right-content w-1/3 ml-8">
        <div class="order-summary p-4 rounded-lg border">
          <div class="font-semibold">Summary</div>
          <div class="info flex">
            <div>
              <div class="my-2">Order ID</div>
              <div class="my-2">Date</div>
              <div class="my-2">Total</div>
            </div>
            <div class="ml-20">
              <div class="font-semibold my-2">#192847</div>
              <div class="font-semibold my-2">20 Nov 2023</div>
              <div class="font-semibold my-2">$948.5</div>
            </div>
          </div>
        </div>
        <div class="shipping-address my-5 rounded-lg border p-4">
          <div class="font-semibold mb-3">Shipping Address</div>
          <div class="address text-sm text-gray-700">3517 W. Gray St. Utica, Pennsylvania 57867</div>
        </div>
        <div class="payment-method my-5 rounded-lg border p-4">
          <div class="font-semibold mb-3">Payment Method</div>
          <div class="text-sm text-gray-700">
            Pay on Delivery (Cash/Card). Cash on delivery (COD) available.
            Card/Net banking acceptance subject to device availability.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  width: 60px;
}
.products:nth-child(odd) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
}
.products:not(:first-child):hover {
  background-color: #edf1f5;
  cursor: pointer;
}
</style>
