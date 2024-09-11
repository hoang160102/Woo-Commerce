import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast()
export const useProductStore = defineStore("product-store", () => {
    const productsList = ref<object>()
    const createProduct = async (newProduct: object) => {
        
    }
})