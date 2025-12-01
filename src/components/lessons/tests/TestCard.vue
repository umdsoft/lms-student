<template>
  <div
    class="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
    :class="{ 'cursor-move': draggable }"
  >
    <div class="flex items-start gap-4">
      <!-- Drag handle -->
      <div
        v-if="draggable"
        class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-move"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
        </svg>
      </div>

      <!-- Order number -->
      <div
        class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
        :class="orderNumberClass"
      >
        {{ orderNumber }}
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Question text -->
        <div class="mb-2">
          <p
            v-if="!hasHtml"
            class="text-gray-900 font-medium line-clamp-2"
          >
            {{ test.question }}
          </p>
          <div
            v-else
            class="text-gray-900 font-medium line-clamp-2 prose prose-sm"
            v-html="sanitizedQuestion"
          ></div>
        </div>

        <!-- Test image thumbnail -->
        <div v-if="test.imageUrl" class="mb-3">
          <img
            :src="test.imageUrl"
            :alt="t('lessons.tests.questionImage')"
            class="h-16 w-auto rounded-lg object-cover border border-gray-200"
          />
        </div>

        <!-- Meta info -->
        <div class="flex flex-wrap items-center gap-3 text-sm">
          <!-- Difficulty badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="difficultyClass"
          >
            {{ difficultyLabel }}
          </span>

          <!-- Points -->
          <span class="inline-flex items-center gap-1 text-gray-500">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            {{ test.points || 10 }} {{ t('lessons.tests.points') }}
          </span>

          <!-- Time limit -->
          <span v-if="test.timeLimit" class="inline-flex items-center gap-1 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ formatTime(test.timeLimit) }}
          </span>

          <!-- Options count -->
          <span class="inline-flex items-center gap-1 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            {{ test.options?.length || 0 }} {{ t('lessons.tests.options') }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          :title="t('common.actions.edit')"
          @click="$emit('edit', test)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
        <button
          type="button"
          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          :title="t('common.actions.delete')"
          @click="$emit('delete', test)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import DOMPurify from 'dompurify';

const props = defineProps({
  test: {
    type: Object,
    required: true
  },
  orderNumber: {
    type: Number,
    default: 1
  },
  draggable: {
    type: Boolean,
    default: true
  }
});

defineEmits(['edit', 'delete']);

const { t } = useI18n();

const hasHtml = computed(() => {
  const question = props.test.question || '';
  return /<[^>]+>/.test(question);
});

const sanitizedQuestion = computed(() => {
  return DOMPurify.sanitize(props.test.question || '');
});

const difficultyClass = computed(() => {
  switch (props.test.difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
});

const difficultyLabel = computed(() => {
  switch (props.test.difficulty) {
    case 'easy':
      return t('lessons.tests.difficulty.easy');
    case 'medium':
      return t('lessons.tests.difficulty.medium');
    case 'hard':
      return t('lessons.tests.difficulty.hard');
    default:
      return t('lessons.tests.difficulty.medium');
  }
});

const orderNumberClass = computed(() => {
  switch (props.test.difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
});

const formatTime = (seconds) => {
  if (!seconds) return '';
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
