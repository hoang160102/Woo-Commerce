<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useCategoryStore } from "~/store/categories";

definePageMeta({
  layout: "admin",
});
const { createCategory } = useCategoryStore();
const name = ref<string>("");
const file = ref<File | null>(null);
const isSubmit = ref<boolean>(false)

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files ? target.files[0] : null;
};

const sumbitData = async () => {
  isSubmit.value = true
  const formData = new FormData();
  if (file.value && name.value.length > 0) {
    formData.append('name', name.value);
    formData.append('image', file.value);
    await createCategory(formData);
  }
};
</script>

<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">
      Add Category
    </div>
    <div class="rounded-lg border bg-card shadow-sm">
      <form @submit.prevent="sumbitData()" class="p-4">
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 text-xl mb-3"
            >Category Name</label
          >
          <input
            class="outline-none flex-grow m-0 md:ml-20 px-4 py-2 rounded-md border"
            placeholder="Category name"
            tabindex="0"
            aria-required="true"
            type="text"
            name="text"
            v-model="name"
          />
        </div>
        <span v-if="isSubmit && !(name.length > 0)" class="text-red-500 text-sm m-0 md: ml-40 pl-40 my-2">Please choose an image</span>
        <div
          class="form-control my-10 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 mb-3 text-xl"
            >Upload Images</label
          >
          <div class="upload-image m-0 md:ml-20 flex-grow">
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
                  <span class="text-blue-500 underline">click to browse</span>
                  <input
                    @change="onFileChange"
                    id="file-upload"
                    type="file"
                    class="mt-4"
                    accept=".jpeg, .png, .jpg"
                  />
                </label>
                <span v-if="isSubmit && !file" class="text-red-500 text-sm mt-2">Please choose an image</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="px-20 bg-blue-500 text-white font-semibold mt-8 text-xl py-3 rounded-lg outline-none"
        >
          Save
        </button>
      </form>
    </div>
  </section>
</template>
