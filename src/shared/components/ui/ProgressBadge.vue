<template>
  <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" :class="badgeClass">
    <span class="w-2 h-2 rounded-full" :class="dotClass"></span>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'info' }
});

const toneConfig = {
  info: {
    badge: 'bg-primary-50 text-primary-600',
    dot: 'bg-primary-500'
  },
  success: {
    badge: 'bg-green-50 text-green-600',
    dot: 'bg-green-500'
  },
  warning: {
    badge: 'bg-warning/20 text-warning',
    dot: 'bg-warning'
  }
};

const badgeClass = computed(() => toneConfig[props.tone]?.badge ?? toneConfig.info.badge);
const dotClass = computed(() => toneConfig[props.tone]?.dot ?? toneConfig.info.dot);
</script>
