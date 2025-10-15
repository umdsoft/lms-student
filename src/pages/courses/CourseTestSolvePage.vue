<template>
  <section class="space-y-8">
    <header class="space-y-4">
      <RouterLink
        :to="{ name: 'courses.details', params: { id: courseId } }"
        class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        <span aria-hidden="true">←</span>
        {{ t('courseDetails.testSolve.backToCourse') }}
      </RouterLink>

      <div class="flex flex-col gap-4 rounded-[32px] bg-gradient-to-r from-primary-600 via-primary-500 to-secondary p-6 text-white shadow-sm">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div class="space-y-1">
            <h1 class="text-2xl font-semibold sm:text-3xl">{{ test?.title ?? '' }}</h1>
            <p v-if="test?.topic" class="text-sm text-white/80">{{ test.topic }}</p>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-sm font-medium">
            <div
              v-if="hasTimer"
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="uppercase tracking-wide">{{ formattedTime }}</span>
            </div>
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6l7 4-7 4-7-4 7-4zm-7 8l7 4 7-4" />
              </svg>
              <span>{{ answeredCount }}/{{ totalQuestions }} · {{ t('courseDetails.testSolve.answeredLabel') }}</span>
            </div>
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ unansweredCount }} · {{ t('courseDetails.testSolve.unansweredLabel') }}</span>
            </div>
          </div>
        </div>

        <p v-if="test?.description" class="text-sm leading-relaxed text-white/80">
          {{ test.description }}
        </p>

        <div v-if="hasTimer" class="h-2 w-full rounded-full bg-white/10">
          <div
            class="h-2 rounded-full bg-gradient-to-r from-white via-white/80 to-secondary/80 transition-all duration-300"
            :style="{ width: `${timeProgress}%` }"
          ></div>
        </div>
      </div>
    </header>

    <div
      v-if="!hasTest"
      class="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-dashed border-primary-200 bg-white/70 p-12 text-center shadow-sm"
    >
      <h2 class="text-lg font-semibold text-primary-800">{{ t('courseDetails.testSolve.notFoundTitle') }}</h2>
      <p class="max-w-md text-sm text-slate-500">{{ t('courseDetails.testSolve.notFoundDescription') }}</p>
      <RouterLink
        :to="{ name: 'courses.details', params: { id: courseId } }"
        class="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
      >
        {{ t('courseDetails.testSolve.backToCourse') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div v-else class="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)]">
      <div class="space-y-6">
        <div class="space-y-6 rounded-[32px] bg-white p-6 shadow-sm">
          <div class="space-y-3">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-primary-500">
              {{ t('courseDetails.testSolve.questionNavigationTitle') }}
            </h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(question, index) in questions"
                :key="question.id ?? index"
                type="button"
                class="h-10 w-10 rounded-full border text-sm font-semibold transition"
                :class="questionButtonClass(question, index)"
                @click="goToQuestion(index)"
              >
                {{ question.number ?? index + 1 }}
              </button>
            </div>
          </div>

          <div class="space-y-5 rounded-3xl border border-primary-100 bg-primary-50/50 p-5">
            <div class="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-primary-600">
              <span class="rounded-full bg-white px-4 py-1">
                {{ t('courseDetails.testSolve.questionCounter', { current: currentQuestionNumber, total: totalQuestions }) }}
              </span>
              <span class="rounded-full bg-white px-4 py-1 text-primary-500">
                {{ answeredCount }} / {{ totalQuestions }}
              </span>
            </div>

            <div class="space-y-3 text-base leading-relaxed text-primary-900">
              <SafeHtml :content="currentQuestion?.prompt ?? ''" />
            </div>

            <div class="space-y-3">
              <label
                v-for="option in currentQuestion?.options ?? []"
                :key="option.id"
                class="flex items-start gap-3 rounded-2xl border p-4 text-sm transition"
                :class="optionClass(currentQuestion?.id, option.id)"
              >
                <input
                  class="mt-1 h-4 w-4 shrink-0 text-primary-600 focus:ring-primary-600"
                  type="radio"
                  :name="`question-${currentQuestion?.id}`"
                  :value="option.id"
                  :checked="isOptionSelected(currentQuestion?.id, option.id)"
                  @change="selectOption(currentQuestion?.id, option.id)"
                  :disabled="isSubmitted"
                />
                <div class="space-y-1">
                  <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-600">
                    {{ option.label }}
                  </span>
                  <SafeHtml :content="option.content" />
                </div>
              </label>
            </div>
          </div>

          <div
            v-if="isSubmitted"
            class="space-y-2 rounded-3xl border border-primary-200 bg-primary-50/70 p-5 text-sm text-primary-700"
          >
            <p class="text-base font-semibold text-primary-800">
              {{ t('courseDetails.testSolve.finishSuccessTitle') }}
            </p>
            <p>
              {{
                wasAutoSubmitted
                  ? t('courseDetails.testSolve.finishAutoDescription')
                  : t('courseDetails.testSolve.finishSuccessDescription')
              }}
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex gap-2">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-200 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                :aria-label="t('courseDetails.testSolve.previousQuestion')"
                @click="goToPrevious"
                :disabled="activeQuestionIndex === 0"
              >
                <span aria-hidden="true">←</span>
                <span class="hidden sm:inline">{{ t('courseDetails.testSolve.previousQuestion') }}</span>
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-200 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                :aria-label="t('courseDetails.testSolve.nextQuestion')"
                @click="goToNext"
                :disabled="activeQuestionIndex >= totalQuestions - 1"
              >
                <span class="hidden sm:inline">{{ t('courseDetails.testSolve.nextQuestion') }}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
              @click="finishTest()"
              :disabled="isSubmitted"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ t('courseDetails.testSolve.finishButton') }}
            </button>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <section class="space-y-5 rounded-[32px] bg-white p-6 shadow-sm">
          <header class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
              {{ t('courseDetails.testSolve.stats.overviewTitle') }}
            </p>
            <h2 class="text-xl font-semibold text-primary-900">{{ test?.title }}</h2>
          </header>

          <dl class="grid gap-3 text-sm text-slate-600">
            <div class="flex items-center justify-between rounded-2xl bg-primary-50/60 px-4 py-3">
              <dt class="font-medium text-primary-700">{{ t('courseDetails.testSolve.stats.durationLabel') }}</dt>
              <dd class="text-primary-900">{{ durationLabel }}</dd>
            </div>
            <div class="flex items-center justify-between rounded-2xl bg-primary-50/60 px-4 py-3">
              <dt class="font-medium text-primary-700">{{ t('courseDetails.testSolve.stats.questionsLabel') }}</dt>
              <dd class="text-primary-900">{{ totalQuestions }}</dd>
            </div>
            <div v-if="test?.topic" class="flex items-center justify-between rounded-2xl bg-primary-50/60 px-4 py-3">
              <dt class="font-medium text-primary-700">{{ t('courseDetails.testSolve.stats.topicLabel') }}</dt>
              <dd class="text-right text-primary-900">{{ test.topic }}</dd>
            </div>
            <div v-if="test?.attempts" class="flex items-center justify-between rounded-2xl bg-primary-50/60 px-4 py-3">
              <dt class="font-medium text-primary-700">{{ t('courseDetails.testSolve.stats.attemptsLabel') }}</dt>
              <dd class="text-primary-900">{{ attemptsLabel }}</dd>
            </div>
            <div v-if="test?.deadline" class="flex items-center justify-between rounded-2xl bg-primary-50/60 px-4 py-3">
              <dt class="font-medium text-primary-700">{{ t('courseDetails.testSolve.stats.deadlineLabel') }}</dt>
              <dd class="text-right text-primary-900">{{ test.deadline }}</dd>
            </div>
          </dl>

          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm font-medium text-primary-700">
              <span>{{ t('courseDetails.testSolve.answeredLabel') }}</span>
              <span>{{ answeredCount }} / {{ totalQuestions }}</span>
            </div>
            <div class="h-2 w-full rounded-full bg-primary-100">
              <div
                class="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary transition-all duration-500"
                :style="{ width: `${questionProgress}%` }"
              ></div>
            </div>
            <p class="text-xs text-slate-500">
              {{ t('courseDetails.testSolve.unansweredLabel') }}: {{ unansweredCount }}
            </p>
          </div>
        </section>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SafeHtml from '@/components/ui/SafeHtml.vue';

