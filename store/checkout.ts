import { useToast } from "vue-toastification";
const toast = useToast();
export const useCheckoutStore = defineStore("checkout-store", () => {
  const checkoutCart = async (items: any, shipPrice: number, id: string) => {
    try {
      const response: any = await $fetch("/api/stripe/checkout", {
        method: "POST",
        body: {
          items,
          shippingPrice: shipPrice,
          metadat: id
        },
      });
      window.location.href = response.url
    } catch (err) {
      toast.error("Error: " + err);
    }
  };
  return { checkoutCart };
});
