<template>
  <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <!-- Section header -->
    <button
      type="button"
      class="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
        </div>
        <div class="text-left">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('lessons.tests.title') }}</h3>
          <p class="text-sm text-gray-500">{{ testsCount }} {{ t('lessons.tests.count') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div v-if="canManage && isExpanded" class="flex items-center gap-2" @click.stop>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            @click="navigateToCreateTest"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.tests.create') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            @click="showImportModal = true"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            {{ t('lessons.tests.import.button') }}
          </button>
        </div>
        <svg
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </button>

    <!-- Section content -->
    <div v-show="isExpanded" class="border-t border-gray-200">
      <!-- Stats bar -->
      <div v-if="tests.length > 0" class="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Difficulty filter -->
          <div class="flex items-center gap-2">
            <button
              v-for="filter in difficultyFilters"
              :key="filter.value"
              type="button"
              class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
              :class="activeFilter === filter.value
                ? filter.activeClass
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              @click="setFilter(filter.value)"
            >
              {{ filter.label }} {{ filter.value ? `(${difficultyCounts[filter.value] || 0})` : `(${tests.length})` }}
            </button>
          </div>

          <div class="flex-1"></div>

          <!-- Stats -->
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span class="inline-flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {{ t('lessons.tests.totalPoints') }}: {{ totalPoints }}
            </span>
            <span class="inline-flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ t('lessons.tests.estimatedTime') }}: {{ estimatedTime }} {{ t('lessons.tests.minutes') }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tests list -->
      <div class="p-6">
        <!-- Loading -->
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <!-- Empty state -->
        <TestsEmptyState
          v-else-if="tests.length === 0"
          @create="navigateToCreateTest"
          @import="showImportModal = true"
        />

        <!-- Tests -->
        <draggable
          v-else
          v-model="filteredTests"
          item-key="id"
          handle=".cursor-move"
          ghost-class="opacity-50"
          :disabled="!canManage"
          @end="handleReorder"
          class="space-y-3"
        >
          <template #item="{ element, index }">
            <TestCard
              :test="element"
              :order-number="index + 1"
              :draggable="canManage"
              @edit="navigateToEditTest(element)"
              @delete="confirmDeleteTest(element)"
            />
          </template>
        </draggable>
      </div>
    </div>

    <!-- Import modal -->
    <TestImportModal
      v-model:show="showImportModal"
      :importing="importing"
      @import="handleImportTests"
    />

    <!-- Delete confirmation -->
    <BaseModal
      :show="showDeleteConfirm"
      :title="t('lessons.tests.deleteTitle')"
      size="sm"
      @update:show="showDeleteConfirm = $event"
    >
      <div class="text-center">
        <!-- Warning icon -->
        <div class="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>

        <!-- Test name -->
        <p class="text-gray-900 font-medium mb-2" v-if="selectedTest">
          "{{ truncateQuestion(selectedTest.question) }}"
        </p>

        <!-- Confirmation text -->
        <p class="text-gray-500 text-sm">
          {{ t('lessons.tests.deleteConfirm') }}
        </p>
        <p class="text-gray-400 text-xs mt-1">
          {{ t('lessons.tests.deleteWarning', 'Bu amalni ortga qaytarib bo\'lmaydi.') }}
        </p>
      </div>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          @click="showDeleteConfirm = false"
        >
          {{ t('common.actions.cancel') }}
        </button>
        <button
          type="button"
          class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          :disabled="deleting"
          @click="handleDeleteTest"
        >
          <span v-if="deleting" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ t('common.loading') }}
          </span>
          <span v-else>{{ t('common.actions.delete') }}</span>
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import draggable from 'vuedraggable';
import BaseModal from '@/components/common/BaseModal.vue';
import TestCard from './tests/TestCard.vue';
import TestImportModal from './tests/TestImportModal.vue';
import TestsEmptyState from './tests/TestsEmptyState.vue';
import { useLessonTestsStore } from '@/stores/lessonTests';

const props = defineProps({
  lessonId: { type: [Number, String], required: true },
  canManage: { type: Boolean, default: false }
});

