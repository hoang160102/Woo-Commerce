<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Description from "~/components/Comment/Description.vue";
import Reviews from "~/components/Comment/Reviews.vue";
const currentTab = ref('Description');

const currentTabComponent = computed(() => {
  switch (currentTab.value) {
    case 'Description':
      return Description;
    case 'Reviews':
      return Reviews;
    default:
      return null;
  }
});
</script>
<template>
  <main class="main-content p-10 bg-gray-100">
    <div class="container relative mx-auto xl:max-w-7xl">
      <div
        class="flex text-sm leading-none text-gray-400 gap-1 items-center mb-6"
      >
        <span
          ><a href="/" class="hover:text-primary">Home</a><span> /</span></span
        ><span
          ><a href="/products" class="hover:text-primary">Products</a
          ><span> /</span></span
        ><span
          ><a href="/product-category/clothing" class="hover:text-primary"
            >Clothing</a
          ><span> /</span></span
        ><span
          ><span class="text-gray-800">Woo Logo</span
          ><!----></span
        >
      </div>
      <div
        class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24"
      >
        <div class="relative flex-1">
          <img
            src="../../public/products/products.png"
            class="rounded-2xl"
            alt=""
          />
          <span
            class="bg-red-500 absolute text-xs rounded-md text-white top-4 p-2 right-4"
            >-10 %</span
          >
          <div
            class="my-4 flex grid xl:grid-cols-6 md:grid-cols-4 grid-cols-5 gap-4"
          >
            <img
              src="../../public/products/products.png"
              class="rounded-md"
              alt=""
            />
            <img
              src="../../public/products/products.png"
              class="rounded-md"
              alt=""
            />
          </div>
        </div>
        <div class="lg:max-w-md xl:max-w-lg md:py-2 w-full">
          <div class="flex justify-between">
            <div class="name text-2xl font-light">Woo Ninja</div>
            <div class="price flex">
              <div class="initial-price line-through text-gray-400 text-xl">
                50.00$
              </div>
              <div class="sale-price text-xl ml-2 font-medium">45.00$</div>
            </div>
          </div>
          <div class="rate mt-2 flex">
            <div class="inline-flex items-center">
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
            </div>
            <div class="ml-2 count">(<span>0</span>)</div>
          </div>
          <div class="my-8 gap-2 grid">
            <div class="available">Availability: <span>In stock</span></div>
            <div class="sku">SKU: <span>Hoodie</span></div>
          </div>
          <div class="pb-8 border-b-[1px] border-gray-300">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo isr.
          </div>
          <form>
            <!---->
            <div
              class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 md:static md:bg-transparent bg-opacity-90 md:p-0"
            >
              <input
                type="number"
                min="1"
                aria-label="Quantity"
                value="1"
                class="bg-white border rounded-lg flex text-left p-2.5 w-20 gap-4 items-center justify-center focus:outline-none"
              /><button
                class="rounded-lg flex font-bold bg-gray-800 text-white text-center min-w-[150px] p-2.5 gap-4 items-center justify-center focus:outline-none flex-1 w-full md:max-w-xs"
              >
                <span>Add to Cart</span
                ><!---->
              </button>
            </div>
          </form>
          <div class="grid gap-2 my-8 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Categories:</span>
            </div>
          </div>
        </div>
      </div>
      <div class="my-32">
        <nav class="border-b flex gap-8">
          <div :class="{ 'border-violet-600 text-violet-600': currentTab === 'Description', 'border-b-2': currentTab === 'Description'}" class="pb-6">
            <button @click="currentTab = `Description`" type="button" class="cursor-pointer text-lg">Description</button>
          </div>
          <div :class="{ 'border-violet-600 text-violet-600': currentTab === 'Reviews', 'border-b-2': currentTab === 'Reviews'}" class="pb-6">
            <button @click="currentTab = `Reviews`" type="button" class="cursor-pointer text-lg">
              Reviews (<span>0</span>)
            </button>
          </div>
        </nav>
        <div class="tab-contents mt-8">
          <component :is="currentTabComponent"></component>
        </div>
      </div>
      <div class="my-32">
        <div class="mb-4 text-xl font-semibold">You May Also Like</div>
        <div class="grid gap-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <HomeProducts v-for="n in 5" :key="n"></HomeProducts>
        </div>
      </div>
    </div>
  </main>
</template>
