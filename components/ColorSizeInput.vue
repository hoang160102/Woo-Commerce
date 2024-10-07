<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const props = defineProps<{
  placeholder: string;
  type: string;
  list: string[];
  addItem: Function;
  deleteItem: Function;
}>();
const typeInput = computed(() => {
    return props.type === 'Color' ? 'bg-sky-500' : 'bg-teal-500'
})
const inputValue = ref<string>('');
const erase = async (item: string) => {
    props.deleteItem(item)
}
const handleEnter = async () => {
  if (inputValue.value.trim()) {
    props.addItem(inputValue.value);
    inputValue.value = "";
  }
};
</script>
<template>
  <div class="form-control flex flex-col">
    <label for="color" class="font-semibold mb-3"
      >{{ type }}
      <span class="text-red-500">*</span>
    </label>
    <input
      @keydown.enter.prevent="handleEnter"
      type="text"
      class="outline-none rounded-lg px-5 py-3 text-sm border"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <div v-if="list.length > 0" class="flex ml-[-4px] flex-wrap mt-2">
      <div
        class="flex mx-1 align-center mb-2 rounded-full px-3 py-1"
        :class="typeInput"
        v-for="item in list"
        :key="item"
      >
        <FontAwesomeIcon @click="erase(item)" class="cursor-pointer" :icon="faClose" />
        <span class="text-white ml-2">{{ item }}</span>
      </div>
    </div>
  </div>
</template>
