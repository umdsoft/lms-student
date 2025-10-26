<template>
  <div class="card" :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header" :class="headerClasses">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
    </div>

    <div class="card-body" :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  shadow: {
    type: String,
    default: 'sm',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  }
})

const cardClasses = computed(() => [
  {
    'card-hoverable': props.hoverable,
    'card-bordered': props.bordered,
    [`card-shadow-${props.shadow}`]: props.shadow !== 'none',
    [`card-rounded-${props.rounded}`]: props.rounded !== 'none'
  }
])

const headerClasses = computed(() => [
  `card-header-padding-${props.padding}`
])

const bodyClasses = computed(() => [
  `card-body-padding-${props.padding}`
])

const footerClasses = computed(() => [
  `card-footer-padding-${props.padding}`
])
</script>

<style scoped>
.card {
  @apply bg-white overflow-hidden;
}

.card-bordered {
  @apply border border-gray-200;
}

/* Shadow Variants */
.card-shadow-sm {
  @apply shadow-sm;
}

.card-shadow-md {
  @apply shadow-md;
}

.card-shadow-lg {
  @apply shadow-lg;
}

.card-shadow-xl {
  @apply shadow-xl;
}

/* Rounded Variants */
.card-rounded-sm {
  @apply rounded-sm;
}

.card-rounded-md {
  @apply rounded-md;
}

.card-rounded-lg {
  @apply rounded-lg;
}

.card-rounded-xl {
  @apply rounded-xl;
}

.card-rounded-full {
  @apply rounded-full;
}

/* Hoverable */
.card-hoverable {
  @apply transition-all duration-200 cursor-pointer;
}

.card-hoverable:hover {
  @apply shadow-lg transform -translate-y-1;
}

/* Header */
.card-header {
  @apply border-b border-gray-200;
}

.card-header-padding-sm {
  @apply px-3 py-2;
}

.card-header-padding-md {
  @apply px-4 py-3;
}

.card-header-padding-lg {
  @apply px-6 py-4;
}

.card-title {
  @apply text-lg font-semibold text-gray-900;
}

/* Body */
.card-body-padding-none {
  @apply p-0;
}

.card-body-padding-sm {
  @apply p-3;
}

.card-body-padding-md {
  @apply p-4;
}

.card-body-padding-lg {
  @apply p-6;
}

/* Footer */
.card-footer {
  @apply border-t border-gray-200;
}

.card-footer-padding-sm {
  @apply px-3 py-2;
}

.card-footer-padding-md {
  @apply px-4 py-3;
}

.card-footer-padding-lg {
  @apply px-6 py-4;
}
</style>
