import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast()
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
      console.log(data)
      toast.success('Register Successfully')
      setTimeout(() => {
        navigateTo('/login')
      }, 2000)
    } catch (err: any) {
      if (err.response && err.response._data) {
        toast.error(err.response._data.statusMessage || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }
  async function userLogin(user: object) {
    try {
      const data = await $fetch("/api/users/auth/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
    catch(err) {
      console.log(err)
    }
  }
  return { userRegister, userLogin };
});
