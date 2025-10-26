<template>
  <section class="space-y-8">
    <!-- Page Header -->
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold text-slate-900">{{ t('dashboard.title') }}</h2>
        <p class="mt-1 text-sm text-slate-600">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/90 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:from-secondary/90 hover:to-secondary/80"
      >
        <Calendar :size="18" />
        <span>{{ t('dashboard.weeklyPlan') }}</span>
        <ArrowRight :size="16" />
      </button>
    </header>

    <!-- Stats Grid -->
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        v-for="(stat, index) in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :trend-value="stat.trendValue"
        :description="stat.description"
        :icon="stat.icon"
        :icon-component="statIcons[index]"
      />
    </div>

    <!-- Charts and Tasks -->
    <div class="grid gap-6 items-start xl:grid-cols-[1.7fr_1fr]">
      <!-- Chart Section -->
      <div class="rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <MonthlyProgressChart class="h-full" />
      </div>

      <!-- Tasks Section -->
      <div class="flex h-full flex-col gap-5 rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div class="flex items-center gap-2">
          <ListTodo :size="20" class="text-primary-600" />
          <h3 class="text-lg font-bold text-slate-900">{{ t('dashboard.tasks.title') }}</h3>
        </div>
        <ul class="space-y-4">
          <li v-for="task in tasks" :key="task.id" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
            <ProgressBadge :tone="task.tone" :label="task.label" />
            <div class="flex-1">
              <p class="font-semibold text-slate-900">{{ task.title }}</p>
              <p class="mt-0.5 text-xs text-slate-500">{{ task.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Activity Table -->
    <div class="rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
      <DataTable :columns="activityColumns" :rows="activityRows" :subtitle="t('dashboard.activity.tableSubtitle')">
        <template #title>
          <div class="flex items-center gap-2">
            <Activity :size="20" class="text-primary-600" />
            <div>
              <h3 class="text-lg font-bold text-slate-900">{{ t('dashboard.activity.title') }}</h3>
              <p class="text-sm text-slate-500">{{ t('dashboard.activity.subtitle') }}</p>
            </div>
          </div>
        </template>
        <template #cell-action="{ row }">
          <span class="text-xs text-slate-400">{{ row.timestamp }}</span>
        </template>
        <template #action="{ row }">
          <button type="button" class="inline-flex items-center gap-1 text-primary-600 text-sm font-medium hover:underline">
            {{ t('dashboard.activity.actionLabel') }}
            <ArrowUpRight :size="14" />
          </button>
        </template>
      </DataTable>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import {
  Calendar,
  ArrowRight,
  ListTodo,
  Activity,
  ArrowUpRight,
  BookOpen,
  Award,
  Target,
  Zap
} from 'lucide-vue-next';
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

// Icon mapping for stats (in order)
const statIcons = [BookOpen, Award, Target, Zap];
</script>
