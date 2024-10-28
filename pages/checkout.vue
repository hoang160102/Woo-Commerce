<script lang="ts" setup>
const paymentMethod = ref<string>('')
const shippingMethod = ref<string>('')
const currentUser: any = useCookie('currentUser')
</script>
<template>
  <div class="flex flex-col bg-gray-100 min-h-[600px]">
    <form
      class="container mx-auto flex flex-wrap items-start gap-8 my-16 justify-evenly lg:gap-20"
    >
      <div class="grid w-full max-w-2xl gap-8 checkout-form lg:flex-1">
        <h2 class="w-full mb-3 text-2xl font-semibold">Billing Details</h2>
        <Billing :currentUser="currentUser"></Billing>
        <ShippingMethods v-model="shippingMethod"></ShippingMethods>
        <h1>{{ shippingMethod }}</h1>
        <PaymentOptions v-model="paymentMethod"></PaymentOptions>
        <h1>{{ paymentMethod }}</h1>
      </div>
      <OrderSummary></OrderSummary>
    </form>
  </div>
</template>
