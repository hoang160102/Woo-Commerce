<script lang="ts" setup>
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
          Add New Product
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
        <tr class="bg-gray-100">
          <th class="py-3">Product</th>
          <th class="py-3">Product ID</th>
          <th class="py-3">Price</th>
          <th class="py-3">Sale</th>
          <th class="py-3">Quantity</th>
          <th class="py-3">Category</th>
          <th class="py-3">Action</th>
        </tr>
        <tr v-for="n in 10" :key="n">
          <td class="text-center py-3">Woo Hoodies</td>
          <td class="text-center py-3">#123</td>
          <td class="text-center py-3">30$</td>
          <td class="text-center py-3">30$</td>
          <td class="text-center py-3">1230</td>
          <td class="text-center py-3">Hoodies, Shirt</td>
          <td class="text-center py-3">
            <FontAwesomeIcon :icon="faPenToSquare" class="cursor-pointer" />
            <FontAwesomeIcon :icon="faTrashCan" class="cursor-pointer ml-3" />
          </td>
        </tr>
      </table>
    </ClientOnly>
  </section>
</template>

<style scoped>
tr td:first-child, tr th:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

tr td:last-child, tr th:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
table tr:nth-child(even) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
}
tr:not(:first-child):hover {
  background-color: #edf1f5;
  cursor: pointer;
}
</style>