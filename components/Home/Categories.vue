<script lang="ts" setup>
const props = defineProps<{
  id: string,
  image: string,
  name: string
}>()
</script>

<template>
  <div class="relative">
    <img
      class="rounded-xl border h-full object-cover"
      :src="image"
      alt=""
    />
    <span
      class="absolute bottom-[15px] font-semibold text-lg left-[50%] -translate-x-1/2"
      >{{ name }}</span
    >
  </div>
</template>
