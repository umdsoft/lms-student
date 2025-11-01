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
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <!-- Header -->
              <DialogTitle class="mb-6 text-2xl font-bold text-gray-900">
                {{ t(`courses.form.title.${mode}`) }}
              </DialogTitle>

              <!-- Form -->
              <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                  <!-- Name -->
                  <div>
                    <label for="course-name" class="mb-1 block text-sm font-medium text-gray-700">
                      {{ t('courses.form.name') }}
                      <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="course-name"
                      v-model="formData.name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      :placeholder="t('courses.form.name')"
                    />
                  </div>

                  <!-- Level -->
                  <div>
                    <label for="course-level" class="mb-1 block text-sm font-medium text-gray-700">
                      {{ t('courses.form.level') }}
                    </label>
                    <select
                      id="course-level"
                      v-model="formData.level"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="">{{ t('courses.form.level') }}</option>
                      <option value="beginner">{{ t('courses.levels.beginner') }}</option>
                      <option value="elementary">{{ t('courses.levels.elementary') }}</option>
                      <option value="intermediate">{{ t('courses.levels.intermediate') }}</option>
                      <option value="upperIntermediate">{{ t('courses.levels.upperIntermediate') }}</option>
                      <option value="advanced">{{ t('courses.levels.advanced') }}</option>
                      <option value="proficiency">{{ t('courses.levels.proficiency') }}</option>
                    </select>
                  </div>

                  <!-- Description -->
                  <div>
                    <label for="course-description" class="mb-1 block text-sm font-medium text-gray-700">
                      {{ t('courses.form.description') }}
                    </label>
                    <textarea
                      id="course-description"
                      v-model="formData.description"
                      rows="3"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      :placeholder="t('courses.form.description')"
                    />
                  </div>

                  <!-- Duration and Lessons Count (Grid) -->
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label for="course-duration" class="mb-1 block text-sm font-medium text-gray-700">
                        {{ t('courses.form.duration') }}
                      </label>
                      <input
                        id="course-duration"
                        v-model.number="formData.duration"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="6"
                      />
                    </div>

                    <div>
                      <label for="course-lessons" class="mb-1 block text-sm font-medium text-gray-700">
                        {{ t('courses.form.lessonsCount') }}
                      </label>
                      <input
                        id="course-lessons"
                        v-model.number="formData.lessonsCount"
                        type="number"
                        min="0"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="24"
                      />
                    </div>
                  </div>

                  <!-- Price -->
                  <div>
                    <label for="course-price" class="mb-1 block text-sm font-medium text-gray-700">
                      {{ t('courses.form.price') }}
                    </label>
                    <input
                      id="course-price"
                      v-model.number="formData.price"
                      type="number"
                      min="0"
                      step="1000"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="500000"
                    />
                  </div>

                  <!-- Status -->
                  <div>
                    <label for="course-status" class="mb-1 block text-sm font-medium text-gray-700">
                      {{ t('courses.form.status') }}
                    </label>
                    <select
                      id="course-status"
                      v-model="formData.status"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="draft">{{ t('courses.status.draft') }}</option>
                      <option value="active">{{ t('courses.status.active') }}</option>
                      <option value="inactive">{{ t('courses.status.inactive') }}</option>
                    </select>
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {{ error }}
                </div>

                <!-- Actions -->
                <div class="mt-6 flex gap-3">
                  <button
                    type="button"
                    class="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    @click="handleClose"
                  >
                    {{ t('courses.form.cancel') }}
                  </button>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {{ loading ? t('common.loading') : t('courses.form.save') }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from 'vue';
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
  directionId: {
    type: Number,
    required: true
  },
  course: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  }
});

const emit = defineEmits(['update:show', 'save']);

const formData = ref({
  name: '',
  level: '',
  description: '',
  duration: 0,
  lessonsCount: 0,
  price: 0,
  status: 'draft',
  directionId: props.directionId
});

const loading = ref(false);
const error = ref(null);

// Watch for course changes to populate form in edit mode
watch(
  () => props.course,
  (newCourse) => {
    if (newCourse && props.mode === 'edit') {
      formData.value = {
        name: newCourse.name || '',
        level: newCourse.level || '',
        description: newCourse.description || '',
        duration: newCourse.duration || 0,
        lessonsCount: newCourse.lessonsCount || 0,
        price: newCourse.price || 0,
        status: newCourse.status || 'draft',
        directionId: props.directionId
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const resetForm = () => {
  formData.value = {
    name: '',
    level: '',
    description: '',
    duration: 0,
    lessonsCount: 0,
    price: 0,
    status: 'draft',
    directionId: props.directionId
  };
  error.value = null;
};

const handleClose = () => {
  if (!loading.value) {
    resetForm();
    emit('update:show', false);
  }
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    if (props.mode === 'edit' && props.course?.id) {
      await coursesStore.updateCourse(props.course.id, formData.value);
      push.success({
        title: t('courses.messages.updateSuccess')
      });
    } else {
      await coursesStore.createCourse(formData.value);
      push.success({
        title: t('courses.messages.createSuccess')
      });
    }

    resetForm();
    emit('save');
    emit('update:show', false);
  } catch (err) {
    error.value = err.message || t('courses.messages.error');
  } finally {
    loading.value = false;
  }
};
</script>
