<template>
  <section class="space-y-8">
    <header class="space-y-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('olympiads.my.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('olympiads.my.subtitle') }}</p>
    </header>

    <div v-if="!myOlympiads.length" class="rounded-3xl border border-dashed border-primary-100 bg-white/70 p-8 text-center">
      <p class="text-sm text-slate-500">{{ t('olympiads.my.empty') }}</p>
      <RouterLink
        :to="{ name: 'olympiads' }"
        class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        {{ t('olympiads.my.browseAction') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div v-else class="space-y-10">
      <article
        v-for="olympiad in myOlympiads"
        :key="olympiad.id"
        class="space-y-6 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">{{ olympiad.host }}</p>
            <h3 class="text-xl font-semibold text-primary-800">{{ olympiad.title }}</h3>
            <p class="text-sm text-slate-500">{{ olympiad.start }} · {{ olympiad.format }}</p>
          </div>
          <RouterLink
            :to="{ name: 'olympiads.details', params: { id: olympiad.id } }"
            class="inline-flex items-center gap-2 rounded-2xl border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50"
          >
            {{ t('olympiads.my.viewDetails') }}
            <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>

        <div class="rounded-2xl bg-primary-50/60 p-4 text-sm text-primary-700">
          <p class="font-semibold">{{ t('olympiads.my.demoTitle') }}</p>
          <p class="mt-1 text-slate-600">{{ t('olympiads.my.demoSubtitle', { price: tenPercent(olympiad.fee) }) }}</p>
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
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-200"
              :disabled="isPurchased(olympiad.id, row.id)"
              @click="purchase(olympiad.id, row)"
            >
              <span v-if="isPurchased(olympiad.id, row.id)">✅</span>
              {{ isPurchased(olympiad.id, row.id) ? t('olympiads.my.purchased') : t('olympiads.my.buyAction') }}
            </button>
          </template>
        </DataTable>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import DataTable from '@/components/ui/DataTable.vue';
import { useOlympiadStore } from '@/stores/olympiads';
import { useNotifications } from '@/composables/useNotifications';

const { t, tm, locale } = useI18n({ useScope: 'global' });
const olympiadStore = useOlympiadStore();
const { notifySuccess } = useNotifications();

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

function purchase(olympiadId, row) {
  if (isPurchased(olympiadId, row.id)) return;
  olympiadStore.purchaseMiniTest(olympiadId, row.id);
  notifySuccess('miniTestPurchase', { title: row.title });
}
</script>
