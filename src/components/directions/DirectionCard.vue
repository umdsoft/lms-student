<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
    <div
      :class="[
        'p-6 text-white',
        gradientClasses
      ]"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="text-xl font-bold leading-tight">{{ direction.name }}</h3>
          <p class="mt-2 text-sm text-white/90">{{ direction.description }}</p>
        </div>
        <div class="text-3xl">
          {{ getIcon(direction.icon) }}
        </div>
      </div>

      <div class="mt-4 flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span>{{ direction.stats?.totalStudents ?? 0 }} {{ t('directions.labels.students') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span>{{ direction.stats?.totalCourses ?? 0 }} {{ t('directions.labels.courses') }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-4 p-6">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">{{ t('directions.labels.status') }}</span>
        <DirectionStatusBadge :status="direction.status" />
      </div>

      <div v-if="direction.subjects?.length">
        <p class="mb-2 text-sm font-medium text-gray-700">{{ t('directions.subjects.title') }}</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="subject in visibleSubjects"
            :key="subject.id ?? subject.name"
            class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
          >
            {{ subject.name }}
          </span>
          <span
            v-if="subjectsOverflow > 0"
            class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
          >
            +{{ subjectsOverflow }}
          </span>
        </div>
      </div>

      <div v-if="direction.teachers?.length">
        <p class="mb-2 text-sm font-medium text-gray-700">{{ t('directions.teachers.title') }}</p>
        <div class="flex items-center gap-2">
          <div
            v-for="teacher in visibleTeachers"
            :key="teacher.id"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-semibold text-white"
            :title="formatTeacherName(teacher)"
          >
            {{ getTeacherInitials(teacher) }}
          </div>
          <div
            v-if="teachersOverflow > 0"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600"
          >
            +{{ teachersOverflow }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2 px-6 pb-6 sm:flex-row sm:gap-3">
      <button
        type="button"
        class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        @click="$emit('edit', direction)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        {{ t('directions.actions.edit') }}
      </button>
      <button
        type="button"
        class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        @click="$emit('view', direction)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {{ t('directions.actions.view') }}
      </button>
      <button
        type="button"
        class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        @click="$emit('delete', direction)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m-4 0h12" />
        </svg>
        {{ t('directions.actions.delete') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import DirectionStatusBadge from './DirectionStatusBadge.vue';

const props = defineProps({
  direction: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'view', 'delete']);

const { t } = useI18n();

const gradientClasses = computed(() => {
  const colors = {
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    red: 'bg-gradient-to-br from-red-500 to-red-600',
    indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    pink: 'bg-gradient-to-br from-pink-500 to-pink-600',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  };
  return colors[props.direction.color] || colors.blue;
});

const visibleSubjects = computed(() => props.direction.subjects?.slice(0, 4) ?? []);
const subjectsOverflow = computed(() => Math.max((props.direction.subjects?.length ?? 0) - 4, 0));

const visibleTeachers = computed(() => props.direction.teachers?.slice(0, 3) ?? []);
const teachersOverflow = computed(() => Math.max((props.direction.teachers?.length ?? 0) - 3, 0));

const getTeacherInitials = (teacher) => {
  const first = teacher.firstName?.charAt(0) ?? '';
  const last = teacher.lastName?.charAt(0) ?? '';
  return `${first}${last}`.toUpperCase();
};

const formatTeacherName = (teacher) => `${teacher.firstName ?? ''} ${teacher.lastName ?? ''}`.trim();

const getIcon = (iconName) => {
  const icons = {
    beaker: '🧪',
    laptop: '💻',
    book: '📚',
    globe: '🌍',
    calculator: '🔢',
    atom: '⚛️',
    dna: '🧬',
    palette: '🎨',
    microscope: '🔬'
  };
  return icons[iconName] || '📚';
};
</script>
