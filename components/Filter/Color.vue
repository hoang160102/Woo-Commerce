<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
</script>
<template>
  <div class="color-filter pb-8 mt-8 border-b border-gray-300 border-solid">
    <div class="title flex justify-between">
      <div class="font-semibold">Color</div>
      <FontAwesomeIcon class="cursor-pointer" :icon="faAngleUp" />
    </div>
    <div
      class="mt-3 mr-6 max-h-[240px] grid grid-cols-5 md:grid-cols-6 gap-1.5"
    >
      <label>
        <input class="bg-black" type="checkbox" id="checkbox1" />
      </label>
      <label>
        <input type="checkbox" id="checkbox1" />
      </label>
      <label>
        <input type="checkbox" id="checkbox1" />
      </label>
      <label>
        <input type="checkbox" id="checkbox1" />
      </label>
    </div>
  </div>
</template>

<style scoped></style>
