<script lang="ts" setup></script>

<template>
  <div class="relative flex">
    <AdminNav class="z-40"></AdminNav>
    <div
      class="admin-layout w-full absolute p-4 top-0 pl-[120px] lg:pl-[280px] min-h-[100vh]"
    >
      <header class="h-[80px] w-full border-b flex align-center">
        <img src="../public/logo/logoo.png" class="w-[40px] rounded-full" alt="">
        <h1 class="text-2xl ml-3 text-violet-500 font-semibold">WooNuxt Dashboard</h1>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
