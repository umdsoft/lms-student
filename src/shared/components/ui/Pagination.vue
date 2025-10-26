<template>
  <div v-if="totalPages > 1" class="pagination">
    <!-- Previous Button -->
    <button
      type="button"
      class="pagination-button"
      :class="{ 'pagination-button-disabled': currentPage === 1 }"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span v-if="showText" class="ml-2">Oldingi</span>
    </button>

    <!-- Page Numbers -->
    <div class="pagination-pages">
      <button
        v-for="page in visiblePages"
        :key="page"
        type="button"
        class="pagination-page"
        :class="{
          'pagination-page-active': page === currentPage,
          'pagination-page-ellipsis': page === '...'
        }"
        :disabled="page === '...'"
        @click="page !== '...' && goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      type="button"
      class="pagination-button"
      :class="{ 'pagination-button-disabled': currentPage === totalPages }"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <span v-if="showText" class="mr-2">Keyingi</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisiblePages: {
    type: Number,
    default: 7
  },
  showText: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:currentPage', 'page-change'])

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('page-change', page)
  }
}

const visiblePages = computed(() => {
  const pages = []
  const totalPages = props.totalPages
  const currentPage = props.currentPage
  const maxVisible = props.maxVisiblePages

  if (totalPages <= maxVisible) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)

    const start = Math.max(2, currentPage - Math.floor(maxVisible / 2) + 1)
    const end = Math.min(totalPages - 1, start + maxVisible - 4)

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...')
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('...')
    }

    // Show last page
    pages.push(totalPages)
  }

  return pages
})
</script>

<style scoped>
.pagination {
  @apply flex items-center justify-center gap-2;
}

.pagination-button {
  @apply inline-flex items-center;
  @apply px-3 py-2 rounded-md;
  @apply text-sm font-medium;
  @apply text-gray-700 bg-white border border-gray-300;
  @apply hover:bg-gray-50;
  @apply transition-colors duration-200;
}

.pagination-button-disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply hover:bg-white;
}

.pagination-pages {
  @apply flex items-center gap-1;
}

.pagination-page {
  @apply w-10 h-10 flex items-center justify-center;
  @apply rounded-md text-sm font-medium;
  @apply text-gray-700 bg-white border border-gray-300;
  @apply hover:bg-gray-50;
  @apply transition-colors duration-200;
}

.pagination-page-active {
  @apply bg-blue-600 text-white border-blue-600;
  @apply hover:bg-blue-700;
}

.pagination-page-ellipsis {
  @apply border-0 bg-transparent;
  @apply hover:bg-transparent cursor-default;
}
</style>
