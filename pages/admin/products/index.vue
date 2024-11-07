<script lang="ts" setup>
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMagnifyingGlass, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnClickOutside } from "@vueuse/components";
import { useProductStore } from "~/store/products";
import Paginator from "primevue/paginator";
definePageMeta({
  layout: "admin",
  middleware: "auth-admin"
});
const allProducts = ref<any[]>([]);
const productStore = useProductStore();
const selectedProduct = ref<string>("")
const isLoading = ref<boolean>(false);
const isModal = ref<boolean>(false)
const { searchInput, filteredListItems } = useSearchItem(allProducts);
const { getAllProducts, deleteProduct } = productStore;
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
const nameProduct = computed(() => {
  const selectProd: any = allProducts.value.find((prod: any) => {
    return prod['_id'] === selectedProduct.value
  })
  return selectProd ? selectProd.name : ""
})
const modalDelete = (id: string) => {
  selectedProduct.value = id
  isModal.value = true
}
const deleteItem = async (id: string) => {
  allProducts.value = allProducts.value.filter((prod: any) => {
    return prod['_id'] !== id
  })
  await deleteProduct(id)
  isModal.value = false
}

const closeModal = () => {
  isModal.value = false
}
const handleClickOutside = () => {
  isModal.value = false;
};
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
            <NuxtLink :to="`/admin/products/${product.name}`">
              <FontAwesomeIcon :icon="faPenToSquare" class="cursor-pointer" />
            </NuxtLink>
            <FontAwesomeIcon @click="modalDelete(product['_id'])" :icon="faTrashCan" class="cursor-pointer ml-3" />
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
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="isModal"
          class="modal fixed w-screen flex justify-center align-center h-screen z-[200] left-0 top-0"
        >
          <div
            v-on-click-outside="handleClickOutside"
            class="modal-content bg-white relative rounded-lg p-10"
          >
            <FontAwesomeIcon
              @click="closeModal"
              :icon="faClose"
              class="fa-lg absolute top-[20px] right-[20px] cursor-pointer"
            />
            <div
              class="main-content w-full flex flex-col mt-5 justify-center align-center"
            >
              <div class="text-xl font-semibold">
                Are you sure to delete collection {{ nameProduct }} ?
              </div>
              <div class="confirm my-10 flex">
                <button
                  @click="closeModal"
                  class="px-9 py-3 bg-slate-400 font-semibold rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  @click="deleteItem(selectedProduct)"
                  class="px-9 ml-5 py-3 bg-red-500 font-sembold rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
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
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
