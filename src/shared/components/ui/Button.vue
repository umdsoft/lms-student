<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="button-loader">
      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>

    <span v-if="icon && !loading" class="button-icon" :class="{ 'mr-2': $slots.default }">
      <component :is="icon" class="h-4 w-4" />
    </span>

    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'ghost', 'link'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  tag: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'a', 'router-link'].includes(value)
  },
  nativeType: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const classes = [
    'button',
    `button-${props.variant}`,
    `button-${props.size}`,
    {
      'button-block': props.block,
      'button-loading': props.loading,
      'button-disabled': props.disabled,
      'button-rounded': props.rounded
    }
  ]
  return classes
})
</script>

<style scoped>
/* Base Button Styles */
.button {
  @apply inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Size Variants */
.button-xs {
  @apply px-2 py-1 text-xs rounded;
}

.button-sm {
  @apply px-3 py-1.5 text-sm rounded-md;
}

.button-md {
  @apply px-4 py-2 text-sm rounded-md;
}

.button-lg {
  @apply px-5 py-2.5 text-base rounded-lg;
}

.button-xl {
  @apply px-6 py-3 text-base rounded-lg;
}

/* Color Variants */
.button-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.button-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
}

.button-success {
  @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-500;
}

.button-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

.button-warning {
  @apply bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500;
}

.button-ghost {
  @apply bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500;
}

.button-link {
  @apply bg-transparent text-blue-600 hover:text-blue-700 hover:underline focus:ring-0;
}

/* States */
.button-block {
  @apply w-full;
}

.button-loading {
  @apply cursor-wait;
}

.button-rounded {
  @apply rounded-full;
}

.button-loader {
  @apply mr-2;
}

.button-icon {
  @apply inline-flex items-center;
}
</style>
