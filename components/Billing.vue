<script lang="ts" setup>
interface User {
  _id: string,
  billing: any
}
import { useBillingStore } from '~/store/billing';
const { countriesData } = useFetchCountries()
const props = defineProps<{
  currentUser: User
}>()
const billingStore = useBillingStore();
const { updateBill, getBill } = billingStore;
const firstName = ref<string>('');
const lastName = ref<string>('');
const address1 = ref<string>('');
const address2 = ref<string>('');
const city = ref<string>('');
const state = ref<string>('');
const country = ref<string>('');
const postal = ref<string>('');
const phone = ref<string>('');
const isSubmit = ref<boolean>(false);

const isFormValid = computed(() => {
  return (
    firstName.value.length > 0 && 
    lastName.value.length > 0 &&
    address1.value.length > 0 &&
    city.value.length > 0 &&
    postal.value.length > 0
  );
});

const getBilling = async () => {
  await getBill(props.currentUser.billing)
  if (billingStore.billingById) {
    firstName.value = billingStore.billingById.firstName
    lastName.value = billingStore.billingById.lastName
    address1.value = billingStore.billingById.address1
    address2.value = billingStore.billingById.address2
    city.value = billingStore.billingById.city
    state.value = billingStore.billingById.state
    postal.value = billingStore.billingById.postal
    phone.value = billingStore.billingById.phone
  }
}
getBilling()

const updateBilling = async () => {
  isSubmit.value = true;
  if (isFormValid.value) {
    await updateBill({
      firstName: firstName.value,
      lastName: lastName.value,
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      state: state.value,
      country: country.value,
      postal: postal.value,
      phone: phone.value
    }, props.currentUser.billing);
  }
};
</script>
<template>
  <form @submit.prevent="updateBilling" class="bg-white rounded-lg shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl mb-4 font-semibold col-span-full">Billing</h3>
      <div class="w-full flex flex-col">
        <label for="first-name">First Name</label>
        <input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="John"
          autocomplete="given-name"
          type="text"
          v-model="firstName"
        />
        <span v-if="isSubmit && firstName.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col">
        <label for="last-name">Last Name</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="Doe"
          autocomplete="family-name"
          type="text"
          v-model="lastName"
        />
        <span v-if="isSubmit && lastName.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label for="address1">Address 1</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="O'Connell Street 47"
          autocomplete="street-address"
          type="text"
          v-model="address1"
        />
        <span v-if="isSubmit && address1.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label for="address2">Address 2 (Optional)</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="Apartment, studio, or floor"
          autocomplete="address-line2"
          type="text"
          v-model="address2"
        />
      </div>
      <div class="w-full flex flex-col">
        <label for="city">City</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="New York"
          autocomplete="locality"
          type="text"
          v-model="city"
        />
        <span v-if="isSubmit && city.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col">
        <label for="state">State (Optional)</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          type="text"
          placeholder="State"
          v-model="state"
        />
      </div>
      <div class="w-full flex flex-col">
        <label for="country">Country</label>
        <select
          v-model="country"
          class="px-4 py-3  rounded-lg bg-gray-100 outline-none border"
        >
          Select Country
          <option v-for="country in countriesData" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
      <div class="w-full flex flex-col">
        <label for="zip">Postal Code / ZIP</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="10001"
          autocomplete="postal-code"
          type="text"
          v-model="postal"
        />
        <span v-if="isSubmit && postal.length === 0" class="text-red-500 mt-1 text-sm">This field is required</span>
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label for="phone">Phone (Optional)</label
        ><input
          class="bg-gray-100  px-4 py-3 rounded-lg outline-none border"
          placeholder="+1 234 567 8901"
          autocomplete="tel"
          type="tel"
          v-model="phone"
        />
      </div>
    </div>
    <div class=" backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        <!----><span>Update Details</span>
      </button>
    </div>
  </form>
</template>
