<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
  <div class="categories-filter pb-8 mt-8 border-b border-gray-300 border-solid">
    <div class="title flex justify-between">
      <div class="font-semibold">Categories</div>
      <FontAwesomeIcon class="cursor-pointer" :icon="faAngleUp"/>
    </div>
    <div
      class="mt-3 mr-1 max-h-[240px] grid gap-1.5 overflow-auto custom-scrollbar"
    >
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
      <div class="flex gap-2 align-center items-start">
        <input id="clothing" type="checkbox" value="clothing" />
        <label
          for="clothing"
          class="cursor-pointer  text-gray-600 text-sm leading-tight"
          >Clothing
        </label>
      </div>
    </div>
  </div>
</template>
