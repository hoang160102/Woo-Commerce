<script setup lang="ts">
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const date = new Date();
const orders = ref([
  {
    id: 123,
    order_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    order_status: "Success",
    paymentId: 312,
    userId: 213,
    total: 140,
  },
  {
    id: 123,
    order_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    order_status: "Success",
    paymentId: 312,
    userId: 213,
    total: 140,
  },
  {
    id: 123,
    order_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    order_status: "Success",
    paymentId: 312,
    userId: 213,
    total: 140,
  },
  {
    id: 123,
    order_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    order_status: "Success",
    paymentId: 312,
    userId: 213,
    total: 140,
  },
  {
    id: 123,
    order_date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    order_status: "Success",
    paymentId: 312,
    userId: 213,
    total: 140,
  },
]);
</script>

<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Date of Created</th>
      <th>Customer</th>
      <th>Ammount</th>
      <th>Paymemt Type</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
    <tr v-for="order in orders" :key="order.id">
      <td class="text-center py-1">{{ order.id }}</td>
      <td class="text-center">{{ order.order_date }}</td>
      <td class="text-center">{{ order.userId }}</td>
      <td class="text-center">{{ order.total }}</td>
      <td class="text-center">{{ order.paymentId }}</td>
      <td class="text-center">{{ order.order_status }}</td>
      <td class="text-center">
        <FontAwesomeIcon :icon="faEllipsis" class="fa-sm" />
      </td>
    </tr>
  </table>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: rgba(246, 248, 251, 0.8);
  font-weight: bold;
  color: #333;
  padding: 10px;
  border-radius: 5px;
}
tr:not(:first-child):hover {
  background-color: #edf1f5;
  cursor: pointer;
}
</style>
