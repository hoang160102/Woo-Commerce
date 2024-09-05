<script lang="ts" setup>
import {
  faPlus,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnClickOutside } from "@vueuse/components";
import { useCategoryStore } from "~/store/categories";

definePageMeta({
  layout: "admin",
  middleware: ["middleware"],
});

const store = useCategoryStore();
const { getAllCategories, deleteCategory } = store;
const allCategories = ref<object[]>([]);
const selectedCategory = ref<string>("");
const isModal = ref<boolean>(false);

const nameCategory = computed(() => {
  const selectCate = allCategories.value.find(
    (cate: any) => cate["_id"] === selectedCategory.value
  );
  return selectCate ? selectCate.name : "";
});
const { searchInput, filteredListItems } = useSearchItem(allCategories);
const modalDelete = (id: string) => {
  selectedCategory.value = id;
  isModal.value = true;
};

const closeModal = () => {
  isModal.value = false;
};

const handleClickOutside = () => {
  isModal.value = false;
};

watch(isModal, (newVal: boolean) => {
  if (newVal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});
async function fetchCategories() {
  await getAllCategories();
  allCategories.value = store.categoryList?.categories || [];
}

watch(
  () => store.categoryList,
  (newVal: any) => {
    console.log("Updated category list:", newVal);
    allCategories.value = newVal?.categories || [];
  },
  { immediate: true }
);

const deleteCate = async (id: string) => {
  const deleteCate = allCategories.value.filter((cate: any) => {
    return cate["_id"] === id;
  });
  const index = allCategories.value.indexOf(deleteCate);
  if (index > -1) {
    allCategories.value.splice(index, 1);
  }
  console.log(allCategories.value);
  // await deleteCategory(id);
  isModal.value = false;
};

fetchCategories();
</script>

<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <NuxtLink to="/admin/categories/create">
        <button class="px-4 py-3 rounded-lg bg-violet-600 text-white">
          <FontAwesomeIcon :icon="faPlus" />
          Create new category
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
        <thead>
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
              <FontAwesomeIcon :icon="faEdit" />
              <FontAwesomeIcon
                @click="modalDelete(cate['_id'])"
                :icon="faTrashCan"
                class="ml-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </ClientOnly>
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
  </section>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
}
tr:not(:first-child):hover {
  background-color: #edf1f5;
  cursor: pointer;
}
tr td:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

tr td:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
