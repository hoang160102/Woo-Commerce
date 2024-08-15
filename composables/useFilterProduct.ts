export default function (arr1: Array<object>) {
  const priceRange = ref<[number, number]>([0, 100]);
  const selectedCategory = ref<string[]>([]);
  const selectedColor = ref<string[]>([]);
  const isSaleProduct = ref<boolean>(false)
  const selectedRating = ref<number>(NaN)
  const updatePriceRange = (range: [number, number]) => {
    priceRange.value = range;
  };
  const filteredProducts = computed(() => {
    return arr1.filter((item: object) => {
      const filterPrice =
        item.sale >= priceRange.value[0] && item.sale <= priceRange.value[1];
      const filterCategory = selectedCategory.value.length === 0 || item.category.some((cate: string) => 
        selectedCategory.value.includes(cate)
      );
      const filterColor = selectedColor.value.length === 0 || item.color.some((color: string) =>
        selectedColor.value.includes(color)
      );
      const filterRating = Number.isNaN(selectedRating.value) || item.rating >= selectedRating.value
      const filterSale = isSaleProduct.value ||  item.sale < item.price
      const noFiltersApplied = selectedCategory.value.length === 0 && selectedColor.value.length === 0 && isSaleProduct.value && Number.isNaN(selectedRating.value);
      return noFiltersApplied || (filterPrice && filterCategory && filterColor && filterSale && filterRating);
    });
  });
  watch(selectedCategory, (newValue: Array<string>) => {
    selectedCategory.value = newValue
  })
  watch(selectedColor, (newValue: Array<string>) => {
    selectedColor.value = newValue
  })
  watch(isSaleProduct, (newValue: boolean) => {
    isSaleProduct.value = newValue
  })
  watch(selectedRating, (newValue: number) => {
    selectedRating.value = newValue
  })
  return {
    updatePriceRange,
    filteredProducts,
    selectedCategory,
    selectedColor,
    isSaleProduct,
    selectedRating
  };
}
