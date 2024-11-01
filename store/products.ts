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
  const productsList = ref<any>({});
  const getProducts = ref<any>({});
  const productById = ref<any>({});
  const getAllProducts = async () => {
    const data = await $fetch(`/api/products/get`);
    productsList.value = data;
  };
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
        newProduct.saleExpiration ? newProduct.saleExpiration : ""
      );
      formData.append("color", JSON.stringify(newProduct.color));
      formData.append("size", JSON.stringify(newProduct.size));
      formData.append("description", newProduct.description);
      Array.from(newProduct.product_images).forEach((file) => {
        formData.append("product_images", file);
      });
      const response = await $fetch("/api/products/post", {
        method: "post",
        body: formData,
      });
      toast.success("Created product successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const getProductById = async (id: string) => {
    try {
      const data = await $fetch(`/api/products/${id}`);
      productById.value = data;
    } catch (err) {
      
    }
  };
  const updateProduct = async (product: Product, name: string) => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("productCollection", product.collection.toString());
      formData.append("gender", product.gender);
      formData.append("quanity", product.quanity.toString());
      formData.append("price", product.price.toString());
      formData.append("sale", product.sale.toString());
      formData.append(
        "saleExpiration",
        product.saleExpiration ? product.saleExpiration : ""
      );
      formData.append("color", JSON.stringify(product.color));
      formData.append("size", JSON.stringify(product.size));
      formData.append("description", product.description);
      Array.from(product.product_images).forEach((file) => {
        formData.append("product_images", file);
      });
      const data = await $fetch(`/api/products/${name}`, {
        method: "put",
        body: formData,
      });
      toast.success("Updated product successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const addToWishlist = async (userId: string, productId: string) => {
    const formData = new FormData();
    formData.append("productId", productId);
    try {
      const response: any = await $fetch(`/api/users/${userId}`, {
        method: "put",
        body: formData,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromWishlist = async (userId: string, productId: string) => {
    const formData = new FormData();
    formData.append("productId", productId);
    try {
      const response: any = await $fetch(`/api/users/${userId}`, {
        method: "put",
        body: formData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const postProductReview = async (
    userId: string,
    productId: string,
    rate: number,
    comment: string,
    username: string,
    avatar: string
  ) => {
    try {
      const data: any = await $fetch(`/api/products/${productId}`, {
        method: 'post',
        body: {
          userId,
          rate,
          comment,
          username,
          avatar
        }
      })
      console.log(data)
    }
    catch(err) {
      toast.error('Error')
    }
  };
  return {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    addToWishlist,
    removeFromWishlist,
    postProductReview,
    productsList,
    getProducts,
    productById,
  };
});
