<template>
  <BaseModal
    :show="show"
    :title="t(`courses.lessons.form.title.${mode}`)"
    size="xl"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
  >
    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Name -->
      <div>
        <label for="lesson-name" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.lessons.form.name') }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="lesson-name"
          v-model="formData.name"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          :placeholder="t('courses.lessons.form.namePlaceholder')"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="lesson-description" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.lessons.form.description') }}
        </label>
        <textarea
          id="lesson-description"
          v-model="formData.description"
          rows="3"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          :placeholder="t('courses.lessons.form.descriptionPlaceholder')"
        />
      </div>

      <!-- Video URL -->
      <div>
        <label for="lesson-video-url" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.lessons.form.videoUrl') }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="lesson-video-url"
          v-model="formData.videoUrl"
          type="url"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          :placeholder="t('courses.lessons.form.videoUrlPlaceholder')"
          @blur="handleVideoUrlChange"
        />
        <p class="mt-1 text-xs text-gray-500">
          💡 {{ t('courses.lessons.form.videoHint') }}
        </p>
      </div>

      <!-- Video Preview -->
      <div v-if="videoInfo.embedUrl" class="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p class="mb-3 text-sm font-medium text-gray-700">
          {{ t('courses.lessons.form.videoPreview') }}
        </p>
        <div class="aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            v-if="videoInfo.type === 'youtube'"
            :src="videoInfo.embedUrl"
            class="h-full w-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <video
            v-else
            :src="videoInfo.embedUrl"
            controls
            class="h-full w-full"
          ></video>
        </div>
        <div class="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span v-if="videoInfo.type === 'youtube'" class="inline-flex items-center gap-1">
            <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            YouTube Video
          </span>
          <span v-else class="inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
            </svg>
            Direct Video
          </span>
        </div>
      </div>

      <!-- Duration -->
      <div>
        <label for="lesson-duration" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.lessons.form.duration') }}
          <span class="text-red-500">*</span>
        </label>
        <div class="flex items-center gap-2">
          <input
            id="lesson-duration"
            v-model.number="durationMinutes"
            type="number"
            min="1"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="15"
          />
          <span class="text-sm text-gray-600">{{ t('courses.lessons.form.durationUnit') }}</span>
        </div>
      </div>

      <!-- Files Section -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">
          {{ t('courses.lessons.form.files') }}
        </label>

        <!-- Existing Files (in edit mode) -->
        <div v-if="mode === 'edit' && lesson?.files?.length" class="mb-3 space-y-2">
          <div
            v-for="file in lesson.files"
            :key="file.id"
            class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2"
          >
            <div class="flex items-center gap-3">
              <svg class="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
              </div>
            </div>
            <button
              type="button"
              @click="handleDeleteFile(file.id)"
              class="text-red-600 hover:text-red-700"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- New Files to Upload -->
        <div v-if="filesToUpload.length" class="mb-3 space-y-2">
          <div
            v-for="(file, index) in filesToUpload"
            :key="index"
            class="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-2"
          >
            <div class="flex items-center gap-3">
              <svg class="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
              </div>
            </div>
            <button
              type="button"
              @click="removeFileToUpload(index)"
              class="text-red-600 hover:text-red-700"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- File Upload Button -->
        <label class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
          </svg>
          {{ t('courses.lessons.form.addFile') }}
          <input
            type="file"
            multiple
            @change="handleFileSelect"
            class="hidden"
          />
        </label>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
        {{ error }}
      </div>
    </form>

    <!-- Footer -->
    <template #footer>
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        @click="handleClose"
        :disabled="loading"
      >
        {{ t('courses.lessons.form.cancel') }}
      </button>
      <button
        @click="handleSubmit"
        :disabled="loading"
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? t('common.loading') : t('courses.lessons.form.save') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import BaseModal from '@/components/common/BaseModal.vue';
import { useLessonsStore } from '@/stores/lessons';
import { processVideoUrl, minutesToSeconds, secondsToMinutes } from '@/utils/videoProcessor';

const { t } = useI18n();
const { push } = useNotivue();
const lessonsStore = useLessonsStore();

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  moduleId: {
    type: Number,
    required: true
  },
  lesson: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  }
});

const emit = defineEmits(['update:show', 'save']);

const formData = ref({
  name: '',
  description: '',
  videoUrl: '',
  videoType: 'youtube',
  videoEmbedUrl: '',
  duration: 0,
  moduleId: props.moduleId
});

const durationMinutes = ref(15);
const filesToUpload = ref([]);
const videoInfo = ref({ type: null, embedUrl: null, videoId: null });
const loading = ref(false);
const error = ref(null);

// Define resetForm BEFORE watch to avoid hoisting issues
const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    videoUrl: '',
    videoType: 'youtube',
    videoEmbedUrl: '',
    duration: 0,
    moduleId: props.moduleId
  };
  durationMinutes.value = 15;
  filesToUpload.value = [];
  videoInfo.value = { type: null, embedUrl: null, videoId: null };
  error.value = null;
};

// Watch for lesson changes to populate form in edit mode
watch(
  () => props.lesson,
  (newLesson) => {
    if (newLesson && props.mode === 'edit') {
      formData.value = {
        name: newLesson.name || '',
        description: newLesson.description || '',
        videoUrl: newLesson.videoUrl || '',
        videoType: newLesson.videoType || 'youtube',
        videoEmbedUrl: newLesson.videoEmbedUrl || '',
        duration: newLesson.duration || 0,
        moduleId: props.moduleId
      };
      durationMinutes.value = secondsToMinutes(newLesson.duration || 0);

      // Process video URL to get preview
      if (newLesson.videoUrl) {
        videoInfo.value = processVideoUrl(newLesson.videoUrl);
      }
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const handleVideoUrlChange = () => {
  if (formData.value.videoUrl) {
    const result = processVideoUrl(formData.value.videoUrl);
    videoInfo.value = result;

    if (result.type) {
      formData.value.videoType = result.type;
      formData.value.videoEmbedUrl = result.embedUrl;
    }
  }
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  filesToUpload.value.push(...files);
  // Reset input
  event.target.value = '';
};

const removeFileToUpload = (index) => {
  filesToUpload.value.splice(index, 1);
};

const handleDeleteFile = async (fileId) => {
  if (!props.lesson?.id) return;

  try {
    await lessonsStore.deleteFile(props.lesson.id, fileId);
    push.success({ title: t('courses.lessons.messages.fileDeleteSuccess') });
  } catch (err) {
    push.error({ title: t('courses.lessons.messages.fileDeleteError') });
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const handleClose = () => {
  if (!loading.value) {
    resetForm();
    emit('update:show', false);
  }
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Convert duration from minutes to seconds
    formData.value.duration = minutesToSeconds(durationMinutes.value);

    let lessonId;
    if (props.mode === 'edit' && props.lesson?.id) {
      await lessonsStore.updateLesson(props.lesson.id, formData.value);
      lessonId = props.lesson.id;
      push.success({ title: t('courses.lessons.messages.updateSuccess') });
    } else {
      const result = await lessonsStore.createLesson(props.moduleId, formData.value);
      lessonId = result.data?.id;
      push.success({ title: t('courses.lessons.messages.createSuccess') });
    }

    // Upload new files if any
    if (filesToUpload.value.length && lessonId) {
      for (const file of filesToUpload.value) {
        await lessonsStore.uploadFile(lessonId, file);
      }
    }

    resetForm();
    emit('save');
    emit('update:show', false);
  } catch (err) {
    error.value = err.message || t('courses.lessons.messages.error');
  } finally {
    loading.value = false;
  }
};
</script>
