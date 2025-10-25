<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-4 rounded-[32px] bg-gradient-to-r from-primary-600 via-primary-500 to-secondary p-6 text-white shadow-sm">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div class="space-y-1">
          <RouterLink
            :to="{ name: 'student.courses.test-solve', params: { id: courseId, testId } }"
            class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <span aria-hidden="true">←</span>
            {{ t('courseDetails.testSolve.attemptDetails.backToTest') }}
          </RouterLink>
          <h1 class="text-2xl font-semibold sm:text-3xl">{{ attemptTitle }}</h1>
          <p class="text-sm text-white/80">{{ attemptSubtitle }}</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 text-sm font-medium">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ summary.scorePercent }}%</span>
          </div>
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ summary.formattedDuration }}</span>
          </div>
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h18M9 3v2m6-2v2M5 9h14v11H5z" />
            </svg>
            <span>{{ summary.formattedDate }}</span>
          </div>
        </div>
      </div>
    </header>

    <div v-if="!attempt" class="rounded-[32px] border border-dashed border-primary-200 bg-white/70 p-10 text-center shadow-sm">
      <p class="text-sm text-primary-700">{{ t('courseDetails.testSolve.attemptDetails.notFound') }}</p>
      <RouterLink
        :to="{ name: 'student.courses.test-solve', params: { id: courseId, testId } }"
        class="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
      >
        {{ t('courseDetails.testSolve.attemptDetails.backToTest') }}
      </RouterLink>
    </div>

    <div v-else class="space-y-6">
      <section class="space-y-5 rounded-[32px] bg-white p-6 shadow-sm">
        <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
              {{ t('courseDetails.testSolve.attemptDetails.summaryTitle') }}
            </p>
            <h2 class="text-xl font-semibold text-primary-900">
              {{ t('courseDetails.testSolve.attemptDetails.summaryDescription', { score: summary.scorePercent }) }}
            </h2>
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-200 hover:text-primary-700"
            @click="downloadAttemptPdf(attempt)"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l3 3 3-3m-3 3V4m-6 9v5a2 2 0 002 2h8a2 2 0 002-2v-5" />
            </svg>
            {{ t('courseDetails.testSolve.results.downloadPdf') }}
          </button>
        </header>

        <dl class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-3xl border border-primary-100 bg-primary-50/60 p-5 text-center">
            <dt class="text-xs font-semibold uppercase tracking-wide text-primary-600">
              {{ t('courseDetails.testSolve.results.correctLabel') }}
            </dt>
            <dd class="mt-2 text-2xl font-semibold text-primary-900">
              {{ summary.correctCount }} / {{ summary.totalQuestions }}
            </dd>
          </div>
          <div class="rounded-3xl border border-primary-100 bg-primary-50/60 p-5 text-center">
            <dt class="text-xs font-semibold uppercase tracking-wide text-primary-600">
              {{ t('courseDetails.testSolve.results.incorrectLabel') }}
            </dt>
            <dd class="mt-2 text-2xl font-semibold text-primary-900">{{ summary.incorrectCount }}</dd>
          </div>
          <div class="rounded-3xl border border-primary-100 bg-primary-50/60 p-5 text-center">
            <dt class="text-xs font-semibold uppercase tracking-wide text-primary-600">
              {{ t('courseDetails.testSolve.results.timeSpentLabel') }}
            </dt>
            <dd class="mt-2 text-2xl font-semibold text-primary-900">{{ summary.formattedDuration }}</dd>
          </div>
        </dl>
      </section>

      <section class="space-y-4 rounded-[32px] bg-white p-6 shadow-sm">
        <header class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {{ t('courseDetails.testSolve.attemptDetails.tableTitle') }}
          </p>
          <h2 class="text-xl font-semibold text-primary-900">
            {{ t('courseDetails.testSolve.attemptDetails.tableSubtitle') }}
          </h2>
        </header>

        <div class="overflow-hidden rounded-3xl border border-primary-100">
          <table class="min-w-full divide-y divide-primary-100 text-left text-sm">
            <thead class="bg-primary-50/70 text-xs font-semibold uppercase tracking-wide text-primary-600">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">{{ t('courseDetails.testSolve.attemptDetails.questionColumn') }}</th>
                <th scope="col" class="px-4 py-3">{{ t('courseDetails.testSolve.attemptDetails.answerColumn') }}</th>
                <th scope="col" class="px-4 py-3">{{ t('courseDetails.testSolve.attemptDetails.correctColumn') }}</th>
                <th scope="col" class="px-4 py-3">{{ t('courseDetails.testSolve.attemptDetails.videoColumn') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-primary-50/70 bg-white text-sm text-slate-700">
              <tr v-for="detail in attempt.details" :key="detail.id" class="transition hover:bg-primary-50/40">
                <td class="px-4 py-4 align-top font-semibold text-primary-600">{{ detail.number }}</td>
                <td class="px-4 py-4 align-top">
                  <p class="text-sm font-medium text-primary-900">{{ detail.title }}</p>
                  <div class="mt-2 text-xs text-slate-500">
                    <SafeHtml :content="detail.prompt" />
                  </div>
                </td>
                <td class="px-4 py-4 align-top">
                  <div
                    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                    :class="detail.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
                  >
                    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path
                        v-if="detail.isCorrect"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>
                      {{ detail.selectedOptionLabel ?? t('courseDetails.testSolve.attemptDetails.noAnswer') }}
                    </span>
                  </div>
                  <div class="mt-2 text-xs text-slate-500">
                    <SafeHtml v-if="detail.selectedOptionContent" :content="detail.selectedOptionContent" />
                    <span v-else class="italic text-slate-400">
                      {{ t('courseDetails.testSolve.attemptDetails.noAnswerDescription') }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-4 align-top">
                  <div class="inline-flex items-center gap-2 rounded-full bg-primary-50/70 px-3 py-1 text-xs font-semibold text-primary-600">
                    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ detail.correctOptionLabel }}</span>
                  </div>
                  <div class="mt-2 text-xs text-slate-500">
                    <SafeHtml v-if="detail.correctOptionContent" :content="detail.correctOptionContent" />
                  </div>
                </td>
                <td class="px-4 py-4 align-top">
                  <button
                    v-if="detail.solutionVideo"
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700"
                    @click="openVideo(detail)"
                  >
                    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-1.866A1 1 0 0010 10.134v3.732a1 1 0 001.555.832l3.197-1.866a1 1 0 000-1.732z" />
                    </svg>
                    {{ t('courseDetails.testSolve.attemptDetails.watchSolution') }}
                  </button>
                  <span v-else class="text-xs text-slate-400">
                    {{ t('courseDetails.testSolve.attemptDetails.noVideo') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <transition name="fade">
      <div
        v-if="activeVideo"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-6"
      >
        <div class="relative w-full max-w-4xl space-y-4 rounded-[32px] bg-white p-6 shadow-xl">
          <button
            type="button"
            class="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            @click="closeVideo()"
          >
            <span class="sr-only">{{ t('courseDetails.testSolve.attemptDetails.closeVideo') }}</span>
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <header class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
              {{ t('courseDetails.testSolve.attemptDetails.solutionTitle', { number: activeVideo.number }) }}
            </p>
            <h3 class="text-xl font-semibold text-primary-900">{{ activeVideo.title }}</h3>
          </header>

          <div class="aspect-video overflow-hidden rounded-3xl bg-black">
            <iframe
              :src="activeVideo.solutionVideo"
              title="solution-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="h-full w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SafeHtml from '@/components/ui/SafeHtml.vue';
import { useTestAttempts } from '@/composables/useTestAttempts';
import { generateAttemptPdf } from '@/utils/testResults';

const { t } = useI18n({ useScope: 'global' });
const route = useRoute();
const router = useRouter();
const { getAttempt } = useTestAttempts();

const courseId = computed(() => route.params.id);
const testId = computed(() => route.params.testId);
const attemptId = computed(() => route.params.attemptId);

const attempt = ref(null);
const activeVideo = ref(null);

function formatDuration(totalSeconds = 0) {
  const seconds = Number.isFinite(totalSeconds) ? totalSeconds : 0;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return t('courseDetails.testSolve.results.durationFormat', {
    minutes,
    seconds: remainingSeconds.toString().padStart(2, '0')
  });
}

function formatDateTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function loadAttempt() {
  if (!testId.value || !attemptId.value) {
    attempt.value = null;
    return;
  }
  const storedAttempt = getAttempt(testId.value, attemptId.value);
  attempt.value = storedAttempt ?? null;
  if (!attempt.value) {
    router.replace({ name: 'student.courses.test-solve', params: { id: courseId.value, testId: testId.value } });
  }
}

watch(
  [() => testId.value, () => attemptId.value],
  () => {
    loadAttempt();
  },
  { immediate: true }
);

const summary = computed(() => {
  if (!attempt.value) {
    return {
      scorePercent: 0,
      correctCount: 0,
      incorrectCount: 0,
      totalQuestions: 0,
      formattedDuration: '—',
      formattedDate: '—'
    };
  }
  return {
    ...attempt.value.results,
    formattedDuration: formatDuration(attempt.value.results.timeSpentSeconds),
    formattedDate: formatDateTime(attempt.value.createdAt)
  };
});

const attemptTitle = computed(() => {
  if (!attempt.value) return t('courseDetails.testSolve.attemptDetails.title');
  return t('courseDetails.testSolve.attemptDetails.titleWithScore', {
    score: attempt.value.results.scorePercent,
    title: attempt.value.testTitle || t('courseDetails.testSolve.attemptDetails.title')
  });
});

const attemptSubtitle = computed(() => {
  if (!attempt.value) return '';
  return t('courseDetails.testSolve.attemptDetails.subtitle', {
    date: summary.value.formattedDate,
    duration: summary.value.formattedDuration,
    total: summary.value.totalQuestions
  });
});

function openVideo(detail) {
  activeVideo.value = detail;
}

function closeVideo() {
  activeVideo.value = null;
}

function downloadAttemptPdf(targetAttempt) {
  if (!targetAttempt) return;
  generateAttemptPdf({
    attempt: targetAttempt,
    testTitle: targetAttempt.testTitle || attemptTitle.value,
    labels: {
      defaultTitle: t('courseDetails.testSolve.results.defaultTitle'),
      attemptDate: t('courseDetails.testSolve.results.attemptDate'),
      scoreLabel: t('courseDetails.testSolve.results.scoreLabel'),
      timeSpentLabel: t('courseDetails.testSolve.results.timeSpentLabel'),
      selectedAnswer: t('courseDetails.testSolve.results.selectedAnswer'),
      correctAnswer: t('courseDetails.testSolve.results.correctAnswer'),
      noAnswer: t('courseDetails.testSolve.results.noAnswer'),
      untitledQuestion: t('courseDetails.testSolve.results.untitledQuestion'),
      formatDuration,
      formatDate: formatDateTime
    },
    fileName: `${testId.value}-attempt-${targetAttempt.id}.pdf`
  });
}
</script>
