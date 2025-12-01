<template>
  <div
    class="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
    @click="handleClick"
  >
    <!-- File icon/preview -->
    <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
      <!-- Image preview -->
      <img
        v-if="isImage && file.url"
        :src="file.url"
        :alt="file.name"
        class="w-full h-full object-cover"
        @error="imageError = true"
      />

      <!-- File type icon -->
      <div
        v-else
        class="w-full h-full flex items-center justify-center"
        :class="iconBackgroundClass"
      >
        <component :is="fileIcon" class="w-12 h-12" :class="iconColorClass" />
        <span class="absolute bottom-2 text-xs font-bold uppercase" :class="iconColorClass">
          {{ fileExtension }}
        </span>
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          v-if="canPreview"
          type="button"
          class="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          @click.stop="$emit('preview', file)"
          :title="t('lessons.files.preview')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
        <button
          type="button"
          class="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          @click.stop="$emit('download', file)"
          :title="t('lessons.files.download')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
        </button>
        <button
          v-if="canDelete"
          type="button"
          class="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
          @click.stop="$emit('delete', file)"
          :title="t('lessons.files.delete')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- File info -->
    <div>
      <p class="text-sm font-medium text-gray-900 truncate" :title="file.name">
        {{ file.name || file.originalName }}
      </p>
      <div class="mt-1 flex items-center gap-2 text-xs text-gray-500">
        <span>{{ formatFileSize(file.size) }}</span>
        <span v-if="file.createdAt">·</span>
        <span v-if="file.createdAt">{{ formatDate(file.createdAt) }}</span>
      </div>
    </div>

    <!-- Type badge -->
    <div
      class="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium"
      :class="typeBadgeClass"
    >
      {{ fileExtension }}
    </div>
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

const isImage = computed(() => {
  const mimeType = props.file.mimeType || props.file.type;
  return mimeType?.startsWith('image/') && !imageError.value;
});

const isPdf = computed(() => {
  const mimeType = props.file.mimeType || props.file.type;
  return mimeType?.includes('pdf');
});

const isVideo = computed(() => {
  const mimeType = props.file.mimeType || props.file.type;
  return mimeType?.startsWith('video/');
});

const isAudio = computed(() => {
  const mimeType = props.file.mimeType || props.file.type;
  return mimeType?.startsWith('audio/');
});

const isWord = computed(() => {
  const mimeType = props.file.mimeType || props.file.type;
  return mimeType?.includes('word') || mimeType?.includes('document');
});

const isExcel = computed(() => {
  const mimeType = props.file.mimeType || props.file.type;
  return mimeType?.includes('excel') || mimeType?.includes('spreadsheet');
});

const canPreview = computed(() => {
  return isImage.value || isPdf.value;
});

const fileExtension = computed(() => {
  const name = props.file.name || props.file.originalName || '';
  return name.split('.').pop()?.toUpperCase() || 'FILE';
});

const iconBackgroundClass = computed(() => {
  if (isPdf.value) return 'bg-red-50';
  if (isWord.value) return 'bg-blue-50';
  if (isExcel.value) return 'bg-green-50';
  if (isVideo.value) return 'bg-pink-50';
  if (isAudio.value) return 'bg-orange-50';
  if (isImage.value) return 'bg-purple-50';
  return 'bg-gray-50';
});

const iconColorClass = computed(() => {
  if (isPdf.value) return 'text-red-500';
  if (isWord.value) return 'text-blue-500';
  if (isExcel.value) return 'text-green-500';
  if (isVideo.value) return 'text-pink-500';
  if (isAudio.value) return 'text-orange-500';
  if (isImage.value) return 'text-purple-500';
  return 'text-gray-500';
});

const typeBadgeClass = computed(() => {
  if (isPdf.value) return 'bg-red-100 text-red-700';
  if (isWord.value) return 'bg-blue-100 text-blue-700';
  if (isExcel.value) return 'bg-green-100 text-green-700';
  if (isVideo.value) return 'bg-pink-100 text-pink-700';
  if (isAudio.value) return 'bg-orange-100 text-orange-700';
  if (isImage.value) return 'bg-purple-100 text-purple-700';
  return 'bg-gray-100 text-gray-700';
});

// Generic file icon component
const fileIcon = computed(() => {
  return {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    `
  };
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
