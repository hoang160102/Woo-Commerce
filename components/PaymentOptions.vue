<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
// import { faPaypal } from "@fortawesome/free-brands-svg-icons";
const paymentMethod = defineModel<string>();
const selectMethod = (method: string): void => {
  paymentMethod.value = method;
};
</script>

<template>
  <div class="payment-meothods mt-5">
    <h2 class="w-full mb-3 text-2xl font-semibold">Select Payment Method</h2>
    <div class="grid grid-cols-2 gap-4">
      <div
        :class="{ 'active-option': paymentMethod === 'credit' }"
        @click="selectMethod('credit')"
        class="flex cursor-pointer items-center bg-white px-4 py-5 justify-between rounded-lg option"
      >
        <div class="flex align-center">
          <FontAwesomeIcon :icon="faCreditCard" />
          <div class="text-base ml-2 leading-tight text-gray-500">
            Credit Card
          </div>
        </div>
        <div
          v-if="paymentMethod === 'credit'"
          class="check w-[20px] h-[20px] flex justify-center align-center bg-violet-400 rounded-full"
        >
          <FontAwesomeIcon :icon="faCheck" class="fa-xs text-white" />
        </div>
      </div>
      <!-- <div
        :class="{ 'active-option': paymentMethod === 'paypal' }"
        @click="selectMethod('paypal')"
        class="flex cursor-pointer items-center bg-white px-4 py-3 justify-between rounded-lg option"
      >
        <div class="flex align-center">
          <FontAwesomeIcon :icon="faPaypal" />
          <div class="text-base leading-tight ml-2 text-gray-500">Paypal</div>
        </div>
        <div
          v-if="paymentMethod === 'paypal'"
          class="check w-[20px] h-[20px] flex justify-center align-center bg-violet-400 rounded-full"
        >
          <FontAwesomeIcon :icon="faCheck" class="fa-xs text-white" />
        </div>
      </div> -->
      <div
        :class="{ 'active-option': paymentMethod === 'cash' }"
        @click="selectMethod('cash')"
        class="flex cursor-pointer items-center bg-white px-4 py-5 justify-between rounded-lg option"
      >
        <div class="flex align-center">
          <FontAwesomeIcon :icon="faMoneyBill1" />
          <div class="text-base leading-tight ml-2 text-gray-500">Cash</div>
        </div>
        <div
          v-if="paymentMethod === 'cash'"
          class="check w-[20px] h-[20px] flex justify-center align-center bg-violet-400 rounded-full"
        >
          <FontAwesomeIcon :icon="faCheck" class="fa-xs text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-option {
    border: 1px solid rgb(167 139 250);
}
</style>

