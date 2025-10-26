<template>
  <div class="skeleton" :class="skeletonClasses" :style="skeletonStyles"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'circular', 'rectangular'].includes(value)
  },
  width: {
    type: [String, Number],
    default: null
  },
  height: {
    type: [String, Number],
    default: null
  },
  animation: {
    type: String,
    default: 'pulse',
    validator: (value) => ['pulse', 'wave', 'none'].includes(value)
  }
})

const skeletonClasses = computed(() => [
  `skeleton-${props.variant}`,
  `skeleton-animation-${props.animation}`
])

const skeletonStyles = computed(() => {
  const styles = {}

  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  return styles
})
</script>

<style scoped>
.skeleton {
  @apply bg-gray-200;
}

.skeleton-text {
  @apply h-4 rounded;
}

.skeleton-circular {
  @apply rounded-full;
}

.skeleton-rectangular {
  @apply rounded-md;
}

/* Animations */
.skeleton-animation-pulse {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-animation-wave {
  @apply relative overflow-hidden;
}

.skeleton-animation-wave::after {
  @apply absolute inset-0;
  content: '';
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: skeleton-wave 1.5s linear infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes skeleton-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
