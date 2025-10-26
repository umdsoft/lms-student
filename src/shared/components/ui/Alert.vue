<template>
  <Transition name="alert">
    <div v-if="modelValue" class="alert" :class="alertClasses" role="alert">
      <div class="alert-icon">
        <component :is="iconComponent" class="h-5 w-5" />
      </div>

      <div class="alert-content">
        <h4 v-if="title" class="alert-title">{{ title }}</h4>
        <div class="alert-message">
          <slot />
        </div>
      </div>

      <button
        v-if="closable"
        type="button"
        class="alert-close"
        @click="handleClose"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed, h } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'info', 'warning', 'danger'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const iconComponent = computed(() => {
  const icons = {
    success: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
        'clip-rule': 'evenodd'
      })
    ]),
    info: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
        'clip-rule': 'evenodd'
      })
    ]),
    warning: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
        'clip-rule': 'evenodd'
      })
    ]),
    danger: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
        'clip-rule': 'evenodd'
      })
    ])
  }
  return icons[props.variant]
})

const alertClasses = computed(() => [
  `alert-${props.variant}`
])
</script>

<style scoped>
.alert {
  @apply flex items-start gap-3;
  @apply p-4 rounded-lg;
}

.alert-success {
  @apply bg-green-50 border border-green-200;
}

.alert-info {
  @apply bg-blue-50 border border-blue-200;
}

.alert-warning {
  @apply bg-yellow-50 border border-yellow-200;
}

.alert-danger {
  @apply bg-red-50 border border-red-200;
}

.alert-icon {
  @apply flex-shrink-0;
}

.alert-success .alert-icon {
  @apply text-green-500;
}

.alert-info .alert-icon {
  @apply text-blue-500;
}

.alert-warning .alert-icon {
  @apply text-yellow-500;
}

.alert-danger .alert-icon {
  @apply text-red-500;
}

.alert-content {
  @apply flex-1;
}

.alert-title {
  @apply font-medium mb-1;
}

.alert-success .alert-title {
  @apply text-green-800;
}

.alert-info .alert-title {
  @apply text-blue-800;
}

.alert-warning .alert-title {
  @apply text-yellow-800;
}

.alert-danger .alert-title {
  @apply text-red-800;
}

.alert-message {
  @apply text-sm;
}

.alert-success .alert-message {
  @apply text-green-700;
}

.alert-info .alert-message {
  @apply text-blue-700;
}

.alert-warning .alert-message {
  @apply text-yellow-700;
}

.alert-danger .alert-message {
  @apply text-red-700;
}

.alert-close {
  @apply flex-shrink-0 transition-colors;
}

.alert-success .alert-close {
  @apply text-green-500 hover:text-green-700;
}

.alert-info .alert-close {
  @apply text-blue-500 hover:text-blue-700;
}

.alert-warning .alert-close {
  @apply text-yellow-500 hover:text-yellow-700;
}

.alert-danger .alert-close {
  @apply text-red-500 hover:text-red-700;
}

/* Animations */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
