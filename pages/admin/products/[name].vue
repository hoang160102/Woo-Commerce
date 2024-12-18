<script lang="ts" setup>
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
import { faUpload, faClose } from "@fortawesome/free-solid-svg-icons";
import { useProductStore } from "~/store/products";
import { useCategoryStore } from "~/store/categories";
import { useCollectionStore } from "~/store/collections";
import ProgressSpinner from "primevue/progressspinner";
definePageMeta({
  layout: "admin",
  middleware: "auth-admin"
});
const route: any = useRoute();

interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productItems: object[];
}

interface Collection {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productItems: object[];
}
const name = ref<string>("");
const category = ref<string>("");
const gender = ref<string>("");
const collection = ref<string[]>([]);
const price = ref<number>(0);
const quanity = ref<number>(0);
const sale = ref<number>(0);
const expirationDate = ref<string | null>(null);
const colorArr = ref<string[]>([]);
const sizeArr = ref<string[]>([]);
const description = ref<string>("");
const file = ref<FileList | undefined | null | any>(null);
const linkImg = ref<string[]>([]);
const categories = ref<Category[]>([]);
const collections = ref<Collection[]>([]);
const isSubmit = ref<boolean>(false);
const allProducts = ref<any>(null);
const storeCate = useCategoryStore();
const storeCollect = useCollectionStore();
const storeProduct = useProductStore();
const isLoading = ref<boolean>(false);
const { getAllCategories } = storeCate;
const { getAllCollections } = storeCollect;
const { getProductById, updateProduct, getAllProducts } = storeProduct;
const isFormValid = computed(() => {
  return (
    name.value.length > 0 &&
    name.value.length < 50 &&
    categories.value.length > 0 &&
    gender.value.length > 0 &&
    collection.value.length > 0 &&
    !isNaN(quanity.value) &&
    !isNaN(price.value) &&
    colorArr.value.length > 0 &&
    sizeArr.value.length > 0 &&
    description.value.length > 0 &&
    description.value.length <= 300 &&
    linkImg.value.length >= 4
  );
});


const imageErr = computed(() => {
  if (!linkImg.value && isSubmit.value) {
    return "text-red-500";
  }
  if (file.value) {
    if (linkImg.value.length < 4 && isSubmit.value) {
      return "text-red-500";
    } else {
      return "text-gray-700";
    }
  }
});

const descErr = computed(() => {
  return description.value.length > 300 ? "text-red-500" : "text-gray-500";
});

async function fetchCategories() {
  await getAllCategories();
  await getAllCollections();
  categories.value = storeCate.categoryList?.categories || [];
  collections.value = storeCollect.collectionsList?.collections || [];
}
fetchCategories();

watchEffect(async () => {
  isLoading.value = true;
  await getAllProducts();
  allProducts.value = storeProduct.productsList.products || [];
  await getProductById(getProductId.value);
  name.value = storeProduct.productById.name;
  category.value = storeProduct.productById.category;
  gender.value = storeProduct.productById.gender;
  collection.value = storeProduct.productById.productCollection;
  quanity.value = storeProduct.productById.quanity;
  sale.value = storeProduct.productById.sale;
  price.value = storeProduct.productById.price;
  colorArr.value = storeProduct.productById.color;
  sizeArr.value = storeProduct.productById.size;
  description.value = storeProduct.productById.description;
  linkImg.value = storeProduct.productById.product_images;
  if (storeProduct.productById.saleExpiration === null) {
    expirationDate.value = "";
  } else {
    expirationDate.value = new Date(storeProduct.productById.saleExpiration)
      .toISOString()
      .split("T")[0];
  }
  isLoading.value = false;
});

const getProductId = computed(() => {
  if (allProducts.value) {
    const product = allProducts.value.find((prod: Product) => {
      return prod.name === route.params.name;
    });
    return product["_id"];
  }
});

const handleUploadFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    file.value = target.files;
    linkImg.value = Array.from(target.files).map((file) =>
      URL.createObjectURL(file)
    );
  } else {
    file.value = null;
    linkImg.value = [];
  }
};

const addColor = async (color: string) => {
  const boolean: boolean = colorArr.value.some((item: string) => {
    return item === color;
  });
  if (!boolean) {
    colorArr.value.push(color.toLowerCase());
  }
};

const addSize = async (size: string) => {
  const boolean: boolean = sizeArr.value.some((item: string) => {
    return item === size;
  });
  if (!boolean) {
    sizeArr.value.push(size.toLowerCase());
  }
};