const { t, tm, locale } = useI18n({ useScope: 'global' });
const route = useRoute();

const courseId = computed(() => route.params.id);
const testId = computed(() => route.params.testId);

const testLibrary = computed(() => tm('courseDetails.testDetails') ?? {});
const test = computed(() => testLibrary.value?.[testId.value] ?? null);

const questions = computed(() => {
  return (test.value?.questions ?? []).map((question, index) => ({
    ...question,
    number: question.number ?? index + 1
  }));
});

const totalQuestions = computed(() => questions.value.length);

const answers = ref({});
const activeQuestionIndex = ref(0);
const isSubmitted = ref(false);
const wasAutoSubmitted = ref(false);
const timeLeft = ref(0);
const timerId = ref(null);

const durationSeconds = computed(() => {
  const minutes = test.value?.durationMinutes ?? 0;
  if (!Number.isFinite(minutes)) return 0;
  return Math.max(0, Math.round(minutes * 60));
});

const hasTimer = computed(() => durationSeconds.value > 0);

const formattedTime = computed(() => {
  if (!hasTimer.value) return '--:--';
  const remaining = Math.max(0, timeLeft.value);
  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(remaining % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
});

const timeProgress = computed(() => {
  if (!hasTimer.value || durationSeconds.value === 0) return 100;
  return Math.max(0, Math.min(100, (timeLeft.value / durationSeconds.value) * 100));
});

const answeredCount = computed(() => Object.keys(answers.value).length);
const unansweredCount = computed(() => Math.max(0, totalQuestions.value - answeredCount.value));

const currentQuestion = computed(() => questions.value[activeQuestionIndex.value] ?? null);
const currentQuestionNumber = computed(
  () => currentQuestion.value?.number ?? activeQuestionIndex.value + 1
);

const hasTest = computed(() => Boolean(test.value && totalQuestions.value));

const questionProgress = computed(() => {
  if (!totalQuestions.value) return 0;
  return Math.round((answeredCount.value / totalQuestions.value) * 100);
});

watch(
  () => test.value?.id,
  () => {
    resetState();
  },
  { immediate: true }
);

function resetState() {
  answers.value = {};
  activeQuestionIndex.value = 0;
  isSubmitted.value = false;
  wasAutoSubmitted.value = false;
  clearTimer();
  if (hasTimer.value) {
    timeLeft.value = durationSeconds.value;
    startTimer();
  } else {
    timeLeft.value = 0;
  }
}

function startTimer() {
  clearTimer();
  if (!hasTimer.value) return;
  timerId.value = setInterval(() => {
    if (timeLeft.value <= 1) {
      timeLeft.value = 0;
      finishTest(true);
    } else {
      timeLeft.value -= 1;
    }
  }, 1000);
}

function clearTimer() {
  if (timerId.value) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
}

onBeforeUnmount(() => {
  clearTimer();
});

function goToQuestion(index) {
  if (index < 0 || index >= totalQuestions.value) return;
  activeQuestionIndex.value = index;
}

function goToPrevious() {
  goToQuestion(activeQuestionIndex.value - 1);
}

function goToNext() {
  goToQuestion(activeQuestionIndex.value + 1);
}

function selectOption(questionId, optionId) {
  if (!questionId || isSubmitted.value) return;
  answers.value = { ...answers.value, [questionId]: optionId };
}

function isOptionSelected(questionId, optionId) {
  if (!questionId) return false;
  return answers.value[questionId] === optionId;
}

function isQuestionAnswered(question) {
  if (!question) return false;
  return Boolean(answers.value[question.id]);
}

function questionButtonClass(question, index) {
  const isActive = index === activeQuestionIndex.value;
  const answered = isQuestionAnswered(question);
  if (isActive) {
    return 'border-primary-500 bg-primary-600 text-white shadow-sm hover:border-primary-500';
  }
  if (answered) {
    return 'border-primary-200 bg-primary-100 text-primary-700 hover:border-primary-300';
  }
  return 'border-slate-200 bg-white text-slate-500 hover:border-primary-200 hover:text-primary-600';
}

function optionClass(questionId, optionId) {
  const selected = isOptionSelected(questionId, optionId);
  if (selected) {
    return 'border-primary-300 bg-white shadow';
  }
  if (isSubmitted.value) {
    return 'border-slate-200 bg-white/80';
  }
  return 'border-slate-200 bg-white hover:border-primary-200 hover:shadow-sm';
}

function finishTest(auto = false) {
  if (isSubmitted.value || !hasTest.value) return;
  wasAutoSubmitted.value = auto;
  isSubmitted.value = true;
  clearTimer();
}

const durationLabel = computed(() => {
  if (!test.value?.durationMinutes) return '—';
  const minutes = test.value.durationMinutes;
  if (locale.value === 'ru') {
    const plural = new Intl.PluralRules('ru').select(minutes);
    const unit = plural === 'one' ? 'минута' : plural === 'few' ? 'минуты' : 'минут';
    return `${minutes} ${unit}`;
  }
  return `${minutes} daqiqa`;
});

const attemptsLabel = computed(() => {
  if (!test.value?.attempts) return '—';
  const count = test.value.attempts;
  if (locale.value === 'ru') {
    const plural = new Intl.PluralRules('ru').select(count);
    const unit = plural === 'one' ? 'попытка' : plural === 'few' ? 'попытки' : 'попыток';
    return `${count} ${unit}`;
  }
  return `${count} ta`;
});
</script>
