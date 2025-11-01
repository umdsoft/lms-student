<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
    <div class="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <div>
        <p class="text-sm font-medium text-blue-600">{{ t('directions.stats.total') }}</p>
        <p class="mt-2 text-3xl font-bold text-blue-900">{{ stats.total ?? 0 }}</p>
      </div>
      <AcademicCapIcon class="h-12 w-12 text-blue-400" />
    </div>

    <div class="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 p-6">
      <div>
        <p class="text-sm font-medium text-green-600">{{ t('directions.stats.active') }}</p>
        <p class="mt-2 text-3xl font-bold text-green-900">{{ stats.active ?? 0 }}</p>
      </div>
      <CheckCircleIcon class="h-12 w-12 text-green-400" />
    </div>

    <div class="flex items-center justify-between rounded-2xl border border-purple-200 bg-purple-50 p-6">
      <div>
        <p class="text-sm font-medium text-purple-600">{{ t('directions.stats.students') }}</p>
        <p class="mt-2 text-3xl font-bold text-purple-900">{{ stats.totalStudents ?? 0 }}</p>
      </div>
      <UsersIcon class="h-12 w-12 text-purple-400" />
    </div>

    <div class="flex items-center justify-between rounded-2xl border border-orange-200 bg-orange-50 p-6">
      <div>
        <p class="text-sm font-medium text-orange-600">{{ t('directions.stats.courses') }}</p>
        <p class="mt-2 text-3xl font-bold text-orange-900">{{ stats.totalCourses ?? 0 }}</p>
      </div>
      <BookOpenIcon class="h-12 w-12 text-orange-400" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import {
  AcademicCapIcon,
  CheckCircleIcon,
  UsersIcon,
  BookOpenIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      total: 0,
      active: 0,
      totalStudents: 0,
      totalCourses: 0
    })
  }
});

const { t } = useI18n();
</script>
