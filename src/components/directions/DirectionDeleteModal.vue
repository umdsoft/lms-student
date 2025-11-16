<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500/60 transition-opacity" aria-hidden="true" @click="handleClose" />
      <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

      <div class="inline-block w-full transform overflow-hidden rounded-2xl bg-white px-6 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg sm:align-middle sm:p-6">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5 13a7 7 0 1114 0 7 7 0 01-14 0z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 class="text-lg font-medium leading-6 text-gray-900">{{ t('directions.delete.title') }}</h3>
            <div class="mt-2 text-sm text-gray-500">
              <p>{{ t('directions.delete.message') }}</p>
              <p v-if="direction" class="mt-2 font-semibold text-gray-700">{{ direction.name }}</p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 sm:ml-3 sm:w-auto"
            @click="handleConfirm"
          >
            {{ t('directions.delete.confirm') }}
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:mt-0 sm:w-auto"
            @click="handleClose"
          >
            {{ t('directions.delete.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  direction: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:show', 'confirm']);

const { t } = useI18n();

function handleConfirm() {
  // Emit confirm event first
  emit('confirm');

  // Close modal after emitting confirm
  // Parent will handle the actual deletion and show notification
  emit('update:show', false);
}

function handleClose() {
  emit('update:show', false);
}
</script>
