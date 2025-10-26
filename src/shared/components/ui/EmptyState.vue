<template>
  <div class="empty-state" :class="emptyStateClasses">
    <div v-if="icon" class="empty-state-icon">
      <component :is="iconComponent" />
    </div>

    <h3 v-if="title" class="empty-state-title">{{ title }}</h3>

    <p v-if="description" class="empty-state-description">
      {{ description }}
    </p>

    <div v-if="$slots.default" class="empty-state-actions">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'inbox',
    validator: (value) => ['inbox', 'search', 'document', 'trophy', 'users', 'folder'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const iconComponent = computed(() => {
  const icons = {
    inbox: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
      })
    ]),
    search: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      })
    ]),
    document: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      })
    ]),
    trophy: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
      })
    ]),
    users: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
      })
    ]),
    folder: () => h('svg', { class: 'w-full h-full', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
      })
    ])
  }
  return icons[props.icon]
})

const emptyStateClasses = computed(() => [
  `empty-state-${props.size}`
])
</script>

<style scoped>
.empty-state {
  @apply flex flex-col items-center justify-center;
  @apply text-center p-8;
}

.empty-state-sm {
  @apply py-6;
}

.empty-state-md {
  @apply py-12;
}

.empty-state-lg {
  @apply py-16;
}

.empty-state-icon {
  @apply text-gray-300 mb-4;
}

.empty-state-sm .empty-state-icon {
  @apply w-12 h-12;
}

.empty-state-md .empty-state-icon {
  @apply w-16 h-16;
}

.empty-state-lg .empty-state-icon {
  @apply w-24 h-24;
}

.empty-state-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.empty-state-description {
  @apply text-gray-500 mb-6 max-w-md;
}

.empty-state-actions {
  @apply flex items-center gap-3;
}
</style>
