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
      toast.success('Register Successfully')
      await useFetch('/api/users/auth/send-verification', {
        method: 'post'
      })
      setTimeout(() => {
        navigateTo('/verification')
      }, 2000)
    } catch (err: any) {
      console.log(err)
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
