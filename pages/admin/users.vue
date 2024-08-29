<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useUsersStore } from "~/store/users";
const allUsers = ref<object[]>([])
const { usersList, getAllUsers } = useUsersStore();
async function fetchUsers() {
  await getAllUsers();
  allUsers.value = usersList.users
}
fetchUsers();
</script>
<template>
  <section class="my-4">
    <div class="nav flex my-8">
      <input
        type="text"
        placeholder="Search"
        class="outline-none px-4 py-3 w-[300px] border rounded-lg"
      />
    </div>
    <table v-if="allUsers.length > 0" class="w-full">
      <tr class="bg-gray-100">
        <th class="py-3 px-5 text-start">Users</th>
        <th class="py-3 px-5 text-start">Username</th>
        <th class="py-3 px-5 text-start">Email</th>
        <th class="py-3 px-5 text-start">phone</th>
      </tr>
      <tr v-for="user in allUsers" :key="user['_id'].toString()">
        <td class="py-3 px-5 flex align-center">
          <img
            v-if="user['profile_img'].length > 0"
            :src="user['profile_img']"
            alt=""
          />
          <FontAwesomeIcon v-else :icon="faUser" />
          <span class="ml-3">{{ user.name }}</span>
        </td>
        <td class="px-5">{{ user.username }}</td>
        <td class="px-5">{{ user.email }}</td>
        <td class="px-5">{{ user.phone }}</td>
      </tr>
    </table>
  </section>
</template>
