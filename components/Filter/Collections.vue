<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useCollectionStore } from "~/store/collections";
const store = useCollectionStore()
const { getAllCollections } = store;
const collections = ref<object[]>([]);
const checkCollect = defineModel<string[]>();
const isToggleCate = ref<boolean>(true);
const toggleCate = (): void => {
  isToggleCate.value = !isToggleCate.value;
};
async function fetchCollections() {
  await getAllCollections();
  collections.value = store.collectionsList?.collections || [];
}
fetchCollections();
watch(
  () => store.collectionsList,
  (newVal: any) => {
    collections.value = newVal?.collections || [];
  },
  { immediate: true }
);
watch(checkCollect, (newVal: any) => {
    checkCollect.value = newVal
    console.log(checkCollect.value)
})
</script>
<template>
  <div
    class="collections-filter pb-8 mt-8 border-b border-gray-300 border-solid"
  >
    <div class="title flex justify-between">
      <div class="font-semibold">Collections</div>
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
        v-for="collect in collections"
        :key="collect['_id']"
        class="flex gap-2 align-center items-start"
      >
        <input
          v-model="checkCollect"
          :id="collect.name"
          type="checkbox"
          :value="collect.name"
        />
        <label
          :for="collect.name"
          class="cursor-pointer text-gray-600 text-sm leading-tight"
          >{{ collect.name }}
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

