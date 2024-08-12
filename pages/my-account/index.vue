<script lang="ts" setup>
import {
  faCircleInfo,
  faBagShopping,
  faHeart,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const route = useRoute();
const activeTab = computed(() => route.query.tab || "my-details");
</script>
<template>
  <section class="bg-gray-100">
    <div class="container mx-auto">
      <div
        class="flex flex-col items-start justify-between w-full py-10 px-20 lg:gap-12 mb-24 lg:flex-row"
      >
        <div class="mt-2 lg:sticky top-16 w-full lg:max-w-[260px]">
          <section class="my-8 flex gap-4 items-start justify-center w-full">
            <img
              src=""
              class="rounded-full aspect-square border border-white"
              alt="user-image"
              width="48"
              height="48"
            />
            <div
              class="flex-1 text-balance leading-tight w-full text-ellipsis overflow-hidden"
            >
              <div class="text-lg font-semibold">Welcome</div>
              <span class="text-gray-400 font-light"
                >hoang160102@gmail.com</span
              >
            </div>
            <button
              class="flex text-gray-700 items-center flex-col p-2 px-4 rounded-lg rounded-lg hover:bg-white hover:text-red-700 lg:hidden"
            >
              <small></small>
            </button>
          </section>
          <hr class="my-8" />
          <nav
            class="flex text-gray-700 lg:grid flex-wrap w-full gap-2 my-8 min-w-[240px] lg:w-auto items-start"
          >
            <NuxtLink
              to="/my-account?tab=my-details"
              class="flex items-center gap-4 p-2 py-3 px-4 rounded-lg"
              :class="{ active: activeTab == 'my-details' }"
            >
              <FontAwesomeIcon class="fa-xl" :icon="faCircleInfo" />
              My Details
            </NuxtLink>
            <NuxtLink
              to="/my-account?tab=orders"
              class="flex items-center gap-4 p-2 py-3 px-4 rounded-lg"
              :class="{ active: activeTab == 'orders' }"
            >
              <FontAwesomeIcon class="fa-xl" :icon="faBagShopping" />
              Orders
            </NuxtLink>
            <NuxtLink
              to="/my-account?tab=wishlist"
              class="flex items-center gap-4 p-2 py-3 px-4 rounded-lg"
              :class="{ active: activeTab == 'wishlist' }"
            >
              <FontAwesomeIcon class="fa-xl" :icon="faHeart" />
              Wishlist
            </NuxtLink>
          </nav>
          <hr class="my-8" />
          <button
            class="flex text-gray-700 items-center gap-4 p-2 px-4 w-full rounded-lg hover:bg-white hover:text-red-700"
          >
            <FontAwesomeIcon class="fa-xl" :icon="faRightFromBracket" />
            Logout
          </button>
        </div>

        <main
          class="flex-1 w-full lg:my-8 rounded-lg max-w-screen-lg lg:sticky top-24"
        >
          <AccountDetails v-if="activeTab === 'my-details'"></AccountDetails>
          <OrderHistory v-else-if="activeTab === 'orders'"></OrderHistory>
          <Wishlist v-else-if="activeTab === 'wishlist'"></Wishlist>
        </main>
      </div>
    </div>
  </section>
</template>

<style scoped>
.active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
