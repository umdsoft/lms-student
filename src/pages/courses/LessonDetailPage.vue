<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        @click="router.back()"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        {{ t('common.actions.back') }}
      </button>

      <!-- Loading State -->
      <div v-if="isLoading || !lesson" class="space-y-6">
        <div class="h-40 animate-pulse rounded-3xl bg-gray-200"/>
        <div class="h-96 animate-pulse rounded-2xl bg-gray-200"/>
      </div>

      <!-- Lesson Content -->
      <div v-else class="space-y-8">
        <!-- Lesson Header -->
        <div class="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
          <div class="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                📹
              </div>
              <div>
                <h1 class="text-3xl font-bold leading-tight">{{ lesson.name }}</h1>
                <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                  <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    {{ formatDuration(lesson.duration) }}
                  </span>
                  <span v-if="lesson.files?.length" class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
                    </svg>
                    {{ lesson.files.length }} {{ t('courses.lessons.files') }}
                  </span>
                  <span v-if="lesson.stats?.testsCount" class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    {{ lesson.stats.testsCount }} {{ t('courses.lessons.tests') }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="canManage" class="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="openEditModal"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                {{ t('courses.lessons.edit') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="openDeleteModal"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m12 0H3"/>
                </svg>
                {{ t('courses.lessons.delete') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Video Player -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <LessonVideoPlayer
            :video-url="lesson.videoUrl"
            :video-type="lesson.videoType"
            :embed-url="lesson.videoEmbedUrl"
            :duration="lesson.duration"
          />
        </div>

        <!-- Description -->
        <div v-if="lesson.description" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900">{{ t('courses.lessons.description') }}</h2>
          <p class="mt-3 text-gray-700">{{ lesson.description }}</p>
        </div>

        <!-- Files -->
        <LessonFilesList :files="lesson.files" />

        <!-- Tests Section (Basic) -->
        <div v-if="canManage" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ t('courses.tests.title') }}
            </h2>
            <button
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              {{ t('courses.tests.add') }}
            </button>
          </div>

          <div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p class="mt-4 text-sm text-gray-600">{{ t('courses.tests.empty') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <LessonFormModal
      v-if="lesson"
      v-model:show="showFormModal"
      :module-id="lesson.moduleId"
      :lesson="lesson"
      mode="edit"
      @save="handleSaveLesson"
    />

    <!-- Delete Modal -->
    <LessonDeleteModal
      v-if="lesson"
      v-model:show="showDeleteModal"
      :lesson="lesson"
      :module-id="lesson.moduleId"
      @confirm="handleDeleteLesson"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import LessonVideoPlayer from '@/components/courses/LessonVideoPlayer.vue';
import LessonFilesList from '@/components/courses/LessonFilesList.vue';
import LessonFormModal from '@/components/courses/LessonFormModal.vue';
import LessonDeleteModal from '@/components/courses/LessonDeleteModal.vue';
import { useLessonsStore } from '@/stores/lessons';
import { useAuth } from '@/shared/composables/useAuth';
import { formatVideoDuration } from '@/utils/videoProcessor';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();
const lessonsStore = useLessonsStore();
const { user } = useAuth();

const showFormModal = ref(false);
const showDeleteModal = ref(false);

const lesson = computed(() => lessonsStore.currentLesson);
const isLoading = computed(() => lessonsStore.isLoading);
const canManage = computed(() => user.value?.role === 'admin');

onMounted(() => {
  if (route.params.id) {
    loadLesson(route.params.id);
  }
});

const loadLesson = async (id) => {
  try {
    await lessonsStore.fetchLesson(id);
  } catch (error) {
    push.error({ title: t('courses.lessons.messages.error') });
  }
};

const openEditModal = () => {
  showFormModal.value = true;
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const handleSaveLesson = async () => {
  await loadLesson(route.params.id);
};

const handleDeleteLesson = async () => {
  router.push({ name: 'admin.module-detail', params: { id: lesson.value.moduleId } });
};

const formatDuration = (seconds) => {
  return formatVideoDuration(seconds || 0);
};
</script>
