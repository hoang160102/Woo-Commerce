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
} from "@fortawesome/free-solid-svg-icons";
definePageMeta({
  layout: "authentication",
});
const firstName = ref<string>("");
const lastName = ref<string>("");
const userName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const isShowPassword = ref<boolean>(false);
const isSubmit = ref<boolean>(false);
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
const toggleConfirmPassword = (): void => {
  isShowConfirmPassword.value = !isShowConfirmPassword.value;
};

const signUp = async () => {
  event?.preventDefault();
  isSubmit.value = true;
};
</script>

<template>
  <div class="rounded-lg md:w-auto w-full shadow bg-white p-10 md:p-20">
    <div class="title text-3xl font-extrabold">Sign Up</div>
    <div class="flex mt-4">
      <form class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="firstName">
              <FontAwesomeIcon :icon="faUser" class="fa-xs" />
            </label>
            <input
              type="text"
              v-model="firstName"
              placeholder="First Name"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && firstName.length === 0"
            >This field is invalid</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="lastName">
              <FontAwesomeIcon :icon="faUser" class="fa-xs" />
            </label>
            <input
              type="text"
              v-model="lastName"
              placeholder="Last Name"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span
            class="px-4 text-xs text-red-500"
            v-if="isSubmit && lastName.length === 0"
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
            v-if="isSubmit && confirmPassword === password"
            >Your password is too weak</span
          >
        </div>
        <button
          @click="signUp"
          class="px-13 py-3 bg-blue-500 rounded-lg mt-4 text-white text-lg font-semibold"
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
