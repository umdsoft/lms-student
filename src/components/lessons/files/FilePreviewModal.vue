<template>
  <BaseModal
    :show="show"
    :title="file?.name || file?.originalName || t('lessons.files.preview')"
    size="2xl"
    max-height="90vh"
    @update:show="$emit('update:show', $event)"
  >
    <div class="min-h-[400px]">
      <!-- Image preview -->
      <div v-if="isImage" class="flex items-center justify-center">
        <img
          :src="fileUrl"
          :alt="file?.name"
          class="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
      </div>

      <!-- PDF preview -->
      <div v-else-if="isPdf" class="w-full h-[70vh]">
        <iframe
          :src="fileUrl"
          class="w-full h-full border-0 rounded-lg"
          :title="file?.name"
        ></iframe>
      </div>

      <!-- Video preview -->
      <div v-else-if="isVideo" class="flex items-center justify-center">
        <video
          :src="fileUrl"
          controls
          class="max-w-full max-h-[70vh] rounded-lg"
        >
          {{ t('lessons.files.videoNotSupported') }}
        </video>
      </div>

      <!-- Audio preview -->
      <div v-else-if="isAudio" class="flex flex-col items-center justify-center py-12">
        <div class="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        </div>
        <audio :src="fileUrl" controls class="w-full max-w-md">
          {{ t('lessons.files.audioNotSupported') }}
        </audio>
      </div>

      <!-- Unsupported file type -->
      <div v-else class="flex flex-col items-center justify-center py-12">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <p class="text-gray-600 mb-4">{{ t('lessons.files.previewNotAvailable') }}</p>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          @click="$emit('download', file)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          {{ t('lessons.files.download') }}
        </button>
      </div>
    </div>

    <!-- File info -->
    <div class="mt-4 p-4 bg-gray-50 rounded-lg">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <p class="text-gray-500">{{ t('lessons.files.info.name') }}</p>
          <p class="font-medium text-gray-900 truncate">{{ file?.name || file?.originalName }}</p>
        </div>
        <div>
          <p class="text-gray-500">{{ t('lessons.files.info.size') }}</p>
          <p class="font-medium text-gray-900">{{ formatFileSize(file?.size) }}</p>
        </div>
        <div>
          <p class="text-gray-500">{{ t('lessons.files.info.type') }}</p>
          <p class="font-medium text-gray-900">{{ fileExtension }}</p>
        </div>
        <div v-if="file?.createdAt">
          <p class="text-gray-500">{{ t('lessons.files.info.uploaded') }}</p>
          <p class="font-medium text-gray-900">{{ formatDate(file.createdAt) }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        @click="$emit('update:show', false)"
      >
        {{ t('common.actions.cancel') }}
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="$emit('download', file)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        {{ t('lessons.files.download') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  file: {
    type: [Object, null],
    default: null
  }
});

defineEmits(['update:show', 'download']);

const { t } = useI18n();

const fileUrl = computed(() => props.file?.url || props.file?.path || '');

const mimeType = computed(() => props.file?.mimeType || props.file?.type || '');

const isImage = computed(() => mimeType.value?.startsWith('image/'));
const isPdf = computed(() => mimeType.value?.includes('pdf'));
const isVideo = computed(() => mimeType.value?.startsWith('video/'));
const isAudio = computed(() => mimeType.value?.startsWith('audio/'));

const fileExtension = computed(() => {
  const name = props.file?.name || props.file?.originalName || '';
  return name.split('.').pop()?.toUpperCase() || 'FILE';
});

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
