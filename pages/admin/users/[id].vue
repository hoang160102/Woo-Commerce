<script setup lang="ts">
import { useBillingStore } from "~/store/billing";
import { useUsersStore } from "~/store/users";
interface Billing {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postal: string;
  phone: string;
}
definePageMeta({
  layout: "admin",
  middleware: "auth-admin",
});

const billingStore = useBillingStore();
const userStore = useUsersStore
const { getBill } = billingStore;
const billing = ref<Billing | null>(null);
const role = ref<string>("User");
const isAdmin = ref<boolean>(false);

const user = ref({
  name: "Jane Doe",
  username: "janedoe123",
  email: "janedoe@example.com",
  phone: "123-456-7890",
  billing: "123 Main St, City, State, Zip",
  shipping: "456 Elm St, City, State, Zip",
  profile_img: "/path/to/profile_img.jpg",
});
const route: any = useRoute();
watchEffect(async () => {
  await getBill(route.params.id);
  billing.value = billingStore.billingById
});
</script>
<template>
  <div
    class="max-w-full mx-auto p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg"
  >
    <!-- Admin Header -->
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">User Profile - Admin View</h1>
      <div class="flex space-x-4">
        <button class="p-2 bg-blue-600 text-white rounded-lg">Edit User</button>
        <button class="p-2 bg-red-600 text-white rounded-lg">
          Delete User
        </button>
        <button class="p-2 bg-gray-300 text-gray-700 rounded-lg">
          Back to User List
        </button>
      </div>
    </header>

    <!-- User Summary Panel -->
    <div
      class="flex items-center justify-between p-6 bg-gray-50 rounded-lg shadow-md"
    >
      <div class="flex items-center">
        <img
          :src="user.profile_img"
          alt="Profile Image"
          class="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div>
          <h2 class="text-xl font-bold">{{ user.name }}</h2>
          <p class="text-gray-600">@{{ user.username }}</p>
        </div>
      </div>
    </div>

    <!-- User Details Section -->
    <div class="mt-6 space-y-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4">Contact Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-600">Email:</label>
            <p class="font-medium">{{ user.email }}</p>
          </div>
          <div>
            <label class="block text-sm text-gray-600">Phone:</label>
            <p class="font-medium">{{ user.phone }}</p>
          </div>
        </div>
      </div>

      <!-- Billing & Shipping Addresses -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4">Addresses</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-md font-semibold mb-2">Billing Address</h4>
            <p>{{ user.billing }}</p>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-2">Shipping Address</h4>
            <p>{{ user.shipping }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Management Options -->
    <div class="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4">Set Role</h3>
      <select
        class="px-4 py-2 border border-gray-300 text-center rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        v-model="role"
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>
    </div>
  </div>
</template>
