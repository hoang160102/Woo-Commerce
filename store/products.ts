import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
interface Product {
    name: string;
    category: string;
    collection: string;
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
  }
export const useProductStore = defineStore("product-store", () => {
  const productsList = ref<object>();
  const createProduct = async (newProduct: Product) => {
    try {
        const formData = new FormData()
        formData.append('name', newProduct.name)
        formData.append('category', newProduct.category)
        formData.append('collection', newProduct.collection)
        formData.append('gender', newProduct.gender)
        formData.append('quanity', newProduct.quanity)
        formData.append('price', newProduct.price)
        formData.append('sale', newProduct.sale)
        formData.append('saleExpiration', newProduct.saleExpiration)
        formData.append('color', newProduct.color)
        formData.append('size', newProduct.size)
        formData.append('description', newProduct.description)
        formData.append('product_images', newProduct.product_images)
        const response = await $fetch('/api/products/post')
    }
    catch(err) {
        console.log(err)
    }
  };
  return { createProduct };
});
