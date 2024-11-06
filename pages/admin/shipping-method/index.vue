<script lang="ts" setup>
import {
  faPlus,
  faClose,
  faEdit,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnClickOutside } from "@vueuse/components";
import { useShippingMethodStore } from "~/store/shipping-method";
definePageMeta({
  layout: "admin",
});
interface ShippingMethod {
  name: string;
  price: number;
}
const shippingMethodStore = useShippingMethodStore();
const { getAllShippingMethods } = shippingMethodStore;
const allMethods = ref<ShippingMethod[]>([]);
watchEffect(async () => {
  await getAllShippingMethods();
  allMethods.value = shippingMethodStore.allShippingMethods;
});
const { searchInput, filteredListItems } = useSearchItem(allMethods);
</script>
<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <NuxtLink to="/admin/shipping-method/create">
        <button class="px-4 py-3 rounded-lg bg-violet-600 text-white">
          <FontAwesomeIcon :icon="faPlus" />
          Create new shipping methods
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
      <table class="w-full border rounded-lg border-gray-300">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="py-5 border-r border-gray-300">Name</th>
            <th class="py-5 border-r border-gray-300">Price</th>
            <th class="py-5 border-r border-gray-300">Date of Created</th>
            <th class="py-5 border-r border-gray-300">Date of Updated</th>
            <th class="py-5">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ship in filteredListItems"
            :id="ship['_id']"
            :key="ship['_id']"
            class="border-b border-gray-300"
          >
            <td class="text-center py-3 border-r border-gray-300">
              {{ ship.name }}
            </td>
            <td class="text-center py-3 border-r border-gray-300">
              {{ (ship.price).toFixed(2) }}$
            </td>
            <td class="text-center py-3 border-r border-gray-300">
              {{ ship.createdAt }}
            </td>
            <td class="text-center py-3 border-r border-gray-300">
              {{ ship.updatedAt }}
            </td>
            <td class="text-center py-3">
              <NuxtLink :to="`/admin/categories/${ship['_id']}`">
                <FontAwesomeIcon class="cursor-pointer" :icon="faEdit" />
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </ClientOnly>
    <!-- <ClientOnly>
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
                Are you sure to delete category {{ nameCategory }} ?
              </div>
              <div class="confirm my-10 flex">
                <button
                  @click="closeModal"
                  class="px-9 py-3 bg-slate-400 font-semibold rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  @click="deleteCate(selectedCategory)"
                  class="px-9 ml-5 py-3 bg-red-500 font-sembold rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly> -->
  </section>
</template>
