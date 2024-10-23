<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useProductStore } from "~/store/products";
const user: any = useCookie("currentUser");
const productStore = useProductStore();
const { removeFromWishlist, getAllProducts } = productStore;
const allProducts = ref<any>(null);
watchEffect(async () => {
  await getAllProducts();
  allProducts.value = productStore.productsList.products || [];
});
const wishListProducts = computed(() => {
  if (allProducts.value) {
    return allProducts.value.filter((product: any) => {
      return user.value.wishList.includes(product["_id"]);
    });
  }
});
const deleteFromWishlist = async (productId: string) => {
  const userCookie: any = useCookie('currentUser')
  const currentWishlist = userCookie.value.wishList || []
  const index = currentWishlist.indexOf(productId)
  if (index > -1) {
    currentWishlist.splice(index, 1)
    await removeFromWishlist(userCookie.value['_id'], productId)
  }
  userCookie.value = {
    ...userCookie.value,
    wishList: currentWishlist
  }
  refreshCookie('currentUser')
}
</script>

<template>
  <main
    class="flex-1 w-full lg:my-8 rounded-lg max-w-screen-lg lg:sticky top-24"
  >
    <div
      class="bg-white rounded-lg shadow min-h-[400px] w-full p-8 md:p-12 justify-center items-start"
    >
      <div class="title flex justify-between">
        <div class="text-lg font-medium">Wishlist</div>
        <div v-if="wishListProducts" class="total text-gray-600">
          Items: {{ wishListProducts.length }}
        </div>
      </div>
      <div
        v-for="product in wishListProducts"
        :key="product['_id']"
        class="list-products mt-4"
      >
        <div class="product flex justify-between">
          <div class="info flex align-center">
            <img
              class="w-[64px] h-[75px] object-cover rounded-lg"
              :src="product.product_images[0]"
              alt=""
            />
            <div class="ml-5">
              <div class="name">{{ product.name }}</div>
              <div class="flex font-semibold">
                <span
                  :class="[
                    {
                      'line-through': product.sale !== 0,
                      'text-gray-400': product.sale !== 0,
                      'text-black': product.sale == 0,
                      'font-normal': product.sale !== 0,
                    },
                  ]"
                >
                  {{ product.price.toFixed(2) }}$
                </span>
                <span v-if="product.sale !== 0" class="ml-2"
                  >{{
                    (
                      product.price -
                      (product.price / 100) * product.sale
                    ).toFixed(2)
                  }}$</span
                >
              </div>
            </div>
          </div>
          <button>
            <FontAwesomeIcon @click="deleteFromWishlist(product['_id'])" :icon="faClose" class="fa-xl mr-4" />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
