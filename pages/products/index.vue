<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Paginator from "primevue/paginator";
import { useProductStore } from "~/store/products";
const allProducts = ref<any[]>([]);
const totalRecords = ref<number>(0);
const rowsPerPage = ref<number>(16);
const currentPage = ref<number>(0);
const isLoading = ref<boolean>(false);
const { isShowNav, toggleMenu, handleClickOutside, resizeWindow } =
  useToggleNav(768);
const productStore = useProductStore();
const { loadProducts, getAllProducts } = productStore;

// watchEffect(async () => {
//   isLoading.value = true;
//   await loadProducts(currentPage.value, rowsPerPage.value);
//   allProducts.value = productStore.getProducts.products || [];
//   totalRecords.value = productStore.getProducts.total || 0;
//   isLoading.value = false;
// });

watchEffect(async () => {
  isLoading.value = true
  await getAllProducts()
  allProducts.value = productStore.productsList.products || []
  totalRecords.value = allProducts.value.length
  isLoading.value = false
});

const onPageChange = async (event: any) => {
  currentPage.value = event.page;
  rowsPerPage.value = event.rows;
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This makes the scrolling smooth
  });
  // Sorting applied before pagination now
  // await loadProducts(currentPage.value, rowsPerPage.value);
};
const paginatedProducts = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return sortedProducts.value.slice(start, end);
});
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
} = useFilterProduct(allProducts);

const { sortedProducts, selectedOrder } = useSortProducts(filteredProducts);

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
      <ClientOnly>
        <Transition name="filterNav">
          <div
            v-on-click-outside="handleClickOutside"
            :class="filter"
            class="filters max-h-[100vh] md:min-h-[200vh] z-40 md:z-0 p-10 md:p-0 fixed left-0 top-0 md:relative w-[280px] md:block"
          >
            <div
              class="flex align-center block mb-4 border shadow bg-white rounded-md md:hidden"
            >
              <div class="px-3 py-1 border-r">
                <FontAwesomeIcon :icon="faFilter"></FontAwesomeIcon>
              </div>
              <select
                v-model="selectedOrder"
                class="pl-3 w-full cursor-pointer outline-none"
                aria-label="Order by"
              >
                <option value="default">Default</option>
                <option value="latest">Latest</option>
                <option value="price">Price</option>
                <option value="alphabetically">Alphabetically</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <!-- Filters go here -->
            <FilterPrice
              :min-price="minValue"
              :max-price="maxValue"
              @update:min-price="minValue = $event"
              @update:max-price="maxValue = $event"
            ></FilterPrice>
            <FilterGender v-model="selectedGender"></FilterGender>
            <FilterCategories v-model="selectedCategory"></FilterCategories>
            <FilterCollections v-model="selectedCollection"></FilterCollections>
            <FilterSize v-model="selectedSize"></FilterSize>
            <FilterColor v-model="selectedColor"></FilterColor>
            <div class="sale-product pb-8 mt-8 border-b border-gray-300 border-solid">
              <div class="font-semibold">Sale Products Only</div>
              <input v-model="isSaleProduct" type="checkbox" />
            </div>
            <FilterRating v-model="selectedRating"></FilterRating>
          </div>
        </Transition>
      </ClientOnly>
      <div v-if="paginatedProducts.length > 0" class="w-full">
        <div class="flex justify-between mb-10">
          <div class="products-shown">
            Showing
            <span class="text-gray-400">{{ paginatedProducts.length }}</span>
            of {{ totalRecords }}
          </div>
          <div class="hidden border shadow cursor-pointer outline-none bg-white rounded-md md:flex">
            <div class="px-3 py-1 border-r">
              <FontAwesomeIcon :icon="faFilter"></FontAwesomeIcon>
            </div>
            <select
              v-model="selectedOrder"
              class="w-full px-3 cursor-pointer outline-none"
              aria-label="Order by"
            >
              <option value="default">Default</option>
              <option value="latest">Latest</option>
              <option value="price">Price</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <button
            @click="toggleMenu"
            class="block px-5 py-2 rounded-lg bg-blue-500 text-white md:hidden"
          >
            Filter
          </button>
        </div>
        <div class="mb-4" v-if="!isLoading">
          <transition-group
            name="product"
            tag="div"
            class="grid gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <HomeProducts
              v-for="product in paginatedProducts"
              :key="product['_id']"
              :id="product['_id']"
              :name="product.name"
              :image="product.product_images[0]"
              :quanity="product.quanity"
              :price="product.price"
              :sale="product.sale"
              :rating="product.rating"
            ></HomeProducts>
          </transition-group>
        </div>
        <Paginator
          :totalRecords="totalRecords"
          :rows="rowsPerPage"
          :page="currentPage"
          @page="onPageChange"
        />
      </div>
    </div>
    <div v-if="isShowNav" class="bg-black z-10 top-0 opacity-25 inset-0 z-10 fixed"></div>
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
