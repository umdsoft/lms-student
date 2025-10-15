<template>
  <section v-if="olympiad" class="space-y-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <RouterLink
        :to="{ name: 'olympiads' }"
        class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        <span aria-hidden="true">←</span>
        {{ t('olympiads.details.back') }}
      </RouterLink>
      <span
        v-if="statusLabel"
        class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600"
      >
        {{ statusLabel }}
      </span>
    </div>

    <header class="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {{ olympiad.host }}
          </p>
          <h1 class="text-3xl font-bold text-primary-900 md:text-4xl">{{ olympiad.title }}</h1>
        </div>
        <ProgressBadge :tone="olympiad.level" :label="levelLabel" />
      </div>
      <p class="max-w-4xl text-base leading-relaxed text-slate-600">{{ olympiad.description }}</p>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="highlight in highlights"
          :key="highlight.key"
          class="rounded-2xl bg-primary-50/70 p-4"
        >
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">{{ highlight.label }}</p>
          <p class="mt-1 text-lg font-semibold text-primary-900">{{ highlight.value }}</p>
        </div>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-primary-800">
          {{ t('olympiads.details.overviewTitle') }}
        </h2>
        <p class="text-sm leading-relaxed text-slate-600">{{ olympiad.overview }}</p>
        <div class="space-y-3">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-primary-500">
            {{ t('olympiads.details.flowTitle') }}
          </h3>
          <ol class="space-y-4">
            <li
              v-for="(step, index) in olympiad.flow"
              :key="step.title"
              class="flex gap-3"
            >
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700"
              >
                {{ index + 1 }}
              </span>
              <div class="space-y-1">
                <p class="text-sm font-semibold text-primary-800">{{ step.title }}</p>
                <p class="text-sm text-slate-600">{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </article>

      <article class="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-primary-800">
          {{ t('olympiads.details.challengesTitle') }}
        </h2>
        <p class="text-sm leading-relaxed text-slate-600">{{ olympiad.challengeSummary }}</p>
        <ul class="space-y-3">
          <li
            v-for="challenge in olympiad.challenges"
            :key="challenge"
            class="flex items-start gap-3"
          >
            <span class="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500"></span>
            <p class="text-sm text-slate-600">{{ challenge }}</p>
          </li>
        </ul>
      </article>
    </section>

    <section class="space-y-6">
      <h2 class="text-xl font-semibold text-primary-800">
        {{ t('olympiads.details.metricsTitle') }}
      </h2>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metrics"
          :key="metric.key"
          class="rounded-3xl border border-primary-50 bg-white p-6 shadow-sm"
        >
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">{{ metric.label }}</p>
          <p class="mt-2 text-2xl font-bold text-primary-900">{{ metric.value }}</p>
          <p v-if="metric.note" class="mt-2 text-xs text-slate-500">{{ metric.note }}</p>
        </article>
      </div>
    </section>

    <section
      v-if="olympiad.status !== 'finished' && olympiad.prizes?.length"
      class="space-y-4 rounded-3xl bg-white p-6 shadow-sm"
    >
      <h2 class="text-xl font-semibold text-primary-800">
        {{ t('olympiads.details.prizesTitle') }}
      </h2>
      <ul class="space-y-4">
        <li
          v-for="prize in olympiad.prizes"
          :key="prize.place"
          class="rounded-2xl border border-primary-50 bg-primary-50/50 p-5"
        >
          <p class="text-sm font-semibold text-primary-800">{{ prize.place }} — {{ prize.reward }}</p>
          <p class="text-sm text-slate-600">{{ prize.description }}</p>
        </li>
      </ul>
    </section>

    <section v-if="olympiad.status === 'finished'" class="space-y-4">
      <DataTable
        :columns="resultColumns"
        :rows="resultRows"
        :subtitle="t('olympiads.details.resultsSubtitle')"
        :row-class="resultRowClass"
      >
        <template #title>
          <h2 class="text-xl font-semibold text-primary-800">
            {{ t('olympiads.details.resultsTitle') }}
          </h2>
        </template>
        <template #cell-rank="{ row }">
          <div class="flex items-center gap-2">
            <span v-if="row.medal" class="text-xl leading-none">{{ row.medal }}</span>
            <span class="font-semibold text-primary-800">{{ row.rank }}</span>
          </div>
        </template>
      </DataTable>
      <p v-if="!resultRows.length" class="text-sm text-slate-500">
        {{ t('olympiads.details.noResults') }}
      </p>
    </section>
  </section>

  <section v-else class="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white p-12 text-center shadow-sm">
    <p class="text-lg font-semibold text-primary-800">{{ t('olympiads.details.notFoundTitle') }}</p>
    <p class="max-w-md text-sm text-slate-500">{{ t('olympiads.details.notFoundSubtitle') }}</p>
    <RouterLink
      :to="{ name: 'olympiads' }"
      class="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
    >
      {{ t('olympiads.details.back') }}
    </RouterLink>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ProgressBadge from '@/components/ui/ProgressBadge.vue';
import DataTable from '@/components/ui/DataTable.vue';

const route = useRoute();
const { t, tm } = useI18n({ useScope: 'global' });

const allOlympiads = computed(() => tm('olympiads.items') ?? []);
const olympiad = computed(() => allOlympiads.value.find((item) => item.id === route.params.id));

const levelLabel = computed(() => {
  if (!olympiad.value) return '';
  switch (olympiad.value.level) {
    case 'success':
      return t('olympiads.levelLabels.success');
    case 'warning':
      return t('olympiads.levelLabels.warning');
    default:
      return t('olympiads.levelLabels.info');
  }
});

const statusLabel = computed(() => {
  if (!olympiad.value?.status) return '';
  return t(`olympiads.details.statusTag.${olympiad.value.status}`);
});

const difficultyLabel = computed(() => {
  if (!olympiad.value?.difficultyLevel) return '';
  return t(`olympiads.details.difficultyLabels.${olympiad.value.difficultyLevel}`);
});

const highlights = computed(() => {
  if (!olympiad.value) return [];
  return [
    { key: 'start', label: t('olympiads.card.start'), value: olympiad.value.start },
    { key: 'duration', label: t('olympiads.card.duration'), value: olympiad.value.duration },
    { key: 'format', label: t('olympiads.card.format'), value: olympiad.value.format },
    { key: 'subject', label: t('olympiads.card.subject'), value: olympiad.value.subject }
  ];
});

const metrics = computed(() => {
  if (!olympiad.value) return [];
  return [
    {
      key: 'questions',
      label: t('olympiads.details.metrics.questions'),
      value: olympiad.value.questionCount
    },
    {
      key: 'participants',
      label: t('olympiads.details.metrics.participants'),
      value: olympiad.value.participantCount
    },
    {
      key: 'difficulty',
      label: t('olympiads.details.metrics.difficulty'),
      value: difficultyLabel.value,
      note: olympiad.value.difficultyNote
    },
    {
      key: 'prizes',
      label: t('olympiads.details.metrics.prizes'),
      value: olympiad.value.prizeSummary
    }
  ];
});

const resultColumns = computed(() => [
  { key: 'rank', label: t('olympiads.details.resultsTable.rank') },
  { key: 'name', label: t('olympiads.details.resultsTable.participant') },
  { key: 'score', label: t('olympiads.details.resultsTable.score') }
]);

const medalIcons = ['🥇', '🥈', '🥉'];

const resultRows = computed(() => {
  if (!olympiad.value?.results?.length) return [];
  return [...olympiad.value.results]
    .sort((a, b) => b.score - a.score)
    .map((result, index) => ({
      id: `${result.name}-${index}`,
      rank: index + 1,
      name: result.name,
      score: result.score,
      medal: medalIcons[index] || ''
    }));
});

const resultRowClass = (row) => (row.medal ? 'bg-amber-50/60' : '');
</script>
