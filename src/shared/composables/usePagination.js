import { ref, computed } from 'vue'

/**
 * Pagination composable
 * @param {Object} options - Pagination options
 * @param {number} options.initialPage - Initial page number
 * @param {number} options.initialPerPage - Initial items per page
 * @returns {Object} Pagination state and methods
 */
export function usePagination(options = {}) {
  const {
    initialPage = 1,
    initialPerPage = 10
  } = options

  const currentPage = ref(initialPage)
  const perPage = ref(initialPerPage)
  const total = ref(0)

  const totalPages = computed(() => {
    return Math.ceil(total.value / perPage.value) || 1
  })

  const hasNext = computed(() => {
    return currentPage.value < totalPages.value
  })

  const hasPrev = computed(() => {
    return currentPage.value > 1
  })

  const startIndex = computed(() => {
    return (currentPage.value - 1) * perPage.value
  })

  const endIndex = computed(() => {
    return Math.min(startIndex.value + perPage.value, total.value)
  })

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNext.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (hasPrev.value) {
      currentPage.value--
    }
  }

  const setPerPage = (value) => {
    perPage.value = value
    currentPage.value = 1
  }

  const setTotal = (value) => {
    total.value = value
  }

  const reset = () => {
    currentPage.value = initialPage
    perPage.value = initialPerPage
    total.value = 0
  }

  const paginateArray = (array) => {
    return array.slice(startIndex.value, endIndex.value)
  }

  return {
    currentPage,
    perPage,
    total,
    totalPages,
    hasNext,
    hasPrev,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    setPerPage,
    setTotal,
    reset,
    paginateArray
  }
}
