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
      <div v-if="isLoading || !module" class="space-y-6">
        <div class="h-40 animate-pulse rounded-3xl bg-gray-200"/>
        <div class="h-64 animate-pulse rounded-2xl bg-gray-200"/>
      </div>

      <!-- Module Content -->
      <div v-else class="space-y-8">
        <!-- Module Header -->
        <div class="overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
          <div class="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                📖
              </div>
              <div>
                <h1 class="text-3xl font-bold leading-tight">{{ module.name }}</h1>
                <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                  <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                    {{ module.stats?.lessonsCount || 0 }} {{ t('courses.modules.lessonsCount') }}
                  </span>
                  <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    {{ formatDuration(module.stats?.totalDuration) }}
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
                {{ t('courses.modules.edit') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                @click="openDeleteModal"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m12 0H3"/>
                </svg>
                {{ t('courses.modules.deleteAction') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Module Description -->
        <div v-if="module.description" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900">{{ t('courses.modules.description') }}</h2>
          <p class="mt-3 text-gray-700">{{ module.description }}</p>
        </div>

        <!-- Lessons Section -->
        <LessonsList
          :module-id="module.id"
          :can-manage="canManage"
          @view-lesson="handleViewLesson"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <ModuleFormModal
      v-if="module"
      v-model:show="showFormModal"
      :course-id="module.courseId"
      :module="module"
      mode="edit"
      @save="handleSaveModule"
    />

    <!-- Delete Modal -->
    <ModuleDeleteModal
      v-if="module"
      v-model:show="showDeleteModal"
      :module="module"
      :course-id="module.courseId"
      @confirm="handleDeleteModule"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import LessonsList from '@/components/courses/LessonsList.vue';
import ModuleFormModal from '@/components/courses/ModuleFormModal.vue';
import ModuleDeleteModal from '@/components/courses/ModuleDeleteModal.vue';
import { useModulesStore } from '@/stores/modules';
import { useAuth } from '@/shared/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();
const modulesStore = useModulesStore();
const { user } = useAuth();

const showFormModal = ref(false);
const showDeleteModal = ref(false);

const module = computed(() => modulesStore.currentModule);
const isLoading = computed(() => modulesStore.isLoading);
const canManage = computed(() => user.value?.role === 'admin');

onMounted(() => {
  if (route.params.id) {
    loadModule(route.params.id);
  }
});

const loadModule = async (id) => {
  try {
    await modulesStore.fetchModule(id);
  } catch (error) {
    push.error({ title: t('courses.modules.messages.error') });
  }
};

const openEditModal = () => {
  showFormModal.value = true;
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const handleSaveModule = async () => {
  await loadModule(route.params.id);
};

const handleDeleteModule = async () => {
  router.push({ name: 'admin.course-detail', params: { id: module.value.courseId } });
};

const handleViewLesson = (lesson) => {
  router.push({ name: 'admin.lesson-detail', params: { id: lesson.id } });
};

const formatDuration = (seconds) => {
  if (!seconds) return '0 soat';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours} soat ${minutes > 0 ? minutes + ' daqiqa' : ''}`;
  }
  return `${minutes} daqiqa`;
};
</script>
