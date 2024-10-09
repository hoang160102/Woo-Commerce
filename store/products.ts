import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
interface Product {
  name: string;
  category: string;
  collection: string[];
  gender: string;
  quanity: number;
  price: number;
  sale: number;
  saleExpiration: string | null;
  color: string[];
  size: string[];
  description: string;
  product_images: FileList;
}
export const useProductStore = defineStore("product-store", () => {
  const productsList = ref<object>();
  const createProduct = async (newProduct: Product) => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("productCollection", newProduct.collection.toString());
      formData.append("gender", newProduct.gender);
      formData.append("quanity", newProduct.quanity.toString());
      formData.append("price", newProduct.price.toString());
      formData.append("sale", newProduct.sale.toString());
      formData.append(
        "saleExpiration",
        newProduct.saleExpiration
          ? newProduct.saleExpiration
          : ""
      );
      formData.append("color", JSON.stringify(newProduct.color));
      formData.append("size", JSON.stringify(newProduct.size));
      formData.append("description", newProduct.description);
      Array.from(newProduct.product_images).forEach((file) => {
        formData.append("product_images", file);
      });
      const response = await $fetch('/api/products/post', {
        method: 'post',
        body: formData
      })
      toast.success('Created product successfully')
    } catch (err) {
      console.log(err);
    }
  };
  return { createProduct };
});
