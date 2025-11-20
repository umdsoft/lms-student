<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        @click="router.back()"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {{ t('common.actions.back') }}
      </button>

      <div v-if="isLoading || !direction" class="space-y-6">
        <div class="h-48 animate-pulse rounded-3xl bg-gray-200" />
        <div class="grid gap-4 md:grid-cols-2">
          <div class="h-32 animate-pulse rounded-2xl bg-gray-200" />
          <div class="h-32 animate-pulse rounded-2xl bg-gray-200" />
        </div>
        <div class="h-64 animate-pulse rounded-2xl bg-gray-200" />
      </div>

      <div v-else class="space-y-8">
        <div
          :class="['overflow-hidden rounded-3xl text-white shadow-xl', gradientClasses]"
        >
          <div class="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                {{ iconPreview }}
              </div>
              <div>
                <h1 class="text-3xl font-bold leading-tight">{{ direction.name }}</h1>
                <p class="mt-2 text-sm text-white/80">{{ direction.description }}</p>
                <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {{ direction.stats?.totalStudents ?? 0 }} {{ t('directions.labels.students') }}
                  </span>
                  <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    {{ direction.stats?.totalCourses ?? 0 }} {{ t('directions.labels.courses') }}
                  </span>
                  <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ t('directions.labels.status') }}:
                    <DirectionStatusBadge :status="direction.status" />
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="openEditModal"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {{ t('directions.actions.edit') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="toggleStatus"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ direction.status === 'active' ? t('directions.actions.deactivate') : t('directions.actions.activate') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="openDeleteModal"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m-4 0h12" />
                </svg>
                {{ t('directions.actions.delete') }}
              </button>
            </div>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">{{ t('directions.subjects.title') }}</h2>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                @click="showSubjectsModal = true"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                {{ t('directions.subjects.manage') }}
              </button>
            </div>
            <div v-if="direction.subjects?.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="subject in direction.subjects"
                :key="subject.id"
                class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {{ subject.name }}
              </span>
            </div>
            <div v-else class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              {{ t('directions.subjects.empty') }}
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">{{ t('directions.teachers.title') }}</h2>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                @click="showTeachersModal = true"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                {{ t('directions.teachers.manage') }}
              </button>
            </div>
            <div v-if="direction.teachers?.length" class="mt-4 flex flex-wrap gap-3">
              <div
                v-for="teacher in direction.teachers"
                :key="teacher.id"
                class="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-2"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white">
                  {{ getTeacherInitials(teacher) }}
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ formatTeacherName(teacher) }}</p>
                  <p class="text-xs text-gray-500">{{ teacher.email }}</p>
                </div>
              </div>
            </div>
            <div v-else class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              {{ t('directions.teachers.empty') }}
            </div>
          </div>
        </div>

        <!-- Courses Section -->
        <CoursesSection
          :direction-id="direction.id"
          :can-manage="canManage"
        />
      </div>
    </div>

    <DirectionFormModal
      v-if="direction"
      v-model:show="showFormModal"
      :direction="direction"
      mode="edit"
      @save="handleSaveDirection"
    />

    <DirectionDeleteModal
      v-if="direction"
      v-model:show="showDeleteModal"
      :direction="direction"
      @confirm="handleDeleteDirection"
    />

    <SubjectsManager
      v-if="direction"
      v-model:show="showSubjectsModal"
      :subjects="direction.subjects"
      @add="handleAddSubjects"
      @remove="handleRemoveSubject"
    />

    <TeachersManager
      v-if="direction"
      v-model:show="showTeachersModal"
      :teachers="direction.teachers"
      @assign="handleAssignTeachers"
      @remove="handleRemoveTeacher"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import DirectionStatusBadge from '@/components/directions/DirectionStatusBadge.vue';
