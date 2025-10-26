<template>
  <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all duration-300 hover:shadow-lg border border-slate-200/60">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-30"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col gap-4">
      <!-- Header with Icon -->
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">{{ label }}</p>
          <p class="mt-2 text-3xl font-bold text-slate-900 transition-transform group-hover:scale-105">{{ value }}</p>
        </div>
        <div :class="iconWrapperClass" class="rounded-xl p-3 transition-transform group-hover:scale-110">
          <component
            v-if="iconComponent"
            :is="iconComponent"
            :size="24"
            :class="iconClass"
            class="transition-colors"
          />
          <span v-else class="text-2xl">{{ icon }}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm leading-relaxed text-slate-600">{{ description }}</p>

      <!-- Trend Indicator -->
      <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
        <div class="flex items-center gap-1.5" :class="trendClass">
          <component :is="trendIcon" :size="16" class="transition-transform group-hover:scale-110" />
          <span class="text-sm font-bold">{{ trendPrefix }}{{ trendValue }}%</span>
        </div>
        <span class="text-xs text-slate-400">{{ trendSuffix }}</span>
      </div>
    </div>

    <!-- Hover Glow Effect -->
    <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary-500/5 to-transparent pointer-events-none"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { TrendingUp, TrendingDown } from 'lucide-vue-next';

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  trendValue: { type: Number, default: 0 },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconComponent: { type: Object, default: null }
});

const { t } = useI18n({ useScope: 'global' });

const isPositiveTrend = computed(() => props.trendValue >= 0);

const trendIcon = computed(() => isPositiveTrend.value ? TrendingUp : TrendingDown);

const trendClass = computed(() =>
  isPositiveTrend.value
    ? 'text-success'
    : 'text-danger'
);

const iconWrapperClass = computed(() =>
  isPositiveTrend.value
    ? 'bg-gradient-to-br from-primary-50 to-primary-100'
    : 'bg-gradient-to-br from-slate-100 to-slate-200'
);

const iconClass = computed(() =>
  isPositiveTrend.value
    ? 'text-primary-600'
    : 'text-slate-600'
);

const trendPrefix = computed(() => (props.trendValue >= 0 ? '+' : ''));

const trendSuffix = computed(() => t('components.statCard.trendSuffix'));
</script>

<style scoped>
.bg-grid-slate-100 {
  background-image:
    linear-gradient(to right, rgb(241 245 249 / 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(241 245 249 / 0.5) 1px, transparent 1px);
  background-size: 14px 14px;
}
</style>
