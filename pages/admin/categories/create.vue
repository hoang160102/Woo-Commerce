<script setup lang="ts">
import { useCategoryStore } from "~/store/categories";

definePageMeta({
  layout: "admin",
  middleware: "auth-admin"
});
const { createCategory } = useCategoryStore();
const submitData = async (data: any) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('image', data.file)
  await createCategory(formData)
};
</script>

<template>
  <AdminForm
    @submit="submitData"
    :isUpdate="false"
    :initialData="{ name: '', file: null }"
    page="Category"
  ></AdminForm>
</template>
