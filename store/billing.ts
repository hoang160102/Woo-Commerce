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
  const getBill = async () => {};
  const updateBill = async (data: Billing, id: string) => {
    console.log(data)
    console.log(id)
  };
  return { updateBill, getBill };
});
