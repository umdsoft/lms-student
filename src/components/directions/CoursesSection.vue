<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-900">{{ t('courses.title') }}</h2>

      <button
        v-if="canManage"
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        @click="openCreateModal"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ t('courses.addNew') }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="coursesStore.isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse rounded-lg bg-gray-100 p-4">
        <div class="mb-3 h-6 w-1/3 rounded bg-gray-200" />
        <div class="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!courses.length" class="py-12 text-center">
      <svg class="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <p class="mb-4 text-gray-600">{{ t('courses.empty') }}</p>
      <button
        v-if="canManage"
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        @click="openCreateModal"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ t('courses.createFirst') }}
      </button>
    </div>

    <!-- Courses List -->
    <div v-else class="space-y-4">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        :can-manage="canManage"
        @edit="handleEdit"
        @delete="handleDelete"
        @view="handleView"
      />
    </div>

    <!-- Modals -->
    <CourseFormModal
      v-model:show="showFormModal"
      :direction-id="directionId"
      :course="selectedCourse"
      :mode="formMode"
      @save="handleSave"
    />

    <CourseDeleteModal
      v-model:show="showDeleteModal"
      :course="selectedCourse"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import { useCoursesStore } from '@/stores/courses';
import CourseCard from '@/components/courses/CourseCard.vue';
import CourseFormModal from '@/components/courses/CourseFormModal.vue';
import CourseDeleteModal from '@/components/courses/CourseDeleteModal.vue';

const { t } = useI18n();
const push = useNotivue();
const router = useRouter();
const coursesStore = useCoursesStore();

const props = defineProps({
  directionId: {
    type: Number,
    required: true
  },
  canManage: {
    type: Boolean,
    default: false
  }
});

const showFormModal = ref(false);
const showDeleteModal = ref(false);
const selectedCourse = ref(null);
const formMode = ref('create');

const courses = computed(() => coursesStore.coursesList);

onMounted(async () => {
  await loadCourses();
});

const loadCourses = async () => {
  try {
    await coursesStore.fetchCoursesByDirection(props.directionId);
  } catch (error) {
    push.error({
      title: t('courses.messages.error'),
      message: error.message
    });
  }
};

const openCreateModal = () => {
  selectedCourse.value = null;
  formMode.value = 'create';
  showFormModal.value = true;
};

const handleEdit = (course) => {
  selectedCourse.value = course;
  formMode.value = 'edit';
  showFormModal.value = true;
};

const handleDelete = (course) => {
  selectedCourse.value = course;
  showDeleteModal.value = true;
};

const handleView = (course) => {
  router.push({ name: 'admin.course-detail', params: { id: course.id } });
};

const handleSave = async () => {
  showFormModal.value = false;
  selectedCourse.value = null;
  await loadCourses();
};

const handleDeleteConfirm = async () => {
  showDeleteModal.value = false;
  selectedCourse.value = null;
  await loadCourses();
};
</script>
