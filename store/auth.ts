import { defineStore } from "pinia";

export const useUsersStore = defineStore("users-store", () => {
  const usersList = ref<object[]>([]);
  const userAuth = ref<object>();
  const token = ref<string>();
  async function userRegister(newUsers: object) {
    const createUsers = {
      ...newUsers,
    };
    try {
      const data = await $fetch("/api/users/auth/register", {
        method: "post",
        body: JSON.stringify(createUsers),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return { usersList, userRegister };
});
