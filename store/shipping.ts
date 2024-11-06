import { useToast } from "vue-toastification";
const toast = useToast();
interface Shipping {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postal: string;
  phone: string;
  email: string;
  company: string;
}
export const useShippingStore = defineStore("shipping-store", () => {
  const shippingById = ref<any>(null);
  const getShip = async (id: string) => {
    try {
      const data = await $fetch(`/api/shipping/${id}`);
      shippingById.value = data;
    } 
    catch (err) {
      console.log(err);
    }
  };
  const updateShip = async (data: Shipping, id: string) => {
    try {
      const response = await $fetch(`/api/shipping/${id}`, {
        method: 'put',
        body: data,
      });
      toast.success('Updated shipping information successfully')
    }
    catch (err) {
      console.log(err);
    }
  };
  return { getShip, updateShip, shippingById };
});
