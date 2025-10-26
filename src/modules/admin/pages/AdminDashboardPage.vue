<template>
  <section class="space-y-8">
    <header class="space-y-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('control.dashboard.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('control.dashboard.subtitle') }}</p>
    </header>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="metric in metrics"
        :key="metric.id"
        class="rounded-[28px] border border-primary-50 bg-white p-6 shadow-sm"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ metric.label }}</p>
        <p class="mt-3 text-3xl font-semibold text-primary-800">{{ metric.value }}</p>
        <span class="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" :class="metricTone(metric.tone)">
          {{ metric.change }}
        </span>
      </article>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <section class="space-y-5 rounded-[32px] bg-white p-6 shadow-sm">
        <div>
          <h3 class="text-lg font-semibold text-primary-800">{{ updates.title }}</h3>
          <p class="text-sm text-slate-500">{{ t('control.dashboard.subtitle') }}</p>
        </div>
        <ul class="space-y-4">
          <li
            v-for="item in updates.items"
            :key="item.id"
            class="rounded-3xl border border-primary-100 bg-primary-50/50 p-5"
          >
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm font-semibold text-primary-800">{{ item.title }}</p>
              <span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary-500">
                {{ item.timestamp }}
              </span>
            </div>
            <p class="text-sm text-slate-600">{{ item.description }}</p>
          </li>
        </ul>
      </section>

      <aside class="space-y-4 rounded-[32px] bg-white p-6 shadow-sm">
        <div>
          <h3 class="text-lg font-semibold text-primary-800">{{ audit.title }}</h3>
          <p class="text-sm text-slate-500">{{ audit.subtitle }}</p>
        </div>
        <ul class="space-y-3">
          <li
            v-for="row in audit.rows"
            :key="row.id"
            class="rounded-3xl border border-slate-100 bg-primary-50/40 p-4"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-primary-800">{{ row.action }}</p>
                <p class="text-xs text-slate-500">{{ row.actor }}</p>
              </div>
              <div class="text-right text-xs text-slate-500">
                <p>{{ row.time }}</p>
                <span class="mt-1 inline-flex items-center rounded-full px-3 py-1 font-semibold" :class="statusTone(row.status)">
                  {{ row.status }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n({ useScope: 'global' });

const dashboard = computed(() => tm('control.dashboard') ?? {});
const metrics = computed(() => dashboard.value.metrics ?? []);
const updates = computed(() => ({
  title: dashboard.value?.updates?.title ?? '',
  items: dashboard.value?.updates?.items ?? []
}));
const audit = computed(() => ({
  title: dashboard.value?.audit?.title ?? '',
  subtitle: dashboard.value?.audit?.subtitle ?? '',
  rows: dashboard.value?.audit?.rows ?? []
}));

const metricToneMap = {
  success: 'bg-emerald-50 text-emerald-600',
  primary: 'bg-primary-50 text-primary-600',
  info: 'bg-sky-50 text-sky-600'
};

function metricTone(tone) {
  return metricToneMap[tone] ?? 'bg-primary-50 text-primary-600';
}

function statusTone(status) {
  const value = (status || '').toLowerCase();
  if (value.includes('kut') || value.includes('процесс')) {
    return 'bg-amber-50 text-amber-600';
  }
  return 'bg-emerald-50 text-emerald-600';
}
</script>
