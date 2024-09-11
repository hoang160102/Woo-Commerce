<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
const { isShowNav, toggleMenu, handleClickOutside, resizeWindow } =
  useToggleNav(768);

const products = ref([
  {
    id: 1,
    name: "Woo Logo",
    inStock: 1,
    gender: ['men', 'women'],
    price: 20,
    sale: 18,
    rating: 4,
    collection: ['Summer'],
    size: ['xxl', 'xl'],
    category: ["clothing", "pants"],
    color: ["red"],
  },
  {
    id: 2,
    name: "Woo Logo",
    inStock: 2,
    gender: ['Men', 'Women'],
    price: 30,
    sale: 30,
    rating: 5,
    collection: ['Summer'],
    size: ['small', 'xxl', 'large'],
    category: ["clothing", "shorts"],
    color: ["red", "yellow"],
  },
  {
    id: 3,
    name: "Woo Logo",
    inStock: 3,
    gender: ['men'],
    price: 27,
    sale: 23,
    rating: 3,
    size: ['medium', 'large'],
    collection: ['Summer'],
    category: ["clothing", "socks"],
    color: ["black", "yellow", "blue"],
  },
  {
    id: 4,
    name: "Woo Logo",
    inStock: 4,
    gender: ['women'],
    price: 28,
    sale: 22,
    rating: 4,
    size: ['small', 'xxl', 'xl', 'medium', 'large'],
    collection: ['Summer'],
    category: ["clothing", "t-shirts"],
    color: ["orange", "green", "yellow", "blue"],
  },
  {
    id: 5,
    name: "Woo Logo",
    inStock: 3,
    gender: ['men', 'women'],
    price: 60,
    sale: 60,
    rating: 4,
    size: ['small', 'xl'],
    collection: ['Summer'],
    category: ["clothing", "hoodies"],
    color: ["red", "gray"],
  },
  {
    id: 6,
    name: "Woo Logo",
    inStock: 2,
    gender: ['women'],
    price: 40,
    sale: 40,
    rating: 4,
    size: ['small', 'large'],
    collection: ['Summer'],
    category: ["clothing", "shoes"],
    color: ["gray"],
  },
  {
    id: 7,
    name: "Woo Logo",
    inStock: 2,
    gender: ['men'],
    price: 76,
    sale: 76,
    rating: 3,
    collection: ['Summer'],
    size: ['xxl', 'medium', 'large'],
    category: ["bags"],
    color: ["gray", "black"],
  },
  {
    id: 8,
    name: "Woo Logo",
    inStock: 2,
    gender: ['men', 'women'],
    price: 80,
    sale: 74,
    rating: 4,
    size: ['small', 'xxl', 'xl', 'large'],
    collection: ['Summer'],
    category: ["clothing", "jackets"],
    color: ["red", "blue", "yellow"],
  },
  {
    id: 9,
    name: "Woo Logo",
    inStock: 0,
    gender: ['men'],
    price: 76,
    sale: 76,
    rating: 3,
    size: ['small', 'xxl', 'medium', 'large'],
    collection: ['Summer'],
    category: ["keychain"],
    color: ["black", "orannge"],
  },
  {
    id: 10,
    name: "Woo Logo",
    inStock: 1,
    gender: ['women'],
    price: 56,
    sale: 50,
    rating: 2,
    size: ['xxl'],
    collection: ['Summer'],
    category: ["keychain"],
    color: ["blue", "yellow"],
  },
  {
    id: 11,
    name: "Woo Logo",
    inStock: 2,
    gender: ['men', 'women'],
    price: 43,
    sale: 40,
    rating: 3,
    size: ['small', 'large'],
    collection: ['Summer'],
    category: ["clothing", "jackets"],
    color: ["green"],
  },
  {
    id: 12,
    name: "Woo Logo",
    inStock: 3,
    gender: ['women'],
    price: 48,
    sale: 44,
    rating: 4,
    size: [ 'medium'],
    collection: ['Summer'],
    category: ["keychain"],
    color: ["red", "blue"],
  },
  {
    id: 13,
    name: "Woo Logo",
    inStock: 1,
    gender: ['men'],
    price: 68,
    sale: 68,
    rating: 5,
    size: ['small'],
    collection: ['Summer'],
    category: ["clothing", "shorts"],
    color: ["red", "blue", "orange", "yellow"],
  },
  {
    id: 14,
    name: "Woo Logo",
    inStock: 1,
    gender: ['men', 'women'],
    price: 10,
    sale: 10,
    rating: 4,
    size: ['small', 'xxl', 'xl'],
    collection: ['Summer'],
    category: ["clothing", "shorts"],
    color: ["red", "blue", "orange"],
  },
  {
    id: 15,
    name: "Woo Logo",
    inStock: 1,
    gender: ['men'],
    price: 20,
    sale: 18,
    rating: 4,
    size: [ 'xxl', 'large'],
    collection: ['Summer'],
    category: ["pants", "T-shirts"],
    color: ["blue", "orange"],
  },
  {
    id: 16,
    name: "Woo Logo",
    inStock: 2,
    gender: ['women'],
    price: 30,
    sale: 30,
    rating: 5,
    size: [ 'large'],
    collection: ['Summer'],
    category: ["pants", "shirts"],
    color: ["blue", "green"],
  },
  {
    id: 17,
    name: "Woo Logo",
    inStock: 0,
    gender: ['men', 'women'],
    price: 38,
    sale: 38,
    rating: 3,
    size: ['small', 'xl'],
    collection: ['Summer'],
    category: ["clothing", "underwear"],
    color: ["black", "yellow"],
  },
  {
    id: 18,
    name: "Woo Logo",
    inStock: 0,
    gender: ['men'],
    price: 96,
    sale: 90,
    rating: 4,
    size: ['xl', 'medium'],
    collection: ['Summer'],
    category: ["clothing", "underwear"],
    color: ["black", "red"],
  },
  {
    id: 19,
    name: "Woo Logo",
    inStock: 3,
    gender: ['women'],
    price: 86,
    sale: 80,
    rating: 4,
    size: ['xxl', 'xl'],
    collection: ['Spring'],
    category: ["clothing", "pants"],
    color: ["gray", "green"],
  },
  {
    id: 20,
    name: "Woo Logo",
    inStock: 1,
    gender: ['men', 'women'],
    price: 20,
    sale: 18,
    rating: 4,
    size: ['small', 'xxl', 'medium'],
    collection: ['New Arrivals', 'Summer'],
    category: ["bags"],
    color: ["orange", "green"],
  },
  {
    id: 21,
    name: "Woo Logo",
    inStock: 3,
    gender: ['men'],
    price: 40,
    sale: 40,
    rating: 3,
    size: ['xxl', 'xl', 'medium', 'large'],
    collection: ['New Arrivals', 'Spring'],
    category: ["bags"],
    color: ["orange"],
  },
  {
    id: 22,
    name: "Woo Logo",
    inStock: 2,
    gender: ['women'],
    price: 44,
    sale: 44,
    rating: 4,
    size: ['small', 'xxl', 'large'],
    collection: ['New Arrivals', 'Spring'],
    category: ["bags"],
    color: ["orange", "yellow"],
  },
  {
    id: 23,
    name: "Woo Logo",
    inStock: 1,
    gender: ['men', 'women'],
    price: 30,
    sale: 30,
    rating: 4,
    size: ['small', 'xxl', 'xl', 'medium', 'large'],
    collection: ['New Arrivals', 'Spring'],
    category: ["keychain"],
    color: ["orange", "black"],
  },
]);
const {
  filteredProducts,
  selectedCategory,
  selectedCollection,
  selectedColor,
  selectedSize,
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
          class="filters max-h-[100vh] md:min-h-[200vh] z-40 md:z-0 p-10 md:p-0 fixed left-0 top-0 md:relative w-[280px] md:block"
        >
          <select
            class="block mb-4 border shadow outline-none bg-white p-1 rounded-md md:hidden"
            aria-label="Order by"
          >
            <option value="latest">Latest</option>
            <option value="price">Price</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
          </select>
          <FilterPrice
            v-model:min-price="minValue"
            v-model:max-price="maxValue"
          ></FilterPrice>
          <FilterGender v-model="selectedGender"></FilterGender>
          <FilterCategories v-model="selectedCategory"></FilterCategories>
          <FilterCollections v-model="selectedCollection"></FilterCollections>
          <FilterSize v-model="selectedSize"></FilterSize>
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
            class="hidden border shadow outline-none bg-white px-4 py-1 rounded-md md:block"
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
