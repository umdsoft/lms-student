<template>
  <section class="space-y-8">
    <header class="space-y-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('teacher.dashboard.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('teacher.dashboard.subtitle') }}</p>
    </header>

    <div class="grid gap-4 lg:grid-cols-3">
      <article
        v-for="highlight in highlights"
        :key="highlight.id"
        class="rounded-3xl bg-gradient-to-r p-5 shadow-sm"
        :class="highlightTone(highlight.accent)"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-white/80">{{ highlight.label }}</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ highlight.value }}</p>
        <p class="mt-3 text-sm text-white/70">{{ highlight.description }}</p>
      </article>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <section class="space-y-5 rounded-[32px] bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-primary-800">{{ schedule.title }}</h3>
            <p class="text-sm text-slate-500">{{ schedule.subtitle }}</p>
          </div>
          <span class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600">
            {{ t('teacher.navigation.dashboard') }}
          </span>
        </div>

        <ul class="space-y-4">
          <li
            v-for="row in schedule.rows"
            :key="row.id"
            class="rounded-3xl border border-primary-50/70 bg-primary-50/40 p-4"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-primary-700">{{ row.time }}</p>
                <p class="text-base font-semibold text-primary-900">{{ row.subject }}</p>
                <p class="text-xs text-slate-500">{{ row.group }}</p>
              </div>
              <div class="text-right text-xs text-slate-500">
                <p>{{ row.location }}</p>
                <span class="mt-1 inline-flex items-center rounded-full bg-white/80 px-3 py-1 font-semibold text-primary-600">
                  {{ row.status }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <aside class="space-y-4 rounded-[32px] bg-white p-6 shadow-sm">
        <div>
          <h3 class="text-lg font-semibold text-primary-800">{{ actions.title }}</h3>
          <p class="text-sm text-slate-500">{{ t('teacher.dashboard.subtitle') }}</p>
        </div>
        <ul class="space-y-3">
          <li
            v-for="item in actions.items"
            :key="item.id"
            class="group rounded-3xl border border-primary-100 bg-primary-50/40 p-4 transition hover:border-primary-200 hover:bg-primary-50"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-primary-800">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-600">{{ item.description }}</p>
              </div>
              <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-500 shadow-inner group-hover:bg-primary-500 group-hover:text-white">
                →
              </span>
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

const dashboard = computed(() => tm('teacher.dashboard') ?? {});
const highlights = computed(() => dashboard.value.highlights ?? []);
const schedule = computed(() => ({
  title: dashboard.value?.schedule?.title ?? '',
  subtitle: dashboard.value?.schedule?.subtitle ?? '',
  rows: dashboard.value?.schedule?.rows ?? []
}));
const actions = computed(() => ({
  title: dashboard.value?.actions?.title ?? '',
  items: dashboard.value?.actions?.items ?? []
}));

const accentMap = {
  primary: 'from-primary-500 to-secondary',
  amber: 'from-amber-400 to-orange-500',
  emerald: 'from-emerald-400 to-teal-500'
};

function highlightTone(accent) {
  return accentMap[accent] ? `${accentMap[accent]} text-white` : 'from-primary-500 to-secondary text-white';
}
</script>
