<script lang="ts" setup>
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
definePageMeta({
  layout: "admin",
});
</script>
<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <NuxtLink to="/admin/categories/create">
        <button class="px-4 py-3 rounded-lg bg-violet-600 text-white">
          <FontAwesomeIcon :icon="faPlus" />
          Create new category
        </button>
      </NuxtLink>
      <input
        type="text"
        placeholder="Search"
        class="outline-none ml-10 px-4 border rounded-lg"
      />
    </div>
    <ClientOnly>
      <table class="w-full">
        <tr>
          <th class="pb-5">ID</th>
          <th class="pb-5">Name</th>
          <th class="pb-5">Image</th>
          <th class="pb-5">Date of Created</th>
          <th class="pb-5">Quanity</th>
          <th class="pb-5">Action</th>
        </tr>
        <tr v-for="n in 10" :key="n">
          <td class="text-center py-3">33</td>
          <td class="text-center py-3">Clothing</td>
          <td class="flex justify-center py-3 align-center">
            <img
              class="w-[60px] aspect-square"
              src="../../../public/categories/clothing.png"
              alt=""
            />
          </td>
          <td class="text-center py-3">2/3/2024</td>
          <td class="text-center py-3">987</td>
          <td class="text-center py-3">
            <FontAwesomeIcon :icon="faEllipsis" />
          </td>
        </tr>
      </table>
    </ClientOnly>
  </section>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
}
tr:not(:first-child):hover {
  background-color: #edf1f5;
  cursor: pointer;
}
tr td:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

tr td:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
</style>
