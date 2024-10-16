<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Description from "~/components/Comment/Description.vue";
import Reviews from "~/components/Comment/Reviews.vue";
import { useProductStore } from "~/store/products";
const productStore = useProductStore();
const { getProductByName } = productStore;
const selectedColor = ref<string>("");
const route: any = useRoute();
const product = ref<any>(null);
const isLoading = ref<boolean>(false);
const currentImage = ref<string>("");
const currentTab = ref("Description");
const currentTabComponent = computed(() => {
  switch (currentTab.value) {
    case "Description":
      return Description;
    case "Reviews":
      return Reviews;
    default:
      return null;
  }
});
provide('product', product)
watchEffect(async () => {
  isLoading.value = true;
  await getProductByName(route.params.name);
  product.value = productStore.productById;
  currentImage.value = product.value.product_images[0];
  isLoading.value = false;
});
const checkStock = computed(() => {
  return product.value.quanity > 0 ? "In Stock" : "Out of stock";
});
const changeImage = async (img: string) => {
  currentImage.value = img;
};
</script>
<template>
  <main v-if="product" class="main-content p-10 bg-gray-100">
    <div class="container relative mx-auto xl:max-w-7xl">
      <div
        class="flex text-sm leading-none text-gray-400 gap-1 items-center mb-6"
      >
        <span
          ><a href="/" class="hover:text-primary">Home</a><span> /</span></span
        ><span
          ><a href="/products" class="hover:text-primary">Products</a
          ><span> /</span></span
        ><span></span
        ><span
          ><span class="text-gray-800">{{ product.name }}</span
          ><!----></span
        >
      </div>
      <div
        class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24"
      >
        <div class="relative flex-1">
          <img :src="currentImage" class="rounded-2xl" alt="" />
          <span
            v-if="product.sale > 0"
            class="bg-red-500 absolute text-xs rounded-md text-white top-4 p-2 right-4"
            >-10 %</span
          >
          <div
            class="my-4 flex grid xl:grid-cols-6 md:grid-cols-4 grid-cols-5 gap-4"
          >
            <div v-for="image in product.product_images" :key="image">
              <img
                @click="changeImage(image)"
                :src="image"
                class="rounded-md cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="lg:max-w-md xl:max-w-lg md:py-2 w-full">
          <div class="flex justify-between">
            <div class="name text-2xl font-light">{{ product.name }}</div>
            <div class="price flex">
              <div
                class="initial-price text-xl"
                :class="[
                  { 'line-through': product.sale > 0 },
                  { 'text-gray-400': product.sale > 0 },
                ]"
              >
                {{ product.price }}.00$
              </div>
              <div
                v-if="product.sale > 0"
                class="sale-price text-xl ml-2 font-medium"
              >
                {{
                  (
                    product.price -
                    (product.price / 100) * product.sale
                  ).toFixed(2)
                }}$
              </div>
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
            <div class="available">
              Availability: <span>{{ checkStock }}</span>
            </div>
          </div>
          <div class="pb-8 border-b-[1px] border-gray-300">
            {{ product.description }}
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
              <span class="text-gray-500"
                >Categories: {{ product.category }}</span
              >
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500"
                >Collections: {{ product.productCollection.join(", ") }}</span
              >
            </div>
            <div class="flex items-center gap-2">
              <select
                v-model="selectedColor"
                class="outline-none px-4 py-2 cursor-pointer rounded-md bg-blue-500 text-white"
              >
                <option class="bg-white" disabled value="">Select color</option>
                <option
                  class="bg-white"
                  v-for="color in product.color"
                  :key="color"
                  :value="color"
                >
                  {{ color.charAt(0).toUpperCase() + color.slice(1) }}
                </option>
              </select>
            </div>
          </div>
          <div class="my-15">
            <nav class="border-b flex gap-8">
              <div
                :class="{
                  'border-violet-600 text-violet-600':
                    currentTab === 'Description',
                  'border-b-2': currentTab === 'Description',
                }"
                class="pb-6"
              >
                <button
                  @click="currentTab = `Description`"
                  type="button"
                  class="cursor-pointer text-lg"
                >
                  Description
                </button>
              </div>
              <div
                :class="{
                  'border-violet-600 text-violet-600': currentTab === 'Reviews',
                  'border-b-2': currentTab === 'Reviews',
                }"
                class="pb-6"
              >
                <button
                  @click="currentTab = `Reviews`"
                  type="button"
                  class="cursor-pointer text-lg"
                >
                  Reviews (<span>0</span>)
                </button>
              </div>
            </nav>
            <div class="tab-contents mt-8">
              <component :is="currentTabComponent"></component>
            </div>
          </div>
        </div>
      </div>
      <div class="my-15">
        <div class="mb-4 text-xl font-semibold">You May Also Like</div>
        <div class="grid gap-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <!-- <HomeProducts v-for="n in 5" :key="n"></HomeProducts> -->
        </div>
      </div>
    </div>
  </main>
</template>
