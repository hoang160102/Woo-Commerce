<script setup lang="ts">
import { ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Slider from "primevue/slider";
const sliderValues = ref<[number, number]>([0, 100]);
const minValue = ref<number>(sliderValues.value[0]);
const maxValue = ref<number>(sliderValues.value[1]);
const isTogglePrice = ref<boolean>(true);
const togglePrice = (): void => {
  isTogglePrice.value = !isTogglePrice.value;
};
const emit = defineEmits(["update:priceRange"]);

watch(sliderValues, (newValue: [number, number]) => {
  minValue.value = newValue[0];
  maxValue.value = newValue[1];
  emit("update:priceRange", newValue);
});

watch([minValue, maxValue], ([newMin, newMax]: [number, number]) => {
  sliderValues.value = [newMin, newMax];
  emit("update:priceRange", [newMin, newMax]);
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
      class="transition-all duration-300 ease-in overflow-hidden p-3"
      :style="{ maxHeight: isTogglePrice ? '500px' : '0px' }"
    >
      <div class="mt-3 grid gap-4 grid-cols-2">
        <div class="min flex relative items-center">
          <input
            type="number"
            v-model.number="minValue"
            min="0"
            class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          />
          <label class="px-2 text-gray-400 absolute">$</label>
        </div>
        <div class="min flex relative items-center">
          <input
            type="number"
            v-model.number="maxValue"
            min="1"
            class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
          />
          <label class="px-2 text-gray-400 absolute">$</label>
        </div>
      </div>
      <div class="card flex mt-6 justify-center">
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
