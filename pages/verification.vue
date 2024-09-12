<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
definePageMeta({
  layout: "authentication",
});
</script>

<template>
  <div class="rounded-lg md:w-auto w-2/3 shadow bg-white p-10 md:p-20">
    <div class="flex my-4">
      <form @submit.prevent="" class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="title font-semibold text-xl">Verify Your Account</div>
          <div class="group mt-3 flex flex-col relative">
            <label for="code">Verification Code</label>
            <input
              type="text"
              class="outline-none border rounded-md p-2 mt-2"
            />
            <span class="text-gray-500 text-xs mt-1"
              >6 digit verification code</span
            >
          </div>
        </div>
        <button
          class="px-5 py-3 bg-blue-500 w-full text-white font-semibold rounded-md"
        >
          Verify Account
        </button>
        <div class="navigate mt-3 flex justify-between">
          <NuxtLink class="flex align-center" to="/login">
            <FontAwesomeIcon class="text-gray-700" :icon="faArrowLeft" />
            <div class="text-gray-700 text-sm ml-2">Sign In</div>
          </NuxtLink>
          <NuxtLink class="flex align-center" to="/register">
            <FontAwesomeIcon class="text-gray-700" :icon="faArrowRight" />
            <div class="text-gray-700 text-sm ml-2">Sign Up</div>
          </NuxtLink>
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
