<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTruckFast,
  faMoneyBillTransfer,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useCategoryStore } from "~/store/categories";
const store = useCategoryStore();
const { getAllCategories } = store;
const firstSixCategories = ref<object[]>([]);
async function fetchCategories() {
  await getAllCategories();
  firstSixCategories.value = store.categoryList?.categories || [];
  firstSixCategories.value.pop()
}

watch(
  () => store.categoryList,
  (newVal: any) => {
    firstSixCategories.value = newVal?.categories || [];
  },
  { immediate: true }
);
fetchCategories();
</script>
<template>
  <main>
    <div class="relative">
      <img
        src="../public/banner/banner.png"
        class="w-full h-[420px] lg:h-[560px] xl:h-[640px]"
        alt=""
      />
      <div
        class="absolute w-full xl:w-10/12 h-full flex flex-col justify-center p-8 top-0 h-3 left-[50%] -translate-x-1/2"
      >
        <h1 class="text-6xl font-bold mb-4">Just Landed.</h1>
        <h2 class="text-3xl font-bold mb-4">The New Year Collection</h2>
        <div class="desc max-w-xs mb-8 lg:max-w-sm font-light">
          <p>
            Our latest collection is here. Discover the latest trends and styles
            for the new year.
          </p>
        </div>
        <NuxtLink
          to="/products"
          class="px-6 w-fit py-3 font-bold text-white bg-gray-800 rounded-xl"
          >Shop Now</NuxtLink
        >
      </div>
    </div>
    <div class="main-content py-16 bg-gray-100">
      <div class="container w-full mx-auto xl:w-10/12">
        <div
          class="brand flex flex-wrap items-center justify-center mb-16 text-center gap-x-8 gap-y-4 brand lg:justify-between"
        >
          <img src="https://v3.woonuxt.com/images/logoipsum-211.svg" alt="" />
          <img src="https://v3.woonuxt.com/images/logoipsum-221.svg" alt="" />
          <img src="https://v3.woonuxt.com/images/logoipsum-225.svg" alt="" />
          <img src="https://v3.woonuxt.com/images/logoipsum-280.svg" alt="" />
          <img src="https://v3.woonuxt.com/images/logoipsum-284.svg" alt="" />
          <img src="https://v3.woonuxt.com/images/logoipsum-215.svg" alt="" />
        </div>
        <div class="categories">
          <div class="title flex align-center justify-between mb-8">
            <span class="text-2xl font-semibold">Shop by Categories</span>
            <NuxtLink to="/categories" class="underline text-purple-600"
              >View All</NuxtLink
            >
          </div>
          <div
            class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4"
          >
            <HomeCategories
              v-for="cate in firstSixCategories"
              :key="cate['_id']"
              :id="cate['_id']"
              :image="cate.image"
              :name="cate.name"
            ></HomeCategories>
          </div>
        </div>
        <section class="grid gap-4 my-24 md:grid-cols-2 lg:grid-cols-4">
          <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
            <FontAwesomeIcon
              class="fa-2xl text-purple-500"
              :icon="faTruckFast"
            />
            <div>
              <h3 class="text-xl font-semibold">Free Shipping</h3>
              <p class="text-sm">Free shipping on order over €50</p>
            </div>
          </div>
          <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
            <FontAwesomeIcon
              class="fa-2xl text-purple-500"
              :icon="faMoneyBillTransfer"
            />
            <div>
              <h3 class="text-xl font-semibold">Peace of Mind</h3>
              <p class="text-sm">30 days money back guarantee</p>
            </div>
          </div>
          <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
            <FontAwesomeIcon
              class="fa-2xl text-purple-500"
              :icon="faTruckFast"
            />
            <div>
              <h3 class="text-xl font-semibold">100% Payment Secure</h3>
              <p class="text-sm">Your payment are safe with us.</p>
            </div>
          </div>
          <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
            <FontAwesomeIcon
              class="fa-2xl text-purple-500"
              :icon="faTruckFast"
            />
            <div>
              <h3 class="text-xl font-semibold">Support 24/7</h3>
              <p class="text-sm">24/7 Online support</p>
            </div>
          </div>
        </section>
        <section class="products">
          <div class="title flex align-center justify-between mb-8">
            <span class="text-2xl font-semibold">Popular Products</span>
            <NuxtLink to="/products" class="underline text-purple-600"
              >View All</NuxtLink
            >
          </div>
          <div class="grid gap-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <!-- <HomeProducts v-for="n in 5" :key="n"></HomeProducts> -->
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
