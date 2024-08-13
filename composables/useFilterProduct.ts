export default function (arr1: Array<string>) {
  const priceRange = ref<[number, number]>([0, 100]);
  const selectedCategory = ref<string[]>([]);
  const selectedColor = ref<string[]>([]);
  const isSaleProduct = ref<boolean>(false)
  const updatePriceRange = (range: [number, number]) => {
    priceRange.value = range;
  };
  const filteredProducts = computed(() => {
    return arr1.filter((item: string) => {
      const filterPrice =
        item.sale >= priceRange.value[0] && item.sale <= priceRange.value[1];
      const filterCategory = selectedCategory.value.length === 0 || item.category.some((cate: string) => 
        selectedCategory.value.includes(cate)
      );
      const filterColor = selectedColor.value.length === 0 || item.color.some((color: string) =>
        selectedColor.value.includes(color)
      );
      console.log(isSaleProduct.value)
      const filterSale = isSaleProduct.value ||  item.sale < item.price
      const noFiltersApplied = selectedCategory.value.length === 0 && selectedColor.value.length === 0 && isSaleProduct.value;
      return noFiltersApplied || (filterPrice && filterCategory && filterColor && filterSale);
    });
  });
  return {
    updatePriceRange,
    filteredProducts,
    selectedCategory,
    selectedColor,
    isSaleProduct
  };
}
