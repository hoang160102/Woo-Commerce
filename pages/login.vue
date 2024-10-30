<script lang="ts" setup>
import type { CredentialResponse } from "vue3-google-signin";
import { GoogleSignInButton, decodeCredential } from "vue3-google-signin"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faLock,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuthStore } from "~/store/auth";
definePageMeta({
  layout: "authentication",
});
const { userLogin, googleLogin } = useAuthStore();
const email = ref<string>("");
const password = ref<string>("");
const isSubmit = ref<boolean>(false);
const isShowPassword = ref<boolean>(false);
const isPassword = computed(() => {
  return isShowPassword.value ? "text" : "password";
});
const togglePassword = (): void => {
  isShowPassword.value = !isShowPassword.value;
};
const login = async () => {
  isSubmit.value = true;
  await userLogin({
    email: email.value,
    password: password.value,
  });
};
const handleSignInSuccess = async (response: CredentialResponse) => {
  const credential: any = response.credential;
  const googleUser = decodeCredential(credential);
  await googleLogin(credential, googleUser)
};
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
<template>
  <div class="rounded-lg md:w-auto w-2/3 shadow bg-white p-10 md:p-20">
    <div class="title text-3xl text-center font-extrabold">Login</div>
    <div class="flex mt-4">
      <form @submit.prevent="login" class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="email">
              <FontAwesomeIcon :icon="faUser" class="fa-xs" />
            </label>
            <input
              type="text"
              v-model="email"
              placeholder="Email"
              class="outline-none w-full px-6 py-2 border-b border-black"
            />
          </div>
          <span v-if="isSubmit" class="text-red-500 text-xs hidden"
            >Your email is not correct</span
          >
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="password">
              <FontAwesomeIcon :icon="faLock" class="fa-xs" />
            </label>
            <input
              v-model="password"
              :type="isPassword"
              id="password"
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
          <span v-if="isSubmit" class="text-red-500 text-xs hidden"
            >Your password is not correct</span
          >
        </div>
        <div>
          <a href="" class="text-sm">Forgot Password?</a>
        </div>
        <div class="flex">
          <span class="text-sm">You don't have account?</span>
          <NuxtLink class="text-sm ml-2 underline text-blue-500" to="/register"
            >Sign Up</NuxtLink
          >
        </div>
        <GoogleSignInButton
          class="mt-4"
          @success="handleSignInSuccess"
          @error="handleLoginError"
        ></GoogleSignInButton>
        <div>
          <button
            @click="login"
            class="px-13 py-3 w-full md:w-auto bg-blue-500 rounded-lg mt-4 text-white text-lg font-semibold"
          >
            Login
          </button>
        </div>
      </form>
      <div
        class="banner flex justify-between align-center ml-20 hidden md:block"
      >
        <img src="../public/banner/signup-image.png" alt="" />
      </div>
    </div>
  </div>
</template>
