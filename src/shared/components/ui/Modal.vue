<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click="handleOverlayClick"
      >
        <div
          class="modal-container"
          :class="modalClasses"
          @click.stop
        >
          <!-- Header -->
          <div v-if="!hideHeader" class="modal-header">
            <h3 class="modal-title">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button
              v-if="closable"
              type="button"
              class="modal-close"
              @click="handleClose"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="!hideFooter || $slots.footer" class="modal-footer">
            <slot name="footer">
              <Button variant="ghost" @click="handleClose">
                {{ cancelText }}
              </Button>
              <Button :variant="confirmVariant" :loading="loading" @click="handleConfirm">
                {{ confirmText }}
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: 'Tasdiqlash'
  },
  cancelText: {
    type: String,
    default: 'Bekor qilish'
  },
  confirmVariant: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'confirm'])

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && props.closable) {
    handleClose()
  }
}

const modalClasses = computed(() => [
  `modal-${props.size}`
])

// Handle body scroll when modal is open
watch(() => props.modelValue, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 z-50;
  @apply bg-black bg-opacity-50 backdrop-blur-sm;
  @apply flex items-center justify-center;
  @apply p-4;
}

.modal-container {
  @apply relative bg-white rounded-lg shadow-xl;
  @apply max-h-[90vh] flex flex-col;
  @apply w-full;
}

.modal-sm {
  @apply max-w-sm;
}

.modal-md {
  @apply max-w-md;
}

.modal-lg {
  @apply max-w-2xl;
}

.modal-xl {
  @apply max-w-4xl;
}

.modal-full {
  @apply max-w-6xl;
}

.modal-header {
  @apply flex items-center justify-between;
  @apply px-6 py-4 border-b border-gray-200;
}

.modal-title {
  @apply text-lg font-semibold text-gray-900;
}

.modal-close {
  @apply text-gray-400 hover:text-gray-600;
  @apply transition-colors duration-200;
}

.modal-body {
  @apply px-6 py-4;
  @apply overflow-y-auto;
}

.modal-footer {
  @apply flex items-center justify-end gap-3;
  @apply px-6 py-4 border-t border-gray-200;
}

/* Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>
