import { defineStore } from "pinia";
export const useUsersStore = defineStore("users-store", () => {
  const usersList = ref<object[]>([]);
  async function userLogin() {
    const data = await useFetch("/api/users/auth/login");
  }
});