const deleteColor = async (color: string) => {
  colorArr.value = colorArr.value.filter((item: string) => {
    return item !== color;
  });
};

const deleteSize = async (size: string) => {
  sizeArr.value = sizeArr.value.filter((item: string) => {
    return item !== size;
  });
};

const submitData = async (event: Event) => {
  event.preventDefault();
  isLoading.value = true;
  isSubmit.value = true;
  if (isFormValid.value) {
    if (linkImg.value[0].includes('blob')) {
      await updateProduct(
        {
          name: name.value,
          category: category.value,
          collection: collection.value,
          gender: gender.value,
          quanity: quanity.value,
          price: price.value,
          sale: sale.value,
          saleExpiration: expirationDate.value,
          color: colorArr.value,
          size: sizeArr.value,
          description: description.value,
          product_images: file.value,
        },
        storeProduct.productById['_id']
      );
      isLoading.value = false
    }
    else if (linkImg.value[0].includes('cloudinary')) {
      await updateProduct(
        {
          name: name.value,
          category: category.value,
          collection: collection.value,
          gender: gender.value,
          quanity: quanity.value,
          price: price.value,
          sale: sale.value,
          saleExpiration: expirationDate.value,
          color: colorArr.value,
          size: sizeArr.value,
          description: description.value,
          product_images: [],
        },
        storeProduct.productById['_id']
      );
      isLoading.value = false
    }
  }
};
watch(expirationDate, (newDate: string | null) => {
  if (newDate) {
    expirationDate.value = newDate;
    const today = new Date().toISOString().split("T")[0];
    if (expirationDate.value < today) {
      sale.value = 0;
    }
  }
});
</script>

