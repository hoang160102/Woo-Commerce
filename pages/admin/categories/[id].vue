<script lang="ts" setup>
import { useCategoryStore } from "~/store/categories";
definePageMeta({
  layout: "admin",
}); 
const route: any = useRoute();
const store = useCategoryStore();
const cate = ref<object>({});
const { getCateById, updateCategory } = store;
const name = ref<string>("");
const saveData = async (data: any) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("image", data.file);
  await updateCategory(route.params.id, formData)
};
watch(
  () => store.categoryById,
  (newVal: any) => {
    cate.value = newVal?.cate || {};
  },
  { immediate: true }
);
async function fetchCate() {
  await getCateById(route.params.id);
  cate.value = store.categoryById.cate;
  name.value = cate.value.name;
}
fetchCate();
</script>
<template>
  <AdminForm
    v-if="cate.name"
    @submit="saveData"
    :isUpdate="true"
    :initialData="{ name: cate.name, file: null }"
    page="Category"
  >
  </AdminForm>
</template>
