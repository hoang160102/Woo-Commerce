type Product = {
  id: number;
  name: string;
  inStock: number;
  price: number;
  sale: number;
  rating: number;
  size: string[];
  category: string[];
  color: string[];
  gender: string[];
};

export default function useFilteredProducts(arr1: Product[]) {
  const minValue = ref<number>(0);
  const maxValue = ref<number>(100);
  const selectedCategory = ref<string[]>([]);
  const selectedColor = ref<string[]>([]);
  const selectedGender = ref<string[]>([]);
  const selectedSize = ref<string[]>([]);
  const isSaleProduct = ref<boolean>(false);
  const selectedRating = ref<number>(NaN);

  const filteredProducts = computed(() => {
    return arr1.filter((item: Product) => {
      const filterPrice =
        item.price >= minValue.value && item.price <= maxValue.value;
      const filterGender =
        selectedGender.value.length === 0 ||
        item.gender.some((gen: string) => selectedGender.value.includes(gen));
      const filterCategory =
        selectedCategory.value.length === 0 ||
        item.category.some((cate: string) =>
          selectedCategory.value.includes(cate)
        );
      const filterSize =
        selectedSize.value.length === 0 ||
        item.size.some((s: string) => {
          return selectedSize.value.includes(s);
        });
      const filterColor =
        selectedColor.value.length === 0 ||
        item.color.some((color: string) => selectedColor.value.includes(color));
      const filterRating =
        Number.isNaN(selectedRating.value) ||
        item.rating >= selectedRating.value;
      const filterSale = !isSaleProduct.value || item.sale < item.price;

      const noFiltersApplied =
        selectedCategory.value.length === 0 &&
        selectedGender.value.length === 0 &&
        selectedSize.value.length === 0 &&
        selectedColor.value.length === 0 &&
        !isSaleProduct.value &&
        Number.isNaN(selectedRating.value) &&
        minValue.value === 0 &&
        maxValue.value === 100;

      return (
        noFiltersApplied ||
        (filterPrice &&
          filterGender &&
          filterCategory &&
          filterSize &&
          filterColor &&
          filterSale &&
          filterRating)
      );
    });
  });

  watch([minValue, maxValue], (newValues: number[]) => {
    minValue.value = newValues[0];
    maxValue.value = newValues[1];
  });
  watch(selectedCategory, (newValue: string[]) => {
    selectedCategory.value = newValue;
  });
  watch(selectedGender, (newValue: string[]) => {
    selectedGender.value = newValue;
  });
  watch(selectedSize, (newValue: string[]) => {
    selectedSize.value = newValue;
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
    selectedGender,
    selectedSize,
    selectedColor,
    isSaleProduct,
    selectedRating,
  };
}
