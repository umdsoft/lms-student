<template>
  <div class="text-center py-12">
    <!-- Icon -->
    <div class="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-medium text-gray-900 mb-2">
      {{ t('lessons.files.empty.title') }}
    </h3>

    <!-- Description -->
    <p class="text-gray-500 mb-6 max-w-sm mx-auto">
      {{ t('lessons.files.empty.description') }}
    </p>

    <!-- CTA Button -->
    <button
      v-if="showUploadButton"
      type="button"
      class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      @click="$emit('upload')"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      {{ t('lessons.files.upload') }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  showUploadButton: {
    type: Boolean,
    default: true
  }
});

defineEmits(['upload']);

const { t } = useI18n();
</script>
