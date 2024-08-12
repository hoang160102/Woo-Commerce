<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import { vOnClickOutside } from "@vueuse/components";
const { isShowNav, toggleMenu, handleClickOutside, resizeWindow } = useToggleNav(768)
const filter = computed(() => {
  return isShowNav.value ? "block" : "hidden";
});
watch(isShowNav, (newVal: boolean): void => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = '';
  }
})
onMounted(() => {
  resizeWindow()
});
</script>
<template>
  <main class="main-content py-10 bg-gray-100">
    <div class="container flex w-full gap-16 px-10 mx-auto xl:w-10/12">
      <Transition name="filterNav">
        <div
          v-on-click-outside="handleClickOutside"
          :class="filter"
          class="filters z-40 md:z-0 p-10 md:p-0 fixed left-0 top-0 md:relative w-[280px] md:block"
        >
          <FilterPrice></FilterPrice>
          <FilterCategories></FilterCategories>
          <FilterSize></FilterSize>
          <FilterColor></FilterColor>
          <div
            class="sale-product pb-8 mt-8 border-b border-gray-300 border-solid"
          >
            <div class="font-semibold">Sale Products Only</div>
            <input type="checkbox" />
          </div>
          <div>dsadas</div>
          <div>asdasd</div>
        </div>
      </Transition>
      <div class="w-full">
        <div class="flex justify-between mb-10">
          <div class="products-shown">Showing 1 to 24 of 38</div>
          <button @click="toggleMenu" class="block md:hidden">Filter</button>
        </div>
        <div :class="{ 'overflow-hidden': isShowNav }" class="grid gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <HomeProducts v-for="n in 24" :key="n"></HomeProducts>
        </div>
      </div>
    </div>
    <div
      v-if="isShowNav"
      class="bg-black z-10 top-0 opacity-25 inset-0 z-10 fixed"
    ></div>
  </main>
</template>

<style scoped>
.filters {
  background-color: white;
}
@media screen and (min-width: 768px) {
  .filters {
    background-color: inherit;
  }
}
.filterNav-enter-active {
  transition: all 0.3s ease-in-out;
}
.filterNav-leave-active {
  transition: all 0.3s ease-in-out;
}
.filterNav-enter-from {
  transform: translateX(-250px);
}
.filterNav-enter-to {
  transform: translateX(0);
}
.filterNav-leave-to {
  transform: translateX(-250px);
}
</style>
