<template>
  <div class="radio-wrapper">
    <label class="radio-label" :class="{ 'radio-disabled': disabled }">
      <input
        type="radio"
        :checked="isChecked"
        :value="value"
        :disabled="disabled"
        :name="name"
        class="radio-input"
        @change="handleChange"
      />
      <span class="radio-circle"></span>
      <span v-if="label || $slots.default" class="radio-text">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = computed(() => props.modelValue === props.value)

const handleChange = () => {
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped>
.radio-wrapper {
  @apply inline-block;
}

.radio-label {
  @apply inline-flex items-center cursor-pointer select-none;
}

.radio-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.radio-input {
  @apply sr-only;
}

.radio-circle {
  @apply relative flex items-center justify-center;
  @apply w-5 h-5 rounded-full border-2 border-gray-300;
  @apply transition-all duration-200;
  @apply bg-white;
}

.radio-input:checked + .radio-circle {
  @apply border-blue-600;
}

.radio-input:checked + .radio-circle::after {
  content: '';
  @apply block w-2.5 h-2.5 rounded-full bg-blue-600;
}

.radio-input:focus + .radio-circle {
  @apply ring-2 ring-blue-500 ring-offset-2;
}

.radio-label:hover .radio-circle {
  @apply border-gray-400;
}

.radio-input:checked + .radio-circle:hover {
  @apply border-blue-700;
}

.radio-input:checked + .radio-circle:hover::after {
  @apply bg-blue-700;
}

.radio-text {
  @apply ml-2 text-sm text-gray-700;
}
</style>
