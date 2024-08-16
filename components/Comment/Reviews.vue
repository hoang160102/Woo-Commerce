<script lang="ts" setup>
import Rating from "primevue/rating";
const value = ref<number>(1);
const progressValue = ref<number>(0);
const widthProgress = computed(() => {
  return {
    width: `${(300 / 100) * progressValue.value}px`,
  };
});
watch(progressValue, (newValue: number) => {
  progressValue.value = newValue;
});

onMounted(() => {
  const timer = setTimeout(() => (progressValue.value = 90), 500);
  return () => clearTimeout(timer);
});
</script>
<template>
  <section
    class="review grid gap-4 mt-4 grid-cols-1 w-full md:grid-cols-2 md:w-1/2"
  >
    <div class="reviews">
      <h1 class="font-semibold text-sm">Customer reviews</h1>
      <div class="reviews-rate my-4 flex">
        <NuxtRating
          :readonly="true"
          :ratingValue="4.3"
          activeColor="#ffd700"
        ></NuxtRating>
        <div class="ml-4 text-sm text-gray-600">Based on 21 reviews</div>
      </div>
      <div class="rating-stats">
        <div class="5-star my-2 align-center flex">
          <div class="flex">
            <div class="text-sm">5</div>
            <Rating v-model="value" class="ml-1" :stars="1" readonly />
          </div>
          <div class="card relative ml-3">
            <div
              class="bar aboslute top-0 h-[10px] w-[300px] rounded-full bg-white"
            >
              <div
                class="progress aboslute transition-all duration-300 ease-in-out top-0 h-[10px] rounded-full bg-yellow-300"
                :style="widthProgress"
              ></div>
            </div>
          </div>
        </div>
        <div class="4-star my-2 align-center flex">
          <div class="flex">
            <div class="text-sm">4</div>
            <Rating v-model="value" class="ml-1" :stars="1" readonly />
          </div>
          <div class="card relative ml-3">
            <div
              class="bar aboslute top-0 h-[10px] w-[300px] rounded-full bg-white"
            >
              <div
                class="progress aboslute transition-all duration-300 ease-in-out top-0 h-[10px] rounded-full bg-yellow-300"
                :style="widthProgress"
              ></div>
            </div>
          </div>
        </div>
        <div class="3-star my-2 align-center flex">
          <div class="flex">
            <div class="text-sm">3</div>
            <Rating v-model="value" class="ml-1" :stars="1" readonly />
          </div>
          <div class="card relative ml-3">
            <div
              class="bar aboslute top-0 h-[10px] w-[300px] rounded-full bg-white"
            >
              <div
                class="progress aboslute transition-all duration-300 ease-in-out top-0 h-[10px] rounded-full bg-yellow-300"
                :style="widthProgress"
              ></div>
            </div>
          </div>
        </div>
        <div class="2-star my-2 align-center flex">
          <div class="flex">
            <div class="text-sm">2</div>
            <Rating v-model="value" class="ml-1" :stars="1" readonly />
          </div>
          <div class="card relative ml-3">
            <div
              class="bar aboslute top-0 h-[10px] w-[300px] rounded-full bg-white"
            >
              <div
                class="progress aboslute transition-all duration-300 ease-in-out top-0 h-[10px] rounded-full bg-yellow-300"
                :style="widthProgress"
              ></div>
            </div>
          </div>
        </div>
        <div class="1-star my-2 align-center flex">
          <div class="flex">
            <div class="text-sm">1</div>
            <Rating v-model="value" class="ml-1" :stars="1" readonly />
          </div>
          <div class="card relative ml-3">
            <div
              class="bar aboslute top-0 h-[10px] w-[300px] rounded-full bg-white"
            >
              <div
                class="progress aboslute transition-all duration-300 ease-in-out top-0 h-[10px] rounded-full bg-yellow-300"
                :style="widthProgress"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 text-xl mb-2 text-gray-900">Share your thoughts</div>
      <div class="text-sm font-light text-gray-600 mb-4">
        If you have used this product, we would love to hear about your
        experience.
      </div>
      <button
        class="border rounded-lg text-center w-full p-2"
      >
        Write a Review
      </button>
    </div>
  </section>
</template>

<style scoped></style>
