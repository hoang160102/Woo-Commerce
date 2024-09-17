<script lang="ts" setup>
import { useCollectionStore } from "~/store/collections";
definePageMeta({
  layout: "admin",
});
const { createCollection } = useCollectionStore();
const submitData = async (data: any) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('image', data.file)
  await createCollection(formData)
};
</script>  

<template>
  <AdminForm
    @submit="submitData"
    :isUpdate="false"
    :initialData="{ name: '', file: null }"
    page="Collection"
  ></AdminForm>
</template>
