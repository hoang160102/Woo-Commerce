<script lang="ts" setup>
import Rating from "primevue/rating";
const value = ref<number>(1);
const progressValue = ref<number>(0);
const isReview = ref<boolean>(false);
const widthProgress = computed(() => {
  return {
    width: `${(300 / 100) * progressValue.value}px`,
  };
});
watch(progressValue, (newValue: number) => {
  progressValue.value = newValue;
});
const toggleReview = computed(() => {
  isReview.value = !isReview.value;
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
        @click="toggleReview"
        class="border rounded-lg text-center w-full p-2"
        v-if="!isReview"
      >
        Write a Review
      </button>
      <button
        @click="toggleReview"
        class="border rounded-lg text-center w-full p-2"
        v-if="isReview"
      >
        Close
      </button>
      <form v-if="isReview" class="writeReview ease-in-out transform transition-all">
        <div class="w-full text-gray-500">
          <div class="p-5 mt-3 grid gap-2 border rounded-lg">
            <div class="block text-center mb-1.5">
              <label class="text-center mb-3 text-sm block relative m-auto"
                >How would you rate your experience with this product? We strive
                for a 5 star experience
                <span class="text-red-500">*</span></label
              >
              <div class="flex rating-review justify-center">
                <Rating v-model="value" />
              </div>
            </div>
            <div class="w-full col-span-full">
              <label for="content" class="text-sm mb-0.5"
                >How was your experience?
                <span class="text-red-500">*</span></label
              ><textarea
                class="w-full outline-none bg-white p-2 rounded-lg"
                id="content"
                placeholder="Great Quality"
              ></textarea>
            </div>
            <div class="w-full col-span-full">
              <label for="author" class="text-sm mb-0.5"
                >Your email <span class="text-red-500">*</span></label
              ><input
              class="w-full outline-none bg-white p-2 rounded-lg"
                id="author"
                placeholder="example@example.com"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

              />
            </div>
            <!----><!---->
            <div class="w-full col-span-full text-center mt-3">
              <button
                class="flex gap-4 justify-center items-center transition font-semibold rounded-md w-full p-2 bg-amber-300 text-amber-900 hover:bg-amber-400"
                type="submit"
              >
                 <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
