<script lang="ts" setup>
import Rating from "primevue/rating";
import { useProductStore } from "~/store/products";
import { socket } from "../Socket";

// Define a Review interface
interface Review {
  comment: string;
  rate: number;
  username: string;
  avatar: string;
  createdAt: string
}

const value = ref<number>(1);
const comment = ref<string>("");
const isReview = ref<boolean>(false);
const reviews = ref<any>(null);
const productStore = useProductStore();
const userCookie: any = useCookie("currentUser");
const { postProductReview } = productStore;
const product: any = inject("product");

const possibleRatings = [1, 2, 3, 4, 5];

watchEffect(async () => {
  reviews.value = product.value.reviews;
});
const ratingPercentages = computed(() => {
  if (reviews.value) {
    return possibleRatings.map((rate: number) => {
      let percentage;
      const count = reviews.value.filter(
        (review: any) => review.rate === rate
      ).length;
      if (product.value.reviews.length === 0) {
        percentage = 0;
      } else {
        percentage = (count / product.value.reviews.length) * 100;
      }
      return { rate, percentage: percentage + "%" };
    });
  }
});

const toggleReview = () => {
  isReview.value = !isReview.value;
};

const submitReview = async (event: Event) => {
  event?.preventDefault();
  const newReview: Review = {
    // Create a new review object with the defined type
    comment: comment.value,
    rate: value.value,
    username: userCookie.value.username,
    avatar: userCookie.value.profile_img,
    createdAt: (new Date()).toISOString()
  };
  await postProductReview(
    userCookie.value["_id"],
    product.value["_id"],
    value.value,
    comment.value,
    userCookie.value.username,
    userCookie.value.profile_img
  );
  socket.emit("postReview", newReview);
  isReview.value = false;
};

onMounted(() => {
  socket.on("reviewPosted", (newReview: Review) => {
    reviews.value.push(newReview); // Update the reviews array when a new review is received
  });
  reviews.value = [...product.value.reviews];
});
</script>
<template>
  <section class="review grid gap-4 mt-4 grid-cols-1 w-full">
    <div class="reviews">
      <h1 class="font-semibold text-sm">Customer reviews</h1>
      <div class="reviews-rate my-4 flex">
        <NuxtRating
          :readonly="true"
          :ratingValue="product.rating"
          activeColor="#ffd700"
        ></NuxtRating>
        <div class="ml-4 text-sm text-gray-600">
          Based on {{ reviews.length }} reviews
        </div>
      </div>
      <div v-if="ratingPercentages" class="rating-stats">
        <div
          v-for="rating in ratingPercentages"
          :key="rating.rate"
          class="my-2 align-center flex"
        >
          <div class="flex">
            <div class="text-sm">{{ rating.rate }}</div>
            <Rating v-model="value" class="ml-1" :stars="1" readonly />
          </div>
          <div class="card relative ml-3">
            <div
              class="bar aboslute top-0 h-[10px] w-[300px] rounded-full bg-white"
            >
              <div
                class="progress aboslute transition-all duration-300 ease-in-out top-0 h-[10px] rounded-full bg-yellow-300"
                :style="{ width: rating.percentage }"
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
      <form
        v-if="isReview"
        class="writeReview ease-in-out transform transition-all"
      >
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
                v-model="comment"
              ></textarea>
            </div>
            <div class="w-full col-span-full text-center mt-3">
              <button
                @click="submitReview"
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
    <CommentUserRewiews
      v-for="review in reviews"
      :key="review['_id']"
      :id="review['_id']"
      :rate="review.rate"
      :comment="review.comment"
      :avatar="review.avatar"
      :username="review.username"
      :date="review.createdAt"
    ></CommentUserRewiews>
  </section>
</template>

<style scoped>
.review-item {
  margin-bottom: 1rem;
}
</style>
