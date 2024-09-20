<script lang="ts" setup>
import { useCollectionStore } from "~/store/collections";
definePageMeta({
  layout: "admin",
});
const route: any = useRoute();
const store = useCollectionStore();
const cate = ref<object>({});
const { getCollectionById, updateCollection } = store;
const name = ref<string>("");
const saveData = async (data: any) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("image", data.file);
  await updateCollection(route.params.id, formData);
};
watch(
  () => store.collectionById,
  (newVal: any) => {
    cate.value = newVal?.cate || {};
  },
  { immediate: true }
);
async function fetchCate() {
  await getCollectionById(route.params.id);
  cate.value = store.collectionById?.cate;
  name.value = cate.value.name;
}
fetchCate();
</script>
<template>
  <AdminForm
    @submit="saveData"
    v-if="cate.name"
    :isUpdate="true"
    :initialData="{ name: cate?.name, file: null }"
    page="Collection"
  >
  </AdminForm>
</template>
