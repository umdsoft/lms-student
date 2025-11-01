<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <!-- Header -->
    <div class="mb-4 flex items-start justify-between">
      <div class="flex items-center gap-3">
        <div class="text-4xl">📖</div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ course.name }}</h3>
          <p v-if="course.level" class="text-sm text-gray-600">{{ course.level }}</p>
        </div>
      </div>

      <span
        :class="[
          'rounded-full px-3 py-1 text-xs font-medium',
          statusClasses
        ]"
      >
        {{ t(`courses.status.${course.status}`) }}
      </span>
    </div>

    <!-- Stats -->
    <div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
      <div class="flex items-center gap-1.5">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        <span>{{ course.enrolledStudents || 0 }} {{ t('courses.students') }}</span>
      </div>

      <div class="flex items-center gap-1.5">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
        <span>{{ course.lessonsCount || 0 }} {{ t('courses.lessons') }}</span>
      </div>

      <div class="flex items-center gap-1.5">
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <span>{{ course.duration || 0 }} {{ t('courses.months') }}</span>
      </div>
    </div>

    <!-- Price -->
    <div v-if="course.price" class="mb-4">
      <p class="text-base font-semibold text-gray-900">
        {{ formatPrice(course.price) }} so'm/oy
      </p>
    </div>

    <!-- Description -->
    <p v-if="course.description" class="mb-4 line-clamp-2 text-sm text-gray-600">
      {{ course.description }}
    </p>

    <!-- Actions -->
    <div v-if="canManage" class="flex gap-2 border-t border-gray-100 pt-4">
      <button
        type="button"
        class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        @click="$emit('edit', course)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        {{ t('common.actions.edit') }}
      </button>

      <button
        type="button"
        class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        @click="$emit('view-stats', course)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {{ t('courses.statistics') }}
      </button>

      <button
        type="button"
        class="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
        @click="$emit('delete', course)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  canManage: {
    type: Boolean,
    default: false
  }
});

defineEmits(['edit', 'delete', 'view-stats']);

const statusClasses = computed(() => {
  const statusMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    draft: 'bg-yellow-100 text-yellow-800'
  };
  return statusMap[props.course.status] || statusMap.draft;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};
</script>
