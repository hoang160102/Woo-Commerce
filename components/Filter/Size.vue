<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
  <div class="categories-price pb-8 mt-8 border-b border-gray-300 border-solid">
    <div class="title flex justify-between">
      <div class="font-semibold">Size</div>
      <FontAwesomeIcon class="cursor-pointer" :icon="faAngleUp"/>
    </div>
    <div
      class="mt-3 mr-1 max-h-[240px] grid gap-1.5 overflow-auto custom-scrollbar"
    >
      <div class="flex gap-2 align-center items-start">
        <input id="medium" type="checkbox" value="medium" />
        <label
          for="medium"
          class="cursor-pointer text-gray-600 text-sm leading-tight"
          >Medium
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="small" type="checkbox" value="small" />
        <label
          for="small"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Small
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="large" type="checkbox" value="large" />
        <label
          for="large"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Large
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="XXL" type="checkbox" value="XXL" />
        <label
          for="XXL"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >XXL
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="XL" type="checkbox" value="XL" />
        <label
          for="XL"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >XL
        </label>
      </div>
    </div>
  </div>
</template>
