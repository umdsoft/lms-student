<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
    <!-- Total Users Card -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-blue-600">{{ t('users.stats.total') }}</p>
          <p class="mt-2 text-3xl font-bold text-blue-900">{{ formatNumber(stats.total) }}</p>
        </div>
        <div class="flex-shrink-0">
          <svg class="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Active Users Card -->
    <div class="bg-green-50 border border-green-200 rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-green-600">{{ t('users.stats.active') }}</p>
          <p class="mt-2 text-3xl font-bold text-green-900">{{ formatNumber(stats.active) }}</p>
        </div>
        <div class="flex-shrink-0">
          <svg class="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Students Card -->
    <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-purple-600">{{ t('users.stats.students') }}</p>
          <p class="mt-2 text-3xl font-bold text-purple-900">{{ formatNumber(stats.byRole?.student || 0) }}</p>
        </div>
        <div class="flex-shrink-0">
          <svg class="h-12 w-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Teachers Card -->
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-orange-600">{{ t('users.stats.teachers') }}</p>
          <p class="mt-2 text-3xl font-bold text-orange-900">{{ formatNumber(stats.byRole?.teacher || 0) }}</p>
        </div>
        <div class="flex-shrink-0">
          <svg class="h-12 w-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      active: 0,
      inactive: 0,
      blocked: 0,
      byRole: {
        student: 0,
        teacher: 0,
        admin: 0
      }
    })
  }
});

const { t } = useI18n();

/**
 * Format number with thousands separator
 */
const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return num.toLocaleString('uz-UZ');
};
</script>
