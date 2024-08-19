<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Slider from "primevue/slider";

const isTogglePrice = ref<boolean>(true);
const togglePrice = (): void => {
  isTogglePrice.value = !isTogglePrice.value;
};
const minPrice = defineModel<number>("minPrice");
const maxPrice = defineModel<number>("maxPrice");

const sliderValues = ref<number[]>([minPrice.value ?? 0, maxPrice.value ?? 0]);
watch([minPrice, maxPrice], (newValues: [number, number]) => {
  if (newValues[0] > newValues[1]) {
    newValues[0] = newValues[1];
  }
  sliderValues.value = [newValues[0], newValues[1]]
});

watch(sliderValues, (newValues: [number, number]) => {
  if (newValues[0] > newValues[1]) {
    newValues[0] = newValues[1];
  }
  minPrice.value = newValues[0];
  maxPrice.value = newValues[1];
});

</script>

<template>
  <div class="filter-price border-b pb-2 border-gray-300 border-solid">
    <div class="title flex justify-between">
      <div class="font-semibold">Price</div>
      <FontAwesomeIcon
        @click="togglePrice"
        :class="{ 'rotate-180': isTogglePrice }"
        class="cursor-pointer icon"
        :icon="faAngleUp"
      />
    </div>
    <div
      class="transition-all duration-300 ease-in overflow-hidden"
      :style="{ maxHeight: isTogglePrice ? '500px' : '0px' }"
    >
      <div class="mt-3 grid gap-4 grid-cols-2">
        <div class="min flex relative items-center">
          <input
            type="number"
            v-model.number="minPrice"
            min="0"
            class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          />
          <label class="px-2 text-gray-400 absolute">$</label>
        </div>
        <div class="min flex relative items-center">
          <input
            type="number"
            v-model.number="maxPrice"
            min="1"
            class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          />
          <label class="px-2 text-gray-400 absolute">$</label>
        </div>
      </div>
      <div class="card flex p-3 mt-6 justify-center">
        <Slider v-model="sliderValues" range class="w-56" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  transition: all 0.3s ease;
}
</style>
