<script setup lang="ts">
interface Product {
  name: string;
  category: string;
  productCollection: string[];
  gender: string;
  quanity: number;
  price: number;
  sale: number;
  saleExpiration: Date | null;
  color: string[];
  size: string[];
  description: string;
  product_images: string[];
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviews: object[];
}
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import Description from "~/components/Comment/Description.vue";
import Reviews from "~/components/Comment/Reviews.vue";
import { useProductStore } from "~/store/products";
import { useCartStore } from "~/store/cart";
const productStore = useProductStore();
const cartStore = useCartStore();
const { getProductById, addToWishlist, removeFromWishlist, getAllProducts } = productStore;
const { addProductToCart } = cartStore;
const cookie: any = useCookie("currentUser");
const allProducts = ref<any>(null)
const quanity = ref<number>(0);
const selectedColor = ref<string>("");
const selectedSize = ref<string>("");
const route: any = useRoute();
const product = ref<any>(null);
const isLoading = ref<boolean>(false);
const currentImage = ref<string>("");
const currentTab = ref("Description");
const isProductInWishlist = computed(() => {
  if (product.value) {
    return cookie.value.wishList.includes(product.value["_id"]);
  }
});
const currentTabComponent = computed(() => {
  switch (currentTab.value) {
    case "Description":
      return Description;
    case "Reviews":
      return Reviews;
    default:
      return null;
  }
});
provide("product", product);
const formattedSizes = computed(() => {
  if (product.value) {
    return product.value.size.map((size: string) => {
      if (size.toLowerCase().includes("xl")) {
        return size.toUpperCase();
      } else {
        return size.charAt(0).toUpperCase();
      }
    });
  }
});
watchEffect(async () => {
  isLoading.value = true;
  await getAllProducts();
  allProducts.value = productStore.productsList.products || [];
  await getProductById(getProductId.value);
  product.value = productStore.productById;
  if (product.value && product.value.product_images && product.value.product_images.length > 0) {
    currentImage.value = product.value.product_images[0];
  }
  isLoading.value = false;
});
const getProductId = computed(() => {
  if(allProducts.value) {
    const product = allProducts.value.find((prod: Product) => {
      return prod.name === route.params.name
    })
    return product['_id']
  }
})
const isFormValid = computed(() => {
  return (
    selectedColor.value.length > 0 &&
    selectedSize.value.length > 0 &&
    quanity.value > 0
  );
});
const checkStock = computed(() => {
  return product.value.quanity > 0 ? "In Stock" : "Out of stock";
});
const changeImage = async (img: string) => {
  currentImage.value = img;
};
const addToCart = async (product: any) => {
  event?.preventDefault();
  if (isFormValid.value) {
    await addProductToCart(
      cookie.value.cart,
      product["_id"],
      selectedColor.value,
      selectedSize.value,
      quanity.value,
      product.price
    );
  }
};
const toggleProduct = async (productId: string) => {
  const userCookie: any = useCookie("currentUser");

  // Add the product to the wishlist in the cookie (assuming you store wishlist data in the cookie)
  const currentWishlist = userCookie.value?.wishList || [];

  // Check if the product is already in the wishlist
  if (!isProductInWishlist.value) {
    // Add product to wishlist
    currentWishlist.push(productId);
    await addToWishlist(userCookie.value["_id"], productId);
  } else {
    // Remove product from wishlist
    const index = currentWishlist.indexOf(productId);
    if (index > -1) {
      currentWishlist.splice(index, 1);
      await removeFromWishlist(userCookie.value["_id"], productId);
    }
  }
  userCookie.value = {
    ...userCookie.value,
    wishList: currentWishlist,
  };
  refreshCookie("currentUser");
};
</script>
<template>
  <main v-if="product" class="main-content lg:px-10 px-5 py-10 bg-gray-100">
    <div class="container relative mx-auto xl:max-w-7xl">
      <div
        class="flex text-sm leading-none text-gray-400 gap-1 items-center mb-6"
      >
        <span
          ><a href="/" class="hover:text-primary">Home</a><span> /</span></span
        ><span
          ><a href="/products" class="hover:text-primary">Products</a
          ><span> /</span></span
        ><span></span
        ><span
          ><span class="text-gray-800">{{ product.name }}</span
          ><!----></span
        >
      </div>
      <div
        class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24"
      >
        <div v-if="product" class="relative flex-1">
          <img :src="currentImage" class="rounded-2xl w-full" alt="" />
          <span
            v-if="product.sale > 0"
            class="bg-red-500 absolute text-xs rounded-md text-white top-4 p-2 right-4"
            >-10 %</span
          >
          <div
            class="my-4 flex grid xl:grid-cols-6 md:grid-cols-4 grid-cols-5 gap-4"
          >
            <div v-for="image in product.product_images" :key="image">
              <img
                @click="changeImage(image)"
                :src="image"
                class="rounded-md cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="md:max-w-md xl:max-w-lg md:py-2 w-full">
          <div class="flex justify-between">
            <div class="name text-2xl font-light">{{ product.name }}</div>
            <div class="price flex">
              <div
                class="initial-price text-xl"
                :class="[
                  { 'line-through': product.sale > 0 },
                  { 'text-gray-400': product.sale > 0 },
                ]"
              >
                {{ product.price }}.00$
              </div>
              <div
                v-if="product.sale > 0"
                class="sale-price text-xl ml-2 font-medium"
              >
                {{
                  (
                    product.price -
                    (product.price / 100) * product.sale
                  ).toFixed(2)
                }}$
              </div>
            </div>
          </div>
          <div class="rate mt-2 flex">
            <div class="inline-flex items-center">
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
              <FontAwesomeIcon class="fa-sm text-gray-300" :icon="faStar" />
            </div>
            <div class="ml-2 count">(<span>0</span>)</div>
          </div>
          <div class="my-8 gap-2 grid">
            <div class="available">
              Availability: <span>{{ checkStock }}</span>
            </div>
          </div>
          <div class="pb-8 border-b-[1px] border-gray-300">
            {{ product.description }}
          </div>
          <form>
            <div class="space-y-4 mt-5">
              <div>
                <span class="font-bold">Color:</span>
                <span class="ml-2">{{
                  selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
                }}</span>
                <div class="flex space-x-4 mt-2">
                  <div
                    v-for="color in product.color"
                    :key="color"
                    class="flex items-center p-1 rounded-full"
                    :class="{ 'border-color': selectedColor === color }"
                  >
                    <input
                      type="radio"
                      :id="color"
                      v-model="selectedColor"
                      :value="color"
                      class="hidden"
                    />
                    <label
                      :for="color"
                      :style="{ backgroundColor: color }"
                      class="w-7 h-7 rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <span class="sr-only">{{ color }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <span class="font-bold">Size:</span>
                <span class="ml-2">{{
                  selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)
                }}</span>
                <div class="flex space-x-4 mt-2">
                  <div
                    v-for="size in formattedSizes"
                    :key="size"
                    class="flex items-center"
                  >
                    <input
                      type="radio"
                      :id="size"
                      v-model="selectedSize"
                      :value="size"
                      class="hidden"
                    />
                    <label
                      :for="size"
                      class="px-4 py-2 rounded-md border cursor-pointer"
                      :class="{
                        'bg-blue-500 text-white': selectedSize === size,
                        'bg-white text-black': selectedSize !== size,
                        'border-blue-500': selectedSize === size,
                      }"
                    >
                      {{ size }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 md:static md:bg-transparent bg-opacity-90 md:p-0"
            >
              <input
                type="number"
                min="1"
                aria-label="Quantity"
                v-model="quanity"
                class="bg-white border rounded-lg flex text-center p-2.5 w-20 gap-4 focus:outline-none"
              /><button
                @click="addToCart(product)"
                class="rounded-lg flex font-bold bg-gray-800 text-white text-center min-w-[150px] p-2.5 gap-4 items-center justify-center focus:outline-none flex-1 w-full md:max-w-xs"
              >
                <span
                  >Add to Cart -
                  <span
                    >{{
                      (
                        product.price -
                        (product.price / 100) * product.sale
                      ).toFixed(2)
                    }}$</span
                  > </span
                ><!---->
              </button>
            </div>
          </form>
          <div class="grid gap-2 my-8 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-500"
                >Categories: {{ product.category }}</span
              >
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500"
                >Collections: {{ product.productCollection.join(", ") }}</span
              >
            </div>
            <div
              @click="toggleProduct(product['_id'])"
              class="flex cursor-pointer items-center gap-2"
            >
              <FontAwesomeIcon
                :class="isProductInWishlist ? 'text-red-400' : 'text-gray-500'"
                :icon="faHeart"
              >
              </FontAwesomeIcon>
              <span class="text-gray-500">{{
                isProductInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
              }}</span>
            </div>
          </div>
          <div class="my-15">
            <nav class="border-b flex gap-8">
              <div
                :class="{
                  'border-violet-600 text-violet-600':
                    currentTab === 'Description',
                  'border-b-2': currentTab === 'Description',
                }"
                class="pb-6"
              >
                <button
                  @click="currentTab = `Description`"
                  type="button"
                  class="cursor-pointer text-lg"
                >
                  Description
                </button>
              </div>
              <div
                :class="{
                  'border-violet-600 text-violet-600': currentTab === 'Reviews',
                  'border-b-2': currentTab === 'Reviews',
                }"
                class="pb-6"
              >
                <button
                  @click="currentTab = `Reviews`"
                  type="button"
                  class="cursor-pointer text-lg"
                >
                  Reviews (<span>0</span>)
                </button>
              </div>
            </nav>
            <div class="tab-contents mt-8">
              <component :is="currentTabComponent"></component>
            </div>
          </div>
        </div>
      </div>
      <div class="my-15">
        <div class="mb-4 text-xl font-semibold">You May Also Like</div>
        <div class="grid gap-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <!-- <HomeProducts v-for="n in 5" :key="n"></HomeProducts> -->
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.border-color {
  border: 1px solid rgb(34, 117, 252);
}
</style>
