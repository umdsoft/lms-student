<template>
  <div class="input-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="input-container" :class="containerClasses">
      <span v-if="prefixIcon" class="input-prefix-icon">
        <component :is="prefixIcon" class="h-5 w-5 text-gray-400" />
      </span>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <span v-if="suffixIcon" class="input-suffix-icon">
        <component :is="suffixIcon" class="h-5 w-5 text-gray-400" />
      </span>

      <button
        v-if="clearable && modelValue"
        type="button"
        class="input-clear-button"
        @click="handleClear"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <p v-if="error" class="input-error">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
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
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: [Object, Function],
    default: null
  },
  suffixIcon: {
    type: [Object, Function],
    default: null
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  step: {
    type: [String, Number],
    default: undefined
  },
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'clear'])

const isFocused = ref(false)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const wrapperClasses = computed(() => ({
  'input-disabled': props.disabled
}))

const containerClasses = computed(() => ({
  'input-container-focused': isFocused.value,
  'input-container-error': props.error,
  'input-container-disabled': props.disabled
}))

const inputClasses = computed(() => [
  'input',
  `input-${props.size}`,
  {
    'input-with-prefix': props.prefixIcon,
    'input-with-suffix': props.suffixIcon || props.clearable
  }
])
</script>

<style scoped>
.input-wrapper {
  @apply w-full;
}

.input-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.input-container {
  @apply relative flex items-center;
  @apply border border-gray-300 rounded-md;
  @apply transition-all duration-200;
  @apply bg-white;
}

.input-container:hover {
  @apply border-gray-400;
}

.input-container-focused {
  @apply border-blue-500 ring-1 ring-blue-500;
}

.input-container-error {
  @apply border-red-500;
}

.input-container-disabled {
  @apply bg-gray-50 cursor-not-allowed;
}

.input {
  @apply w-full border-0 focus:ring-0;
  @apply text-gray-900 placeholder-gray-400;
  @apply bg-transparent;
}

.input-sm {
  @apply px-3 py-1.5 text-sm;
}

.input-md {
  @apply px-3 py-2 text-sm;
}

.input-lg {
  @apply px-4 py-2.5 text-base;
}

.input-with-prefix {
  @apply pl-10;
}

.input-with-suffix {
  @apply pr-10;
}

.input-prefix-icon {
  @apply absolute left-3 flex items-center pointer-events-none;
}

.input-suffix-icon {
  @apply absolute right-3 flex items-center pointer-events-none;
}

.input-clear-button {
  @apply absolute right-3 text-gray-400 hover:text-gray-600;
  @apply transition-colors duration-200;
}

.input-error {
  @apply mt-1 text-sm text-red-600;
}

.input-hint {
  @apply mt-1 text-sm text-gray-500;
}

.input-disabled {
  @apply opacity-60 cursor-not-allowed;
}
</style>
