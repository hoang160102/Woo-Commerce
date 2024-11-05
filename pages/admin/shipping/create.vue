<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
definePageMeta({
    layout: "admin"
})
</script>

<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">
      Add Shipping Method
    </div>
    <form class="grid grid-cols-1 gap-4">
      <div class="rounded-lg border px-5 py-3">
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 text-xl mb-3"
            >Category Name</label
          >
          <input
            class="outline-none flex-grow m-0 md:ml-20 px-4 py-2 rounded-md border"
            placeholder="Enter Shipping Method"
            aria-required="true"
            type="text"
            name="text"
          />
        </div>
        <div
          class="form-control my-4 flex flex-col md:flex-row md:align-center"
        >
          <label for="name" class="font-semibold p-0 md:pr-20 text-xl mb-3"
            >Price</label
          >
          <input
            class="outline-none flex-grow m-0 md:ml-20 px-4 py-2 rounded-md border"
            tabindex="0"
            aria-required="true"
            type="number"
            name="text"  
          />
        </div>
      </div>
    </form>
  </section>
</template>
