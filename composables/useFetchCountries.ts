import { ref, watch } from 'vue';
import { useAsyncData } from 'nuxt/app';

export interface Country {
  name: {
    common: string;
  };
}

export function useFetchCountries() {
  // Fetch country data with error handling
  const { data, status, error } = useAsyncData<Country[]>(
    'countries',
    async () => {
      try {
        const response = await $fetch<Country[]>('https://restcountries.com/v3.1/all');
        return response;
      } catch (err) {
        console.error('API fetch error:', err); // Log errors
        throw new Error('Failed to fetch countries');
      }
    },
    {
      server: true, // Server-side rendering
    }
  );

  // watch(data, (newData) => {
  //   console.log('Fetched data:', newData);
  // });
  const countriesData = ref<string[]>([]);
  watch(data, (newData) => {
    if (newData) {
      countriesData.value = newData.map((country: Country) => country.name.common).sort();
    }
  });

  return {
    countriesData,
    status,
    error,
  };
}
