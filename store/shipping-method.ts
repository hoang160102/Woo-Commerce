import { useToast } from "vue-toastification";
const toast = useToast();
interface ShippingMethod {
  name: string;
  price: number;
}

export const useShippingMethodStore = defineStore(
  "shipping-method-store",
  () => {
    const allShippingMethods = ref<ShippingMethod[]>([])
    const getAllShippingMethods = async () => {
      const { data } = useFetch<ShippingMethod[]>("/api/shipping-method/get");
      allShippingMethods.value = data.value ?? []
    };
    const createShippingMethod = async (data: ShippingMethod) => {
      try {
        const response = await $fetch("/api/shipping-method/post", {
          method: "post",
          body: JSON.stringify(data),
        });
        toast.success("Adding Shipping Method successfully");
      } catch (err) {
        toast.error("Error " + err);
      }
    };
    return {
      createShippingMethod,
      getAllShippingMethods,
      allShippingMethods
    };
  }
);
