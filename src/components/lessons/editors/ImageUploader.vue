<template>
  <BaseModal
    :show="show"
    :title="t('lessons.image.title')"
    size="md"
    @update:show="$emit('update:show', $event)"
  >
    <div class="space-y-6">
      <!-- Tab switcher -->
      <div class="flex border-b border-gray-200">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === 'upload'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'upload'"
        >
          {{ t('lessons.image.upload') }}
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === 'url'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'url'"
        >
          {{ t('lessons.image.fromUrl') }}
        </button>
      </div>

      <!-- Upload tab -->
      <div v-if="activeTab === 'upload'" class="space-y-4">
        <!-- Drop zone -->
        <div
          class="relative border-2 border-dashed rounded-lg p-8 text-center transition-colors"
          :class="isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            @change="handleFileSelect"
          />
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="mt-2 text-sm text-gray-600">
            {{ t('lessons.image.dropzone') }}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF, WebP (max 5MB)
          </p>
        </div>

        <!-- Preview -->
        <div v-if="previewUrl" class="relative">
          <img
            :src="previewUrl"
            :alt="t('lessons.image.preview')"
            class="max-h-48 mx-auto rounded-lg border border-gray-200"
          />
          <button
            type="button"
            class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            @click="clearImage"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Upload progress -->
        <div v-if="isUploading" class="space-y-2">
          <div class="flex justify-between text-sm text-gray-600">
            <span>{{ t('lessons.image.uploading') }}</span>
            <span>{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${uploadProgress}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- URL tab -->
      <div v-if="activeTab === 'url'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('lessons.image.urlLabel') }}
          </label>
          <input
            v-model="imageUrl"
            type="url"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :placeholder="t('lessons.image.urlPlaceholder')"
            @input="previewFromUrl"
          />
        </div>

        <!-- URL Preview -->
        <div v-if="urlPreviewUrl" class="relative">
          <img
            :src="urlPreviewUrl"
            :alt="t('lessons.image.preview')"
            class="max-h-48 mx-auto rounded-lg border border-gray-200"
            @error="urlPreviewError = true"
            @load="urlPreviewError = false"
          />
          <p v-if="urlPreviewError" class="mt-2 text-sm text-red-600 text-center">
            {{ t('lessons.image.loadError') }}
          </p>
        </div>
      </div>

      <!-- Error message -->
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        @click="handleCancel"
      >
        {{ t('common.actions.cancel') }}
      </button>
      <button
        type="button"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canInsert || isUploading"
        @click="handleInsert"
      >
        {{ isUploading ? t('common.loading') : t('lessons.image.insert') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  uploadFn: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['update:show', 'insert']);

const { t } = useI18n();

const activeTab = ref('upload');
const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref('');
const imageUrl = ref('');
const urlPreviewUrl = ref('');
const urlPreviewError = ref(false);
const isDragging = ref(false);
const isUploading = ref(false);
const uploadProgress = ref(0);
const error = ref('');

const canInsert = computed(() => {
  if (activeTab.value === 'upload') {
    return selectedFile.value && previewUrl.value;
  }
  return imageUrl.value && !urlPreviewError.value;
});

const handleDragEnter = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = (e) => {
  e.preventDefault();
  isDragging.value = false;
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;

  const files = e.dataTransfer?.files;
  if (files?.length) {
    processFile(files[0]);
  }
};

const handleFileSelect = (e) => {
  const files = e.target.files;
  if (files?.length) {
    processFile(files[0]);
  }
};

const processFile = (file) => {
  error.value = '';

  // Validate type
  if (!file.type.startsWith('image/')) {
    error.value = t('lessons.image.invalidType');
    return;
  }

  // Validate size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = t('lessons.image.tooLarge');
    return;
  }

  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
};

const previewFromUrl = () => {
  urlPreviewError.value = false;
  if (imageUrl.value) {
    urlPreviewUrl.value = imageUrl.value;
  } else {
    urlPreviewUrl.value = '';
  }
};

const clearImage = () => {
  selectedFile.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = '';
  }
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleCancel = () => {
  clearImage();
  imageUrl.value = '';
  urlPreviewUrl.value = '';
  error.value = '';
  emit('update:show', false);
};

const handleInsert = async () => {
  error.value = '';

  if (activeTab.value === 'url') {
    emit('insert', { url: imageUrl.value, type: 'url' });
    handleCancel();
    return;
  }

  // Upload file if uploadFn provided
  if (props.uploadFn && selectedFile.value) {
    isUploading.value = true;
    uploadProgress.value = 0;

    try {
      const result = await props.uploadFn(selectedFile.value, (progress) => {
        uploadProgress.value = progress;
      });
      emit('insert', { url: result.url || result, type: 'upload', file: selectedFile.value });
      handleCancel();
    } catch (err) {
      error.value = err.message || t('lessons.image.uploadError');
    } finally {
      isUploading.value = false;
      uploadProgress.value = 0;
    }
  } else {
    // Use base64 if no upload function
    const reader = new FileReader();
    reader.onload = (e) => {
      emit('insert', { url: e.target.result, type: 'base64', file: selectedFile.value });
      handleCancel();
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

// Clear state when modal closes
watch(() => props.show, (newVal) => {
  if (!newVal) {
    clearImage();
    imageUrl.value = '';
    urlPreviewUrl.value = '';
    error.value = '';
    activeTab.value = 'upload';
  }
});
</script>
