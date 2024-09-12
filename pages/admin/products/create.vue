<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useCategoryStore } from "~/store/categories";
import { useCollectionStore } from "~/store/collections";
definePageMeta({
  layout: "admin",
});
const name = ref<string>("");
const sale = ref<string>("");
const expirationDate = ref<string>("");
const file = ref<FileList | null>(null);
const linkImg = ref<string[]>([]);
const categories = ref<object[]>([]);
const collections = ref<object[]>([]);
const storeCate = useCategoryStore();
const storeCollect = useCollectionStore();
const { getAllCategories } = storeCate;
const { getAllCollections } = storeCollect;
async function fetchCategories() {
  await getAllCategories();
  await getAllCollections();
  categories.value = storeCate.categoryList?.categories || [];
  collections.value = storeCollect.collectionsList?.collections || [];
}
fetchCategories();
const handleUploadFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    file.value = target.files;
    linkImg.value = Array.from(target.files).map((file) =>
      URL.createObjectURL(file)
    );
  } else {
    file.value = null;
    linkImg.value = [];
  }
};
const removeImage = async (index: number) => {
  linkImg.value.splice(index, 1);
  if (file.value) {
    const dataTransfer = new DataTransfer();
    Array.from(file.value).forEach((f, i) => {
      if (i !== index) {
        dataTransfer.items.add(f);
      }
    });
    file.value = dataTransfer.files;
  }
};
</script>

<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">
      Add Product
    </div>
    <form class="content grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="info-1 rounded-lg border px-5 py-3">
        <div class="form-control flex flex-col my-4">
          <label for="name" class="font-semibold mb-4"
            >Product name
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Product Name"
            class="outline-none rounded-lg px-5 py-3 text-sm border"
            v-model="name"
          />
          <span class="text-xs text-gray-500 mt-2"
            >Do not exceed 20 characters when entering the product name.</span
          >
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="cate" class="font-semibold mb-3"
              >Category
              <span class="text-red-500">*</span>
            </label>
            <select
              class="px-3 py-2 bg-white rounded-lg bg-gray-100 outline-none border"
            >
              <option
                v-for="cate in categories"
                :key="cate['_id']"
                :id="cate['_id']"
                :value="cate.name"
              >
                {{ cate.name }}
              </option>
            </select>
          </div>
          <div class="form-control flex flex-col">
            <label for="gender" class="font-semibold mb-3"
              >Gender
              <span class="text-red-500">*</span>
            </label>
            <select
              class="px-3 py-2 bg-white rounded-lg bg-gray-100 outline-none border"
            >
              <option value="Select Gender">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="colelctions" class="font-semibold mb-3"
              >Colelctions</label
            >
            <select
              class="px-3 py-2 bg-white rounded-lg bg-gray-100 outline-none border"
            >
              <option
                v-for="collect in collections"
                :key="collect['_id']"
                :id="collect['_id']"
                :value="collect.name"
              >{{ collect.name }}</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="price" class="font-semibold mb-3"
              >Price
              <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              class="outline-none rounded-lg px-5 py-3 text-sm border"
            />
          </div>
          <div class="form-control flex flex-col">
            <label for="gender" class="font-semibold mb-3"
              >Sale
              <span class="text-gray-800">(Optional)</span>
            </label>
            <input
              v-model="sale"
              type="text"
              placeholder="Sale"
              class="outline-none rounded-lg px-5 py-3 text-sm border"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="date-expire" class="font-semibold mb-3"
              >Sale Expiration</label
            >
            <input
              :disabled="sale === '0' || sale.length === 0"
              type="date"
              id="birthday"
              name="birthday"
              class="outline-none rounded-lg px-5 py-3 text-sm border"
              :class="{
                'cursor-not-allowed': sale === '0' || sale.length === 0,
              }"
              v-model="expirationDate"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <div class="form-control flex flex-col">
              <label for="color" class="font-semibold mb-3"
                >Color
                <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                class="outline-none rounded-lg px-5 py-3 text-sm border"
              />
            </div>
          </div>
          <div class="form-control flex flex-col">
            <label for="size" class="font-semibold mb-3"
              >Size
              <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              class="outline-none rounded-lg px-5 py-3 text-sm border"
            />
          </div>
        </div>
        <div class="form-control my-4 flex flex-col">
          <label for="Description" class="font-semibold mb-3"
            >Description
            <span class="text-red-500">*</span>
          </label>
          <textarea
            class="px-3 w-full py-2 outline-none border rounded-lg h-[200px]"
            name="desc"
            id="desc"
            placeholder="Description"
          >
          </textarea>
          <span class="text-xs text-gray-500 mt-2"
            >Do not exceed 100 characters when entering the description.</span
          >
        </div>
      </div>
      <div class="info-1 rounded-lg border px-5 py-3">
        <div class="form-control flex flex-col my-4">
          <label for="image" class="font-semibold mb-4"
            >Upload images
            <span class="text-red-500">*</span>
          </label>
          <div class="upload-image flex-grow">
            <div class="item up-load">
              <div
                class="px-4 py-10 border-2 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-600"
              >
                <label for="file-upload" class="flex flex-col cursor-pointer">
                  <FontAwesomeIcon
                    :icon="faUpload"
                    class="fa-2xl text-blue-500"
                  />
                  <p class="text-gray-500">Drop your images here or select</p>
                  <span class="text-blue-500 underline">Click to browse</span>
                  <input
                    @change="handleUploadFiles"
                    multiple
                    id="file-upload"
                    type="file"
                    class="mt-4 hidden"
                    accept=".jpeg, .png, .jpg"
                  />
                </label>
              </div>
              <div class="mt-2 text-sm text-gray-700">
                You need to add at least 4 images.
              </div>
            </div>
            <div
              v-if="linkImg.length"
              class="mt-4 grid grid-cols-4 lg:grid-cols-3 gap-4"
            >
              <div
                v-for="(img, index) in linkImg"
                :key="index"
                class="relative"
              >
                <img
                  :src="img"
                  class="w-full h-42 object-cover rounded-lg"
                  alt="Preview"
                />
                <div
                  @click="removeImage(index)"
                  class="absolute top-2 right-2 cursor-pointer bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="px-20 bg-blue-500 text-white font-semibold text-xl py-3 rounded-lg outline-none"
        >
          Save
        </button>
      </div>
    </form>
  </section>
</template>
