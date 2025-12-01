<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="handleClose"
      />

      <!-- Center modal -->
      <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

      <!-- Modal content -->
      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <!-- Header -->
            <div class="mb-4">
              <h3 id="modal-title" class="text-lg font-medium leading-6 text-gray-900">
                {{ mode === 'create' ? t('users.form.title.create') : t('users.form.title.edit') }}
              </h3>
            </div>

            <!-- Form Fields -->
            <div class="space-y-4">
              <!-- First Name -->
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.firstName') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.firstName }"
                />
                <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
              </div>

              <!-- Last Name -->
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.lastName') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.lastName }"
                />
                <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.email') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.phone') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  required
                  placeholder="+998901234567"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>

              <!-- Password (only for create mode) -->
              <div v-if="mode === 'create'">
                <label for="password" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.password') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  :required="mode === 'create'"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.password }"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
              </div>

              <!-- Role -->
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.role') }}
                  <span class="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  v-model="formData.role"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.role }"
                >
                  <option value="">{{ t('users.form.role') }}</option>
                  <option value="student">{{ t('users.roles.student') }}</option>
                  <option value="teacher">{{ t('users.roles.teacher') }}</option>
                  <option value="admin">{{ t('users.roles.admin') }}</option>
                </select>
                <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role }}</p>
              </div>

              <!-- Status -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700">
                  {{ t('users.form.status') }}
                  <span class="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  v-model="formData.status"
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.status }"
                >
                  <option value="">{{ t('users.form.status') }}</option>
                  <option value="active">{{ t('users.status.active') }}</option>
                  <option value="inactive">{{ t('users.status.inactive') }}</option>
                </select>
                <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ t('users.form.save') }}
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="handleClose"
            >
              {{ t('users.form.cancel') }}
            </button>
          </div>
        </form>
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
  user: {
    type: [Object, null],
    default: null
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ['create', 'edit'].includes(value)
  }
});

const emit = defineEmits(['update:show', 'save']);

const { t } = useI18n();

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  role: '',
  status: 'active'
});

// Form errors
const errors = ref({});

/**
 * Reset form - defined BEFORE watch to avoid hoisting issues
 */
const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    status: 'active'
  };
  errors.value = {};
};

/**
 * Watch for user prop changes to populate form
 */
watch(
  () => [props.user, props.show],
  () => {
    if (props.show) {
      if (props.mode === 'edit' && props.user) {
        formData.value = {
          firstName: props.user.firstName || '',
          lastName: props.user.lastName || '',
          email: props.user.email || '',
          phone: props.user.phone || '',
          password: '',
          role: props.user.role || '',
          status: props.user.status || 'active'
        };
      } else {
        resetForm();
      }
      errors.value = {};
    }
  },
  { immediate: true }
);

/**
 * Validate form
 */
const validateForm = () => {
  errors.value = {};

  if (!formData.value.firstName) {
    errors.value.firstName = t('users.form.required');
  }

  if (!formData.value.lastName) {
    errors.value.lastName = t('users.form.required');
  }

  if (!formData.value.email) {
    errors.value.email = t('users.form.required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Email formatida xatolik';
  }

  if (!formData.value.phone) {
    errors.value.phone = t('users.form.required');
  }

  if (props.mode === 'create' && !formData.value.password) {
    errors.value.password = t('users.form.required');
  } else if (props.mode === 'create' && formData.value.password.length < 6) {
    errors.value.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
  }

  if (!formData.value.role) {
    errors.value.role = t('users.form.required');
  }

  if (!formData.value.status) {
    errors.value.status = t('users.form.required');
  }

  return Object.keys(errors.value).length === 0;
};

/**
 * Handle form submit
 */
const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  const dataToSave = { ...formData.value };

  // Remove password field if editing and password is empty
  if (props.mode === 'edit' && !dataToSave.password) {
    delete dataToSave.password;
  }

  emit('save', dataToSave);
};

/**
 * Handle close
 */
const handleClose = () => {
  emit('update:show', false);
  resetForm();
};
</script>
