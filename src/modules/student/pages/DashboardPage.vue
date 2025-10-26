<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-primary-800">{{ t('dashboard.title') }}</h2>
        <p class="text-sm text-slate-500">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-secondary/90"
      >
        {{ t('dashboard.weeklyPlan') }}
        <span aria-hidden="true">→</span>
      </button>
    </header>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :trend-value="stat.trendValue"
        :description="stat.description"
        :icon="stat.icon"
      />
    </div>

    <div class="grid gap-6 items-start xl:grid-cols-[1.7fr_1fr]">
      <MonthlyProgressChart class="h-full" />
      <div class="flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-primary-800">{{ t('dashboard.tasks.title') }}</h3>
        <ul class="space-y-3">
          <li v-for="task in tasks" :key="task.id" class="flex items-start gap-3">
            <ProgressBadge :tone="task.tone" :label="task.label" />
            <div>
              <p class="font-medium text-primary-700">{{ task.title }}</p>
              <p class="text-xs text-slate-500">{{ task.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <DataTable :columns="activityColumns" :rows="activityRows" :subtitle="t('dashboard.activity.tableSubtitle')">
      <template #title>
        <div>
          <h3 class="text-lg font-semibold text-primary-800">{{ t('dashboard.activity.title') }}</h3>
          <p class="text-sm text-slate-500">{{ t('dashboard.activity.subtitle') }}</p>
        </div>
      </template>
      <template #cell-action="{ row }">
        <span class="text-xs text-slate-400">{{ row.timestamp }}</span>
      </template>
      <template #action="{ row }">
        <button type="button" class="text-primary-600 text-sm hover:underline">{{ t('dashboard.activity.actionLabel') }}</button>
      </template>
    </DataTable>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import StatCard from '@/modules/student/components/dashboard/StatCard.vue';
import MonthlyProgressChart from '@/modules/student/components/charts/MonthlyProgressChart.vue';
import ProgressBadge from '@/shared/components/ui/ProgressBadge.vue';
import DataTable from '@/shared/components/ui/DataTable.vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n({ useScope: 'global' });

const stats = computed(() => tm('dashboard.stats') ?? []);
const tasks = computed(() => tm('dashboard.tasks.items') ?? []);
const activityColumns = computed(() => tm('dashboard.activity.columns') ?? []);
const activityRows = computed(() => tm('dashboard.activity.rows') ?? []);
</script>
