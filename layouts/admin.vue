<script lang="ts" setup>
</script>

<template>
  <div class="relative flex">
    <AdminNav></AdminNav>
    <div class="admin-layout absolute top-0 left-[120px] lg:left-[260px] h-[200vh]">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
 