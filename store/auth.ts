import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
interface Users {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing_info_id: string;
  shipping_info_id: string;
  createAt: Date;
  updatedAt: Date;
  orders: string[];
  profile_img: string;
  wishList: string[];
  refreshToken: string;
  tokenExpire: Date;
  isVerified: boolean;
}
interface Data {
  email: string;
}
const toast = useToast();
export const useAuthStore = defineStore("auth-store", () => {
  const currentUser: any = useCookie("currentUser");
  async function userRegister(newUsers: any) {
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
      const data = await $fetch("/api/users/auth/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data && data["_doc"]) {
        currentUser.value = data["_doc"];
        const userCookie = useCookie("currentUser", {
          maxAge: 365 * 24 * 60 * 60,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        userCookie.value = JSON.stringify(currentUser.value);
      }
      if (data.accessToken && data.refreshToken) {
        const accessToken = useCookie("accessToken", {
          maxAge: 300,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        accessToken.value = data.accessToken;

        const refreshToken = useCookie("refreshToken", {
          maxAge: 365 * 24 * 60 * 60,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        refreshToken.value = data.refreshToken;
      }
      toast.success("Login successfully");
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    } catch (err: any) {
      if (err.response && err.response._data) {
        toast.error(err.response._data.statusMessage || "An error occurred");
      } else {
        console.log(err);
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
  async function userLogout() {
    const data = await $fetch("/api/users/auth/logout", {
      method: "post",
    });
    const accessToken = useCookie("accessToken");
    const refreshToken = useCookie("refreshToken");
    const currentCookieUser = useCookie("currentUser");
    accessToken.value = null;
    refreshToken.value = null;
    currentCookieUser.value = null;
    currentUser.value = null;
    await navigateTo("/login");
  }
  const googleLogin = async (access: string, userAccount: any) => {
    try {
      const data: any = await $fetch(`/api/users/auth/google-login`, {
        method: 'post',
        body: {
          userAccount
        }
      })
      if (data) {
        currentUser.value = data
        const userCookie = useCookie("currentUser", {
          maxAge: 365 * 24 * 60 * 60,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        userCookie.value = currentUser.value;
      }
      if (access && data.refreshToken) {
        console.log(access)
        const accessToken: any = useCookie("accessToken", {
          maxAge: 300,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        accessToken.value = access

        const refreshToken = useCookie("refreshToken", {
          maxAge: 365 * 24 * 60 * 60,
          secure: false,
          httpOnly: false,
          path: "/",
        });
        refreshToken.value = data.refreshToken;
      }
      toast.success("Login successfully");
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    }
    catch(err) {
      console.log(err)
    }
  }
  return {
    currentUser,
    userRegister,
    userLogin,
    resendVerify,
    userLogout,
    googleLogin
  };
});
