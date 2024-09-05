<script lang="ts" setup>
import { useCategoryStore } from "~/store/categories";
const store = useCategoryStore();
const { getAllCategories } = store;
const allCategories = ref<object[]>([]);
async function fetchCategories() {
  await getAllCategories();
  allCategories.value = store.categoryList?.categories || [];
}

watch(
  () => store.categoryList,
  (newVal: any) => {
    console.log("Updated category list:", newVal);
    allCategories.value = newVal?.categories || [];
  },
  { immediate: true }
);
fetchCategories();
</script>

<template>
  <main class="main-content py-10 bg-gray-100">
    <div class="container w-full mx-auto xl:w-9/12">
      <div class="title text-3xl font-bold">Categories</div>
      <section
        class="grid grid-cols-2 gap-6 my-8 md:grid-cols-3 lg:gap-8 xl:grid-cols-4"
      >
        <HomeCategories
          v-for="cate in allCategories"
          :key="cate['_id']"
          :id="cate['_id']"
          :image="cate.image"
          :name="cate.name"
        ></HomeCategories>
      </section>
    </div>
  </main>
</template>
