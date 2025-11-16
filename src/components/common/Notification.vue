<template>
  <Teleport to="body">
    <Transition name="notification">
      <div v-if="show" class="fixed top-4 right-4 z-50 max-w-md">
        <div
          :class="['rounded-lg shadow-lg p-4 flex items-start gap-3', typeClasses]"
          role="alert"
        >
          <!-- Icon based on type -->
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg
              v-if="type === 'success'"
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <!-- Error Icon -->
            <svg
              v-else-if="type === 'error'"
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <!-- Warning Icon -->
            <svg
              v-else-if="type === 'warning'"
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <!-- Info Icon -->
            <svg
              v-else
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Title and message -->
          <div class="flex-1 min-w-0">
            <h3 v-if="title" class="text-sm font-medium mb-1">{{ title }}</h3>
            <p class="text-sm">{{ message }}</p>
          </div>

          <!-- Close button -->
          <button
            type="button"
            @click="handleClose"
            class="flex-shrink-0 ml-auto inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
            :class="closeButtonClasses"
          >
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000 // Auto-close after 3 seconds
  },
  autoClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

// Type-specific classes
const typeClasses = computed(() => {
  const classes = {
    success: 'bg-green-50 text-green-800 border border-green-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200'
  };
  return classes[props.type];
});

const closeButtonClasses = computed(() => {
  const classes = {
    success: 'text-green-600 focus:ring-green-500',
    error: 'text-red-600 focus:ring-red-500',
    warning: 'text-yellow-600 focus:ring-yellow-500',
    info: 'text-blue-600 focus:ring-blue-500'
  };
  return classes[props.type];
});

const handleClose = () => {
  emit('close');
};

// Auto-close timer
let autoCloseTimer = null;

watch(
  () => props.show,
  (newValue) => {
    if (newValue && props.autoClose && props.duration > 0) {
      // Clear existing timer
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }

      // Set new timer
      autoCloseTimer = setTimeout(() => {
        handleClose();
      }, props.duration);
    } else if (!newValue && autoCloseTimer) {
      // Clear timer when notification is closed
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Notification slide-in animation */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
