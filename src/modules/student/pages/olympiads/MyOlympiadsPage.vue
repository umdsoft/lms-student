<template>
  <section class="space-y-8">
    <header class="space-y-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('olympiads.my.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('olympiads.my.subtitle') }}</p>
    </header>

    <div v-if="!myOlympiads.length" class="rounded-3xl border border-dashed border-primary-100 bg-white/70 p-8 text-center">
      <p class="text-sm text-slate-500">{{ t('olympiads.my.empty') }}</p>
      <RouterLink
        :to="{ name: 'student.olympiads' }"
        class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        {{ t('olympiads.my.browseAction') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div v-else class="grid gap-6 xl:grid-cols-2">
      <article
        v-for="olympiad in myOlympiads"
        :key="olympiad.id"
        class="flex flex-col gap-6 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm"
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">{{ olympiad.host }}</p>
              <h3 class="text-xl font-semibold text-primary-800">{{ olympiad.title }}</h3>
              <p class="text-sm text-slate-500">{{ olympiad.format }} · {{ olympiad.subject }}</p>
            </div>
            <div class="flex flex-col items-end gap-2 text-right">
              <span class="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                {{ t('olympiads.my.countdown.label') }}
              </span>
              <p class="text-sm font-semibold text-primary-700">{{ formatCountdown(olympiad) }}</p>
              <p class="text-xs text-slate-500">{{ formatStartDate(olympiad) }}</p>
            </div>
          </div>
          <p class="text-sm text-slate-600">{{ olympiad.description }}</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
            <span class="inline-flex items-center gap-2 rounded-2xl bg-primary-50 px-3 py-1 text-primary-700">
              <span aria-hidden="true">🗓️</span>
              {{ t('olympiads.table.start') }}: {{ formatStartDate(olympiad) }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-2xl bg-primary-50 px-3 py-1 text-primary-700">
              <span aria-hidden="true">⏱️</span>
              {{ olympiad.duration }}
            </span>
          </div>
          <div class="flex gap-3">
            <RouterLink
              :to="{ name: 'student.olympiads.details', params: { id: olympiad.id } }"
              class="inline-flex items-center gap-2 rounded-2xl border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
            >
              {{ t('olympiads.my.viewDetails') }}
              <span aria-hidden="true">↗</span>
            </RouterLink>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              @click="toggleExpanded(olympiad.id)"
            >
              <span aria-hidden="true">{{ expandedId === olympiad.id ? '−' : '+' }}</span>
              {{ expandedId === olympiad.id ? t('olympiads.my.hideDetails') : t('olympiads.my.detailsAction') }}
            </button>
          </div>
        </div>

        <Transition name="expand">
          <div v-if="expandedId === olympiad.id" class="space-y-6 rounded-3xl bg-primary-50/60 p-5">
            <div class="space-y-3 text-sm text-slate-600">
              <p class="font-semibold text-primary-700">{{ t('olympiads.my.demoTitle') }}</p>
              <p>{{ t('olympiads.my.demoSubtitle', { price: tenPercent(olympiad.fee) }) }}</p>
            </div>

            <DataTable
              :columns="miniTestColumns"
              :rows="miniTestRows(olympiad)"
              :subtitle="t('olympiads.my.tableSubtitle')"
            >
              <template #cell-title="{ row }">
                <div class="space-y-1">
                  <p class="font-semibold text-primary-800">{{ row.title }}</p>
                  <p class="text-xs text-slate-500">{{ row.focus }}</p>
                </div>
              </template>
              <template #cell-duration="{ row }">
                <div class="space-y-1">
                  <p class="font-medium text-primary-700">{{ row.duration }}</p>
                  <p class="text-xs text-slate-500">{{ row.questionCount }}</p>
                </div>
              </template>
              <template #cell-price="{ row }">
                <span class="font-semibold text-secondary">{{ formatPrice(row.price) }}</span>
              </template>
              <template #action="{ row }">
                <RouterLink
                  v-if="isPurchased(olympiad.id, row.id)"
                  :to="solveLink(olympiad.id, row.id)"
                  class="inline-flex items-center gap-2 rounded-2xl border border-primary-200 px-4 py-2 text-xs font-semibold text-primary-700 hover:bg-primary-100"
                >
                  {{ t('olympiads.my.solveAction') }}
                  <span aria-hidden="true">→</span>
                </RouterLink>
                <button
                  v-else
                  type="button"
                  class="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700"
                  @click="purchase(olympiad, row)"
                >
                  {{ t('olympiads.my.buyAction') }}
                </button>
              </template>
            </DataTable>
          </div>
        </Transition>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRouter } from 'vue-router';
import DataTable from '@/shared/components/ui/DataTable.vue';
import { useOlympiadStore } from '@/modules/student/stores/olympiads';
import { useNotifications } from '@/shared/composables/useNotifications';

const { t, tm, locale } = useI18n({ useScope: 'global' });
const olympiadStore = useOlympiadStore();
const { notifySuccess } = useNotifications();
const router = useRouter();

const expandedId = ref(null);
const now = ref(new Date());
let timerId = null;

onMounted(() => {
  timerId = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timerId) {
    window.clearInterval(timerId);
  }
});

const allOlympiads = computed(() => tm('olympiads.items') ?? []);
const myOlympiads = computed(() => allOlympiads.value.filter((item) => olympiadStore.isRegistered(item.id)));

const miniTestColumns = computed(() => [
  { key: 'title', label: t('olympiads.my.tableColumns.title') },
  { key: 'duration', label: t('olympiads.my.tableColumns.duration') },
  { key: 'price', label: t('olympiads.my.tableColumns.price') }
]);

function miniTestRows(olympiad) {
  return olympiadStore.listMiniTests(olympiad).map((test) => ({ ...test }));
}

function formatPrice(value) {
  return t('app.header.balanceValue', {
    value: new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ').format(value)
  });
}

function tenPercent(value) {
  return formatPrice(Math.round((value || 0) * 0.1));
}

function isPurchased(olympiadId, testId) {
  return olympiadStore.isMiniTestPurchased(olympiadId, testId);
}

function purchase(olympiad, row) {
  if (!olympiad?.id || !row?.id) return;
  if (isPurchased(olympiad.id, row.id)) {
    router.push(solveLink(olympiad.id, row.id));
    return;
  }

  const confirmed = window.confirm(t('olympiads.my.confirmPurchase', { title: row.title }));
  if (!confirmed) return;

  olympiadStore.purchaseMiniTest(olympiad.id, row.id);
  notifySuccess('miniTestPurchase', { title: row.title });
  router.push(solveLink(olympiad.id, row.id));
}

function toggleExpanded(id) {
  expandedId.value = expandedId.value === id ? null : id;
}

function solveLink(olympiadId, testId) {
  return { name: 'student.olympiads.mini-test', params: { id: olympiadId, testId } };
}

function getStartDate(olympiad) {
  if (!olympiad?.startAt) return null;
  const date = new Date(olympiad.startAt);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatStartDate(olympiad) {
  const date = getStartDate(olympiad);
  if (!date) return olympiad?.start ?? '';
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(date);
}

function formatCountdown(olympiad) {
  const startDate = getStartDate(olympiad);
  if (!startDate) return '';

  const diff = startDate.getTime() - now.value.getTime();
  if (diff <= 0) {
    return t('olympiads.my.countdown.started');
  }

  if (diff < 60000) {
    return t('olympiads.my.countdown.soon');
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days > 0) parts.push(t('olympiads.my.countdown.days', { count: days }));
  if (hours > 0) parts.push(t('olympiads.my.countdown.hours', { count: hours }));
  if (minutes > 0) parts.push(t('olympiads.my.countdown.minutes', { count: minutes }));

  const label = parts.length ? parts.join(' ') : t('olympiads.my.countdown.minutes', { count: 0 });
  return t('olympiads.my.countdown.text', { time: label });
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
