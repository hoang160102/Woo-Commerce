<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useShippingMethodStore } from "~/store/shipping-method";

interface ShippingMethod {
  name: string;
  price: number;
}
const shippingMethodStore = useShippingMethodStore();
const { getAllShippingMethods } = shippingMethodStore;
const allMethods = ref<ShippingMethod[]>([]);
watchEffect(async () => {
  await getAllShippingMethods();
  allMethods.value = shippingMethodStore.allShippingMethods;
});
const shippingMethod = defineModel<ShippingMethod>();
const selectMethod = (method: ShippingMethod) => {
  shippingMethod.value = method;
};
</script>
<template>
  <div class="shipping-methods mt-5">
    <h2 class="w-full mb-3 text-2xl font-semibold">Select Shipping Method</h2>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="ship in allMethods">
        <div
          :class="{ 'active-option': shippingMethod === ship }"
          @click="selectMethod(ship)"
          class="flex cursor-pointer items-center bg-white px-4 py-3 justify-between rounded-lg option"
        >
          <div>
            <div class="text-sm leading-tight text-gray-500">
              {{ ship.name }}
            </div>
            <div class="font-semibold text-gray-600">
              {{ ship.price.toFixed(2) }}$
            </div>
          </div>
          <div
            v-if="shippingMethod === ship"
            class="check w-[20px] h-[20px] flex justify-center align-center bg-violet-400 rounded-full"
          >
            <FontAwesomeIcon :icon="faCheck" class="fa-xs text-white" />
          </div>
        </div>
      </div>
      <!-- <div
        @click="selectMethod('express')"
        :class="{ 'active-option': shippingMethod === 'express'}"
        class="flex cursor-pointer items-center bg-white px-4 py-3 justify-between option rounded-lg"
      >
        <div>
          <div class="text-sm leading-tight text-gray-500">
            Express Shipping
          </div>
          <div class="font-semibold text-gray-600">€25.00</div>
        </div>
        <div
          v-if="shippingMethod === 'express'"
          class="check w-[20px] h-[20px] flex justify-center align-center bg-violet-400 rounded-full"
        >
          <FontAwesomeIcon :icon="faCheck" class="fa-xs text-white" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.active-option {
  border: 1px solid rgb(167 139 250);
}
</style>
