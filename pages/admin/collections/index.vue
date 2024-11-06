<script lang="ts" setup>
import {
  faPlus,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnClickOutside } from "@vueuse/components";
import { useCollectionStore } from "~/store/collections";

definePageMeta({
  layout: "admin",
});

const store = useCollectionStore();
const { getAllCollections, deleteCollection } = store;
const allCollections = ref<object[]>([]);
const selectedCollection = ref<string>("");
const isModal = ref<boolean>(false);

const nameCollection = computed(() => {
  const selectCollect :any = allCollections.value.find((collect: any) => {
    return collect["_id"] === selectedCollection.value;
  });
  return selectCollect ? selectCollect.name : "";
});
const { searchInput, filteredListItems } = useSearchItem(allCollections);
const modalDelete = (id: string) => {
  selectedCollection.value = id;
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
const fetchCollections = async () => {
  await getAllCollections();
  allCollections.value = store.collectionsList?.collections || [];
};
fetchCollections();
const deleteCollect = async (id: string) => {
  allCollections.value = allCollections.value.filter(
    (collect: any) => collect["_id"] !== id
  );
  await deleteCollection(id);
  isModal.value = false;
};
watch(
  () => store.collectionsList,
  (newVal: any) => {
    allCollections.value = newVal?.collections || [];
  },
  { immediate: true }
);
</script>

<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <NuxtLink to="/admin/collections/create">
        <button class="px-4 py-3 rounded-lg bg-violet-600 text-white">
          <FontAwesomeIcon :icon="faPlus" />
          Create new collection
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
            v-for="collection in filteredListItems"
            :id="collection['_id']"
            :key="collection['_id']"
          >
            <td class="text-center py-3">{{ collection.name }}</td>
            <td class="flex justify-center py-3 align-center">
              <img
                class="w-[60px] aspect-square"
                :src="collection.image"
                :alt="collection.name"
              />
            </td>
            <td class="text-center py-3">{{ collection.createdAt }}</td>
            <td class="text-center py-3">{{ collection.updatedAt }}</td>
            <td class="text-center py-3">
              <NuxtLink :to="`/admin/collections/${collection['_id']}`">
                <FontAwesomeIcon class="cursor-pointer" :icon="faEdit" />
              </NuxtLink>
              <FontAwesomeIcon
                @click="modalDelete(collection['_id'])"
                :icon="faTrashCan"
                class="ml-2 cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
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
                Are you sure to delete collection {{ nameCollection }} ?
              </div>
              <div class="confirm my-10 flex">
                <button
                  @click="closeModal"
                  class="px-9 py-3 bg-slate-400 font-semibold rounded-lg text-white"
                >
                  Cancel
                </button>
                <button
                  @click="deleteCollect(selectedCollection)"
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
table tr:nth-child(even) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
}
tbody > tr:hover {
  background-color: #edf1f5;
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
