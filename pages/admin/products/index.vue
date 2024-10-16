<script lang="ts" setup>
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useProductStore } from "~/store/products";
import Paginator from "primevue/paginator";
definePageMeta({
  layout: "admin",
});
const allProducts = ref<any[]>([]);
const productStore = useProductStore();
const isLoading = ref<boolean>(false);
const { searchInput, filteredListItems } = useSearchItem(allProducts);
const { getAllProducts } = productStore;
watchEffect(async () => {
  isLoading.value = true;
  await getAllProducts();
  allProducts.value = productStore.productsList.products || [];
  totalRecords.value = allProducts.value.length;
  isLoading.value = false;
});
const {
  totalRecords,
  rowsPerPage,
  currentPage,
  onPageChange,
  paginatedProducts,
} = usePagination(filteredListItems, allProducts, 15)
</script>
<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <NuxtLink to="/admin/products/create">
        <button class="px-4 py-3 rounded-lg bg-violet-600 text-white">
          <FontAwesomeIcon :icon="faPlus" />
          Add New Product
        </button>
      </NuxtLink>
      <div class="relative ml-10 px-4 border flex align-center rounded-lg">
        <input
          type="text"
          placeholder="Search by name"
          class="outline-none pl-5"
          v-model="searchInput"
        />
        <FontAwesomeIcon
          :icon="faMagnifyingGlass"
          class="absolute text-gray-600 left-[10px]"
        />
      </div>
    </div>
    <ClientOnly>
      <table class="w-full">
        <tr class="bg-gray-100">
          <th class="py-3 px-5 text-start">Product</th>
          <th class="py-3 px-5 text-start">Created At</th>
          <th class="py-3 px-5 text-start">Updated At</th>
          <th class="py-3 px-5 text-start">Price</th>
          <th class="py-3 px-5 text-start">Sale</th>
          <th class="py-3 px-5 text-start">Quantity</th>
          <th class="py-3 px-5 text-start">Category</th>
          <th class="py-3 px-5 text-start">Action</th>
        </tr>
        <tr v-for="product in paginatedProducts" :key="product['_id']">
          <td class="px-5 text-start py-3">{{ product.name }}</td>
          <td class="px-5 text-start py-3">{{ product.createdAt }}</td>
          <td class="px-5 text-start py-3">{{ product.updatedAt }}</td>
          <td class="px-5 text-start py-3">{{ product.price }}$</td>
          <td class="px-5 text-start py-3">{{ product.sale }}%</td>
          <td class="px-5 text-start py-3">{{ product.quanity }}</td>
          <td class="px-5 text-start py-3">{{ product.category }}</td>
          <td class="px-5 text-start py-3">
            <FontAwesomeIcon :icon="faPenToSquare" class="cursor-pointer" />
            <FontAwesomeIcon :icon="faTrashCan" class="cursor-pointer ml-3" />
          </td>
        </tr>
        <div class="flex w-full justify-center">
          <Paginator
            v-if="filteredListItems.length > rowsPerPage"
            :totalRecords="totalRecords"
            :rows="rowsPerPage"
            :page="currentPage"
            @page="onPageChange"
          ></Paginator>
        </div>
      </table>
    </ClientOnly>
  </section>
</template>

<style scoped>
tr td:first-child,
tr th:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

tr td:last-child,
tr th:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
table tr:nth-child(even) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
}
tr:not(:first-child):hover {
  background-color: #edf1f5;
  cursor: pointer;
}
</style>
