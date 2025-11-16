<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <!-- Modal Content -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            @click.stop
          >
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">
                {{ isEdit ? 'Kursni tahrirlash' : 'Yangi kurs' }}
              </h2>
              <button
                type="button"
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="flex-1 overflow-y-auto">
              <div class="px-6 py-4 space-y-4">
                <!-- Course Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Kurs nomi <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :class="{ 'border-red-500': errors.name }"
                    placeholder="Masalan: Python dasturlash asoslari"
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>

                <!-- Level -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Daraja
                  </label>
                  <select
                    v-model="formData.level"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Boshlang'ich</option>
                    <option value="elementary">Elementar</option>
                    <option value="intermediate">O'rta</option>
                    <option value="advanced">Yuqori</option>
                    <option value="expert">Ekspert</option>
                  </select>
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Tavsif
                  </label>
                  <textarea
                    v-model="formData.description"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Kurs haqida qisqacha ma'lumot..."
                  ></textarea>
                </div>

                <!-- Pricing Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Narx turi
                  </label>
                  <div class="flex flex-wrap gap-4">
                    <label class="flex items-center cursor-pointer">
                      <input
                        v-model="formData.pricingType"
                        type="radio"
                        value="free"
                        class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Bepul</span>
                    </label>
                    <label class="flex items-center cursor-pointer">
                      <input
                        v-model="formData.pricingType"
                        type="radio"
                        value="one-time"
                        class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Bir martalik</span>
                    </label>
                    <label class="flex items-center cursor-pointer">
                      <input
                        v-model="formData.pricingType"
                        type="radio"
                        value="subscription"
                        class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Obuna</span>
                    </label>
                  </div>
                </div>

                <!-- Price (if not free) -->
                <div v-if="formData.pricingType !== 'free'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Narx (so'm)
                  </label>
                  <input
                    v-model.number="formData.price"
                    type="number"
                    min="0"
                    step="1000"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :class="{ 'border-red-500': errors.price }"
                    placeholder="0"
                  />
                  <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
                </div>

                <!-- Teacher (if available) -->
                <div v-if="teachers && teachers.length > 0">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    O'qituvchi
                  </label>
                  <select
                    v-model="formData.teacherId"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option :value="null">Tayinlanmagan</option>
                    <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                      {{ teacher.firstName }} {{ teacher.lastName }}
                    </option>
                  </select>
                </div>

                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    v-model="formData.status"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Qoralama</option>
                    <option value="active">Aktiv</option>
                    <option value="inactive">Faol emas</option>
                    <option value="archived">Arxivlangan</option>
                  </select>
                </div>

                <!-- Error Message -->
                <div
                  v-if="errorMessage"
                  class="bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <p class="text-red-600 text-sm">{{ errorMessage }}</p>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  @click="closeModal"
                  :disabled="loading"
                  class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    v-if="loading"
                    class="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{{ loading ? 'Saqlanmoqda...' : 'Saqlash' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCoursesStore } from '@/stores/courses.store';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  course: {
    type: Object,
    default: null
  },
  directionId: {
    type: Number,
    default: null
  },
  teachers: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'success']);

const route = useRoute();
const coursesStore = useCoursesStore();

// Form state
const loading = ref(false);
const errorMessage = ref('');
const errors = ref({});

// Determine if editing
const isEdit = computed(() => !!props.course);

// Form data
const formData = ref({
  name: '',
  level: 'elementary',
  description: '',
  pricingType: 'free',
  price: 0,
  teacherId: null,
  status: 'draft'
});

// Watch for course prop changes (for edit mode)
watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      formData.value = {
        name: newCourse.name || '',
        level: newCourse.level || 'elementary',
        description: newCourse.description || '',
        pricingType: newCourse.pricingType || 'free',
        price: newCourse.price || 0,
        teacherId: newCourse.teacherId || null,
        status: newCourse.status || 'draft'
      };
    }
  },
  { immediate: true }
);

// Reset form when modal opens/closes
watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
    } else if (!props.course) {
      resetForm();
    }
  }
);

/**
 * Reset form to default state
 */
const resetForm = () => {
  formData.value = {
    name: '',
    level: 'elementary',
    description: '',
    pricingType: 'free',
    price: 0,
    teacherId: null,
    status: 'draft'
  };
  errorMessage.value = '';
  errors.value = {};
};

/**
 * Validate form
 * @returns {boolean} True if valid
 */
const validateForm = () => {
  errors.value = {};

  if (!formData.value.name || formData.value.name.trim().length < 3) {
    errors.value.name = "Kurs nomi kamida 3 ta belgidan iborat bo'lishi kerak";
    return false;
  }

  if (formData.value.pricingType !== 'free' && formData.value.price < 0) {
    errors.value.price = "Narx musbat son bo'lishi kerak";
    return false;
  }

  return true;
};

/**
 * Handle form submission
 */
const handleSubmit = async () => {
  errorMessage.value = '';

  // Validate form
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    let response;
    const courseData = {
      ...formData.value,
      price: formData.value.pricingType === 'free' ? 0 : formData.value.price
    };

    if (isEdit.value) {
      // Update existing course
      response = await coursesStore.updateCourse(props.course.id, courseData);
    } else {
      // Create new course
      const directionId = props.directionId || parseInt(route.params.id);

      // 🚨 CRITICAL: Backend expects snake_case 'direction_id'
      // but frontend uses camelCase 'directionId'
      // Solution: Send BOTH to ensure compatibility
      courseData.directionId = directionId;
      courseData.direction_id = directionId;

      response = await coursesStore.createCourse(courseData);
    }

    if (response.success) {
      // ✅ Emit success event (parent will show notification)
      emit('success', response.data);

      // ✅ Close modal
      closeModal();
    }
  } catch (error) {
    console.error('Course save error:', error);
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      'Kursni saqlashda xatolik yuz berdi';
  } finally {
    loading.value = false;
  }
};

/**
 * Close modal
 */
const closeModal = () => {
  if (!loading.value) {
    emit('close');
  }
};

/**
 * Handle backdrop click
 */
const handleBackdropClick = () => {
  if (!loading.value) {
    closeModal();
  }
};
</script>

<style scoped>
/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
