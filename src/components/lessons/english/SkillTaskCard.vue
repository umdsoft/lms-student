<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200">
    <div class="flex items-start gap-4">
      <!-- Icon -->
      <div
        class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        :class="iconClass"
      >
        <component :is="icon" class="w-6 h-6" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-gray-900 truncate">
          {{ task.title || t(`lessons.skills.${skillType}.untitled`) }}
        </h4>

        <!-- Meta info -->
        <div class="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <!-- Type badge -->
          <span v-if="typeBadge" class="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
            {{ typeBadge }}
          </span>

          <!-- Time limit -->
          <span v-if="task.timeLimit" class="inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ task.timeLimit }} {{ t('lessons.skills.minutes') }}
          </span>

          <!-- Word count for writing -->
          <span v-if="task.minWords" class="inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {{ task.minWords }}+ {{ t('lessons.skills.words') }}
          </span>

          <!-- Questions count for reading -->
          <span v-if="task.questions?.length" class="inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ task.questions.length }} {{ t('lessons.skills.questions') }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex-shrink-0 flex items-center gap-1">
        <button
          type="button"
          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          :title="t('common.actions.edit')"
          @click="$emit('edit', task)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
        <button
          type="button"
          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          :title="t('common.actions.delete')"
          @click="$emit('delete', task)"
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
import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  task: { type: Object, required: true },
  skillType: {
    type: String,
    required: true,
    validator: v => ['writing', 'listening', 'speaking', 'reading'].includes(v)
  }
});

defineEmits(['edit', 'delete']);

const { t } = useI18n();

const iconClass = computed(() => {
  const classes = {
    writing: 'bg-blue-100 text-blue-600',
    listening: 'bg-purple-100 text-purple-600',
    speaking: 'bg-orange-100 text-orange-600',
    reading: 'bg-green-100 text-green-600'
  };
  return classes[props.skillType];
});

const icon = computed(() => {
  const icons = {
    writing: {
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
      ])
    },
    listening: {
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' })
      ])
    },
    speaking: {
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' })
      ])
    },
    reading: {
      render: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
      ])
    }
  };
  return icons[props.skillType];
});

const typeBadge = computed(() => {
  if (props.skillType === 'writing') {
    return props.task.taskType === 'task1' ? 'Task 1' : 'Task 2';
  }
  if (props.skillType === 'speaking') {
    return props.task.partType?.replace('part', 'Part ');
  }
  return null;
});
</script>