<template>
  <section class="mt-4">
    <div class="title mb-4 font-semibold text-2xl text-blue-500">
      Update Product
    </div>
    <form class="content grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="info-1 rounded-lg border px-5 py-3">
        <div class="form-control flex flex-col my-4">
          <label for="name" class="font-semibold mb-4"
            >Product name
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Product Name"
            class="outline-none rounded-lg px-5 py-3 text-sm border"
            v-model="name"
          />
          <span
            v-if="name.length > 50 && isSubmit"
            class="text-xs text-red-500 mt-2"
            >Do not exceed 50 characters when entering the product name.</span
          >
          <span
            v-if="name.length === 0 && isSubmit"
            class="text-xs text-red-500 mt-2"
          >
            Please enter the product name
          </span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="cate" class="font-semibold mb-3"
              >Category
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="category"
              class="px-3 cursor-pointer py-2 bg-white rounded-lg bg-gray-100 outline-none border"
            >
              <option disabled value="">Select category</option>
              <option
                v-for="cate in categories"
                :key="cate['_id']"
                :id="cate['_id']"
                :value="cate.name"
              >
                {{ cate.name }}
              </option>
            </select>
            <span
              v-if="category.length === 0 && isSubmit"
              class="text-red-500 text-xs mt-2"
              >Please choose the category</span
            >
          </div>
          <div class="form-control flex flex-col">
            <label for="gender" class="font-semibold mb-3"
              >Gender
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="gender"
              class="px-3 cursor-pointer py-2 bg-white rounded-lg bg-gray-100 outline-none border"
            >
              <option disabled value="">Select gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
            <span
              v-if="gender.length === 0 && isSubmit"
              class="text-red-500 text-xs mt-2"
              >Please choose gender</span
            >
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 gap-4">
          <div class="form-control flex flex-col">
            <label for="colelctions" class="font-semibold mb-3"
              >Colelctions
              <span class="text-red-500">*</span>
            </label>
            <div class="flex flex-wrap">
              <div
                class="form-control mr-6"
                v-for="collect in collections"
                :key="collect['_id']"
                :id="collect['_id']"
              >
                <input
                  class="cursor-pointer"
                  type="checkbox"
                  :id="collect.name"
                  :value="collect.name"
                  v-model="collection"
                />
                <label class="ml-1" :for="collect.name">{{
                  collect.name
                }}</label>
              </div>
            </div>
            <span
              v-if="collection.length === 0 && isSubmit"
              class="text-red-500 text-xs mt-2"
              >Please choose the collection</span
            >
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="price" class="font-semibold mb-3"
              >Price
              <span class="text-red-500">*</span>
            </label>
            <div class="relative rounded-lg border">
              <input
                type="number"
                placeholder="Price"
                v-model="price"
                class="outline-none px-5 py-3 text-sm w-[95%]"
              />
              <div class="absolute right-[10px] ml-2">$</div>
            </div>
            <span
              v-if="isNaN(price) && isSubmit"
              class="text-red-500 text-xs mt-2"
              >Please enter the price</span
            >
          </div>
          <div class="form-control flex flex-col">
            <label for="Quanity" class="font-semibold mb-3">
              Quanity
              <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter quanity"
              v-model="quanity"
              class="outline-none rounded-lg px-5 py-3 text-sm border"
            />
            <span
              v-if="isNaN(quanity) && isSubmit"
              class="text-red-500 text-xs mt-2"
              >Please enter the quanity</span
            >
          </div>
        </div>
        <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <div class="form-control flex flex-col">
            <label for="gender" class="font-semibold mb-3"
              >Sale
              <span class="text-gray-800">(Optional)</span>
            </label>
            <div class="relative rounded-lg border">
              <input
                v-model="sale"
                type="number"
                placeholder="Sale"
                class="outline-none w-[95%] px-5 py-3 text-sm"
              />
              <div class="absolute right-[10px]">%</div>
            </div>
          </div>
          <div class="form-control flex flex-col">
            <label for="date-expire" class="font-semibold mb-3"
              >Sale Expiration</label
            >
            <input
              :disabled="sale === 0 || !sale"
              type="date"
              id="birthday"
              name="birthday"
              class="outline-none rounded-lg px-5 py-3 text-sm border"
              :class="{
                'cursor-not-allowed': sale === 0 || !sale,
              }"
              v-model="expirationDate"
            />
          </div>
        </div>
        <ClientOnly>
          <div class="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
            <div>
              <ColorSizeInput
                type="Color"
                placeholder="Enter a color"
                :list="colorArr"
                :addItem="addColor"
                :deleteItem="deleteColor"
              ></ColorSizeInput>
              <span
                class="text-red-500 text-xs"
                v-if="colorArr.length === 0 && isSubmit"
                >Please enter the color</span
              >
            </div>
            <div>
              <ColorSizeInput
                type="Size"
                placeholder="Enter size"
                :list="sizeArr"
                :addItem="addSize"
                :deleteItem="deleteSize"
              ></ColorSizeInput>
              <span
                class="text-red-500 text-xs"
                v-if="sizeArr.length === 0 && isSubmit"
                >Please enter size</span
              >
            </div>
          </div>
        </ClientOnly>
        <div class="form-control my-4 flex flex-col">
          <label for="Description" class="font-semibold mb-3"
            >Description
            <span class="text-red-500">*</span>
          </label>
          <ClientOnly>
            <textarea
              v-model="description"
              class="px-3 w-full py-2 outline-none border rounded-lg h-[200px]"
              name="desc"
              id="desc"
              placeholder="Description"
            >
            </textarea>
          </ClientOnly>
          <span class="text-xs mt-2" :class="descErr"
            >Do not exceed 300 characters when entering the description.</span
          >
        </div>
      </div>
      <div class="info-1 rounded-lg border px-5 py-3">
        <div class="form-control flex flex-col my-4">
          <label for="image" class="font-semibold mb-4"
            >Upload images
            <span class="text-red-500">*</span>
          </label>
          <div class="upload-image flex-grow">
            <div class="item up-load">
              <div
                class="px-4 py-10 border-2 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-600"
              >
                <label for="file-upload" class="flex flex-col cursor-pointer">
                  <FontAwesomeIcon
                    :icon="faUpload"
                    class="fa-2xl text-blue-500"
                  />
                  <p class="text-gray-500">Drop your images here or select</p>
                  <span class="text-blue-500 underline">Click to browse</span>
                  <input
                    @change="handleUploadFiles"
                    multiple
                    id="file-upload"
                    type="file"
                    class="mt-4 hidden"
                    accept=".jpeg, .png, .jpg"
                  />
                </label>
              </div>
              <div class="mt-2 text-sm" :class="imageErr">
                You need to add at least 4 images.
              </div>
            </div>
            <div
              v-if="linkImg.length"
              class="mt-4 grid grid-cols-4 lg:grid-cols-3 gap-4"
            >
              <div
                v-for="(img, index) in linkImg"
                :key="index"
                class="relative"
              >
                <img
                  :src="img"
                  class="w-full h-42 object-cover rounded-lg"
                  alt="Preview"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          class="flex px-15 bg-blue-500 text-white font-semibold text-xl py-3 rounded-lg outline-none"
          @click="submitData"
        >
          Save
          <ProgressSpinner v-if="isLoading" />
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.absolute {
  top: 50%;
  transform: translateY(-50%);
}
</style>
