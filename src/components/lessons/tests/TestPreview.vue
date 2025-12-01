<template>
  <div class="bg-gray-50 rounded-xl p-6">
    <!-- Question -->
    <div class="mb-6">
      <div
        v-if="hasHtmlQuestion"
        class="text-lg font-medium text-gray-900 prose prose-sm max-w-none"
        v-html="sanitizedQuestion"
      ></div>
      <p v-else class="text-lg font-medium text-gray-900">
        {{ test.question || placeholderText }}
      </p>
    </div>

    <!-- Question image -->
    <div v-if="test.imageUrl" class="mb-6">
      <img
        :src="test.imageUrl"
        alt="Question image"
        class="max-h-48 rounded-lg border border-gray-200"
      />
    </div>

    <!-- Options -->
    <div class="space-y-3">
      <div
        v-for="(option, index) in displayOptions"
        :key="index"
        class="flex items-center gap-3 p-4 rounded-xl border-2 transition-all"
        :class="option.isCorrect ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'"
      >
        <span
          class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          :class="option.isCorrect ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'"
        >
          {{ String.fromCharCode(65 + index) }}
        </span>
        <div class="flex-1">
          <div
            v-if="hasHtmlOption(option.text)"
            class="text-gray-700 prose prose-sm max-w-none"
            v-html="sanitizeText(option.text)"
          ></div>
          <p v-else class="text-gray-700">
            {{ option.text || `Variant ${String.fromCharCode(65 + index)}` }}
          </p>
        </div>
        <svg v-if="option.isCorrect" class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>

    <!-- Meta info -->
    <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
      <!-- Difficulty badge -->
      <span
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
        :class="difficultyClass"
      >
        {{ difficultyLabel }}
      </span>

      <!-- Points -->
      <span class="inline-flex items-center gap-1">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        {{ test.points || 10 }} {{ $t('lessons.tests.points') }}
      </span>

      <!-- Time limit -->
      <span v-if="test.timeLimit" class="inline-flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ formatTime(test.timeLimit) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import DOMPurify from 'dompurify';
import katex from 'katex';

const props = defineProps({
  test: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();

const placeholderText = computed(() => t('lessons.tests.form.questionPlaceholder'));

// Render math formulas in text using KaTeX
const renderMath = (text) => {
  if (!text) return '';
  return text.replace(/\$([^$]+)\$/g, (match, latex) => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false
      });
    } catch {
      return match;
    }
  });
};

const hasHtmlQuestion = computed(() => {
  const question = props.test.question || '';
  return /<[^>]+>/.test(question) || /\$[^$]+\$/.test(question);
});

const hasHtmlOption = (text) => {
  return /<[^>]+>/.test(text || '') || /\$[^$]+\$/.test(text || '');
};

const sanitizedQuestion = computed(() => {
  const sanitized = DOMPurify.sanitize(props.test.question || '');
  return renderMath(sanitized);
});

const sanitizeText = (text) => {
  const sanitized = DOMPurify.sanitize(text || '');
  return renderMath(sanitized);
};

const displayOptions = computed(() => {
  return props.test.options?.length > 0
    ? props.test.options
    : [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ];
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

const formatTime = (seconds) => {
  if (!seconds) return '';
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};
</script>

<style scoped>
/* KaTeX styles */
:deep(.katex) {
  font-size: 1em;
}

:deep(.katex-display) {
  margin: 0.5em 0;
}
</style>
