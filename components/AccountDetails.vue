<script lang="ts" setup>
import { defineProps } from 'vue';
interface User {
  _id: string,
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  billing_info_id: string;
  shipping_info_id: string;
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
      :name="currentUser.name"
      :phone="currentUser.phone"
      :username="currentUser.username"
      :email="currentUser.email"
    ></PersonalInfomation>
    <Shipping></Shipping>
    <ChangePassword></ChangePassword>
  </div>
</template> 
