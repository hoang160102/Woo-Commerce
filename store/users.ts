import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
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
export const useUsersStore = defineStore("users-store", () => {
  const usersList = ref<any>({});
  const userCookie: any = useCookie("currentUser");
  async function getAllUsers() {
    try {
      const { data } = await useFetch("/api/users/get");
      usersList.value = data.value;
    } catch (err) {
      console.log(err);
    }
  }
  const uploadProfileImage = async (data: FormData, id: string) => {
    try {
      const response: any = await $fetch(`/api/users/${id}`, {
        method: "put",
        body: data,
      });
      userCookie.value = { ...response.user };
      toast.success("Updated profile successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const updateInformation = async (updateData: any, id: string) => {
    const formData = new FormData();
    formData.append("name", updateData.name);
    formData.append("phone", updateData.phone);
    formData.append("username", updateData.username);
    formData.append("email", updateData.email);
    try {
      const response: any = await $fetch(`/api/users/${id}`, {
        method: "put",
        body: formData,
      });
      userCookie.value = { ...response.user };
      toast.success("Update information successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const updatePassword = async (passwordObj: any, id: string) => {
    const formData = new FormData();
    formData.append("oldPassword", passwordObj.oldPassword);
    formData.append("newPassword", passwordObj.newPassword);
    try {
      const response: any = await $fetch(`/api/users/${id}`, {
        method: "put",
        body: formData,
      });
      if (response.success === true) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return {
    usersList,
    getAllUsers,
    uploadProfileImage,
    updateInformation,
    updatePassword,
  };
});
