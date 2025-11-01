<template>
  <div class="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div class="md:col-span-2">
        <label for="direction-search" class="sr-only">{{ t('directions.filters.searchPlaceholder') }}</label>
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="direction-search"
            v-model="localFilters.search"
            type="search"
            :placeholder="t('directions.filters.searchPlaceholder')"
            class="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            @input="debouncedSearch"
          />
        </div>
      </div>

      <div>
        <label for="direction-status" class="block text-sm font-medium text-gray-700 mb-2">{{ t('directions.form.status') }}</label>
        <select
          id="direction-status"
          v-model="localFilters.status"
          class="block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          @change="handleFilterChange"
        >
          <option value="">{{ t('directions.filters.allStatuses') }}</option>
          <option value="active">{{ t('directions.status.active') }}</option>
          <option value="inactive">{{ t('directions.status.inactive') }}</option>
        </select>
      </div>

      <div>
        <label for="direction-sort" class="block text-sm font-medium text-gray-700 mb-2">{{ t('directions.filters.sortBy.label') }}</label>
        <div class="flex items-center gap-2">
          <select
            id="direction-sort"
            v-model="localFilters.sortBy"
            class="block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            @change="handleFilterChange"
          >
            <option value="name">{{ t('directions.filters.sortBy.name') }}</option>
            <option value="displayOrder">{{ t('directions.filters.sortBy.displayOrder') }}</option>
            <option value="createdAt">{{ t('directions.filters.sortBy.createdAt') }}</option>
          </select>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50"
            :aria-label="sortOrderLabel"
            @click="toggleSortOrder"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7l4-4 4 4m0 10l-4 4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-end justify-end">
        <button
          type="button"
          class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          @click="handleClear"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {{ t('directions.filters.clear') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
    default: () => ({
      search: '',
      status: '',
      sortBy: 'displayOrder',
      sortOrder: 'asc'
    })
  }
});

const emit = defineEmits(['update:filters', 'search', 'clear']);

const { t } = useI18n();

const localFilters = ref({
  search: props.filters.search || '',
  status: props.filters.status || '',
  sortBy: props.filters.sortBy || 'displayOrder',
  sortOrder: props.filters.sortOrder || 'asc'
});

watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = {
      search: newFilters.search || '',
      status: newFilters.status || '',
      sortBy: newFilters.sortBy || 'displayOrder',
      sortOrder: newFilters.sortOrder || 'asc'
    };
  },
  { deep: true }
);

let searchTimeout = null;

const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    handleFilterChange();
  }, 500);
};

const handleFilterChange = () => {
  emit('update:filters', { ...localFilters.value });
  emit('search');
};

const handleClear = () => {
  localFilters.value = {
    search: '',
    status: '',
    sortBy: 'displayOrder',
    sortOrder: 'asc'
  };
  emit('clear');
};

const toggleSortOrder = () => {
  localFilters.value.sortOrder = localFilters.value.sortOrder === 'asc' ? 'desc' : 'asc';
  handleFilterChange();
};

const sortOrderLabel = computed(() =>
  localFilters.value.sortOrder === 'asc'
    ? t('common.sort.asc', 'Ascending')
    : t('common.sort.desc', 'Descending')
);
</script>
