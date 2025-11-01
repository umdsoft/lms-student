<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <!-- Search Input (2 columns on desktop) -->
      <div class="md:col-span-2">
        <label for="search" class="sr-only">{{ t('users.filters.searchPlaceholder') }}</label>
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            id="search"
            v-model="localFilters.search"
            type="text"
            :placeholder="t('users.filters.searchPlaceholder')"
            class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            @input="debouncedSearch"
          />
        </div>
      </div>

      <!-- Role Filter -->
      <div>
        <label for="role" class="sr-only">{{ t('users.table.role') }}</label>
        <select
          id="role"
          v-model="localFilters.role"
          class="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          @change="handleFilterChange"
        >
          <option value="">{{ t('users.filters.allRoles') }}</option>
          <option value="student">{{ t('users.roles.student') }}</option>
          <option value="teacher">{{ t('users.roles.teacher') }}</option>
          <option value="admin">{{ t('users.roles.admin') }}</option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label for="status" class="sr-only">{{ t('users.table.status') }}</label>
        <select
          id="status"
          v-model="localFilters.status"
          class="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          @change="handleFilterChange"
        >
          <option value="">{{ t('users.filters.allStatuses') }}</option>
          <option value="active">{{ t('users.status.active') }}</option>
          <option value="inactive">{{ t('users.status.inactive') }}</option>
          <option value="blocked">{{ t('users.status.blocked') }}</option>
        </select>
      </div>
    </div>

    <!-- Clear Filters Button -->
    <div v-if="hasActiveFilters" class="mt-4 flex justify-end">
      <button
        type="button"
        class="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900"
        @click="handleClear"
      >
        <svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        {{ t('users.filters.clear') }}
      </button>
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
      role: '',
      status: ''
    })
  }
});

const emit = defineEmits(['update:filters', 'search', 'clear']);

const { t } = useI18n();

// Local filters state
const localFilters = ref({
  search: props.filters.search || '',
  role: props.filters.role || '',
  status: props.filters.status || ''
});

// Watch for external filter changes
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = {
      search: newFilters.search || '',
      role: newFilters.role || '',
      status: newFilters.status || ''
    };
  },
  { deep: true }
);

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return localFilters.value.search || localFilters.value.role || localFilters.value.status;
});

// Debounce timer
let searchTimeout = null;

/**
 * Debounced search handler
 * Waits 500ms after user stops typing before triggering search
 */
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    handleFilterChange();
  }, 500);
};

/**
 * Handle filter change
 * Emits updated filters to parent
 */
const handleFilterChange = () => {
  emit('update:filters', { ...localFilters.value });
  emit('search');
};

/**
 * Clear all filters
 */
const handleClear = () => {
  localFilters.value = {
    search: '',
    role: '',
    status: ''
  };
  emit('clear');
};
</script>
