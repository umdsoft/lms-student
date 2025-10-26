<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
      <div>
        <slot name="title">
          <h3 class="text-lg font-semibold text-ink">{{ t('components.dataTable.defaultTitle') }}</h3>
        </slot>
        <p v-if="subtitle" class="text-sm text-slate-500">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-5 py-3"
              scope="col"
            >
              {{ column.label }}
            </th>
            <th v-if="$slots.action" class="px-5 py-3">&nbsp;</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-slate-600">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="transition hover:bg-slate-50"
            :class="rowClass ? rowClass(row) : ''"
          >
            <td v-for="column in columns" :key="column.key" class="px-5 py-4 align-top">
              <slot :name="`cell-${column.key}`" :row="row">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.action" class="px-5 py-4">
              <slot name="action" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  subtitle: {
    type: String,
    default: ''
  },
  rowClass: {
    type: Function,
    default: null
  }
});

import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
</script>
