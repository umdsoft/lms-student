<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-primary-800">{{ chartContent.title }}</h3>
        <p class="text-sm text-slate-500">{{ chartContent.subtitle }}</p>
      </div>
      <select
        class="bg-primary-50 text-primary-700 text-sm rounded-2xl px-3 py-1.5 focus:outline-none"
        :aria-label="chartContent.subtitle || chartContent.title"
      >
        <option v-for="option in subjectOptions" :key="option.key">{{ option.label }}</option>
      </select>
    </div>
    <Bar :data="chartData" :options="chartOptions" class="mt-6" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { useI18n } from 'vue-i18n';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DATASET_STYLES = {
  math: '#00A392',
  english: '#21516A',
  default: '#21516A'
};

const { tm } = useI18n({ useScope: 'global' });

const chartContent = computed(() => {
  const content = tm('dashboard.chart') ?? {};
  return {
    title: content.title ?? '',
    subtitle: content.subtitle ?? '',
    subjectOptions: content.subjectOptions ?? {},
    labels: content.labels ?? [],
    datasets: content.datasets ?? {}
  };
});

const subjectOptions = computed(() => {
  const options = chartContent.value.subjectOptions;
  return Object.entries(options).map(([key, label]) => ({ key, label }));
});

const chartData = computed(() => {
  const config = chartContent.value;
  const datasets = config.datasets;

  return {
    labels: config.labels,
    datasets: Object.entries(datasets).map(([key, dataset]) => ({
      label: dataset.label ?? key,
      backgroundColor: DATASET_STYLES[key] ?? DATASET_STYLES.default,
      borderRadius: 14,
      data: dataset.data ?? []
    }))
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true
      }
    },
    tooltip: {
      callbacks: {
        label(context) {
          return `${context.dataset.label}: ${context.parsed.y}%`;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => `${value}%`
      },
      suggestedMin: 50,
      suggestedMax: 100,
      grid: {
        color: '#E0F2F1'
      }
    },
    x: {
      grid: { display: false }
    }
  }
}));
</script>

<style scoped>
div :deep(canvas) {
  height: 280px !important;
}
</style>
