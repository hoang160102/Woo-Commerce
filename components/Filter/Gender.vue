<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
const gender = ref<string[]>(['Men', 'Women'])
const checkGender = defineModel<string[]>([])
const isToggleCate = ref<boolean>(true);
const toggleCate = (): void => {
  isToggleCate.value = !isToggleCate.value;
};
</script>

<template>
  <div class="gender-filter pb-8 mt-8 border-b border-gray-300 border-solid">
    <div class="title flex justify-between">
      <div class="font-semibold">Gender</div>
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
        v-for="gen in gender"
        :key="gen"
        class="flex gap-2 align-center items-start"
      >
        <input
          v-model="checkGender"
          id="gender"
          type="checkbox"
          :value="gen.toLowerCase()"
        />
        <label
          for="gender"
          class="cursor-pointer text-gray-600 text-sm leading-tight"
          >{{ gen }}
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
