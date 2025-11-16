<template>
  <div class="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div class="flex flex-wrap gap-4 items-end">
      <!-- Status Filter -->
      <div class="flex-shrink-0 w-full sm:w-48">
        <label for="direction-status" class="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          id="direction-status"
          v-model="localFilters.status"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 bg-white hover:bg-gray-50 transition-colors text-sm"
          @change="handleFilterChange"
        >
          <option value="">Barchasi</option>
          <option value="active">Aktiv</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <!-- Sort Order -->
      <div class="flex-shrink-0 w-full sm:w-48">
        <label for="direction-sort" class="block text-sm font-medium text-gray-700 mb-2">
          Tartib
        </label>
        <div class="flex items-center gap-2">
          <select
            id="direction-sort"
            v-model="localFilters.sortBy"
            class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   bg-white hover:bg-gray-50 transition-colors text-sm"
            @change="handleFilterChange"
          >
            <option value="name">Nom (A-Z)</option>
            <option value="displayOrder">Tartib raqami</option>
            <option value="createdAt">Sana</option>
          </select>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2.5 text-gray-600 transition-colors hover:bg-gray-100"
            :aria-label="sortOrderLabel"
            :title="sortOrderLabel"
            @click="toggleSortOrder"
          >
            <svg
              class="h-4 w-4 transition-transform"
              :class="{ 'rotate-180': localFilters.sortOrder === 'desc' }"
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

      <!-- Search Input -->
      <div class="flex-1 min-w-[200px]">
        <label for="direction-search" class="block text-sm font-medium text-gray-700 mb-2">
          Qidirish
        </label>
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="direction-search"
            v-model="localFilters.search"
            type="search"
            placeholder="Yo'nalish nomi bo'yicha qidiring..."
            class="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   bg-white placeholder-gray-400 text-sm"
            @input="debouncedSearch"
          />
        </div>
      </div>

      <!-- Clear Filters Button (only when filters active) -->
      <div v-if="hasActiveFilters" class="flex-shrink-0">
        <button
          type="button"
          class="px-4 py-2.5 text-gray-600 hover:text-gray-800
                 hover:bg-gray-100 rounded-lg transition-colors
                 font-medium text-sm border border-gray-300"
          @click="handleClear"
        >
          <svg class="inline h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Tozalash
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

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return !!(
    localFilters.value.search ||
    localFilters.value.status ||
    localFilters.value.sortBy !== 'displayOrder' ||
    localFilters.value.sortOrder !== 'asc'
  );
});
</script>
