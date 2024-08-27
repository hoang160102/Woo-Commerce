<template>
  <form class="bg-white rounded-lg shadow">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <div class="text-xl font-semibold col-span-full">Change Password</div>
      <div class="w-full flex flex-col">
        <label class="mb-2" for="old-password">Old Password</label>
        <input type="text" placeholder="Your old password" class="bg-gray-100 px-4 py-3 rounded-lg outline-none border">
      </div>
      <div class="w-full flex flex-col">
        <label class="mb-2" for="new-password">New Password</label>
        <input type="text" placeholder="Your new password" class="bg-gray-100 px-4 py-3 rounded-lg outline-none border">
      </div>
    </div>
    <div
      class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg"
    >
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        <!----><span>Update Details</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup></script>
