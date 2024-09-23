import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
interface Users {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}
interface Data {
  email: string;
}
const toast = useToast();
export const useAuthStore = defineStore("auth-store", () => {
  async function userRegister(newUsers: Users) {
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
      toast.success("Register Successfully");
      setTimeout(() => {
        navigateTo("/verification");
      }, 2000);
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response._data) {
        toast.error(err.response._data.statusMessage || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }
  async function userLogin(user: object) {
    try {
      const data: any = await $fetch("/api/users/auth/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Login successfully");
      console.log(data.user)
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    } catch (err: any) {
      if (err.response && err.response._data) {
        toast.error(err.response._data.statusMessage || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }
  async function resendVerify(data: Data) {
    try {
      await $fetch("/api/users/auth/re-verify", {
        method: "post",
        body: JSON.stringify(data),
      });
      toast.success("Resend successfully. Check your email");
    } catch (err: any) {
      if (err.response && err.response._data) {
        toast.error(err.response._data.statusMessage || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }
  return { userRegister, userLogin, resendVerify };
});
