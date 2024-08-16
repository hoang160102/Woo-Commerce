<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
const categories = ref<string[]>([
  "Clothing",
  "Pants",
  "Shorts",
  "T-shirts",
  "Shirts",
  "Jackets",
  "Underwear",
  "Keychain",
]);
const checkCate = defineModel<string[]>();
const isToggleCate = ref<boolean>(true);
const toggleCate = (): void => {
  isToggleCate.value = !isToggleCate.value;
};
</script>
<template>
  <div
    class="categories-filter pb-8 mt-8 border-b border-gray-300 border-solid"
  >
    <div class="title flex justify-between">
      <div class="font-semibold">Categories</div>
      <FontAwesomeIcon
        :class="{ 'rotate-180': isToggleCate }"
        @click="toggleCate"
        class="cursor-pointer icon"
        :icon="faAngleUp"
      />
    </div>
    <div
      class="mt-3 mr-1 max-h-[240px] transition-all duration-300 ease-in-out grid gap-1.5 overflow-hidden"
      :style="{ maxHeight: isToggleCate ? '600px' : '0px' }"
    >
      <div
        v-for="cate in categories"
        :key="cate"
        class="flex gap-2 align-center items-start"
      >
        <input
          v-model="checkCate"
          id="clothing"
          type="checkbox"
          :value="cate.toLowerCase()"
        />
        <label
          for="clothing"
          class="cursor-pointer text-gray-600 text-sm leading-tight"
          >{{ cate }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  transition: all 0.3s ease-in-out;
}
</style>
