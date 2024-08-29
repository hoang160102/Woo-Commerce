import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast()
export const useCategoryStore = defineStore("category-store", () => {
  const categoryList = ref<{ categories: unknown[] } | null>({ categories: [] });
  async function getAllCategories() {
    try {
      const { data } = await useFetch("/api/categories/get");
      categoryList.value = data.value
    } catch (err) {
      console.log(err);
    }
  }
  async function createCategory(newCate: object) {
    console.log(newCate)
    try {
      const data = await useFetch("/api/categories/post", {
        method: 'post',
        body: newCate
      })
      toast.success('Created Successfully')
    }
    catch(err) {
      toast.error('Created failed')
    }
  }
  return { createCategory, getAllCategories, categoryList }
});
