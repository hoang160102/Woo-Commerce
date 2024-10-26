<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faCartShopping,
  faHourglassEmpty,
  faMagnifyingGlass,
  faXmark,
  faRightFromBracket,
  faCartFlatbed,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { vOnClickOutside } from "@vueuse/components";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";
interface User {
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
const authStore = useAuthStore();
const cartStore = useCartStore();
const { userLogout } = authStore;
const { getUserCart } = cartStore;
const userCookie: any = useCookie("currentUser");
const currentUser: any = ref<User | null>(userCookie.value);
const cartItems = ref<any>(null);
watchEffect(async () => {
  await getUserCart(currentUser.value.cart);
  console.log(cartStore.userCart.items);
  cartItems.value = cartStore.userCart.items;
});

const totalPrice = ref(0);
const totalQuantity = ref(0);
const cartPrices = ref<{ [key: string]: number }>({});
const cartQuantities = ref<{ [key: string]: number }>({});
const updateCart = (id: string, price: number, quantity: number) => {
  // Update individual product price and quantity
  cartPrices.value[id] = price;
  cartQuantities.value[id] = quantity;
  totalPrice.value = Object.values(cartPrices.value).reduce((acc: any, curr: any) => acc + curr, 0);
  totalQuantity.value = Object.values(cartQuantities.value).reduce((acc: any, curr: any) => acc + curr, 0);
};
watch(userCookie, (newVal: User) => {
  currentUser.value = newVal;
});
const router = useRouter();
const cart = ref<boolean>(false);
const toggleCart = (): void => {
  cart.value = true;
};
const outSideCart = (): void => {
  cart.value = false;
};
const hideCart = (): void => {
  cart.value = false;
};
const { toggleMenu, handleClickOutside, resizeWindow, isShowNav } =
  useToggleNav(1024);
const logout = async () => {
  await userLogout();
};
watch(router.currentRoute, (): void => {
  isShowNav.value = false;
  cart.value = false;
});

watch(cart, (newVal: boolean): void => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

watch(isShowNav, (newVal: boolean): void => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onMounted(() => {
  resizeWindow();
});
</script>

<template>
  <div>
    <header class="h-[70px] relative">
      <nav class="bg-white shadow-lg p-3 z-[10] fixed w-full">
        <div class="container mx-auto flex items-center justify-between">
          <div class="flex items-center">
            <button
              @click="toggleMenu"
              class="text-xl lg:hidden focus:outline-none"
              id="menu-toggle"
            >
              <FontAwesomeIcon :icon="faBars" />
            </button>
            <NuxtLink to="/">
              <img
                class="w-[42px] rounded-full"
                src="../../public/logo/logoo.png"
                alt=""
              />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="text-purple-600 ml-5 text-2xl font-bold ml-2"
              >WooNuxt</NuxtLink
            >
          </div>
          <div class="hidden lg:flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-600 hover:text-purple-600"
              >Home</NuxtLink
            >
            <NuxtLink to="/products" class="text-gray-600 hover:text-purple-600"
              >Products</NuxtLink
            >
            <NuxtLink
              to="/categories"
              class="text-gray-600 hover:text-purple-600"
              >Categories</NuxtLink
            >
            <NuxtLink to="/contact" class="text-gray-600 hover:text-purple-600"
              >Contact</NuxtLink
            >
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex-grow relative max-w-xs mx-4">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon :icon="faMagnifyingGlass" />
              </span>
              <input
                type="text"
                placeholder="Search Products..."
                class="py-3 text-sm pl-10 pr-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div class="text-gray-600 hover:text-purple-600 user relative">
              <img
                v-if="
                  currentUser &&
                  currentUser.profile_img &&
                  currentUser.profile_img.length > 0
                "
                :src="currentUser.profile_img"
                class="w-[30px] cursor-pointer ava rounded-full"
                alt=""
              />
              <FontAwesomeIcon
                v-else
                class="fa-lg cursor-pointer"
                :icon="faUser"
              />
              <div
                class="dropdown shadow rounded-lg p-3 bg-white absolute w-[224px] z-60 right-0"
                :class="[
                  {
                    'top-[30px]':
                      currentUser &&
                      currentUser.profile_img &&
                      currentUser.profile_img.length > 0,
                  },
                  {
                    'top-[24px]': !(
                      currentUser &&
                      currentUser.profile_img &&
                      currentUser.profile_img.length > 0
                    ),
                  },
                ]"
              >
                <NuxtLink
                  class="flex rounded-lg hover:bg-gray-200 align-center py-3 px-4"
                  to="/my-account"
                >
                  <FontAwesomeIcon class="fa-sm" :icon="faUser" />
                  <span class="ml-4 text-base">My Account</span>
                </NuxtLink>
                <NuxtLink
                  class="flex align-center rounded-lg hover:bg-gray-200 py-3 px-4"
                  to="/my-account?tab=wishlist"
                >
                  <FontAwesomeIcon class="fa-sm" :icon="faHeart" />
                  <span class="ml-4 text-base">WishList</span>
                </NuxtLink>
                <div
                  @click="logout"
                  class="flex align-center cursor-pointer rounded-lg hover:bg-gray-200 py-3 px-4"
                >
                  <FontAwesomeIcon class="fa-sm" :icon="faRightFromBracket" />
                  <span class="ml-4 text-base">Log Out</span>
                </div>
              </div>
            </div>
            <button
              @click="toggleCart"
              class="text-gray-600 hover:text-purple-600 relative"
            >
              <FontAwesomeIcon class="fa-lg" :icon="faCartShopping" />
              <span
                v-if="cartItems"
                class="absolute top-[-10px] right-[-10px] text-xs text-center text-white inline-block w-5 h-5 bg-purple-600 rounded-full"
                >{{ totalQuantity }}</span
              >
            </button>
          </div>
        </div>
      </nav>
    </header>
    <Transition name="mobileNav">
      <div
        v-if="isShowNav"
        v-on-click-outside="handleClickOutside"
        class="mobile-menu h-screen w-1/2 bg-white fixed top-0 left-0 z-50 lg:hidden p-10"
      >
        <div class="title text-center">Menu</div>
        <NuxtLink
          to="/"
          class="block mt-6 text-gray-600 hover:text-purple-600 py-2"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/products"
          class="block text-gray-600 hover:text-purple-600 py-2"
          >Products</NuxtLink
        >
        <NuxtLink
          to="/categories"
          class="block text-gray-600 hover:text-purple-600 py-2"
          >Categories</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="block text-gray-600 hover:text-purple-600 py-2"
          >Contact</NuxtLink
        >
        <NuxtLink
          to="/my-account?tab=wishlist"
          class="block text-gray-600 hover:text-purple-600 py-2"
          >WishList</NuxtLink
        >
      </div>
    </Transition>
    <Transition name="shoppingCart">
      <div class="overflow-hidden">
        <div
          v-if="cartItems"
          v-on-click-outside="outSideCart"
          class="h-screen bg-white fixed top-0 transition-all duration-300 ease-in-out right-0 z-50"
          :style="{ width: cart ? '500px' : '0px' }"
          :class="[{ 'p-6': cart, 'pr-3': cart }]"
        >
          <!-- Header (fixed) -->
          <div class="header-cart flex justify-between p-6">
            <FontAwesomeIcon
              @click="hideCart"
              class="fa-xl cursor-pointer"
              :icon="faXmark"
            />
            <div class="count">
              Cart (<span>{{ cartItems.length }}</span
              >)
            </div>
            <FontAwesomeIcon class="fa-xl cursor-pointer" :icon="faTrashCan" />
          </div>

          <!-- Scrollable content -->
          <div
            class="flex flex-col flex-1 mt-4 gap-4 overflow-y-auto"
            style="max-height: calc(100% - 200px)"
          >
            <div class="flex justify-center mt-4" v-if="cartItems.length === 0">
              <FontAwesomeIcon
                :icon="faCartFlatbed"
                class="fa-xl text-yellow-400"
              ></FontAwesomeIcon>
              <span class="ml-3 text-gray-600"
                >Your cart is currently empty</span
              >
            </div>
            <CartProducts
              v-for="product in cartItems"
              :key="product['product_id']"
              :id="product['product_id']"
              :qty="product.qty"
              :size="product.size"
              :color="product.color"
              @update-quantity-price="updateCart"
            ></CartProducts>
          </div>

          <!-- Footer (fixed) -->
          <div class="p-8 w-full absolute bottom-0 bg-white z-60">
            <a
              href="/checkout"
              class="block p-3 text-lg text-center text-white bg-gray-800 rounded-lg shadow-md justify-evenly hover:bg-gray-900"
              ><span class="mx-2">Checkout</span
              ><span>{{ totalPrice.toFixed(2) }}$</span></a
            >
          </div>
        </div>
      </div>
    </Transition>

    <div
      v-if="isShowNav || cart"
      class="bg-black z-10 opacity-25 inset-0 fixed"
    ></div>
  </div>
</template>

<style scoped>
.mobileNav-enter-active {
  transition: all 0.3s ease-in-out;
}
.mobileNav-leave-active {
  transition: all 0.3s ease-in-out;
}
.mobileNav-enter-from {
  transform: translateX(-250px);
}
.mobileNav-enter-to {
  transform: translateX(0);
}
.mobileNav-leave-to {
  transform: translateX(-250px);
}
/* .shoppingCart-enter-active {
  transition: all 0.3s ease-in-out;
}
.shoppingCart-leave-active {
  transition: all 0.3s ease-in-out;
}
.shoppingCart-enter-from {
  transform: translateX(calc(1920px + 512px));
}
.shoppingCart-enter-to {
  transform: translateX(1920px);
}
.shoppingCart-leave-to {
  transform: translateX(calc(1920px + 512px));
} */
.dropdown {
  display: none;
}
.user:hover .dropdown {
  display: block;
}
.router-link-exact-active {
  color: rgb(147 51 234) !important;
}
.dropdown > .router-link-exact-active {
  color: black !important;
}
</style>
