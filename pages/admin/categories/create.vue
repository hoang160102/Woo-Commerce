<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
definePageMeta({
  layout: "admin",
});
</script>
<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">Add Category</div>
    <div class="rounded-lg border bg-card shadow-sm">
      <form class="p-4">
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 text-xl mb-3">Category Name</label>
          <input
            class="outline-none flex-grow m-0 md:ml-20 px-4 py-2 rounded-md border"
            placeholder="Category name"
            tabindex="0"
            aria-required="true"
            required=""
            type="text"
            name="text"
          />
        </div>
        <div
          class="form-control my-10 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 mb-3 text-xl">Upload Images</label>
          <div class="upload-image m-0 md:ml-20 flex-grow">
            <div class="item up-load">
              <div
                class="px-4 py-10 border-2 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-600"
              >
                <label
                  for="file-upload"
                  class="flex flex-col cursor-pointer"
                >
                  <FontAwesomeIcon :icon="faUpload" class="fa-2xl text-blue-500" />
                  <p class="text-gray-500">Drop your images here or select</p>
                  <span class="text-blue-500 underline">click to browse</span>
                  <input id="file-upload" type="file" class="mt-4"/>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="px-20 bg-blue-500 text-white font-semibold mt-8 text-xl py-3 rounded-lg outline-none">Save</button>
      </form>
    </div>
  </section>
</template>
