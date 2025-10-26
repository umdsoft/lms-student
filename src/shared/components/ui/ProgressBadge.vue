<template>
  <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium" :class="badgeClass">
    <span class="h-2 w-2 rounded-full" :class="dotClass"></span>
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
    badge: 'border-primary-100 bg-primary-50 text-primary-700',
    dot: 'bg-primary-500'
  },
  success: {
    badge: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500'
  },
  warning: {
    badge: 'border-warning/40 bg-warning/20 text-warning',
    dot: 'bg-warning'
  }
};

const badgeClass = computed(() => toneConfig[props.tone]?.badge ?? toneConfig.info.badge);
const dotClass = computed(() => toneConfig[props.tone]?.dot ?? toneConfig.info.dot);
</script>
