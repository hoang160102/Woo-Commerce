import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useCollectionStore = defineStore("collection-store", () => {
  const collectionsList = ref<object>({});
  const collectionById = ref<object>({});
  const getAllCollections = async () => {
    try {
      const { data } = await useFetch("/api/collections/get");
      collectionsList.value = data.value;
    } catch (err) {
      console.log(err);
    }
  };
  const createCollection = async (newData: object) => {
    try {
      const data = await useFetch("/api/collections/post", {
        method: "post",
        body: newData,
      });
      toast.success("Created Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Created failed");
    }
  };
  const deleteCollection = async (id: string) => {
    try {
      const data = await $fetch(`/api/collections/${id}`, {
        method: "delete",
      });
      toast.success("Deleted Successfully");
    } catch (err) {
      toast.error("Deleted Failed");
    }
  };
  const getCollectionById = async (id: string) => {
    try {
      const { data } = await useFetch(`/api/collections/${id}`);
      collectionById.value = data.value;
    } catch (err) {
      console.log(err);
    }
  };
  const updateCollection = async (id: string, updateCollect: object) => {
    try {
      const data = await $fetch(`/api/collections/${id}`, {
        method: 'put',
        body: updateCollect
      })
      toast.success('Updated successfully')
    }
    catch (err) {
      toast.error('Updated failed')
    }
  }
  return {
    collectionsList,
    collectionById,
    getAllCollections,
    createCollection,
    deleteCollection,
    getCollectionById,
    updateCollection
  };
});
