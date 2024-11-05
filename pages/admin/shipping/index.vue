<script lang="ts" setup>
import { faPlus, faClose, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
    layout: "admin"
})
const allShippingMethods = ref<object[]>([])
const { searchInput, filteredListItems } = useSearchItem(allShippingMethods)
</script>
<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <NuxtLink to="/admin/categories/create">
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
      <table class="w-full">
        <!-- <thead>
          <tr>
            <th class="pb-5">Name</th>
            <th class="pb-5">Image</th>
            <th class="pb-5">Date of Created</th>
            <th class="pb-5">Date of Updated</th>
            <th class="pb-5">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :id="cate['_id']"
            v-for="cate in filteredListItems"
            :key="cate['_id']"
          >
            <td class="text-center py-3">{{ cate.name }}</td>
            <td class="flex justify-center py-3 align-center">
              <img
                class="w-[60px] aspect-square"
                :src="cate.image"
                :alt="cate.name"
              />
            </td>
            <td class="text-center py-3">{{ cate.createdAt }}</td>
            <td class="text-center py-3">{{ cate.updatedAt }}</td>
            <td class="text-center py-3">
              <NuxtLink :to="`/admin/categories/${cate['_id']}`">
                <FontAwesomeIcon class="cursor-pointer" :icon="faEdit" />
              </NuxtLink>
              <FontAwesomeIcon
                @click="modalDelete(cate['_id'])"
                :icon="faTrashCan"
                class="ml-2 cursor-pointer"
              />
            </td>
          </tr>
        </tbody> -->
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
