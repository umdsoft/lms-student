<template>
  <div class="loader-wrapper" :class="wrapperClasses">
    <div class="loader" :class="loaderClasses">
      <svg
        v-if="type === 'spinner'"
        class="animate-spin"
        :class="`loader-${size}`"
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

      <div v-else-if="type === 'dots'" class="loader-dots" :class="`loader-${size}`">
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
      </div>

      <div v-else-if="type === 'pulse'" class="loader-pulse" :class="`loader-${size}`"></div>
    </div>

    <p v-if="text" class="loader-text">{{ text }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'spinner',
    validator: (value) => ['spinner', 'dots', 'pulse'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'white'].includes(value)
  },
  text: {
    type: String,
    default: ''
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})

const wrapperClasses = computed(() => ({
  'loader-fullscreen': props.fullscreen
}))

const loaderClasses = computed(() => [
  `loader-${props.color}`
])
</script>

<style scoped>
.loader-wrapper {
  @apply flex flex-col items-center justify-center gap-3;
}

.loader-fullscreen {
  @apply fixed inset-0 z-50 bg-white bg-opacity-90;
}

/* Sizes */
.loader-sm {
  @apply w-4 h-4;
}

.loader-md {
  @apply w-8 h-8;
}

.loader-lg {
  @apply w-12 h-12;
}

.loader-xl {
  @apply w-16 h-16;
}

/* Colors */
.loader-primary {
  @apply text-blue-600;
}

.loader-secondary {
  @apply text-gray-600;
}

.loader-white {
  @apply text-white;
}

/* Dots Loader */
.loader-dots {
  @apply flex items-center gap-1;
}

.loader-dot {
  @apply rounded-full bg-current;
  animation: loader-bounce 1.4s infinite ease-in-out both;
}

.loader-sm .loader-dot {
  @apply w-1 h-1;
}

.loader-md .loader-dot {
  @apply w-2 h-2;
}

.loader-lg .loader-dot {
  @apply w-3 h-3;
}

.loader-xl .loader-dot {
  @apply w-4 h-4;
}

.loader-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loader-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loader-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Pulse Loader */
.loader-pulse {
  @apply rounded-full bg-current;
  animation: loader-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes loader-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loader-text {
  @apply text-sm text-gray-600;
}
</style>
