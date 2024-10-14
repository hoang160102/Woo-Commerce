<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useCategoryStore } from "~/store/categories";
const store = useCategoryStore()
const { getAllCategories } = store;
const categories = ref<object[]>([]);

const checkCate = defineModel<string[]>([]);
const isToggleCate = ref<boolean>(true);
const toggleCate = (): void => {
  isToggleCate.value = !isToggleCate.value;
};
async function fetchCategories() {
  await getAllCategories();
  // categories.value = store.categoryList?.categories || [];
  // console.log(categories.value)
}
fetchCategories();
watch(
  () => store.categoryList,
  (newVal: any) => {
    categories.value = newVal?.categories || [];
  },
  { immediate: true }
);
onMounted(async () => {
  await fetchCategories()
  categories.value = store.categoryList?.categories || [];
})
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
      v-if="categories && categories.length > 0"
      class="mt-3 mr-1 max-h-[240px] transition-all duration-300 ease-in-out grid gap-1.5 overflow-hidden"
      :style="{ maxHeight: isToggleCate ? '600px' : '0px' }"
    >
      <div
        v-for="cate in categories"
        :key="cate['_id']"
        class="flex gap-2 align-center items-start"
      >
        <input
          v-model="checkCate"
          id="clothing"
          type="checkbox"
          :value="cate.name.toLowerCase()"
        />
        <label
          for="clothing"
          class="cursor-pointer text-gray-600 text-sm leading-tight"
          >{{ cate.name }}
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
