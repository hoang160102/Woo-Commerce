<script lang="ts" setup>
import {
  faCircleInfo,
  faBagShopping,
  faHeart,
  faRightFromBracket,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnClickOutside } from "@vueuse/components";
import { useUsersStore } from "~/store/users";
interface User {
  _id: string,
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing: string;
  shipping: string;
  orders: string[];
  profile_img: string;
  wishList: string[];
  refreshToken: string;
  tokenExpire: Date;
  isVerified: boolean;
}
const userCookie: any = useCookie('currentUser');
const currentUser = ref<User | null>(userCookie.value);
const route = useRoute();
const activeTab = computed(() => route.query.tab || "my-details");
const file = ref<File | undefined>(undefined);
const isModal = ref<boolean>(false);
const userStore: any = useUsersStore()
const { uploadProfileImage } = userStore

if (userCookie.value) {
  try {
    currentUser.value = userCookie.value;
  } catch (error) {
    console.error("Error parsing stored user data", error);
  }
}
watch(userCookie, (newVal: any) => {
  if (newVal) {
    currentUser.value = newVal
  }
}, { deep: true });
const toUpdateProfile = () => {
  isModal.value = true;
};
const closeModal = () => {
  isModal.value = false;
};
const clickOutside = () => {
  isModal.value = false;
};
watch(isModal, (newVal: boolean) => {
  if (newVal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});
const imgUrl = ref<string>("");
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        imgUrl.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file.value);
  }
};
const uploadProfile = async () => {
  if (file.value && currentUser.value) {
    const formData = new FormData()
    formData.append('profile_img', file.value)
    await uploadProfileImage(formData, currentUser.value._id)
    isModal.value = false
  }
}
</script>
<template>
  <section class="bg-gray-100">
    <div class="container mx-auto">
      <div
        class="flex flex-col items-start justify-between w-full py-10 px-20 lg:gap-12 mb-24 lg:flex-row"
      >
        <div class="mt-2 lg:sticky top-16 w-full lg:max-w-[260px]">
          <section class="my-8 flex gap-4 items-start justify-center w-full">
            <img
              v-if="
                !(currentUser &&
                currentUser.profile_img &&
                currentUser.profile_img.length > 0)
              "
              @click="toUpdateProfile"
              src="../../public/ava/default.png"
              class="rounded-full cursor-pointer aspect-square border border-white"
              alt="user-image"
              width="48"
              height="48"
            />
            <img
              v-else
              @click="toUpdateProfile"
              :src="currentUser.profile_img"
              class="rounded-full cursor-pointer aspect-square border border-white"
              alt="user-image"
              width="48"
              height="48"
            />
            <div
              class="flex-1 text-balance leading-tight w-full text-ellipsis overflow-hidden"
            >
              <div class="text-lg font-semibold">Welcome</div>
              <span class="text-gray-400 font-light"
                >{{ currentUser?.email }}</span
              >
            </div>
            <button
              class="flex text-gray-700 items-center flex-col p-2 px-4 rounded-lg rounded-lg hover:bg-white hover:text-red-700 lg:hidden"
            >
              <small></small>
            </button>
          </section>
          <hr class="my-8" />
          <nav
            class="flex text-gray-700 lg:grid flex-wrap w-full gap-2 my-8 min-w-[240px] lg:w-auto items-start"
          >
            <NuxtLink
              to="/my-account?tab=my-details"
              class="flex items-center gap-4 p-2 py-3 px-4 rounded-lg"
              :class="{ active: activeTab == 'my-details' }"
            >
              <FontAwesomeIcon class="fa-xl" :icon="faCircleInfo" />
              My Details
            </NuxtLink>
            <NuxtLink
              to="/my-account?tab=orders"
              class="flex items-center gap-4 p-2 py-3 px-4 rounded-lg"
              :class="{ active: activeTab == 'orders' }"
            >
              <FontAwesomeIcon class="fa-xl" :icon="faBagShopping" />
              Orders
            </NuxtLink>
            <NuxtLink
              to="/my-account?tab=wishlist"
              class="flex items-center gap-4 p-2 py-3 px-4 rounded-lg"
              :class="{ active: activeTab == 'wishlist' }"
            >
              <FontAwesomeIcon class="fa-xl" :icon="faHeart" />
              Wishlist
            </NuxtLink>
          </nav>
          <hr class="my-8" />
          <button
            class="flex text-gray-700 items-center gap-4 p-2 px-4 w-full rounded-lg hover:bg-white hover:text-red-700"
          >
            <FontAwesomeIcon class="fa-xl" :icon="faRightFromBracket" />
            Logout
          </button>
        </div>

        <div
          v-if="currentUser"
          class="flex-1 w-full lg:my-8 rounded-lg max-w-screen-lg lg:sticky top-24"
        >
          <LazyAccountDetails v-if="activeTab === 'my-details'"
            :currentUser="currentUser"
          ></LazyAccountDetails>
          <LazyOrderHistory v-else-if="activeTab === 'orders'"></LazyOrderHistory>
          <LazyWishlist v-else-if="activeTab === 'wishlist'"></LazyWishlist>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="isModal"
          class="modal fixed w-screen flex justify-center align-center h-screen z-[200] left-0 top-0"
        >
          <div
            v-on-click-outside="clickOutside"
            class="modal-content bg-white rounded-lg w-[500px] h-[400px] p-6"
          >
            <FontAwesomeIcon
              @click="closeModal"
              :icon="faClose"
              class="float-right fa-lg cursor-pointer"
            />
            <div
              class="main-content w-full flex flex-col mt-5 justify-center align-center"
            >
              <div
                class="border overflow-hidden rounded-full w-[150px] h-[150px]"
              >
                <img class="w-full h-full" :src="imgUrl" alt="" />
              </div>
              <input type="file" @change="onFileChange" class="ml-20 mt-10" />
              <button
                @click="uploadProfile"
                class="px-9 py-3 bg-blue-500 mt-7 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </section>
</template>

<style scoped>
.active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
