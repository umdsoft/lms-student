<template>
  <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <!-- Section header -->
    <button
      type="button"
      class="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
        </div>
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('lessons.files.title') }}</h3>
          <p class="text-sm text-gray-500">{{ filesCount }} {{ t('lessons.files.count') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          v-if="canManage && isExpanded"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          @click.stop="showUpload = true"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          {{ t('lessons.files.upload') }}
        </button>
        <svg
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </button>

    <!-- Section content -->
    <div
      v-show="isExpanded"
      class="border-t border-gray-200"
    >
      <!-- Upload zone -->
      <div v-if="showUpload && canManage" class="p-6 border-b border-gray-200 bg-gray-50">
        <FileUploadZone
          ref="uploadZone"
          @upload="handleUploadFiles"
        />
        <div class="mt-4 flex justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            @click="showUpload = false"
          >
            {{ t('common.actions.cancel') }}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            :disabled="!hasSelectedFiles || isUploading"
            @click="uploadSelectedFiles"
          >
            {{ isUploading ? t('lessons.files.uploading') : t('lessons.files.uploadSelected') }}
          </button>
        </div>
      </div>

      <!-- Files grid -->
      <div class="p-6">
        <!-- Loading -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="aspect-square bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <!-- Empty state -->
        <FilesEmptyState
          v-else-if="files.length === 0"
          :show-upload-button="canManage"
          @upload="showUpload = true"
        />

        <!-- Files list -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FileCard
            v-for="file in files"
            :key="file.id"
            :file="file"
            :can-delete="canManage"
            @preview="handlePreview"
            @download="handleDownload"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>

    <!-- Preview modal -->
    <FilePreviewModal
      v-model:show="showPreview"
      :file="selectedFile"
      @download="handleDownload"
    />

    <!-- Delete confirmation -->
    <BaseModal
      :show="showDeleteConfirm"
      :title="t('lessons.files.delete')"
      size="sm"
      @update:show="showDeleteConfirm = $event"
    >
      <p class="text-gray-600">{{ t('lessons.files.deleteConfirm') }}</p>
      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          @click="showDeleteConfirm = false"
        >
          {{ t('common.actions.cancel') }}
        </button>
        <button
          type="button"
          class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          {{ isDeleting ? t('common.loading') : t('common.actions.delete') }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import BaseModal from '@/components/common/BaseModal.vue';
import FileUploadZone from './files/FileUploadZone.vue';
import FileCard from './files/FileCard.vue';
import FilePreviewModal from './files/FilePreviewModal.vue';
import FilesEmptyState from './files/FilesEmptyState.vue';
import { useLessonFilesStore } from '@/stores/lessonFiles';

const props = defineProps({
  lessonId: { type: [Number, String], required: true },
  canManage: { type: Boolean, default: false }
});

const { t } = useI18n();
const { push } = useNotivue();
const filesStore = useLessonFilesStore();

const isExpanded = ref(true);
const showUpload = ref(false);
const showPreview = ref(false);
const showDeleteConfirm = ref(false);
const selectedFile = ref(null);
const uploadZone = ref(null);
const isDeleting = ref(false);

const files = computed(() => filesStore.files);
const loading = computed(() => filesStore.loading);
const isUploading = computed(() => filesStore.uploading);
const filesCount = computed(() => files.value.length);

const hasSelectedFiles = computed(() => {
  return uploadZone.value?.selectedFiles?.length > 0;
});

onMounted(() => {
  loadFiles();
});

const loadFiles = async () => {
  try {
    await filesStore.fetchFilesByLesson(props.lessonId);
  } catch (error) {
    push.error({ title: t('lessons.files.loadError') });
  }
};

const handleUploadFiles = async (uploadedFiles) => {
  // Files have been selected
};

const uploadSelectedFiles = async () => {
  if (!uploadZone.value?.selectedFiles?.length) return;

  try {
    for (const fileItem of uploadZone.value.selectedFiles) {
      await filesStore.uploadFile(props.lessonId, fileItem.file);
    }
    push.success({ title: t('lessons.files.uploadSuccess') });
    uploadZone.value.clearFiles();
    showUpload.value = false;
  } catch (error) {
    push.error({ title: error.message || t('lessons.files.uploadError') });
  }
};

const handlePreview = (file) => {
  selectedFile.value = file;
  showPreview.value = true;
};

const handleDownload = async (file) => {
  try {
    await filesStore.downloadFile(file);
  } catch (error) {
    push.error({ title: t('lessons.files.downloadError') });
  }
};

const handleDelete = (file) => {
  selectedFile.value = file;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (!selectedFile.value) return;

  isDeleting.value = true;
  try {
    await filesStore.deleteFile(selectedFile.value.id, props.lessonId);
    push.success({ title: t('lessons.files.deleteSuccess') });
    showDeleteConfirm.value = false;
    selectedFile.value = null;
  } catch (error) {
    push.error({ title: error.message || t('lessons.files.deleteError') });
  } finally {
    isDeleting.value = false;
  }
};
</script>
