<template>
  <div
    class="group relative bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md hover:border-gray-200 transition-all duration-200"
  >
    <!-- Delete button (top-left, visible on hover) -->
    <button
      v-if="canDelete"
      type="button"
      class="absolute top-2 left-2 z-10 p-1.5 bg-white/90 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
      @click.stop="$emit('delete', file)"
      :title="t('lessons.files.delete')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>

    <!-- Type badge (top-right) -->
    <div
      class="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
      :class="typeBadgeClass"
    >
      {{ fileExtension }}
    </div>

    <!-- File icon area -->
    <div
      class="flex items-center justify-center h-16 mb-3 rounded-lg cursor-pointer"
      :class="iconBackgroundClass"
      @click="handleClick"
    >
      <!-- Image preview -->
      <img
        v-if="isImage && file.url && !imageError"
        :src="file.url"
        :alt="file.name"
        class="h-full w-full object-cover rounded-lg"
        @error="imageError = true"
      />

      <!-- File type icon -->
      <div v-else class="flex flex-col items-center justify-center">
        <!-- PDF Icon -->
        <svg v-if="isPdf" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 14.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5zm2 0v2c0 .55-.45 1-1 1H8v-4h1.5c.55 0 1 .45 1 1zm1.5 3V11h2c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5h-2zm-3-3v2h.5v-2H9zm4 0v2h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5H13z"/>
        </svg>

        <!-- Word Icon -->
        <svg v-else-if="isWord" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6.5 18l1.5-6 1.5 6h1l2-8h-1.5l-1 4.5L8.5 10H7.5l-1.5 4.5-1-4.5H3.5l2 8h1z"/>
        </svg>

        <!-- Excel Icon -->
        <svg v-else-if="isExcel" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM9.5 18l-2-3 2-3h-1.5l-1.25 2-1.25-2H4l2 3-2 3h1.5l1.25-2 1.25 2h1.5zm5.5-6v6h-1v-2h-2v2h-1v-6h1v3h2v-3h1z"/>
        </svg>

        <!-- PowerPoint Icon -->
        <svg v-else-if="isPowerPoint" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8 18v-6h2c1.1 0 2 .9 2 2s-.9 2-2 2H9v2H8zm1-3h1c.55 0 1-.45 1-1s-.45-1-1-1H9v2z"/>
        </svg>

        <!-- Image Icon -->
        <svg v-else-if="isImage" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>

        <!-- Video Icon -->
        <svg v-else-if="isVideo" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>

        <!-- Audio Icon -->
        <svg v-else-if="isAudio" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>

        <!-- Archive Icon -->
        <svg v-else-if="isArchive" class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
        </svg>

        <!-- Default File Icon -->
        <svg v-else class="w-10 h-10" :class="iconColorClass" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
    </div>

    <!-- File info -->
    <div class="space-y-1">
      <p
        class="text-xs font-medium text-gray-900 truncate leading-tight"
        :title="file.name || file.originalName"
      >
        {{ file.name || file.originalName }}
      </p>
      <div class="flex items-center gap-1.5 text-[10px] text-gray-500">
        <span class="font-medium">{{ formatFileSize(file.size || file.fileSize) }}</span>
        <span v-if="file.createdAt" class="text-gray-300">•</span>
        <span v-if="file.createdAt">{{ formatDate(file.createdAt) }}</span>
      </div>
    </div>

    <!-- Download button -->
    <button
      type="button"
      class="mt-2 w-full flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      @click.stop="$emit('download', file)"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
      {{ t('lessons.files.download') }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  file: {
    type: Object,
    required: true
  },
  canDelete: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['click', 'preview', 'download', 'delete']);

const { t } = useI18n();
const imageError = ref(false);

// File type detection
const getExtension = () => {
  const name = props.file.name || props.file.originalName || '';
  return name.split('.').pop()?.toLowerCase() || '';
};

const getMimeType = () => {
  return props.file.mimeType || props.file.type || '';
};

const isImage = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
});

const isPdf = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.includes('pdf') || ext === 'pdf';
});

const isWord = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.includes('word') || mime.includes('document') || ['doc', 'docx'].includes(ext);
});

const isExcel = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.includes('excel') || mime.includes('spreadsheet') || ['xls', 'xlsx', 'csv'].includes(ext);
});

const isPowerPoint = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.includes('powerpoint') || mime.includes('presentation') || ['ppt', 'pptx'].includes(ext);
});

const isVideo = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.startsWith('video/') || ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext);
});

const isAudio = computed(() => {
  const ext = getExtension();
  const mime = getMimeType();
  return mime.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext);
});

const isArchive = computed(() => {
  const ext = getExtension();
  return ['zip', 'rar', '7z', 'tar', 'gz'].includes(ext);
});

const canPreview = computed(() => {
  return isImage.value || isPdf.value;
});

const fileExtension = computed(() => {
  const name = props.file.name || props.file.originalName || '';
  return name.split('.').pop()?.toUpperCase() || 'FILE';
});

// Styling based on file type
const iconBackgroundClass = computed(() => {
  if (isPdf.value) return 'bg-red-50';
  if (isWord.value) return 'bg-blue-50';
  if (isExcel.value) return 'bg-green-50';
  if (isPowerPoint.value) return 'bg-orange-50';
  if (isImage.value) return 'bg-purple-50';
  if (isVideo.value) return 'bg-pink-50';
  if (isAudio.value) return 'bg-indigo-50';
  if (isArchive.value) return 'bg-yellow-50';
  return 'bg-gray-50';
});

const iconColorClass = computed(() => {
  if (isPdf.value) return 'text-red-500';
  if (isWord.value) return 'text-blue-500';
  if (isExcel.value) return 'text-green-500';
  if (isPowerPoint.value) return 'text-orange-500';
  if (isImage.value) return 'text-purple-500';
  if (isVideo.value) return 'text-pink-500';
  if (isAudio.value) return 'text-indigo-500';
  if (isArchive.value) return 'text-yellow-600';
  return 'text-gray-500';
});

const typeBadgeClass = computed(() => {
  if (isPdf.value) return 'bg-red-100 text-red-700';
  if (isWord.value) return 'bg-blue-100 text-blue-700';
  if (isExcel.value) return 'bg-green-100 text-green-700';
  if (isPowerPoint.value) return 'bg-orange-100 text-orange-700';
  if (isImage.value) return 'bg-purple-100 text-purple-700';
  if (isVideo.value) return 'bg-pink-100 text-pink-700';
  if (isAudio.value) return 'bg-indigo-100 text-indigo-700';
  if (isArchive.value) return 'bg-yellow-100 text-yellow-700';
  return 'bg-gray-100 text-gray-700';
});

// Utility functions
const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
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
    year: 'numeric'
  });
};

const handleClick = () => {
  if (canPreview.value) {
    emit('preview', props.file);
  } else {
    emit('download', props.file);
  }
};
</script>
