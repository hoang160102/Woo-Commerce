import { defineStore } from "pinia";
export const useUsersStore = defineStore("users-store", () => {
  const usersList = ref<object>({});
  async function getAllUsers() {
    try {
      const { data } = await useFetch("/api/users/get");
      usersList.value = data.value
    } catch (err) {
      console.log(err);
    }
  }
  return { usersList, getAllUsers }
});
