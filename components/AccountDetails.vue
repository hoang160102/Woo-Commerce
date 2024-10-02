<script lang="ts" setup>
import { defineProps } from 'vue';
interface User {
  _id: string,
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing: any;
  shipping: any;
  orders: string[];
  profile_img: string;
  wishList: string[];
  refreshToken: string;
  tokenExpire: Date;
  isVerified: boolean;
}
const props = defineProps<{
  currentUser: User
}>()
</script>

<template>
  <div class="grid gap-8 account-form">
    <PersonalInfomation
      :id="currentUser._id"
      :name="currentUser.name"
      :phone="currentUser.phone"
      :username="currentUser.username"
      :email="currentUser.email"
    ></PersonalInfomation>
    <ClientOnly>
      <Shipping></Shipping>
      <Billing></Billing>
    </ClientOnly>
    <ChangePassword></ChangePassword>
  </div>
</template> 
