<script setup lang="ts">
import { useShippingStore } from "~/store/shipping";
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
interface Shipping {
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  company: string;
  state: string;
  postal: string;
  city: string;
  country: string;
  email: string;
}
interface User {
  '_id': string
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing: string;
  shipping: string;
  createAt: Date;
  updatedAt: Date;
  cart: string;
  isAdmin: boolean;
  orders: string[];
  profile_img: string;
  wishList: string[];
  refreshToken: string;
  tokenExpire: Date;
  isVerified: boolean;
}
definePageMeta({
  layout: "admin",
  middleware: "auth-admin",
});

const billingStore = useBillingStore();
const userStore = useUsersStore();
const shippingStore = useShippingStore();
const { getBill } = billingStore;
const { getUserById, updateRole } = userStore;
const { getShip } = shippingStore;
const billing = ref<Billing | null>(null);
const role = ref<string>("User");
const user = ref<User | null>(null);
const shipping = ref<Shipping | null>(null);
const route: any = useRoute();
watchEffect(async () => {
  await getUserById(route.params.id);
  user.value = userStore.userById;
  if (user.value) {
    role.value = user.value.isAdmin ? "Admin" : "User";
    await getBill(user.value.billing);
    await getShip(user.value.shipping);
    billing.value = billingStore.billingById;
    shipping.value = shippingStore.shippingById;
  }
});
const saveRole = async () => {
  if (user.value) {
    await updateRole(role.value, user.value['_id'])
  }
}
</script>
<template>
  <div
    v-if="user"
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
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4">Addresses</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-md font-semibold mb-2">Billing Address</h4>
            <p>
              {{ billing?.address1 }}, {{ billing?.city }},
              {{ billing?.country }}
            </p>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-2">Shipping Address</h4>
            <p>
              {{ shipping?.address1 }}, {{ shipping?.city }},
              {{ shipping?.country }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 p-6 bg-white rounded-lg flex shadow-md">
      <div>
        <h3 class="text-lg font-semibold mb-4">Set Role</h3>
        <select
          class="px-4 py-2 hover:cursor-pointer border border-gray-300 text-center rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          v-model="role"
        >
          <option class="text-center" value="Admin">Admin</option>
          <option class="text-center" value="User">User</option>
        </select>
      </div>
      <button @click="saveRole" class="px-6 ml-5 bg-blue-500 h-[40px] self-end text-center text-white rounded-md">Save</button>
    </div>
  </div>
</template>
