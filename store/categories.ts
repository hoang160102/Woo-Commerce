import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useCategoryStore = defineStore("category-store", () => {
  const categoryList = ref<object>({})
  const categoryById = ref<object>({});
  async function getAllCategories() {
    try {
      const { data } = await useFetch("/api/categories/get");
      categoryList.value = data.value;
    } catch (err) {
      console.log(err);
    }
  }
  async function createCategory(newCate: object) {
    try {
      const data = await $fetch("/api/categories/post", {
        method: "post",
        body: newCate,
      });
      toast.success("Created Successfully");
    } catch (err) {
      toast.error("Created failed");
    }
  }
  async function deleteCategory(id: string) {
    try {
      $fetch(`/api/categories/${id}`, {
        method: "delete",
      });
      toast.success("Deleted Successfully");
    } catch (err) {
      toast.error("Deleted failed");
    }
  }
  async function getCateById(id: string) {
    try {
      const { data } = await useFetch(`/api/categories/${id}`);
      categoryById.value = data.value;
    } catch (err) {
      console.log(err);
    }
  }
  const updateCategory = async (id: string, updateCate: object) => {
    try {
      const data = await $fetch(`/api/categories/${id}`, {
        method: "put",
        body: updateCate,
      });
      toast.success('Updated successfully')
    } catch (err) {
      toast.error("Updated Failed");
    }
  };
  return {
    createCategory,
    getAllCategories,
    categoryList,
    deleteCategory,
    getCateById,
    categoryById,
    updateCategory
  };
});
