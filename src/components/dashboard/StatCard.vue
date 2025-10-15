<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-500 uppercase tracking-wide">{{ label }}</p>
        <p class="text-2xl font-semibold text-primary-800">{{ value }}</p>
      </div>
      <span class="text-3xl">{{ icon }}</span>
    </div>
    <p class="text-sm text-slate-500">{{ description }}</p>
    <div class="flex items-center gap-2 text-sm" :class="trendClass">
      <span>{{ trendPrefix }}{{ trendValue }}%</span>
      <span class="text-slate-400">so'nggi oy</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  trendValue: { type: Number, default: 0 },
  description: { type: String, default: '' },
  icon: { type: String, default: '📈' }
});

const trendClass = computed(() =>
  props.trendValue >= 0 ? 'text-success font-semibold' : 'text-danger font-semibold'
);

const trendPrefix = computed(() => (props.trendValue >= 0 ? '+' : ''));
</script>
