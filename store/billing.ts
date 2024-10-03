import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
interface Billing {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postal: string;
  phone: string;
}
export const useBillingStore = defineStore("billing-store", () => {
  const billingById = ref<any>(null)
  const getBill = async (id: string) => {
    try {
      const data = await $fetch(`/api/billing/${id}`)
      billingById.value = data
    }
    catch(err) {
      console.log(err)
    }
  };
  const updateBill = async (data: Billing, id: string) => {
    try {
      const response = await $fetch(`/api/billing/${id}`, {
        method: 'put',
        body: data
      })
      toast.success('Updated billing successfully')
    }
    catch (err) {
      console.log(err)
    }
  };
  return { updateBill, getBill, billingById };
});
