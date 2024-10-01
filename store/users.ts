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
  // const userUpdated = ref<Users | null>(null);
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
      // userUpdated.value = response.user;
      console.log(response)
      userCookie.value = { ...response.user }
      console.log(response.user.profile_img)
      console.log(userCookie.value)
      toast.success("Updated profile successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return { usersList, getAllUsers, uploadProfileImage };
});
