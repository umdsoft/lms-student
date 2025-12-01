<template>
  <BaseModal
    :show="show"
    :title="t(`courses.modules.form.title.${mode}`)"
    size="lg"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
  >
    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="module-name" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.modules.form.name') }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="module-name"
          v-model="formData.name"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          :placeholder="t('courses.modules.form.namePlaceholder')"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="module-description" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.modules.form.description') }}
        </label>
        <textarea
          id="module-description"
          v-model="formData.description"
          rows="4"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          :placeholder="t('courses.modules.form.descriptionPlaceholder')"
        />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
        {{ error }}
      </div>
    </form>

    <!-- Footer -->
    <template #footer>
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        @click="handleClose"
      >
        {{ t('courses.modules.form.cancel') }}
      </button>
      <button
        @click="handleSubmit"
        :disabled="loading"
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? t('common.loading') : t('courses.modules.form.save') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
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
  courseId: {
    type: Number,
    required: true
  },
  module: {
    type: [Object, null],
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
  description: '',
  courseId: props.courseId
});

const loading = ref(false);
const error = ref(null);

// Define resetForm BEFORE the watch to avoid hoisting issues
const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    courseId: props.courseId
  };
  error.value = null;
};

// Watch for module changes to populate form in edit mode
watch(
  () => props.module,
  (newModule) => {
    if (newModule && props.mode === 'edit') {
      formData.value = {
        name: newModule.name || '',
        description: newModule.description || '',
        courseId: props.courseId
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

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
    if (props.mode === 'edit' && props.module?.id) {
      await modulesStore.updateModule(props.module.id, formData.value);
      push.success({
        title: t('courses.modules.messages.updateSuccess')
      });
    } else {
      await modulesStore.createModule(props.courseId, formData.value);
      push.success({
        title: t('courses.modules.messages.createSuccess')
      });
    }

    resetForm();
    emit('save');
    emit('update:show', false);
  } catch (err) {
    error.value = err.message || t('courses.modules.messages.error');
  } finally {
    loading.value = false;
  }
};
</script>
