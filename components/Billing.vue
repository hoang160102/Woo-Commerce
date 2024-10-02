<script lang="ts" setup>
import { useBillingStore } from '~/store/billing';

interface Country {
  name: {
    common: string;
  };
}

const { data, status, error, refresh, clear } = useAsyncData<Country[]>(
  "countries",
  () => $fetch<Country[]>("https://restcountries.com/v3.1/all")
);
console.log(data.value)

const countriesData = (data.value || []).map((country: Country) => {
  return country.name.common;
});
const countries = countriesData.sort();
const userCookie: any = useCookie('currentUser')
const billingStore = useBillingStore()
const { updateBill } = billingStore
const firstName = ref<string>('')
const lastName = ref<string>('')
const address1 = ref<string>('')
const address2 = ref<string>('')
const city = ref<string>('')
const state = ref<string>('')
const country = ref<string>('')
const postal = ref<string>('')
const phone = ref<string>('')
const isSubmit = ref<boolean>(false)
const isFormValid = computed(() => {
  return (
    firstName.value.length > 0 && 
    lastName.value.length > 0 &&
    address1.value.length > 0 &&
    city.value.length > 0 &&
    postal.value.length > 0
  )
})
const updateBilling = async () => {
  isSubmit.value = true
  if (isFormValid) {
    updateBill({
      firstName: firstName.value,
      lastName: lastName.value,
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      state: state.value,
      country: country.value,
      postal: postal.value,
      phone: phone.value
    }, userCookie.value.billing)
  }
}
</script>
<template>
  <form @submit.prevent="updateBilling" class="bg-white rounded-lg shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl mb-4 font-semibold col-span-full">Billing</h3>
      <div class="w-full flex flex-col">
        <label for="first-name">First Name</label>
        <input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="John"
          autocomplete="given-name"
          type="text"
        />
        <span v-if="isSubmit && firstName.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col">
        <label for="last-name">Last Name</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="Doe"
          autocomplete="family-name"
          type="text"
        />
        <span v-if="isSubmit && lastName.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label for="address1">Address 1</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="O'Connell Street 47"
          autocomplete="street-address"
          type="text"
        />
        <span v-if="isSubmit && address1.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label for="address2">Address 2 (Optional)</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="Apartment, studio, or floor"
          autocomplete="address-line2"
          type="text"
        />
      </div>
      <div class="w-full flex flex-col">
        <label for="city">City</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="New York"
          autocomplete="locality"
          type="text"
        />
        <span v-if="isSubmit && city.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col">
        <label for="state">State (Optional)</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          type="text"
          placeholder="State"
        />
      </div>
      <div class="w-full flex flex-col">
        <label for="country">Country</label>
        <select
          class="px-4 py-3 bg-white rounded-lg bg-gray-100 outline-none border"
        >
          Select Country
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
      <div class="w-full flex flex-col">
        <label for="zip">Postal Code / ZIP</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="10001"
          autocomplete="postal-code"
          type="text"
        />
        <span v-if="isSubmit && postal.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label for="phone">Phone (Optional)</label
        ><input
          class="bg-gray-100 bg-white px-4 py-3 rounded-lg outline-none border"
          placeholder="+1 234 567 8901"
          autocomplete="tel"
          type="tel"
        />
      </div>
    </div>
    <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">
      <button
        @click="updateBilling"
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        <!----><span>Update Details</span>
      </button>
    </div>
  </form>
</template>
