<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "~/store/auth";
definePageMeta({
  layout: "authentication",
});
const email = ref<string>("");
const isFormValid = computed(() => {
  return email.value.match(
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
  );
});
const isSubmit = ref<boolean>(false);
const { resendVerify } = useAuthStore();
const resendVerification = async () => {
  isSubmit.value = true;
  if (isFormValid.value) {
    await resendVerify({
      email: email.value
    });
  }
};
</script>

<template>
  <div class="rounded-lg md:w-auto w-2/3 shadow bg-white p-10 md:p-20">
    <div class="flex my-4">
      <div class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="title font-semibold text-xl mb-3">
            Verify Your Account
          </div>
          <div>
            We sent you a link for you to verify your account. Please check your
            email
          </div>
        </div>
        <div class="text-gray-700 text-sm">
          Cannot get a link? Enter the email to resend link
        </div>
        <form class="mt-2" @submit.prevent="resendVerification">
          <div class="form-control flex flex-col">
            <input
              v-model="email"
              type="text"
              placeholder="Email"
              class="px-2 py-1 border outline-none rounded-md"
            />
            <span
              class="text-xs mt-2b text-red-500"
              v-if="
                isSubmit &&
                !email.match(
                  /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
                )
              "
              >Your email is invalid</span
            >
          </div>
          <button class="px-2 py-1 rounded-md mt-2 bg-blue-500 text-white">
            Resend Link
          </button>
        </form>
        <div class="flex mt-5 justify-end">
          <NuxtLink to="/login" class="flex align-center text-gray-600">
            <span>Login</span>
            <FontAwesomeIcon
              :icon="faArrowRight"
              class="ml-3"
            ></FontAwesomeIcon>
          </NuxtLink>
        </div>
      </div>
      <div
        class="banner flex justify-between align-center ml-20 hidden md:block"
      >
        <img src="../public/banner/signup-image.png" alt="" />
      </div>
    </div>
  </div>
</template>
