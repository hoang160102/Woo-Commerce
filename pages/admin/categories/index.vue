<script lang="ts" setup>
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useCategoryStore } from "~/store/categories";
definePageMeta({
  layout: "admin",
});
const allCategories = ref<object[]>([]);
const { getAllCategories, categoryList } = useCategoryStore();
async function fetchCategories() {
  await getAllCategories();
  allCategories.value = categoryList?.categories;
}
fetchCategories();
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
    <table v-if="allCategories.length > 0" class="w-full">
      <tr>
        <th class="pb-5">Name</th>
        <th class="pb-5">Image</th>
        <th class="pb-5">Date of Created</th>
        <th class="pb-5">Date of Updated</th>
        <th class="pb-5">Action</th>
      </tr>
      <tr v-for="cate in allCategories" :key="cate['_id'].toString()">
        <td class="text-center py-3">Clothing</td>
        <td class="flex justify-center py-3 align-center">
          <img
            class="w-[60px] aspect-square"
            src="../../../public/category/albums.jpeg"
            :alt="cate.name"
          />
        </td>
        <td class="text-center py-3">{{ cate.createdAt }}</td>
        <td class="text-center py-3">{{ cate.updatedAt }}</td>
        <td class="text-center py-3">
          <FontAwesomeIcon :icon="faEdit" />
          <FontAwesomeIcon :icon="faTrashCan" class="ml-2" />
        </td>
      </tr>
    </table>
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
