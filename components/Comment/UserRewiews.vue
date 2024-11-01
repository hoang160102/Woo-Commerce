<script setup lang="ts">
import Rating from 'primevue/rating';
const props = defineProps<{
  rate: number;
  comment: string;
  avatar: string;
  username: string;
  date: string;
}>();
const rating = ref<number>(props.rate)

// const formatDate = computed(() => {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "2-digit",
//   }).format(props.date);
// });
</script>
<template>
  <div class="divide-y flex-1">
    <div class="my-1">
      <div class="flex gap-4 items-center">
        <img
          v-if="!avatar || avatar.length === 0"
          src="../../public/ava/default.png"
          class="rounded-full h-12 w-12"
        />
        <img v-else :src="avatar" alt="" class="rounded-full h-12 w-12" />
        <div class="grid gap-1">
          <div class="text-sm">
            <span class="font-semibold">{{ username }}</span>
            <span class="italic text-gray-400"> – {{ date }}</span>
          </div>
          <Rating v-model="rating" :stars="5" readonly />
        </div>
      </div>
      <div class="mt-4 text-gray-700 italic prose-sm"><p>{{ comment }}</p></div>
    </div>
  </div>
</template>
