import { ref, computed } from 'vue'

/**
 * Sorting composable
 * @param {Object} options - Sorting options
 * @param {string} options.defaultSortBy - Default sort field
 * @param {string} options.defaultSortOrder - Default sort order (asc/desc)
 * @returns {Object} Sorting state and methods
 */
export function useSorting(options = {}) {
  const {
    defaultSortBy = '',
    defaultSortOrder = 'asc'
  } = options

  const sortBy = ref(defaultSortBy)
  const sortOrder = ref(defaultSortOrder)

  const isAscending = computed(() => sortOrder.value === 'asc')
  const isDescending = computed(() => sortOrder.value === 'desc')

  const toggleSort = (field) => {
    if (sortBy.value === field) {
      // Toggle order if same field
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      // Set new field with default order
      sortBy.value = field
      sortOrder.value = 'asc'
    }
  }

  const setSorting = (field, order = 'asc') => {
    sortBy.value = field
    sortOrder.value = order
  }

  const clearSorting = () => {
    sortBy.value = defaultSortBy
    sortOrder.value = defaultSortOrder
  }

  const sortData = (data, customComparator = null) => {
    if (!sortBy.value) return data

    const sorted = [...data].sort((a, b) => {
      if (customComparator) {
        return customComparator(a, b, sortBy.value, sortOrder.value)
      }

      const aValue = getNestedValue(a, sortBy.value)
      const bValue = getNestedValue(b, sortBy.value)

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder.value === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      // Number/Date comparison
      if (sortOrder.value === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return sorted
  }

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value?.[key], obj)
  }

  const getSortIcon = (field) => {
    if (sortBy.value !== field) return null
    return sortOrder.value === 'asc' ? 'arrow-up' : 'arrow-down'
  }

  return {
    sortBy,
    sortOrder,
    isAscending,
    isDescending,
    toggleSort,
    setSorting,
    clearSorting,
    sortData,
    getSortIcon
  }
}
