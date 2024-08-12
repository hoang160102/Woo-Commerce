<script lang="ts" setup>
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
  <div class="grid w-full gap-4 lg:grid-cols-2">
    <div class="w-full flex flex-col">
      <label for="first-name">First Name</label>
      <input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="John"
        autocomplete="given-name"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col">
      <label for="last-name">Last Name</label
      ><input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="Doe"
        autocomplete="family-name"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col col-span-full">
      <label for="address1">Address 1</label
      ><input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="O'Connell Street 47"
        autocomplete="street-address"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col col-span-full">
      <label for="address2">Address 2 (Optional)</label
      ><input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="Apartment, studio, or floor"
        autocomplete="address-line2"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col">
      <label for="city">City</label
      ><input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="New York"
        autocomplete="locality"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col">
      <label for="state">State (Optional)</label
      ><input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
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
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="10001"
        autocomplete="postal-code"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col col-span-full">
      <label for="phone">Phone (Optional)</label
      ><input
        class="bg-white px-4 py-3 rounded-lg outline-none border"
        placeholder="+1 234 567 8901"
        autocomplete="tel"
        type="tel"
      />
    </div>
  </div>
</template>
