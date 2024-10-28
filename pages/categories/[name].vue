<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useProductStore } from "~/store/products";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
interface Product {
  _id: string;
  name: string;
  category: string;
  productCollection: string[];
  gender: string;
  quanity: number;
  price: number;
  sale: number;
  saleExpiration: Date | null;
  color: string[];
  size: string[];
  description: string;
  product_images: string[];
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviews: object[];
}
const { isShowNav, toggleMenu, handleClickOutside, resizeWindow } =
  useToggleNav(768);
const productStore = useProductStore();
const route: any = useRoute();
const { getAllProducts } = productStore;
const allProducts = ref<any>(null);
const isLoading = ref<boolean>(false);
watchEffect(async () => {
  isLoading.value = true;
  await getAllProducts();
  allProducts.value = productStore.productsList.products;
  totalRecords.value = allProducts.value.length;
  usePagination(sortedProducts, allProducts, 16)
  isLoading.value = false;
});
const productsByCate = computed(() => {
  if (allProducts.value) {
    const getProductsByCate = allProducts.value?.filter((product: Product) => {
      return product.category === route.params.name;
    });
    return getProductsByCate;
  }
});
const {
  filteredProducts,
  selectedColor,
  selectedCollection,
  selectedGender,
  selectedSize,
  isSaleProduct,
  selectedRating,
  minValue,
  maxValue,
} = useFilterProduct(productsByCate);
const { sortedProducts, selectedOrder } = useSortProducts(filteredProducts);
const {
  totalRecords,
  rowsPerPage,
  currentPage,
  onPageChange,
  paginatedProducts,
} = usePagination(sortedProducts, allProducts, 16);
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
            :min-price="minValue"
            :max-price="maxValue"
            @update:min-price="minValue = $event"
            @update:max-price="maxValue = $event"
          ></FilterPrice>
          <FilterGender v-model="selectedGender"></FilterGender>
          <FilterCollections v-model="selectedCollection"></FilterCollections>
          <FilterColor v-model="selectedColor"></FilterColor>
          <FilterSize v-model="selectedSize"></FilterSize>
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
          <div class="products-shown">Showing {{ paginatedProducts.length }} of {{ totalRecords }}</div>
          <div
            class="hidden border shadow cursor-pointer outline-none bg-white rounded-md md:flex"
          >
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
          <button @click="toggleMenu" class="block md:hidden">Filter</button>
        </div>
        <div class="mb-4" v-if="!isLoading">
          <transition-group
            v-if="paginatedProducts.length > 0"
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
          <div class="flex flex-col justify-center items-center" v-else>
            <FontAwesomeIcon :icon="faFaceFrown" class="fa-3x text-gray-600"/> 
            <span class="text-xl text-gray-600 mt-3 font-semibold">No Products Found</span>
          </div>
        </div>
        <Paginator
          v-if="sortedProducts.length > rowsPerPage "
          :totalRecords="totalRecords"
          :rows="rowsPerPage"
          :page="currentPage"
          @page="onPageChange"
        />
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
