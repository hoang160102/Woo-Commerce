<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
definePageMeta({
    layout: "authentication"
})

const email = ref<string>("");
const password = ref<string>("");
const isSubmit = ref<boolean>(false)
const isShowPassword = ref<boolean>(false)
const isPassword = computed(() => {
  return isShowPassword.value ? 'text' : 'password'
})
const togglePassword = (): void => {
  isShowPassword.value = !isShowPassword.value
}
const login = async (event: Event) => {
  event.preventDefault()
  isSubmit.value = true
}
</script>
<template>
    <div class="rounded-lg md:w-auto w-full shadow bg-white p-20">
    <div class="title text-3xl font-extrabold">Login</div>
    <div class="flex mt-4">
      <form class="w-full md:w-1/2">
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="email">
              <FontAwesomeIcon :icon="faUser" class="fa-xs"/>
            </label>
            <input type="text" v-model="email" placeholder="Email" class="outline-none w-full px-6 py-2 border-b border-black" >
          </div>
          <span class="text-red-500 text-xs">Your email is not correct</span>
        </div>
        <div class="form-control my-4 relative">
          <div class="group relative">
            <label class="absolute top-1/2 -translate-y-1/2" for="password">
              <FontAwesomeIcon :icon="faLock" class="fa-xs"/>
            </label>
            <input v-model="password" :type="isPassword" id="password" placeholder="Password" class="outline-none w-full px-6 py-2 border-b border-black" >
            <FontAwesomeIcon v-if="!isShowPassword" @click="togglePassword" :icon="faEyeSlash" class="fa-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-[10px]" />
            <FontAwesomeIcon v-if="isShowPassword" @click="togglePassword" :icon="faEye" class="fa-xs absolute cursor-pointer top-1/2 -translate-y-1/2 right-[10px]" />
          </div>
          <span class="text-red-500 text-xs">Your password is not correct</span>
        </div>
        <button @click="login" class="px-13 py-3 bg-blue-500 rounded-lg mt-4 text-white text-lg font-semibold">Login</button>
      </form>
      <div class="banner flex justify-between align-center ml-20 hidden md:block">
        <img src="../public/banner/signup-image.png" alt="">
      </div>
    </div>
  </div>
</template>
<style scoped>
form {
  width: 50%;
}
</style>
