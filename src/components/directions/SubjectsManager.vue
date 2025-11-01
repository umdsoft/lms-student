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

      <div class="inline-block w-full transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-2xl sm:align-middle">
        <div class="bg-white px-6 pb-6 pt-5 sm:p-8">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ t('directions.subjects.manage') }}</h2>
              <p class="mt-1 text-sm text-gray-500">{{ t('directions.subjects.description') }}</p>
            </div>
            <button
              type="button"
              class="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
              @click="handleClose"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mt-6">
            <label for="new-subject" class="block text-sm font-medium text-gray-700">
              {{ t('directions.subjects.add') }}
            </label>
            <div class="mt-2 flex gap-2">
              <input
                id="new-subject"
                v-model="newSubject"
                type="text"
                class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :placeholder="t('directions.subjects.placeholder')"
                @keyup.enter="handleAddSubject"
              />
              <button
                type="button"
                class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                :disabled="!newSubject.trim()"
                @click="handleAddSubject"
              >
                {{ t('directions.subjects.addButton') }}
              </button>
            </div>
          </div>

          <div v-if="pendingSubjects.length" class="mt-4 rounded-lg border border-dashed border-blue-300 bg-blue-50 p-4">
            <p class="text-sm font-medium text-blue-700">{{ t('directions.subjects.pending') }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="subject in pendingSubjects"
                :key="subject"
                class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {{ subject }}
                <button
                  type="button"
                  class="text-blue-700 hover:text-blue-900"
                  @click="removePending(subject)"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <div class="mt-6">
            <p class="text-sm font-medium text-gray-700">{{ t('directions.subjects.current') }}</p>
            <div v-if="subjects?.length" class="mt-3 space-y-2">
              <div
                v-for="subject in subjects"
                :key="subject.id"
                class="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2"
              >
                <span class="text-sm font-medium text-gray-800">{{ subject.name }}</span>
                <button
                  type="button"
                  class="text-sm font-medium text-red-600 hover:text-red-700"
                  @click="emit('remove', subject)"
                >
                  {{ t('directions.subjects.remove') }}
                </button>
              </div>
            </div>
            <div v-else class="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              {{ t('directions.subjects.empty') }}
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            @click="handleClose"
          >
            {{ t('directions.form.cancel') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            :disabled="pendingSubjects.length === 0"
            @click="handleSubmit"
          >
            {{ t('directions.subjects.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  subjects: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:show', 'add', 'remove']);

const { t } = useI18n();

const newSubject = ref('');
const pendingSubjects = ref([]);

watch(
  () => props.show,
  (value) => {
    if (!value) {
      newSubject.value = '';
      pendingSubjects.value = [];
    }
  }
);

const handleAddSubject = () => {
  const value = newSubject.value.trim();
  if (!value) return;
  if (!pendingSubjects.value.includes(value)) {
    pendingSubjects.value.push(value);
  }
  newSubject.value = '';
};

const removePending = (subject) => {
  pendingSubjects.value = pendingSubjects.value.filter((item) => item !== subject);
};

const handleSubmit = () => {
  if (!pendingSubjects.value.length) return;
  emit('add', pendingSubjects.value.map((name) => ({ name })));
  pendingSubjects.value = [];
};

const handleClose = () => {
  emit('update:show', false);
};
</script>
