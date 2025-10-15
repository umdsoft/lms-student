<template>
  <article class="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4 border border-transparent hover:border-primary-200 transition">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-primary-800">{{ olympiad.title }}</h3>
        <p class="text-sm text-slate-500">{{ olympiad.host }}</p>
      </div>
      <ProgressBadge :tone="olympiad.level" :label="levelLabel" />
    </div>
    <p class="text-sm text-slate-600 leading-relaxed">{{ olympiad.description }}</p>
    <div class="grid grid-cols-2 gap-4 text-sm text-slate-500">
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.start') }}:</span> {{ olympiad.start }}</p>
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.duration') }}:</span> {{ olympiad.duration }}</p>
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.format') }}:</span> {{ olympiad.format }}</p>
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.subject') }}:</span> {{ olympiad.subject }}</p>
    </div>
    <div class="flex items-center justify-between pt-4 border-t border-primary-50">
      <div>
        <p class="text-xs uppercase text-slate-400">{{ t('olympiads.card.feeLabel') }}</p>
        <p class="text-lg font-semibold text-primary-700">{{ formattedFee }}</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-primary-700"
      >
        {{ t('olympiads.card.action') }}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import ProgressBadge from '@/components/ui/ProgressBadge.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  olympiad: {
    type: Object,
    required: true
  }
});

const { t, locale } = useI18n({ useScope: 'global' });

const levelLabel = computed(() => {
  switch (props.olympiad.level) {
    case 'success':
      return t('olympiads.levelLabels.success');
    case 'warning':
      return t('olympiads.levelLabels.warning');
    default:
      return t('olympiads.levelLabels.info');
  }
});

const formattedFee = computed(() =>
  t('app.header.balanceValue', {
    value: new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ').format(props.olympiad.fee)
  })
);
</script>
