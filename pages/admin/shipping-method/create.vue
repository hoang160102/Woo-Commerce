<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import { useShippingMethodStore } from "~/store/shipping-method";
definePageMeta({
  layout: "admin",
  middleware: "auth-admin"
});
const shippingMethodStore = useShippingMethodStore();
const { createShippingMethod } = shippingMethodStore;
const name = ref<string>("");
const price = ref<number>(0);
const isLoading = ref<boolean>(false);
const isSubmit = ref<boolean>(false);
const isFormValid = computed(() => {
  return name.value.length > 0 && price.value > 0;
});
const submitData = async () => {
  event?.preventDefault();
  isLoading.value = true;
  isSubmit.value = true;
  if (isFormValid.value) {
    await createShippingMethod({
      name: name.value,
      price: price.value,
    });
    isSubmit.value = false;
  }
  name.value = ''
  price.value = 0
  isLoading.value = false;
};
</script>

<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">
      Add Shipping Method
    </div>
    <form class="grid grid-cols-1 gap-4">
      <div class="rounded-lg border px-5 py-3">
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label
            for="name"
            class="font-semibold w-full p-0 md:w-[250px] text-xl mb-3"
            >Shipping Method</label
          >
          <div class="flex-grow w-full m-0 md:ml-20">
            <input
              class="outline-none w-full px-4 py-2 rounded-md border"
              placeholder="Enter Shipping Method"
              aria-required="true"
              type="text"
              name="text"
              v-model="name"
            />
            <div
              v-if="name.length === 0 && isSubmit"
              class="text-red-500 text-sm mt-1"
            >
              This input is required
            </div>
          </div>
        </div>
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label
            for="name"
            class="font-semibold w-full md:w-[250px] p-0 text-xl mb-3"
            >Price</label
          >
          <div class="flex-grow w-full m-0 md:ml-20">
            <div class="rounded-md border w-full flex align-center">
              <input
                class="outline-none w-[95%] px-4 py-2"
                tabindex="0"
                aria-required="true"
                type="number"
                name="text"
                v-model="price"
                min="0"
              />
              <div class="">$</div>
            </div>
            <div
              v-if="price === 0 && isSubmit"
              class="text-red-500 text-sm mt-1"
            >
              The price must be greater than 0
            </div>
          </div>
        </div>
        <button
          @click="submitData"
          class="w-[200px] flex justify-center float-right bg-blue-500 text-white font-semibold mt-8 text-xl py-3 rounded-lg outline-none"
        >
          Save
          <ProgressSpinner class="ml-6" v-if="isLoading"></ProgressSpinner>
        </button>
      </div>
    </form>
  </section>
</template>
