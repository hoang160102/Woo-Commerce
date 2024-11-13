<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "auth-admin",
});
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profile_img: string;
  isAdmin: boolean;
}
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useUsersStore } from "~/store/users";
import {
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const allUsers = ref<User[]>([]);
const userStore = useUsersStore();
const { getAllUsers } = userStore;
watchEffect(async () => {
  await getAllUsers();
  allUsers.value = userStore.usersList;
});
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
    <table
      v-if="allUsers.length > 0"
      class="w-full border border-gray-300 border-collapse"
    >
      <thead>
        <tr class="bg-gray-100 border-b border-gray-300">
          <th class="py-3 px-5 text-start border-r border-gray-300">Name</th>
          <th class="py-3 px-5 text-start border-r border-gray-300">Email</th>
          <th class="py-3 px-5 text-start border-r border-gray-300">Phone</th>
          <th class="py-3 px-5 text-start border-r border-gray-300">Image</th>
          <th class="py-3 px-5 text-start border-r border-gray-300">Role</th>
          <th class="">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in allUsers"
          :key="user['_id'].toString()"
          :id="user['_id']"
          class="border-b border-gray-300"
        >
          <td class="py-3 px-5 align-middle border-r border-gray-300">
            {{ user.name }}
          </td>
          <td class="py-3 px-5 align-middle border-r border-gray-300">
            {{ user.email }}
          </td>
          <td class="py-3 px-5 align-middle border-r border-gray-300">
            {{ user.phone }}
          </td>
          <td class="py-3 px-5 align-middle border-r border-gray-300">
            <img
              class="w-[50px] rounded-lg"
              v-if="user['profile_img'].length > 0"
              :src="user['profile_img']"
              alt="Profile image"
            />
            <FontAwesomeIcon v-else :icon="faUser" class="inline-block" />
          </td>
          <td class="py-3 px-5 align-middle border-r border-gray-300">
            {{ user.isAdmin ? "Admin" : "User" }}
          </td>
          <td class="text-center py-3 align-middle">
            <NuxtLink :to="`/admin/users/${user['_id']}`">
              <FontAwesomeIcon class="cursor-pointer" :icon="faEye" />
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
