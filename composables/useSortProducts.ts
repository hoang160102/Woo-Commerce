type Product = {
  _id: string;
  name: string;
  price: number;
  sale: number;
  quanity: number;
  rating: number;
  size: string[];
  category: string;
  product_images: string[];
  color: string[];
  gender: string;
  productCollection: string[];
  createdAt: Date;
};
export default function useSortProducts(arr: Ref<Product[] | undefined>) {
  const selectedOrder = ref<string>("default");
  const sortedProducts = computed(() => {
    const defaultOrder = arr.value
    if (selectedOrder.value === "default") {
      return defaultOrder;
    }
    let products: any = arr.value;
    if (selectedOrder.value === "latest") {
      products.sort(
        (a: Product, b: Product) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (selectedOrder.value === "price") {
      products.sort(
        (a: Product, b: Product) =>
          a.price -
          (a.price / 100) * a.sale -
          (b.price - (b.price / 100) * b.sale)
      );
    } else if (selectedOrder.value === "alphabetically") {
      products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
    } else if (selectedOrder.value === "rating") {
      products.sort((a: Product, b: Product) => b.rating - a.rating);
    }
    return products;
  });
  return { sortedProducts, selectedOrder };
}
