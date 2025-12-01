<template>
  <BaseModal
    :show="show"
    :title="t(`courses.form.title.${mode}`)"
    size="lg"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
  >
    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
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

      <!-- Pricing Type -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">
          {{ t('courses.pricingType.label') }}
          <span class="text-red-500">*</span>
        </label>
        <div class="space-y-2">
          <label class="flex items-center cursor-pointer">
            <input
              v-model="formData.pricingType"
              type="radio"
              value="subscription"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span class="ml-3 text-sm text-gray-700">
              {{ t('courses.pricingType.subscription') }}
            </span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              v-model="formData.pricingType"
              type="radio"
              value="individual"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span class="ml-3 text-sm text-gray-700">
              {{ t('courses.pricingType.individual') }}
            </span>
          </label>
        </div>
      </div>

      <!-- Price (conditional - only for individual) -->
      <div v-if="formData.pricingType === 'individual'">
        <label for="course-price" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.form.price') }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="course-price"
          v-model.number="formData.price"
          type="number"
          min="0"
          step="1000"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="500000"
        />
      </div>

      <!-- Teacher (Optional) -->
      <div>
        <label for="course-teacher" class="mb-1 block text-sm font-medium text-gray-700">
          {{ t('courses.form.teacher') }}
        </label>
        <select
          id="course-teacher"
          v-model="formData.teacherId"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option :value="null">{{ t('courses.form.teacherUnassigned') }}</option>
          <option
            v-for="teacher in teachers"
            :key="teacher.id"
            :value="teacher.id"
          >
            {{ formatTeacherName(teacher) }}
          </option>
        </select>
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

      <!-- Error Message -->
      <div v-if="errorMessage" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
        {{ errorMessage }}
      </div>
    </form>

    <!-- Footer -->
    <template #footer>
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        @click="handleClose"
      >
        {{ t('courses.form.cancel') }}
      </button>
      <button
        @click="handleSubmit"
        :disabled="loading"
        class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? t('common.loading') : t('courses.form.save') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';
import { useCoursesStore } from '@/stores/courses';
import { useCrudModal } from '@/composables/useCrudModal';

const { t } = useI18n();
const coursesStore = useCoursesStore();

const teachers = computed(() => coursesStore.teachers);

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

// ============================================
// CENTRALIZED CRUD LOGIC
// ============================================
const { loading, errorMessage, handleSubmit: crudSubmit, clearError } = useCrudModal({
  createFn: (data) => coursesStore.createCourse(data),
  updateFn: (id, data) => coursesStore.updateCourse(id, data),
  onSuccess: () => {
    resetForm();
    emit('save');
    emit('update:show', false);
  },
  messages: {
    createSuccess: t('courses.messages.createSuccess'),
    updateSuccess: t('courses.messages.updateSuccess'),
    createError: t('courses.messages.error'),
    updateError: t('courses.messages.error')
  }
});

// ============================================
// FORM STATE
// ============================================
const formData = ref({
  name: '',
  level: '',
  description: '',
  pricingType: 'subscription',
  price: 0,
  teacherId: null,
  status: 'draft',
  directionId: props.directionId
});

// Fetch teachers on mount
onMounted(() => {
  coursesStore.fetchTeachers();
});

const formatTeacherName = (teacher) => {
  return `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() || teacher.email;
};

// Define resetForm BEFORE watch to avoid hoisting issues
const resetForm = () => {
  formData.value = {
    name: '',
    level: '',
    description: '',
    pricingType: 'subscription',
    price: 0,
    teacherId: null,
    status: 'draft',
    directionId: props.directionId
  };
  clearError();
};

// Watch for course changes to populate form in edit mode
watch(
  () => props.course,
  (newCourse) => {
    if (newCourse && props.mode === 'edit') {
      formData.value = {
        name: newCourse.name || '',
        level: newCourse.level || '',
        description: newCourse.description || '',
        pricingType: newCourse.pricingType || 'subscription',
        price: newCourse.price || 0,
        teacherId: newCourse.teacherId || null,
        status: newCourse.status || 'draft',
        directionId: props.directionId
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

// UNIFIED SUBMIT HANDLER
const handleSubmit = async () => {
  await crudSubmit(formData.value, props.course);
};
</script>
