<script lang="ts" setup>
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
<template>
  <div
    class="bg-white rounded-lg flex shadow min-h-[250px] p-4 md:p-12 justify-center items-center"
  >
    <div class="w-full">
      <table class="w-full text-left table-auto" aria-label="Order List">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n" class="cursor-pointer text-gray-500 bg-gray-100 hover:underline">
            <td class="p-2 rounded-l-lg">2660</td>
            <td>August 8, 2024</td>
            <td>
              <span  class="order-FAILED order-status"
                >FAILED</span
              >
            </td>
            <td class="text-right rounded-r-lg">€28.00</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center flex justify-center w-full mt-8">
        <button
          type="button"
          class="flex items-center gap-1 text-sm leading-none hover:bg-gray-50 p-2 rounded"
        >
          <span>Refresh list</span>
            <FontAwesomeIcon class="fa-sm ml-2" :icon="faRotateRight" />
        </button>
      </div>
    </div>
  </div>
</template>
