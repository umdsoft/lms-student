<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <!-- Left: Number & Info -->
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-bold text-gray-400">{{ index + 1 }}.</span>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ lesson.name }}</h3>
            <div class="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <span class="inline-flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                {{ lesson.videoType === 'youtube' ? 'YouTube' : 'Video' }}
              </span>
              <span class="inline-flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                {{ formatDuration(lesson.duration) }}
              </span>
              <span v-if="lesson.files?.length" class="inline-flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
                </svg>
                {{ lesson.files.length }} fayl
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2">
        <!-- Reorder buttons -->
        <button
          v-if="!isFirst"
          @click="$emit('move-up')"
          class="p-2 hover:bg-gray-100 rounded transition-colors"
          :title="t('courses.lessons.moveUp')"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
        </button>
        <button
          v-if="!isLast"
          @click="$emit('move-down')"
          class="p-2 hover:bg-gray-100 rounded transition-colors"
          :title="t('courses.lessons.moveDown')"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Action buttons -->
        <button
          @click="$emit('edit')"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {{ t('courses.lessons.edit') }}
        </button>
        <button
          @click="$emit('view')"
          class="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {{ t('courses.lessons.view') }}
        </button>
        <button
          @click="$emit('delete')"
          class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          :title="t('courses.lessons.delete')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m12 0H3"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { formatVideoDuration } from '@/utils/videoProcessor';

const { t } = useI18n();

defineProps({
  lesson: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  isFirst: {
    type: Boolean,
    default: false
  },
  isLast: {
    type: Boolean,
    default: false
  }
});

defineEmits(['edit', 'view', 'delete', 'move-up', 'move-down']);

const formatDuration = (seconds) => {
  return formatVideoDuration(seconds || 0);
};
</script>
