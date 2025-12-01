<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <!-- Left: Number & Info -->
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-bold text-gray-400">{{ index + 1 }}.</span>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ module.name }}</h3>
            <div class="text-sm text-gray-600 mt-1">
              {{ module.stats?.lessonsCount || 0 }} {{ t('courses.modules.lessonsCount') }} •
              {{ formatDuration(module.stats?.totalDuration || 0) }}
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
          :title="t('courses.modules.moveUp')"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
        </button>
        <button
          v-if="!isLast"
          @click="$emit('move-down')"
          class="p-2 hover:bg-gray-100 rounded transition-colors"
          :title="t('courses.modules.moveDown')"
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
          {{ t('courses.modules.edit') }}
        </button>
        <button
          @click="$emit('view')"
          class="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {{ t('courses.modules.view') }}
        </button>
        <button
          @click="$emit('delete')"
          class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          :title="t('courses.modules.deleteAction')"
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

const { t } = useI18n();

defineProps({
  module: {
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
  if (!seconds) return '0 daqiqa';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} soat ${minutes > 0 ? minutes + ' daqiqa' : ''}`;
  }
  return `${minutes} daqiqa`;
};
</script>
