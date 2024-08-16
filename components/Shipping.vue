<script setup lang="ts">
interface Country {
  name: {
    common: string;
  };
}

const { data, status, error, refresh, clear } = await useAsyncData<Country[]>(
  "countries",
  () => $fetch<Country[]>("https://restcountries.com/v3.1/all")
);

const countriesData = (data.value || []).map((country: Country) => {
  return country.name.common;
});
const countries = countriesData.sort();
</script>
<template>
  <form class="bg-white rounded-lg shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl mb-4 font-semibold col-span-full">Shipping</h3>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="first-name">FIRST NAME</label>
        <input
          type="text"
          placeholder="John"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="last-name">LAST NAME</label>
        <input
          type="text"
          placeholder="Doe"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="phone">PHONE</label>
        <input
          type="text"
          placeholder="+1 234 567 890"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full text-gray-400 flex flex-col">
        <label class="text-xs mb-2" for="first-name">COMPANY (Optional)</label>
        <input
          type="text"
          placeholder="Company Name"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="company">Address 1</label>
        <input
          type="text"
          placeholder="Address"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full text-gray-400 flex flex-col">
        <label class="text-xs mb-2" for="address-2">Address 2 (Optional)</label>
        <input
          type="text"
          placeholder="Address"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="city">CITY</label>
        <input
          type="text"
          placeholder="London"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="state">State (Optional)</label>
        <input
          type="text"
          placeholder="State"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-xs mb-2" for="Country">COUNTRY</label>
        <select class="px-4 py-3 rounded-lg bg-gray-100 outline-none border">
          Select Country
          <option v-for="country in countries" :key="country" :value="country">
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
        />
      </div>
      <div class="w-full flex flex-col col-span-full">
        <label class="text-xs mb-2" for="Email">Email</label>
        <input
          type="text"
          placeholder="Email"
          class="bg-gray-100 px-4 py-3 rounded-lg outline-none border"
        />
      </div>
    </div>
    <div class="p-8">
      <h3 class="text-xl mb-4 font-semibold col-span-full">Billing</h3>
      <Billing></Billing>
    </div>
    <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        <!----><span>Update Details</span>
      </button>
    </div>
  </form>
</template>
