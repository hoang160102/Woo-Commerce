<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
definePageMeta({
  layout: "authentication",
});
</script>

<template>
  <div class="rounded-lg md:w-auto w-2/3 shadow bg-white p-10 md:p-20">
    <div class="flex my-4">
      <div class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="title font-semibold text-xl mb-3">Verify Your Account</div>
          <div>We sent you a link for you to verify your account. Please check your email</div>
        </div>
        <div class="flex mt-5 justify-end">
          <NuxtLink to="/login" class="flex align-center text-gray-600">
            <span>Login</span>
            <FontAwesomeIcon :icon="faArrowRight" class="ml-3"></FontAwesomeIcon>
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
