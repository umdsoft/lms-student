<template>
  <div class="select-wrapper">
    <label v-if="label" :for="id" class="select-label">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="select-container">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        class="select"
        :class="selectClasses"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="getOptionValue(option)"
          :value="getOptionValue(option)"
          :disabled="option.disabled"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>

      <span class="select-icon">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>

    <p v-if="error" class="select-error">{{ error }}</p>
    <p v-else-if="hint" class="select-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).substr(2, 9)}`
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('change', value)
}

const getOptionValue = (option) => {
  return typeof option === 'object' ? option[props.valueKey] : option
}

const getOptionLabel = (option) => {
  return typeof option === 'object' ? option[props.labelKey] : option
}

const selectClasses = computed(() => [
  `select-${props.size}`,
  {
    'select-error': props.error,
    'select-disabled': props.disabled
  }
])
</script>

<style scoped>
.select-wrapper {
  @apply w-full;
}

.select-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.select-container {
  @apply relative;
}

.select {
  @apply w-full appearance-none;
  @apply border border-gray-300 rounded-md;
  @apply text-gray-900 bg-white;
  @apply transition-all duration-200;
  @apply focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
  @apply pr-10;
}

.select:hover {
  @apply border-gray-400;
}

.select-sm {
  @apply px-3 py-1.5 text-sm;
}

.select-md {
  @apply px-3 py-2 text-sm;
}

.select-lg {
  @apply px-4 py-2.5 text-base;
}

.select-error {
  @apply border-red-500;
}

.select-disabled {
  @apply bg-gray-50 cursor-not-allowed opacity-60;
}

.select-icon {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2;
  @apply pointer-events-none;
}

.select-error {
  @apply mt-1 text-sm text-red-600;
}

.select-hint {
  @apply mt-1 text-sm text-gray-500;
}
</style>
