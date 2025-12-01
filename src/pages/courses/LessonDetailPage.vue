<template>
  <div class="w-full">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <!-- Back button -->
        <button
          type="button"
          class="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
          @click="router.back()"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ t('common.actions.back') }}
        </button>

        <template v-if="lesson?.module?.course">
          <span class="text-gray-300">|</span>

          <!-- Course link -->
          <router-link
            :to="{ name: 'admin.course-detail', params: { id: lesson.module.course.id }}"
            class="text-gray-500 hover:text-purple-600 transition-colors"
          >
            {{ lesson.module.course.name || lesson.module.course.title }}
          </router-link>

          <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>

          <!-- Module link -->
          <router-link
            :to="{ name: 'admin.module-detail', params: { id: lesson.module.id }}"
            class="text-gray-500 hover:text-purple-600 transition-colors"
          >
            {{ lesson.module.name || lesson.module.title }}
          </router-link>

          <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>

          <!-- Current lesson -->
          <span class="font-medium text-gray-900">
            {{ lesson.name || lesson.title }}
          </span>
        </template>
      </nav>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <!-- Breadcrumb skeleton -->
        <div class="h-5 w-64 animate-pulse rounded bg-gray-200"/>
        <!-- Header skeleton -->
        <div class="h-40 animate-pulse rounded-3xl bg-gray-200"/>
        <!-- Video skeleton -->
        <div class="h-96 animate-pulse rounded-2xl bg-gray-200"/>
        <!-- Sections skeleton -->
        <div class="h-32 animate-pulse rounded-2xl bg-gray-200"/>
        <div class="h-32 animate-pulse rounded-2xl bg-gray-200"/>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-semibold text-red-900">{{ t('lessons.messages.loadError') }}</h3>
        <p class="mb-4 text-red-700">{{ error }}</p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          @click="loadLesson(route.params.id)"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          {{ t('common.actions.retry') }}
        </button>
      </div>

      <!-- Lesson Content -->
      <div v-else-if="lesson" class="space-y-8">
        <!-- Lesson Header with Video and Description -->
        <LessonHeader
          :lesson="lesson"
          :tests-count="testsCount"
          :can-manage="canManage"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />

        <!-- Files Section -->
        <LessonFilesSection
          v-if="lessonId"
          :lesson-id="lessonId"
          :can-manage="canManage"
        />

        <!-- Tests Section -->
        <LessonTestsSection
          v-if="lessonId"
          :lesson-id="lessonId"
          :can-manage="canManage"
          @update:tests-count="testsCount = $event"
        />

        <!-- English Skills Section (only for English courses) -->
        <LessonSkillsSection
          v-if="isEnglishCourse && lessonId"
          :lesson-id="lessonId"
          :can-manage="canManage"
        />
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';

// Components
import LessonHeader from '@/components/lessons/LessonHeader.vue';
import LessonFilesSection from '@/components/lessons/LessonFilesSection.vue';
import LessonTestsSection from '@/components/lessons/LessonTestsSection.vue';
import LessonSkillsSection from '@/components/lessons/LessonSkillsSection.vue';
import LessonFormModal from '@/components/courses/LessonFormModal.vue';
import LessonDeleteModal from '@/components/courses/LessonDeleteModal.vue';

// Stores
import { useLessonsStore } from '@/stores/lessons';
import { useAuth } from '@/shared/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();
const lessonsStore = useLessonsStore();
const { user } = useAuth();

// State
const showFormModal = ref(false);
const showDeleteModal = ref(false);
const testsCount = ref(0);
const error = ref(null);

// Computed
const lessonId = computed(() => route.params.id);
const lesson = computed(() => lessonsStore.currentLesson);
const isLoading = computed(() => lessonsStore.loading);
const canManage = computed(() => user.value?.role === 'admin');

// Check if this is an English course
const isEnglishCourse = computed(() => {
  if (!lesson.value) return false;
  const directionName = lesson.value.direction?.name?.toLowerCase() ||
                        lesson.value.course?.direction?.name?.toLowerCase() ||
                        lesson.value.module?.course?.direction?.name?.toLowerCase() || '';
  return directionName.includes('ingliz') ||
         directionName.includes('english') ||
         directionName.includes('ielts');
});

// Lifecycle
onMounted(() => {
  if (route.params.id) {
    loadLesson(route.params.id);
  }
});

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadLesson(newId);
  }
});

// Methods
const loadLesson = async (id) => {
  error.value = null;
  try {
    await lessonsStore.fetchLesson(id);
  } catch (err) {
    error.value = err.response?.data?.message || err.message || t('lessons.messages.loadError');
    push.error({ title: t('lessons.messages.loadError') });
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
  push.success({ title: t('lessons.messages.updateSuccess') });
};

const handleDeleteLesson = async () => {
  router.push({ name: 'admin.module-detail', params: { id: lesson.value.moduleId } });
};
</script>
