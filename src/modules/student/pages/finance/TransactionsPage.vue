<template>
  <section class="space-y-6">
    <header class="space-y-1">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('finance.transactions.title') }}</h2>
      <p class="text-sm text-slate-500">
        {{ t('finance.transactions.subtitle') }}
      </p>
    </header>

    <DataTable :columns="columns" :rows="rows" :subtitle="t('finance.transactions.tableSubtitle')">
      <template #cell-amount="{ row }">
        <span :class="amountClass(row.direction)">
          {{ directionSymbol(row.direction) }}{{ row.amount }}
        </span>
      </template>
      <template #cell-balanceAfter="{ row }">
        <span class="font-medium text-primary-700">{{ row.balanceAfter }}</span>
      </template>
    </DataTable>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import DataTable from '@/shared/components/ui/DataTable.vue';

const { t, tm, locale } = useI18n({ useScope: 'global' });

const columns = computed(() => tm('finance.transactions.columns') ?? []);

const rows = computed(() => {
  const rawRows = tm('finance.transactions.rows') ?? [];
  return rawRows.map((row) => ({
    ...row,
    amount: formatCurrency(row.amount),
    balanceAfter: formatCurrency(row.balanceAfter)
  }));
});

function formatCurrency(value) {
  const formatter = new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ');
  const suffix = locale.value === 'ru' ? ' сум' : " so'm";
  return `${formatter.format(value)}${suffix}`;
}

function amountClass(direction) {
  return direction === 'out' ? 'font-semibold text-secondary' : 'font-semibold text-emerald-600';
}

function directionSymbol(direction) {
  return direction === 'out' ? '-' : '+';
}
</script>
