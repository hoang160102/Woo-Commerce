import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", () => {
  const userAuth = ref<object>();
  const token = ref<string>('');
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
  async function userLogin(user: object) {
    try {
      const { data, error } = await $fetch("/api/users/auth/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(error)
    }
    catch(err) {
      console.log(err)
    }
  }
  return { userRegister, userLogin };
});
