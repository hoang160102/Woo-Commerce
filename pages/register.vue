<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faL, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faCircleUser,
  faLock,
  faCircleCheck,
  faEyeSlash,
  faEye,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
definePageMeta({
  layout: "authentication",
});
import { useAuthStore } from "~/store/auth";
const { userRegister } = useAuthStore();
const name = ref<string>("");
const userName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const isShowPassword = ref<boolean>(false);
const isSubmit = ref<boolean>(false);
const phone = ref<string>('')
const isPassword = computed(() => {
  return isShowPassword.value ? "text" : "password";
});
const togglePassword = (): void => {
  isShowPassword.value = !isShowPassword.value;
};
const isShowConfirmPassword = ref<boolean>(false);
const isConfirmPassword = computed(() => {
  return isShowConfirmPassword.value ? "text" : "password";
});
const isFormValid = computed(() => {
  return (
    name.value.length > 0 &&
    userName.value.length > 0 &&
    email.value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim) &&
    phone.value.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) &&
    password.value.length > 6 &&
    confirmPassword.value === password.value
  );
});
const toggleConfirmPassword = (): void => {
  isShowConfirmPassword.value = !isShowConfirmPassword.value;
};

const signUp = async () => {
  event?.preventDefault();
  isSubmit.value = true;
  if (isFormValid.value) {
    await userRegister({
      name: name.value,
      username: userName.value,
      email: email.value,
      password: password.value,
      phone: phone.value
    })
  }
};
</script>

<template>
  <div class="rounded-lg md:w-auto w-2/3 shadow bg-white p-10 md:p-20">
    <div class="title text-3xl text-center font-extrabold">Sign Up</div>
    <div class="flex mt-4">
      <form class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="name">
              <FontAwesomeIcon :icon="faUser" class="fa-xs" />
            </label>
            <input
              type="text"
              v-model="name"
              placeholder="Name"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && name.length === 0"
            >This field is invalid</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="lastName">
              <FontAwesomeIcon :icon="faCircleUser" class="fa-xs" />
            </label>
            <input
              type="text"
              v-model="userName"
              placeholder="Username"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && userName.length === 0"
            >This field is invalid</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="email">
              <FontAwesomeIcon :icon="faEnvelope" class="fa-xs" />
            </label>
            <input
              type="text"
              placeholder="Email"
              v-model="email"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="
              isSubmit &&
              !email.match(
                /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
              )
            "
            >Your email is invalid</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="phone">
              <FontAwesomeIcon :icon="faPhone" class="fa-xs" />
            </label>
            <input
              type="text"
              v-model="phone"
              placeholder="Phone"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && userName.length === 0"
            >This field is invalid</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="password">
              <FontAwesomeIcon :icon="faLock" class="fa-xs" />
            </label>
            <input
              :type="isPassword"
              id="password"
              v-model="password"
              placeholder="Password"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
            <FontAwesomeIcon
              v-if="!isShowPassword"
              @click="togglePassword"
              :icon="faEyeSlash"
              class="fa-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-[10px]"
            />
            <FontAwesomeIcon
              v-if="isShowPassword"
              @click="togglePassword"
              :icon="faEye"
              class="fa-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-[10px]"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && password.length <= 6"
            >Your password is too weak</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label
              class="absolute top-1/2 -translate-y-1/2"
              for="password-confirm"
            >
              <FontAwesomeIcon :icon="faCircleCheck" class="fa-xs" />
            </label>
            <input
              v-model="confirmPassword"
              :type="isConfirmPassword"
              placeholder="Confirm Password"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
            <FontAwesomeIcon
              v-if="!isShowConfirmPassword"
              @click="toggleConfirmPassword"
              :icon="faEyeSlash"
              class="fa-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-[10px]"
            />
            <FontAwesomeIcon
              v-if="isShowConfirmPassword"
              @click="toggleConfirmPassword"
              :icon="faEye"
              class="fa-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-[10px]"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && !(confirmPassword === password)"
            >Your password confirmation does not match</span
          >
        </div>
        <div class="flex mt-4">
          <span class="text-sm">Already have an account?</span>
          <NuxtLink to="/login" class="text-sm ml-2 underline text-blue-500">Login</NuxtLink>
        </div>
        <button
          @click="signUp"
          class="px-13 w-full md:w-auto py-3 bg-blue-500 rounded-lg mt-4 text-white text-lg font-semibold"
        >
          Register
        </button>
      </form>
      <div
        class="banner flex justify-between align-center ml-20 hidden md:block"
      >
        <img src="../public/banner/signup-image.png" alt="" />
      </div>
    </div>
  </div>
</template>
