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
        <!-- Header skeleton -->
        <div class="h-40 animate-pulse rounded-3xl bg-gray-200"/>
        <!-- Video skeleton -->
        <div class="h-96 animate-pulse rounded-2xl bg-gray-200"/>
        <!-- Sections skeleton -->
        <div class="h-32 animate-pulse rounded-2xl bg-gray-200"/>
        <div class="h-32 animate-pulse rounded-2xl bg-gray-200"/>
      </div>

      <!-- Lesson Content -->
      <div v-else class="space-y-8">
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

// Computed
const lessonId = computed(() => route.params.id);
const lesson = computed(() => lessonsStore.currentLesson);
const isLoading = computed(() => lessonsStore.isLoading);
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
  try {
    await lessonsStore.fetchLesson(id);
  } catch (error) {
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
