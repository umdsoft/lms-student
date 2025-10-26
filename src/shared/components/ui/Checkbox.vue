<template>
  <div class="checkbox-wrapper">
    <label class="checkbox-label" :class="{ 'checkbox-disabled': disabled }">
      <input
        type="checkbox"
        :checked="isChecked"
        :value="value"
        :disabled="disabled"
        class="checkbox-input"
        @change="handleChange"
      />
      <span class="checkbox-box"></span>
      <span v-if="label || $slots.default" class="checkbox-text">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  value: {
    type: [String, Number, Boolean],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

const handleChange = (event) => {
  const checked = event.target.checked

  if (Array.isArray(props.modelValue)) {
    const newValue = checked
      ? [...props.modelValue, props.value]
      : props.modelValue.filter(v => v !== props.value)
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', checked)
    emit('change', checked)
  }
}
</script>

<style scoped>
.checkbox-wrapper {
  @apply inline-block;
}

.checkbox-label {
  @apply inline-flex items-center cursor-pointer select-none;
}

.checkbox-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.checkbox-input {
  @apply sr-only;
}

.checkbox-box {
  @apply relative flex items-center justify-center;
  @apply w-5 h-5 rounded border-2 border-gray-300;
  @apply transition-all duration-200;
  @apply bg-white;
}

.checkbox-input:checked + .checkbox-box {
  @apply bg-blue-600 border-blue-600;
}

.checkbox-input:checked + .checkbox-box::after {
  content: '';
  @apply block w-1.5 h-3 border-white border-r-2 border-b-2;
  transform: rotate(45deg) translateY(-1px);
}

.checkbox-input:focus + .checkbox-box {
  @apply ring-2 ring-blue-500 ring-offset-2;
}

.checkbox-label:hover .checkbox-box {
  @apply border-gray-400;
}

.checkbox-input:checked + .checkbox-box:hover {
  @apply bg-blue-700 border-blue-700;
}

.checkbox-text {
  @apply ml-2 text-sm text-gray-700;
}
</style>
