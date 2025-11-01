<template>
  <TransitionRoot :show="show" as="template">
    <Dialog as="div" class="relative z-50" @close="handleClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <!-- Icon -->
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <!-- Title -->
              <DialogTitle class="mb-2 text-xl font-bold text-gray-900">
                {{ t('courses.delete.title') }}
              </DialogTitle>

              <!-- Description -->
              <p class="mb-6 text-sm text-gray-600">
                {{ t('courses.delete.message') }}
              </p>

              <!-- Course Info -->
              <div v-if="course" class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p class="font-semibold text-gray-900">{{ course.name }}</p>
                <p v-if="course.level" class="text-sm text-gray-600">{{ course.level }}</p>
                <div class="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>{{ course.enrolledStudents || 0 }} o'quvchi</span>
                  <span>{{ course.lessonsCount || 0 }} dars</span>
                </div>
              </div>

              <!-- Warning -->
              <div class="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                <p class="font-medium">{{ t('courses.delete.warning') }}</p>
                <p class="mt-1 text-xs">{{ t('courses.delete.warningMessage') }}</p>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {{ error }}
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  type="button"
                  class="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  :disabled="loading"
                  @click="handleClose"
                >
                  {{ t('courses.delete.cancel') }}
                </button>
                <button
                  type="button"
                  class="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="loading"
                  @click="handleConfirm"
                >
                  {{ loading ? t('common.loading') : t('courses.delete.confirm') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useCoursesStore } from '@/stores/courses';

const { t } = useI18n();
const push = useNotivue();
const coursesStore = useCoursesStore();

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  course: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:show', 'confirm']);

const loading = ref(false);
const error = ref(null);

const handleClose = () => {
  if (!loading.value) {
    error.value = null;
    emit('update:show', false);
  }
};

const handleConfirm = async () => {
  if (!props.course?.id) return;

  loading.value = true;
  error.value = null;

  try {
    await coursesStore.deleteCourse(props.course.id, props.course.directionId);
    push.success({
      title: t('courses.messages.deleteSuccess'),
      message: `${props.course.name} muvaffaqiyatli o'chirildi`
    });
    emit('confirm');
    emit('update:show', false);
  } catch (err) {
    error.value = err.message || t('courses.messages.error');
  } finally {
    loading.value = false;
  }
};
</script>