import DirectionFormModal from '@/components/directions/DirectionFormModal.vue';
import DirectionDeleteModal from '@/components/directions/DirectionDeleteModal.vue';
import SubjectsManager from '@/components/directions/SubjectsManager.vue';
import TeachersManager from '@/components/directions/TeachersManager.vue';
import CoursesSection from '@/components/directions/CoursesSection.vue';
import { useDirectionsStore } from '@/stores/directions';
import { useAuth } from '@/shared/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();
const directionsStore = useDirectionsStore();
const { user } = useAuth();

const showFormModal = ref(false);
const showDeleteModal = ref(false);
const showSubjectsModal = ref(false);
const showTeachersModal = ref(false);

const direction = computed(() => directionsStore.currentDirection);
const isLoading = computed(() => directionsStore.isLoading);
const canManage = computed(() => user.value?.role === 'admin');

const gradientClasses = computed(() => {
  const colorMap = {
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    red: 'bg-gradient-to-br from-red-500 to-red-600',
    indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    pink: 'bg-gradient-to-br from-pink-500 to-pink-600',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  };
  return colorMap[direction.value?.color] || colorMap.blue;
});

const iconPreview = computed(() => {
  const iconMap = {
    book: '📚',
    beaker: '🧪',
    laptop: '💻',
    globe: '🌍',
    calculator: '🔢',
    atom: '⚛️',
    dna: '🧬',
    palette: '🎨',
    microscope: '🔬'
  };
  return iconMap[direction.value?.icon] || '📚';
});

const loadDirection = async (id) => {
  try {
    await directionsStore.fetchDirection(id);
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

onMounted(() => {
  if (route.params.id) {
    loadDirection(route.params.id);
  }
});

watch(
  () => route.params.id,
  (id) => {
    if (id) {
      loadDirection(id);
    }
  }
);

onBeforeUnmount(() => {
  directionsStore.currentDirection = null;
});

const openEditModal = () => {
  showFormModal.value = true;
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const toggleStatus = async () => {
  if (!direction.value) return;
  try {
    const nextStatus = direction.value.status === 'active' ? 'inactive' : 'active';
    await directionsStore.updateDirectionStatus(direction.value.id, nextStatus);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.updateSuccess') });
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const handleSaveDirection = async (data) => {
  if (!direction.value) return;
  try {
    await directionsStore.updateDirection(direction.value.id, data);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.updateSuccess') });
    showFormModal.value = false;
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const handleDeleteDirection = async () => {
  if (!direction.value) return;
  try {
    await directionsStore.deleteDirection(direction.value.id);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.deleteSuccess') });
    showDeleteModal.value = false;
    router.push({ name: 'admin.directions' });
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const handleAddSubjects = async (subjects) => {
  if (!direction.value || !subjects?.length) return;
  try {
    await directionsStore.addSubjects(direction.value.id, subjects);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.updateSuccess') });
    showSubjectsModal.value = false;
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const handleRemoveSubject = async (subject) => {
  if (!direction.value || !subject?.id) return;
  try {
    await directionsStore.removeSubject(direction.value.id, subject.id);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.updateSuccess') });
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const handleAssignTeachers = async (teacherIds) => {
  if (!direction.value || !teacherIds?.length) return;
  try {
    await directionsStore.assignTeachers(direction.value.id, teacherIds);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.updateSuccess') });
    showTeachersModal.value = false;
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const handleRemoveTeacher = async (teacher) => {
  if (!direction.value || !teacher?.id) return;
  try {
    await directionsStore.removeTeacher(direction.value.id, teacher.id);
    await directionsStore.fetchStatistics();
    push.success({ title: t('directions.messages.updateSuccess') });
  } catch (error) {
    push.error({ title: t('directions.messages.error') });
  }
};

const getTeacherInitials = (teacher) => {
  const first = teacher.firstName?.charAt(0) ?? '';
  const last = teacher.lastName?.charAt(0) ?? '';
  return `${first}${last}`.toUpperCase();
};

const formatTeacherName = (teacher) => `${teacher.firstName ?? ''} ${teacher.lastName ?? ''}`.trim();
</script>
