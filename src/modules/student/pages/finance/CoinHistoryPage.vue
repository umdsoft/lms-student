<template>
  <section class="space-y-6">
    <header class="space-y-1">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('finance.coins.title') }}</h2>
      <p class="text-sm text-slate-500">
        {{ t('finance.coins.subtitle') }}
      </p>
    </header>

    <DataTable :columns="columns" :rows="rows" :subtitle="t('finance.coins.tableSubtitle')">
      <template #cell-amount="{ row }">
        <span :class="amountClass(row.direction)">
          {{ directionSymbol(row.direction) }}{{ row.amount }}
        </span>
      </template>
    </DataTable>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import DataTable from '@/shared/components/ui/DataTable.vue';

const { t, tm, locale } = useI18n({ useScope: 'global' });

const columns = computed(() => tm('finance.coins.columns') ?? []);

const rows = computed(() => {
  const rawRows = tm('finance.coins.rows') ?? [];
  return rawRows.map((row) => ({
    ...row,
    amount: formatAmount(row.amount)
  }));
});

function formatAmount(value) {
  return locale.value === 'ru' ? `${value} монет` : `${value} ta tanga`;
}

function amountClass(direction) {
  return direction === 'out' ? 'font-semibold text-secondary' : 'font-semibold text-emerald-600';
}

function directionSymbol(direction) {
  return direction === 'out' ? '-' : '+';
}
</script>
