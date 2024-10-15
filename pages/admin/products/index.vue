<script lang="ts" setup>
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useProductStore } from "~/store/products";
definePageMeta({
  layout: "admin",
});
const allProducts = ref<any[]>([])
const productStore = useProductStore()
const totalRecords = ref<number>(10)
const rowsPerPage = ref<number>(0)
const currentPage = ref<number>(0)
const isLoading = ref<boolean>(false)
const { getAllProducts } = productStore
watchEffect(async () => {
  isLoading.value = true
  await getAllProducts()
  allProducts.value = productStore.productsList.products || []
  totalRecords.value = allProducts.value.length
  isLoading.value = false
})
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
      <input
        type="text"
        placeholder="Search"
        class="outline-none ml-10 px-4 border rounded-lg"
      />
    </div>
    <ClientOnly>
      <table class="w-full">
        <tr class="bg-gray-100">
          <th class="py-3 px-5 text-start">Product</th>
          <th class="py-3 px-5 text-start">Product ID</th>
          <th class="py-3 px-5 text-start">Price</th>
          <th class="py-3 px-5 text-start">Sale</th>
          <th class="py-3 px-5 text-start">Quantity</th>
          <th class="py-3 px-5 text-start">Category</th>
          <th class="py-3 px-5 text-start">Action</th>
        </tr>
        <tr v-for="product in allProducts" :key="product['_id']">
          <td class="px-5 text-start py-3">{{ product.name}}</td>
          <td class="px-5 text-start py-3">{{ product['_id'] }}</td>
          <td class="px-5 text-start py-3">{{ product.price }}$</td>
          <td class="px-5 text-start py-3">{{ product.sale }}%</td>
          <td class="px-5 text-start py-3">{{ product.quanity }}</td>
          <td class="px-5 text-start py-3">{{ product.category }}</td>
          <td class="px-5 text-start py-3">
            <FontAwesomeIcon :icon="faPenToSquare" class="cursor-pointer" />
            <FontAwesomeIcon :icon="faTrashCan" class="cursor-pointer ml-3" />
          </td>
        </tr>
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
