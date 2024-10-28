export default function usePagination(
  sortedItems: Ref<any>,
  allItems: Ref<any>,
  rowsPer: number
) {
  const totalRecords = ref<number>(0)
  if (allItems.value) {
    totalRecords.value = allItems.value.length;
  }
  const rowsPerPage = ref<number>(rowsPer);
  const currentPage = ref<number>(0);
  const onPageChange = async (event: any) => {
    currentPage.value = event.page;
    rowsPerPage.value = event.rows; 
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const paginatedProducts = computed(() => {
    const start = currentPage.value * rowsPerPage.value;
    const end = start + rowsPerPage.value; 
    return sortedItems.value.slice(start, end);
  });
  watch(sortedItems, () => {
    currentPage.value = 0;
  });
  return {
    totalRecords,
    rowsPerPage,
    currentPage,
    onPageChange,
    paginatedProducts
  }
}
