<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t('courses.lessons.title') }}
      </h2>
      <button
        v-if="canManage"
        @click="openCreateModal"
        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        {{ t('courses.lessons.add') }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded-lg bg-gray-100"/>
    </div>

    <!-- Empty State -->
    <div v-else-if="!lessons.length" class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      <h3 class="mt-4 text-lg font-semibold text-gray-900">
        {{ t('courses.lessons.empty') }}
      </h3>
      <p class="mt-2 text-sm text-gray-600">
        {{ t('courses.lessons.emptyDescription') }}
      </p>
      <button
        v-if="canManage"
        @click="openCreateModal"
        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        {{ t('courses.lessons.createFirst') }}
      </button>
    </div>

    <!-- Lessons List -->
    <div v-else class="space-y-3">
      <LessonCard
        v-for="(lesson, index) in sortedLessons"
        :key="lesson.id"
        :lesson="lesson"
        :index="index"
        :is-first="index === 0"
        :is-last="index === sortedLessons.length - 1"
        @edit="openEditModal(lesson)"
        @view="$emit('view-lesson', lesson)"
        @delete="openDeleteModal(lesson)"
        @move-up="handleMoveUp(index)"
        @move-down="handleMoveDown(index)"
      />
    </div>

    <!-- Modals -->
    <LessonFormModal
      v-model:show="showFormModal"
      :module-id="moduleId"
      :lesson="selectedLesson"
      :mode="formMode"
      @save="handleSave"
    />

    <LessonDeleteModal
      v-model:show="showDeleteModal"
      :lesson="selectedLesson"
      :module-id="moduleId"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import LessonCard from './LessonCard.vue';
import LessonFormModal from './LessonFormModal.vue';
import LessonDeleteModal from './LessonDeleteModal.vue';
import { useLessonsStore } from '@/stores/lessons';

const { t } = useI18n();
const lessonsStore = useLessonsStore();

const props = defineProps({
  moduleId: {
    type: Number,
    required: true
  },
  canManage: {
    type: Boolean,
    default: false
  }
});

defineEmits(['view-lesson']);

const showFormModal = ref(false);
const showDeleteModal = ref(false);
const selectedLesson = ref(null);
const formMode = ref('create');

const loading = computed(() => lessonsStore.isLoading);
const lessons = computed(() => lessonsStore.lessons);
const sortedLessons = computed(() => lessonsStore.sortedLessons);

onMounted(() => {
  loadLessons();
});

const loadLessons = () => {
  lessonsStore.fetchLessonsByModule(props.moduleId);
};

const openCreateModal = () => {
  selectedLesson.value = null;
  formMode.value = 'create';
  showFormModal.value = true;
};

const openEditModal = (lesson) => {
  selectedLesson.value = lesson;
  formMode.value = 'edit';
  showFormModal.value = true;
};

const openDeleteModal = (lesson) => {
  selectedLesson.value = lesson;
  showDeleteModal.value = true;
};

const handleSave = () => {
  loadLessons();
};

const handleDelete = () => {
  loadLessons();
};

const handleMoveUp = async (index) => {
  const lesson = sortedLessons.value[index];
  if (lesson) {
    await lessonsStore.moveLessonUp(lesson.id, props.moduleId);
  }
};

const handleMoveDown = async (index) => {
  const lesson = sortedLessons.value[index];
  if (lesson) {
    await lessonsStore.moveLessonDown(lesson.id, props.moduleId);
  }
};
</script>
