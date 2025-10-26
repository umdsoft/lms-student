<template>
  <span class="badge" :class="badgeClasses">
    <span v-if="dot" class="badge-dot"></span>
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'primary', 'success', 'warning', 'danger', 'info'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  rounded: {
    type: Boolean,
    default: false
  },
  dot: {
    type: Boolean,
    default: false
  }
})

const badgeClasses = computed(() => [
  `badge-${props.variant}`,
  `badge-${props.size}`,
  {
    'badge-rounded': props.rounded,
    'badge-with-dot': props.dot
  }
])
</script>

<style scoped>
.badge {
  @apply inline-flex items-center font-medium;
  @apply px-2.5 py-0.5 rounded;
}

/* Size Variants */
.badge-sm {
  @apply text-xs;
}

.badge-md {
  @apply text-sm;
}

.badge-lg {
  @apply text-base px-3 py-1;
}

/* Color Variants */
.badge-default {
  @apply bg-gray-100 text-gray-800;
}

.badge-primary {
  @apply bg-blue-100 text-blue-800;
}

.badge-success {
  @apply bg-green-100 text-green-800;
}

.badge-warning {
  @apply bg-yellow-100 text-yellow-800;
}

.badge-danger {
  @apply bg-red-100 text-red-800;
}

.badge-info {
  @apply bg-indigo-100 text-indigo-800;
}

/* Rounded */
.badge-rounded {
  @apply rounded-full;
}

/* Dot */
.badge-with-dot {
  @apply gap-1.5;
}

.badge-dot {
  @apply w-2 h-2 rounded-full;
}

.badge-default .badge-dot {
  @apply bg-gray-400;
}

.badge-primary .badge-dot {
  @apply bg-blue-400;
}

.badge-success .badge-dot {
  @apply bg-green-400;
}

.badge-warning .badge-dot {
  @apply bg-yellow-400;
}

.badge-danger .badge-dot {
  @apply bg-red-400;
}

.badge-info .badge-dot {
  @apply bg-indigo-400;
}
</style>
