<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
definePageMeta({
  layout: "admin",
});
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
              <option value="Select Category">Select Category</option>
              <option value="Bags">Bags</option>
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
        <div class="form-control my-4 flex flex-col">
          <label for="Description" class="font-semibold mb-3"
            >Description
            <span class="text-red-500">*</span>
          </label>
          <textarea
            class="px-3 w-full py-2 outline-none border rounded-lg h-[250px]"
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
                  <span class="text-blue-500 underline">click to browse</span>
                  <input
                    id="file-upload"
                    type="file"
                    class="mt-4"
                    accept=".jpeg, .png, .jpg"
                  />
                </label>
              </div>
              <div class="mt-2 text-sm text-gray-700">
                You need to add at least 4 images. Pay attention to the quality
                of the pictures you add, comply with the background color
                standards. Pictures must be in certain dimensions. Notice that
                the product shows all the details
              </div>
            </div>
          </div>
        </div>
        <div class="form-control flex flex-col my-4">
          
        </div>
      </div>
    </form>
  </section>
</template>
