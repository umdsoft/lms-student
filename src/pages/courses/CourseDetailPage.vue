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
      <div v-if="isLoading || !course" class="space-y-6">
        <div class="h-48 animate-pulse rounded-3xl bg-gray-200"/>
        <div class="grid gap-4 md:grid-cols-4">
          <div v-for="i in 4" :key="i" class="h-32 animate-pulse rounded-2xl bg-gray-200"/>
        </div>
        <div class="h-64 animate-pulse rounded-2xl bg-gray-200"/>
      </div>

      <!-- Course Content -->
      <div v-else class="space-y-8">
        <!-- Course Header -->
        <div class="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
          <div class="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                📚
              </div>
              <div>
                <h1 class="text-3xl font-bold leading-tight">{{ course.name }}</h1>
                <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                  <span class="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                    {{ t(`courses.levels.${course.level}`) }}
                  </span>
                  <span v-if="course.teacher" class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                    {{ formatTeacherName(course.teacher) }}
                  </span>
                  <span class="inline-flex items-center gap-2">
                    {{ course.stats?.enrolledStudents || 0 }} {{ t('courses.students') }}
                  </span>
                  <span class="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                    {{ t(`courses.status.${course.status}`) }}
                  </span>
                </div>
                <div class="mt-3 text-sm">
                  <span v-if="course.pricingType === 'subscription'">
                    {{ t('courses.pricingType.subscription') }}
                  </span>
                  <span v-else>
                    {{ t('courses.pricingType.individual') }}: {{ formatPrice(course.price) }}
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
                {{ t('courses.actions.edit') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="openDeleteModal"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m12 0H3"/>
                </svg>
                {{ t('courses.actions.delete') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid gap-4 md:grid-cols-4">
          <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">{{ t('courses.stats.modules') }}</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">{{ course.stats?.totalModules || 0 }}</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                📖
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">{{ t('courses.stats.lessons') }}</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">{{ course.stats?.totalLessons || 0 }}</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                📹
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">{{ t('courses.stats.duration') }}</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">{{ formatDuration(course.stats?.totalDuration) }}</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                ⏱️
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">{{ t('courses.stats.students') }}</p>
                <p class="mt-2 text-3xl font-bold text-gray-900">{{ course.stats?.enrolledStudents || 0 }}</p>
              </div>
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                👥
              </div>
            </div>
          </div>
        </div>

        <!-- Course Description -->
        <div v-if="course.description" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900">{{ t('courses.description') }}</h2>
          <p class="mt-3 text-gray-700">{{ course.description }}</p>
        </div>

        <!-- Modules Section -->
        <ModulesList
          :course-id="course.id"
          :can-manage="canManage"
          @view-module="handleViewModule"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <CourseFormModal
      v-if="course"
      v-model:show="showFormModal"
      :direction-id="course.directionId"
      :course="course"
      mode="edit"
      @save="handleSaveCourse"
    />

    <!-- Delete Modal -->
    <CourseDeleteModal
      v-if="course"
      v-model:show="showDeleteModal"
      :course="course"
      @confirm="handleDeleteCourse"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import ModulesList from '@/components/courses/ModulesList.vue';
import CourseFormModal from '@/components/courses/CourseFormModal.vue';
import CourseDeleteModal from '@/components/courses/CourseDeleteModal.vue';
import { useCoursesStore } from '@/stores/courses';
import { useAuth } from '@/shared/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const push = useNotivue();
const coursesStore = useCoursesStore();
const { user } = useAuth();

const showFormModal = ref(false);
const showDeleteModal = ref(false);

const course = computed(() => coursesStore.currentCourse);
const isLoading = computed(() => coursesStore.isLoading);
const canManage = computed(() => user.value?.role === 'admin');

onMounted(() => {
  if (route.params.id) {
    loadCourse(route.params.id);
  }
});

const loadCourse = async (id) => {
  try {
    await coursesStore.fetchCourse(id);
  } catch (error) {
    push.error({ title: t('courses.messages.error') });
  }
};

const openEditModal = () => {
  showFormModal.value = true;
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const handleSaveCourse = async () => {
  await loadCourse(route.params.id);
};

const handleDeleteCourse = async () => {
  router.push({ name: 'admin.direction-detail', params: { id: course.value.directionId } });
};

const handleViewModule = (module) => {
  router.push({ name: 'admin.module-detail', params: { id: module.id } });
};

const formatTeacherName = (teacher) => {
  return `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.email;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
};

const formatDuration = (seconds) => {
  if (!seconds) return '0 soat';
  const hours = Math.floor(seconds / 3600);
  return `${hours} soat`;
};
</script>
