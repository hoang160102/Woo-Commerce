<script setup lang="ts">
import { useShippingStore } from "~/store/shipping";
interface User {
  _id: string;
  shipping: any;
}
const { countriesData } = useFetchCountries();
const props = defineProps<{
  currentUser: User;
}>();
const shippingStore = useShippingStore();
const { getShip, updateShip } = shippingStore;
const firstName = ref<string>("");
const lastName = ref<string>("");
const address1 = ref<string>("");
const address2 = ref<string>("");
const city = ref<string>("");
const state = ref<string>("");
const country = ref<string>("");
const postal = ref<string>("");
const phone = ref<string>("");
const email = ref<string>("");
const company = ref<string>("");
const isSubmit = ref<boolean>(false);
const isFormValid = computed(() => {
  return (
    firstName.value.length > 0 &&
    lastName.value.length > 0 &&
    phone.value.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) &&
    address1.value.length > 0 &&
    city.value.length > 0 &&
    country.value.length > 0 &&
    postal.value.length > 0 &&
    email.value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)
  );
});
const getShipping = async () => {
  await getShip(props.currentUser.shipping);
  if (shippingStore.shippingById) {
    firstName.value = shippingStore.shippingById.firstName;
    lastName.value = shippingStore.shippingById.lastName;
    address1.value = shippingStore.shippingById.address1;
    address2.value = shippingStore.shippingById.address2;
    country.value = shippingStore.shippingById.country
    city.value = shippingStore.shippingById.city;
    state.value = shippingStore.shippingById.state;
    postal.value = shippingStore.shippingById.postal;
    phone.value = shippingStore.shippingById.phone;
    company.value = shippingStore.shippingById.company;
    email.value = shippingStore.shippingById.email;
  }
};
getShipping();

const updateShipping = async () => {
  isSubmit.value = true;
  if (isFormValid.value) {
    await updateShip(
      {
        firstName: firstName.value,
        lastName: lastName.value,
        address1: address1.value,
        address2: address2.value,
        city: city.value,
        state: state.value,
        country: country.value,
        postal: postal.value,
        phone: phone.value,
        email: email.value,
        company: company.value,
      },
      props.currentUser.shipping
    );
  }
};
</script>
<template>
  <form @submit.prevent="updateShipping" class="bg-white rounded-lg shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl mb-4 font-semibold col-span-full">Shipping</h3>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="first-name">FIRST NAME</label>
        <input
          type="text"
          placeholder="John"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="firstName"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="last-name">LAST NAME</label>
        <input
          type="text"
          placeholder="Doe"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="lastName"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="phone">PHONE</label>
        <input
          type="text"
          placeholder="+1 234 567 890"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="phone"
        />
      </div>
      <div class="w-full text-gray-400 flex flex-col">
        <label class="text-xs mb-2" for="first-name">COMPANY (Optional)</label>
        <input
          type="text"
          placeholder="Company Name"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="company"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="company">Address 1</label>
        <input
          type="text"
          placeholder="Address"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="address1"
        />
      </div>
      <div class="w-full text-gray-400 flex flex-col">
        <label class="text-xs mb-2" for="address-2">Address 2 (Optional)</label>
        <input
          type="text"
          placeholder="Address"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="address2"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="city">CITY</label>
        <input
          type="text"
          placeholder="London"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="city"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="state">State (Optional)</label>
        <input
          type="text"
          placeholder="State"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="state"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="Country">COUNTRY</label>
        <select
          v-model="country"
          class="px-4 py-3 rounded-lg bg-gray-100 outline-none border"
        >
          Select Country
          <option
            v-for="country in countriesData"
            :key="country"
            :value="country"
          >
            {{ country }}
          </option>
        </select>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="zip">Postal Code / ZIP</label>
        <input
          type="text"
          placeholder="10001"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="postal"
        />
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label class="text-xs mb-2" for="Email">Email</label>
        <input
          type="text"
          placeholder="Email"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
          v-model="email"
        />
      </div>
    </div>
    <div
      class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg"
    >
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        <!----><span>Update Details</span>
      </button>
    </div>
  </form>
</template>
