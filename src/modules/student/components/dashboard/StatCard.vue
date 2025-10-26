<template>
  <div class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ label }}</p>
        <p class="mt-1 text-3xl font-semibold text-ink">{{ value }}</p>
      </div>
      <span class="text-2xl">{{ icon }}</span>
    </div>
    <p class="text-sm leading-relaxed text-slate-500">{{ description }}</p>
    <div class="flex items-center gap-2 text-sm font-medium" :class="trendClass">
      <span>{{ trendPrefix }}{{ trendValue }}%</span>
      <span class="text-slate-400">{{ trendSuffix }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

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

const { t } = useI18n({ useScope: 'global' });

const trendSuffix = computed(() => t('components.statCard.trendSuffix'));
</script>
