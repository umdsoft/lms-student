<template>
  <BaseModal
    :show="show"
    :title="t('courses.modules.delete.title')"
    size="md"
    @update:show="$emit('update:show', $event)"
    @close="$emit('update:show', false)"
  >
    <!-- Warning Content -->
    <div class="space-y-4">
      <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div class="flex items-start gap-3">
          <svg class="h-6 w-6 flex-shrink-0 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div>
            <h4 class="font-semibold text-yellow-900">{{ t('courses.modules.delete.warning') }}</h4>
            <p class="mt-1 text-sm text-yellow-800">
              {{ t('courses.modules.delete.warningMessage') }}
            </p>
          </div>
        </div>
      </div>

      <p class="text-gray-700">
        {{ t('courses.modules.delete.message') }}
      </p>

      <div class="rounded-lg bg-gray-50 p-4">
        <p class="font-semibold text-gray-900">{{ module?.name }}</p>
        <p class="mt-1 text-sm text-gray-600">
          {{ module?.stats?.lessonsCount || 0 }} {{ t('courses.modules.lessonsCount') }}
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
        {{ error }}
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        @click="$emit('update:show', false)"
        :disabled="loading"
      >
        {{ t('courses.modules.delete.cancel') }}
      </button>
      <button
        @click="handleDelete"
        :disabled="loading"
        class="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? t('common.loading') : t('courses.modules.delete.confirm') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import BaseModal from '@/components/common/BaseModal.vue';
import { useModulesStore } from '@/stores/modules';

const { t } = useI18n();
const { push } = useNotivue();
const modulesStore = useModulesStore();

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  module: {
    type: Object,
    required: true
  },
  courseId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:show', 'confirm']);

const loading = ref(false);
const error = ref(null);

const handleDelete = async () => {
  loading.value = true;
  error.value = null;

  try {
    await modulesStore.deleteModule(props.module.id, props.courseId);
    push.success({
      title: t('courses.modules.messages.deleteSuccess')
    });
    emit('confirm');
    emit('update:show', false);
  } catch (err) {
    error.value = err.message || t('courses.modules.messages.error');
  } finally {
    loading.value = false;
  }
};
</script>
