<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Rating from "primevue/rating";
const isToggleRating = ref<boolean>(true);
const value1 = ref<number>(1)
const value2 = ref<number>(2)
const value3 = ref<number>(3)
const value4 = ref<number>(4)
const value5 = ref<number>(5)
const picked = defineModel<number>()
const toggleRating = (): void => {
  isToggleRating.value = !isToggleRating.value;
};
</script>
<template>
  <div class="filter-rating mt-5">
    <div class="title flex justify-between">
      <div class="font-semibold">Rating</div>
      <FontAwesomeIcon
        :icon="faAngleUp"
        @click="toggleRating"
        :class="{ 'rotate-180': isToggleRating }"
        class="cursor-pointer icon"
      />
    </div>
    <div
      class="transition-all duration-300 ease-in overflow-hidden my-3"
      :style="{ maxHeight: isToggleRating ? '500px' : '0px' }"
    >
      <div class="flex my-1 items-center">
        <input type="radio" id="five" :value="value5" v-model="picked"/>
        <label class="ml-3 flex align-center" for="five">
          <NuxtRating :readonly="true" :ratingValue="value5" activeColor="#ffd700"></NuxtRating>
        </label>
      </div>
      <div class="flex my-1 items-center">
        <input type="radio" id="four" :value="value4" v-model="picked"/>
        <label class="ml-3 flex align-center" for="four">
          <NuxtRating :readonly="true" :ratingValue="value4" activeColor="#ffd700"></NuxtRating>
          <div class="ml-1 font-light text-sm">& Up</div>
        </label>
      </div>
      <div class="flex my-1 items-center">
        <input type="radio" id="three" :value="value3" v-model="picked"/>
        <label class="ml-3 flex align-center" for="three">
          <NuxtRating :readonly="true" :ratingValue="value3" activeColor="#ffd700"></NuxtRating>
          <div class="ml-1 font-light text-sm">& Up</div>
        </label>
      </div>
      <div class="flex my-1 items-center">
        <input type="radio" id="two" :value="value2" v-model="picked"/>
        <label class="ml-3 flex align-center" for="two">
          <NuxtRating :readonly="true" :ratingValue="value2" activeColor="#ffd700"></NuxtRating>
          <div class="ml-1 font-light text-sm">& Up</div>
        </label>
      </div>
      <div class="flex my-1 items-center">
        <input type="radio" id="one" :value="value1" v-model="picked"/>
        <label class="ml-3 flex align-center" for="one">
          <NuxtRating :readonly="true" :ratingValue="value1" activeColor="#ffd700"></NuxtRating>
          <div class="ml-1 font-light text-sm">& Up</div>
        </label>
      </div>
    </div>
  </div>
</template>

