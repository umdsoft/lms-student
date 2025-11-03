<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">
      {{ t('courses.lessons.filesTitle') }}
    </h2>

    <div v-if="files && files.length" class="space-y-3">
      <a
        v-for="file in files"
        :key="file.id"
        :href="file.url"
        download
        target="_blank"
        class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <p class="font-medium text-gray-900">{{ file.name }}</p>
            <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</p>
          </div>
        </div>
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </a>
    </div>

    <div v-else class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
      <p class="mt-4 text-sm text-gray-600">{{ t('courses.lessons.noFiles') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  files: {
    type: Array,
    default: () => []
  }
});

const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
</script>
