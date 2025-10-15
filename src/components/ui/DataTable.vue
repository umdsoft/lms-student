<template>
  <div class="bg-white rounded-3xl shadow-sm overflow-hidden">
    <div class="px-6 py-4 border-b border-primary-50 flex items-center justify-between">
      <div>
        <slot name="title">
          <h3 class="text-lg font-semibold text-primary-800">{{ t('components.dataTable.defaultTitle') }}</h3>
        </slot>
        <p class="text-sm text-slate-500" v-if="subtitle">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-primary-50 text-sm">
        <thead class="bg-primary-50/60 text-left uppercase text-xs tracking-wide text-primary-600">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3"
              scope="col"
            >
              {{ column.label }}
            </th>
            <th v-if="$slots.action" class="px-6 py-3">&nbsp;</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-primary-50 text-slate-600">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="hover:bg-primary-50/40"
            :class="rowClass ? rowClass(row) : ''"
          >
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 align-top">
              <slot :name="`cell-${column.key}`" :row="row">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.action" class="px-6 py-4">
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
