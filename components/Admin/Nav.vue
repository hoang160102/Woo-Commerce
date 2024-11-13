<script lang="ts" setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHouse,
  faBox,
  faDatabase,
  faUser,
  faAngleDown,
  faRightFromBracket,
  faArrowLeft,
  faArrowRight,
  faCircleUser,
  faUsers,
  faBagShopping,
  faBoxArchive,
  faTruck,
  faCopy
} from "@fortawesome/free-solid-svg-icons";

const route = useRoute();
const isExpanded = ref<boolean>(false);
const navWidth = ref<boolean>(false);
const checkRoute = () => {
  const path = route.path;
  if (path.includes("staffs") || path.includes("users")) {
    isExpanded.value = true;
  } else {
    isExpanded.value = false;
  }
};

watch(route, () => {
  nextTick(() => {
    checkRoute();
  });
});

onMounted(() => {
  nextTick(() => {
    checkRoute();
  });
});

const toggle = (): void => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <nav
    class="p-5 border-r fixed w-[100px] xl:w-[260px] h-screen transition-all duration-300 ease-in-out"
  >
    <div class="info-admin mb-5 px-3 py-2 justify-center flex">
      <img
        class="w-[38px] h-[38px] rounded-full"
        src="../../public/ava/unnamed.jpg"
        alt="Avatar"
      />
      <div class="ml-3 hidden xl:block user">
        <div class="name">Nguyen Viet Hoang</div>
        <div class="email text-sm">hoang160102@gmail.com</div>
      </div>
    </div>
    <div class="navigation flex flex-col">
      <NuxtLink
        to="/admin/dashboard"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faHouse" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3">Home</span>
      </NuxtLink>
      <NuxtLink
        to="/admin/products"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faBox" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Products</span
        >
      </NuxtLink>
      <NuxtLink
        to="/admin/categories"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faDatabase" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Categories</span
        >
      </NuxtLink>
      <NuxtLink
        to="/admin/collections"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faCopy" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Collections</span
        >
      </NuxtLink>
      <NuxtLink
        to="/admin/shipping-method"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faTruck" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Shipping</span
        >
      </NuxtLink>
      <NuxtLink
        to="/admin/orders"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faBagShopping" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Orders</span
        >
      </NuxtLink>
      <NuxtLink
        to="/admin/users"
        class="flex hover:bg-gray-200 rounded-lg p-3 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faUser"/>
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Users</span
        >
      </NuxtLink>
      <NuxtLink
        to="/admin/settings"
        class="flex hover:bg-gray-200 rounded-lg px-3 py-2 nav align-center"
      >
        <FontAwesomeIcon class="fa-xl" :icon="faRightFromBracket" />
        <span v-if="!navWidth" class="text-lg hidden xl:block ml-3"
          >Logout</span
        >
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.icon {
  transition: all 0.3s ease;
}

.router-link-exact-active {
  background-color: rgb(147 51 234);
  color: #f0f0f0 !important;
}

nav.align-center {
  height: 45px;
}

nav {
  transition: width 0.3s ease;
}

@media screen and (max-width: 1280px) {
  .nav {
    justify-content: center;
  }
}
</style>
