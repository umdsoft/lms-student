<template>
  <div
    class="relative border-2 border-dashed rounded-xl p-8 transition-all duration-200"
    :class="[
      isDragging
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-300 hover:border-gray-400 bg-gray-50',
      isUploading ? 'opacity-75 pointer-events-none' : ''
    ]"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <input
      ref="fileInput"
      type="file"
      :multiple="multiple"
      :accept="acceptTypes"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      @change="handleFileSelect"
    />

    <div class="text-center">
      <!-- Upload icon -->
      <div class="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
      </div>

      <!-- Text -->
      <p class="text-sm font-medium text-gray-700">
        {{ t('lessons.files.dropzone.title') }}
      </p>
      <p class="mt-1 text-xs text-gray-500">
        {{ t('lessons.files.dropzone.subtitle') }}
      </p>

      <!-- Allowed types -->
      <div class="mt-4 flex flex-wrap justify-center gap-2">
        <span
          v-for="type in allowedTypeLabels"
          :key="type"
          class="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-600"
        >
          {{ type }}
        </span>
      </div>

      <!-- Max size -->
      <p class="mt-3 text-xs text-gray-400">
        {{ t('lessons.files.dropzone.maxSize', { size: maxSizeFormatted }) }}
      </p>
    </div>

    <!-- Upload progress overlay -->
    <div
      v-if="isUploading"
      class="absolute inset-0 bg-white/90 rounded-xl flex flex-col items-center justify-center"
    >
      <div class="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mb-4"></div>
      <p class="text-sm font-medium text-gray-700">{{ t('lessons.files.uploading') }}</p>
      <div class="w-48 mt-3">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
        <p class="mt-1 text-xs text-gray-500 text-center">{{ uploadProgress }}%</p>
      </div>
    </div>
  </div>

  <!-- Selected files preview -->
  <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
    <div
      v-for="file in selectedFiles"
      :key="file.id"
      class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
    >
      <!-- File icon -->
      <div
        class="w-10 h-10 rounded-lg flex items-center justify-center"
        :class="getFileIconClass(file.type)"
      >
        <span class="text-xs font-bold uppercase">{{ getFileExtension(file.name) }}</span>
      </div>

      <!-- File info -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
        <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
      </div>

      <!-- Status -->
      <div v-if="file.status === 'uploading'" class="w-16">
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div
            class="bg-blue-600 h-1.5 rounded-full"
            :style="{ width: `${file.progress}%` }"
          ></div>
        </div>
      </div>
      <svg v-else-if="file.status === 'success'" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <svg v-else-if="file.status === 'error'" class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>

      <!-- Remove button -->
      <button
        v-if="file.status === 'pending'"
        type="button"
        class="p-1 text-gray-400 hover:text-red-500 transition-colors"
        @click="removeFile(file.id)"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Error message -->
  <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFileUpload } from '@/composables/useFileUpload';

const props = defineProps({
  multiple: {
    type: Boolean,
    default: true
  },
  maxSize: {
    type: Number,
    default: 50 * 1024 * 1024 // 50MB
  },
  allowedTypes: {
    type: Array,
    default: () => [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mpeg',
      'audio/wav'
    ]
  }
});

const emit = defineEmits(['upload', 'remove']);

const { t } = useI18n();

const {
  files: selectedFiles,
  isDragging,
  isUploading,
  uploadProgress,
  error,
  handleFileSelect,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  removeFile,
  clearFiles,
  formatFileSize
} = useFileUpload({
  maxSize: props.maxSize,
  allowedTypes: props.allowedTypes,
  multiple: props.multiple,
  onUpload: (files) => emit('upload', files)
});

const acceptTypes = computed(() => props.allowedTypes.join(','));

const maxSizeFormatted = computed(() => {
  if (props.maxSize >= 1024 * 1024) {
    return `${(props.maxSize / (1024 * 1024)).toFixed(0)} MB`;
  }
  return `${(props.maxSize / 1024).toFixed(0)} KB`;
});

const allowedTypeLabels = computed(() => {
  const labels = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WEBP',
    'video/mp4': 'MP4',
    'video/webm': 'WEBM',
    'audio/mpeg': 'MP3',
    'audio/wav': 'WAV'
  };
  return [...new Set(props.allowedTypes.map(t => labels[t] || t))];
});

const getFileExtension = (filename) => {
  return filename.split('.').pop()?.toUpperCase() || 'FILE';
};

const getFileIconClass = (mimeType) => {
  if (mimeType?.startsWith('image/')) return 'bg-purple-100 text-purple-600';
  if (mimeType?.startsWith('video/')) return 'bg-pink-100 text-pink-600';
  if (mimeType?.startsWith('audio/')) return 'bg-orange-100 text-orange-600';
  if (mimeType?.includes('pdf')) return 'bg-red-100 text-red-600';
  if (mimeType?.includes('word') || mimeType?.includes('document')) return 'bg-blue-100 text-blue-600';
  if (mimeType?.includes('excel') || mimeType?.includes('spreadsheet')) return 'bg-green-100 text-green-600';
  return 'bg-gray-100 text-gray-600';
};

// Expose methods to parent
defineExpose({
  selectedFiles,
  clearFiles,
  isUploading
});
</script>
