export function useSearchItem(listItems: any) {
    const searchInput = ref<string>('');
    // Computed property to filter ListItems by name based on search input
    const filteredListItems = computed(() => {
      const keyword = searchInput.value.toLowerCase().trim();
      if (!keyword) return listItems.value;
      return listItems.value.filter((item: any) => item.name.toLowerCase().includes(keyword));
    });
  
    return {
      searchInput,
      filteredListItems,
    };
  }