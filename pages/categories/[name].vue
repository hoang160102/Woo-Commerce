<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const { isShowNav, toggleMenu, handleClickOutside, resizeWindow } =
  useToggleNav(768);
const products = ref([
  {
    id: 1,
    name: "Woo Logo",
    inStock: 1,
    price: 20,
    sale: 18,
    rating: 4,
    category: ["clothing", "pants"],
    color: ["red"],
  },
  {
    id: 2,
    name: "Woo Logo",
    inStock: 2,
    price: 30,
    sale: 30,
    rating: 5,
    category: ["clothing", "shorts"],
    color: ["red", "yellow"],
  },
  {
    id: 3,
    name: "Woo Logo",
    inStock: 3,
    price: 27,
    sale: 23,
    rating: 3,
    category: ["clothing", "socks"],
    color: ["black", "yellow", "blue"],
  },
  {
    id: 4,
    name: "Woo Logo",
    inStock: 4,
    price: 28,
    sale: 22,
    rating: 4,
    category: ["clothing", "t-shirts"],
    color: ["orange", "green", "yellow", "blue"],
  },
  {
    id: 5,
    name: "Woo Logo",
    inStock: 3,
    price: 60,
    sale: 60,
    rating: 4,
    category: ["clothing", "hoodies"],
    color: ["red", "gray"],
  },
  {
    id: 6,
    name: "Woo Logo",
    inStock: 2,
    price: 40,
    sale: 40,
    rating: 4,
    category: ["clothing", "shoes"],
    color: ["gray"],
  },
  {
    id: 7,
    name: "Woo Logo",
    inStock: 2,
    price: 76,
    sale: 76,
    rating: 3,
    category: ["bags"],
    color: ["gray", "black"],
  },
  {
    id: 8,
    name: "Woo Logo",
    inStock: 2,
    price: 80,
    sale: 74,
    rating: 4,
    category: ["clothing", "jackets"],
    color: ["red", "blue", "yellow"],
  },
  {
    id: 9,
    name: "Woo Logo",
    inStock: 0,
    price: 76,
    sale: 76,
    rating: 3,
    category: ["keychain"],
    color: ["black", "orannge"],
  },
  {
    id: 10,
    name: "Woo Logo",
    inStock: 1,
    price: 56,
    sale: 50,
    rating: 2,
    category: ["keychain"],
    color: ["blue", "yellow"],
  },
]);
const {
  filteredProducts,
  selectedCategory,
  selectedColor,
  selectedGender,
  isSaleProduct,
  selectedRating,
  minValue,
  maxValue,
} = useFilterProduct(products.value);
const filter = computed(() => {
  return isShowNav.value ? "block" : "hidden";
});
watch(isShowNav, (newVal: boolean): void => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
onMounted(() => {
  resizeWindow();
});
</script>
<template>
  <main class="main-content py-10 bg-gray-100">
    <div class="container flex w-full gap-16 px-8 mx-auto xl:w-10/12">
      <Transition name="filterNav">
        <div
          v-on-click-outside="handleClickOutside"
          :class="filter"
          class="filters z-40 md:z-0 p-10 md:p-0 fixed left-0 top-0 md:relative sm:w-[280px] w-[200px] lg:w-[280px] md:block"
        >
          <FilterPrice
            v-model:min-price="minValue"
            v-model:max-price="maxValue"
          ></FilterPrice>
          <FilterGender v-model="selectedGender"></FilterGender>
          <FilterCategories v-model="selectedCategory"></FilterCategories>
          <FilterColor v-model="selectedColor"></FilterColor>
          <div
            class="sale-product pb-8 mt-8 border-b border-gray-300 border-solid"
          >
            <div class="font-semibold">Sale Products Only</div>
            <input v-model="isSaleProduct" type="checkbox" />
          </div>
          <FilterRating v-model="selectedRating"></FilterRating>
        </div>
      </Transition>
      <div class="w-full">
        <div class="flex justify-between mb-10">
          <div class="products-shown">Showing 1 to 24 of 38</div>
          <select
            class="hidden border shadow outline-none bg-white p-1 rounded-md md:block"
            aria-label="Order by"
          >
            <option value="latest">Latest</option>
            <option value="price">Price</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
          </select>
          <button @click="toggleMenu" class="block md:hidden">Filter</button>
        </div>
        <transition-group
          name="product"
          tag="div"
          :class="{ 'overflow-hidden': isShowNav }"
          class="grid gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animation"
        >
          <HomeProducts
            v-for="product in filteredProducts"
            :key="product.id"
            :id="product.id"
            :name="product.name"
            :inStock="product.inStock"
            :price="product.price"
            :sale="product.sale"
            :rating="product.rating"
          ></HomeProducts>
        </transition-group>
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
  overflow-y: auto;
  max-height: 100vh;
  background-color: white;
}
.filters::-webkit-scrollbar {
  display: none;
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
.product-enter-active,
.product-leave-active {
  transition: all 0.5s ease;
}
.product-enter-from,
.product-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.product-enter-to,
.product-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