const emit = defineEmits(['update:testsCount']);

const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();
const testsStore = useLessonTestsStore();

const isExpanded = ref(true);
const showImportModal = ref(false);
const showDeleteConfirm = ref(false);
const selectedTest = ref(null);
const activeFilter = ref(null);
const importing = ref(false);
const deleting = ref(false);

const tests = computed(() => {
  const storeTests = testsStore.tests;
  return Array.isArray(storeTests) ? storeTests : [];
});
const loading = computed(() => testsStore.loading);
const testsCount = computed(() => tests.value.length);
const totalPoints = computed(() => testsStore.totalPoints);
const estimatedTime = computed(() => testsStore.estimatedTimeMinutes);
const difficultyCounts = computed(() => testsStore.difficultyCounts);

const filteredTests = computed({
  get: () => {
    const storeFilteredTests = testsStore.filteredTests;
    return Array.isArray(storeFilteredTests) ? storeFilteredTests : [];
  },
  set: (val) => {
    // Update order locally, will sync on drag end
  }
});

const difficultyFilters = computed(() => [
  { value: null, label: t('lessons.tests.all'), activeClass: 'bg-gray-800 text-white' },
  { value: 'easy', label: t('lessons.tests.difficulty.easy'), activeClass: 'bg-green-600 text-white' },
  { value: 'medium', label: t('lessons.tests.difficulty.medium'), activeClass: 'bg-yellow-500 text-white' },
  { value: 'hard', label: t('lessons.tests.difficulty.hard'), activeClass: 'bg-red-600 text-white' }
]);

onMounted(() => {
  loadTests();
});

const loadTests = async () => {
  if (!props.lessonId) return;
  try {
    await testsStore.fetchTestsByLesson(props.lessonId);
    emit('update:testsCount', testsCount.value);
  } catch (error) {
    push.error({ title: t('lessons.tests.loadError') });
  }
};

const setFilter = (value) => {
  activeFilter.value = value;
  testsStore.setDifficultyFilter(value);
};

const navigateToCreateTest = () => {
  if (!props.lessonId) {
    console.error('lessonId is required for navigation');
    return;
  }
  router.push({
    name: 'admin.test-create',
    params: { lessonId: props.lessonId }
  });
};

const navigateToEditTest = (test) => {
  if (!props.lessonId) {
    console.error('lessonId is required for navigation');
    return;
  }
  router.push({
    name: 'admin.test-edit',
    params: { lessonId: props.lessonId, testId: test.id }
  });
};

const handleImportTests = async (testsData) => {
  importing.value = true;
  try {
    await testsStore.importTests(props.lessonId, testsData);
    push.success({ title: t('lessons.tests.importSuccess', { count: testsData.length }) });
    showImportModal.value = false;
    emit('update:testsCount', testsCount.value);
  } catch (error) {
    push.error({ title: error.message || t('lessons.tests.importError') });
  } finally {
    importing.value = false;
  }
};

const confirmDeleteTest = (test) => {
  selectedTest.value = test;
  showDeleteConfirm.value = true;
};

const handleDeleteTest = async () => {
  if (!selectedTest.value) return;

  deleting.value = true;
  try {
    await testsStore.deleteTest(selectedTest.value.id, props.lessonId);
    push.success({ title: t('lessons.tests.deleteSuccess') });
    showDeleteConfirm.value = false;
    selectedTest.value = null;
    emit('update:testsCount', testsCount.value);
  } catch (error) {
    push.error({ title: error.message || t('lessons.tests.deleteError') });
  } finally {
    deleting.value = false;
  }
};

const handleReorder = async () => {
  const testIds = filteredTests.value.map(t => t.id);
  try {
    await testsStore.reorderTests(props.lessonId, testIds);
  } catch (error) {
    push.error({ title: t('lessons.tests.reorderError') });
    await loadTests();
  }
};

// Helper: truncate question text for display
const truncateQuestion = (question) => {
  if (!question) return '';
  // Remove HTML tags
  const plainText = question.replace(/<[^>]*>/g, '').trim();
  // Truncate to 50 characters
  return plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
};
</script>
