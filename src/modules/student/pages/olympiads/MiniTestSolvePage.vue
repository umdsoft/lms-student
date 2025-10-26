<template>
  <section class="space-y-8">
    <header class="space-y-4">
      <RouterLink
        :to="{ name: 'student.olympiads.my' }"
        class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        <span aria-hidden="true">←</span>
        {{ t('olympiads.my.solvePage.back') }}
      </RouterLink>
      <div>
        <h2 class="text-2xl font-semibold text-primary-800">
          {{ hasTest ? t('olympiads.my.solvePage.title', { title: test.title }) : t('olympiads.my.solvePage.unavailable') }}
        </h2>
        <p v-if="hasTest" class="text-sm text-slate-500">
          {{ t('olympiads.my.solvePage.subtitle', { subject: olympiad.subject }) }}
        </p>
      </div>
    </header>

    <div v-if="!hasTest" class="rounded-3xl border border-dashed border-primary-100 bg-white/70 p-10 text-center">
      <p class="text-sm text-slate-500">{{ t('olympiads.my.solvePage.unavailable') }}</p>
      <RouterLink
        :to="{ name: 'student.olympiads.my' }"
        class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        {{ t('olympiads.my.solvePage.back') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div v-else class="grid gap-6 xl:grid-cols-[1.2fr,1fr]">
      <div class="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
        <div class="space-y-1">
          <h3 class="text-lg font-semibold text-primary-800">{{ test.title }}</h3>
          <p class="text-sm text-slate-500">{{ test.focus }}</p>
        </div>

        <div class="space-y-3 text-sm text-primary-700">
          <div class="flex items-center justify-between rounded-2xl bg-primary-50 px-4 py-3">
            <span>{{ t('olympiads.my.solvePage.durationInfo') }}</span>
            <span>{{ test.duration }}</span>
          </div>
          <div class="flex items-center justify-between rounded-2xl bg-primary-50 px-4 py-3">
            <span>{{ t('olympiads.my.solvePage.questionInfo') }}</span>
            <span>{{ test.questionCount }}</span>
          </div>
          <div class="flex items-center justify-between rounded-2xl bg-primary-50 px-4 py-3">
            <span>{{ t('olympiads.table.start') }}</span>
            <span>{{ formatStartDate(olympiad) }}</span>
          </div>
        </div>

        <div class="rounded-2xl border border-primary-100 bg-primary-50/60 p-4 text-sm text-slate-600">
          <p>
            {{ olympiad.description }}
          </p>
        </div>

        <button
          type="button"
          class="w-full rounded-2xl bg-gradient-to-r from-primary-500 to-secondary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
        >
          {{ t('olympiads.my.solvePage.startCta') }}
        </button>
      </div>

      <aside class="space-y-4 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm">
        <h4 class="text-sm font-semibold uppercase tracking-wide text-primary-500">{{ olympiad.title }}</h4>
        <p class="text-sm text-slate-600">{{ olympiad.overview }}</p>
        <div class="space-y-2 text-sm text-slate-600">
          <p>
            <span class="font-semibold text-primary-700">{{ t('olympiads.table.start') }}:</span>
            {{ formatStartDate(olympiad) }}
          </p>
          <p>
            <span class="font-semibold text-primary-700">{{ t('olympiads.card.duration') }}:</span>
            {{ olympiad.duration }}
          </p>
          <p>
            <span class="font-semibold text-primary-700">{{ t('olympiads.card.subject') }}:</span>
            {{ olympiad.subject }}
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRoute } from 'vue-router';
import { useOlympiadStore } from '@/modules/student/stores/olympiads';

const { t, tm, locale } = useI18n({ useScope: 'global' });
const route = useRoute();
const olympiadStore = useOlympiadStore();

const olympiadId = computed(() => route.params.id);
const testId = computed(() => route.params.testId);

const allOlympiads = computed(() => tm('olympiads.items') ?? []);
const olympiad = computed(() => allOlympiads.value.find((item) => item.id === olympiadId.value));
const test = computed(() => {
  if (!olympiad.value) return null;
  return olympiadStore.listMiniTests(olympiad.value).find((item) => item.id === testId.value) ?? null;
});

const hasTest = computed(() => Boolean(olympiad.value && test.value));

function formatStartDate(olymp) {
  if (!olymp?.startAt) return olymp?.start ?? '';
  const date = new Date(olymp.startAt);
  if (Number.isNaN(date.getTime())) return olymp?.start ?? '';
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(date);
}
</script>
