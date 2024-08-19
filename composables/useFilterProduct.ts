type Product = {
  id: number;
  name: string;
  inStock: number;
  price: number;
  sale: number;
  rating: number;
  category: string[];
  color: string[];
};

export default function useFilteredProducts(arr1: Product[]) {
  const minValue = ref<number>(0);
  const maxValue = ref<number>(100);
  const selectedCategory = ref<string[]>([]);
  const selectedColor = ref<string[]>([]);
  const isSaleProduct = ref<boolean>(false);
  const selectedRating = ref<number>(NaN);

  const filteredProducts = computed(() => {
    return arr1.filter((item: Product) => {
      const filterPrice = item.price >= minValue.value && item.price <= maxValue.value;
      const filterCategory =
        selectedCategory.value.length === 0 ||
        item.category.some((cate: string) =>
          selectedCategory.value.includes(cate)
        );
      const filterColor =
        selectedColor.value.length === 0 ||
        item.color.some((color: string) => selectedColor.value.includes(color));
      const filterRating =
        Number.isNaN(selectedRating.value) ||
        item.rating >= selectedRating.value;
      const filterSale = !isSaleProduct.value || item.sale < item.price;
  
      // Only skip all filters if no filters are applied, including the price filter
      const noFiltersApplied =
        selectedCategory.value.length === 0 &&
        selectedColor.value.length === 0 &&
        !isSaleProduct.value &&
        Number.isNaN(selectedRating.value) &&
        minValue.value === 0 &&
        maxValue.value === 100;
  
      return (
        noFiltersApplied ||
        (
          filterPrice &&
          filterCategory &&
          filterColor &&
          filterSale &&
          filterRating
        )
      );
    });
  });
  
  watch([minValue, maxValue], (newValues: number[]) => {
    minValue.value = newValues[0]
    maxValue.value = newValues[1]
  })
  watch(selectedCategory, (newValue: string[]) => {
    selectedCategory.value = newValue;
  });

  watch(selectedColor, (newValue: string[]) => {
    selectedColor.value = newValue;
  });

  watch(isSaleProduct, (newValue: boolean) => {
    isSaleProduct.value = newValue;
  });

  watch(selectedRating, (newValue: number) => {
    selectedRating.value = newValue;
  });

  return {
    minValue,
    maxValue,
    filteredProducts,
    selectedCategory,
    selectedColor,
    isSaleProduct,
    selectedRating,
  };
}
