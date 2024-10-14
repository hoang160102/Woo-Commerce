type Product = {
  '_id': string;
  name: string;
  price: number;
  sale: number;
  quanity: number;
  rating: number;
  size: string[];
  category: string;
  product_images: string[]
  color: string[];
  gender: string;
  productCollection: string[];
  createdAt: Date
};

export default function useFilteredProducts(arr1: Ref<Product[]>) {
  const minValue = ref<number>(0);
  const maxValue = ref<number>(100);
  const selectedCategory = ref<string[]>([]);
  const selectedCollection = ref<string[]>([]);
  const selectedColor = ref<string[]>([]);
  const selectedGender = ref<string[]>([]);
  const selectedSize = ref<string[]>([]);
  const isSaleProduct = ref<boolean>(false);
  const selectedRating = ref<number>(NaN);
  const filteredProducts = ref<Product[]>([])

  const filtered = computed(() => {
    if (arr1.value && arr1.value.length > 0) {
      return arr1.value.filter((item: Product) => {
        const filterPrice =
          item.price >= minValue.value && item.price <= maxValue.value;
        const filterGender =
          selectedGender.value.length === 0 ||
          selectedGender.value.includes(item.gender.toLowerCase());
        const filterCategory =
          selectedCategory.value.length === 0 ||
          selectedCategory.value.includes(item.category.toLowerCase());
        const filterCollection =
          selectedCollection.value.length === 0 ||
          item.productCollection.some((collect: string) => {
            return selectedCollection.value.includes(collect);
          });
        const filterSize =
          selectedSize.value.length === 0 ||
          item.size.some((s: string) => {
            return selectedSize.value.includes(s);
          });
        const filterColor =
          selectedColor.value.length === 0 ||
          item.color.some((color: string) =>
            selectedColor.value.includes(color)
          );
        const filterRating =
          Number.isNaN(selectedRating.value) ||
          item.rating >= selectedRating.value;
        const filterSale = !isSaleProduct.value || item.sale > 0;

        const noFiltersApplied =
          selectedCategory.value.length === 0 &&
          selectedCollection.value.length === 0 &&
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
            filterCollection &&
            filterSize &&
            filterColor &&
            filterSale &&
            filterRating)
        );
      });
    }
  });
  watch(filtered, (newVal: any) => {
    filteredProducts.value = newVal
  })
  watch([minValue, maxValue], (newValues: number[]) => {
    minValue.value = newValues[0];
    maxValue.value = newValues[1];
  });
  watch(selectedCategory, (newValue: string[]) => {
    selectedCategory.value = newValue;
  });
  watch(selectedCollection, (newValue: string[]) => {
    selectedCollection.value = newValue;
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
    selectedCollection,
    selectedGender,
    selectedSize,
    selectedColor,
    isSaleProduct,
    selectedRating,
  };
}
