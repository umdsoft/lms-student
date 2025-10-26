import { ref, computed } from 'vue'

/**
 * Filters composable
 * @param {Object} initialFilters - Initial filter values
 * @returns {Object} Filter state and methods
 */
export function useFilters(initialFilters = {}) {
  const filters = ref({ ...initialFilters })

  const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some(value => {
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'string') return value.trim() !== ''
      if (typeof value === 'number') return value !== 0
      return value != null
    })
  })

  const activeFilterCount = computed(() => {
    return Object.values(filters.value).filter(value => {
      if (Array.isArray(value)) return value.length > 0
      if (typeof value === 'string') return value.trim() !== ''
      if (typeof value === 'number') return value !== 0
      return value != null
    }).length
  })

  const setFilter = (key, value) => {
    filters.value[key] = value
  }

  const clearFilter = (key) => {
    const initialValue = initialFilters[key]
    if (Array.isArray(initialValue)) {
      filters.value[key] = []
    } else if (typeof initialValue === 'number') {
      filters.value[key] = 0
    } else {
      filters.value[key] = ''
    }
  }

  const clearAllFilters = () => {
    Object.keys(filters.value).forEach(key => {
      clearFilter(key)
    })
  }

  const applyFilters = (data, filterFn) => {
    if (!hasActiveFilters.value) return data

    return data.filter(item => filterFn(item, filters.value))
  }

  const getQueryParams = () => {
    const params = {}
    Object.entries(filters.value).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params[key] = value.join(',')
      } else if (value != null && value !== '' && value !== 0) {
        params[key] = value
      }
    })
    return params
  }

  return {
    filters,
    hasActiveFilters,
    activeFilterCount,
    setFilter,
    clearFilter,
    clearAllFilters,
    applyFilters,
    getQueryParams
  }
}
