<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <main
    class="flex-1 w-full lg:my-8 rounded-lg max-w-screen-lg lg:sticky top-24"
  >
    <div
      class="bg-white rounded-lg shadow min-h-[400px] w-full p-8 md:p-12 justify-center items-start"
    >
      <div class="title flex justify-between">
        <div class="text-lg font-medium">WishList</div>
        <div class="total text-gray-600">Items: 1</div>
      </div>
      <div class="list-products mt-4">
        <div class="product flex justify-between">
          <div class="info flex align-center">
            <img class="w-[64px] rounded-lg" src="../public/products/t-shirt.avif" alt="" />
            <div class="ml-5">
                <div class="name">T-Shirts</div>
                <div class="price">$18.00</div>
            </div>
          </div>
          <button>
            <FontAwesomeIcon :icon="faClose" class="fa-xl mr-4"/>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
