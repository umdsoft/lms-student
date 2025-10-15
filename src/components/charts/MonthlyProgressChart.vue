<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-primary-800">{{ t('dashboard.chart.title') }}</h3>
        <p class="text-sm text-slate-500">{{ t('dashboard.chart.subtitle') }}</p>
      </div>
      <select
        v-model="selectedSubject"
        class="bg-primary-50 text-primary-700 text-sm rounded-2xl px-3 py-1.5 focus:outline-none"
        :aria-label="t('dashboard.chart.subtitle')"
      >
        <option v-for="option in subjectOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <Bar :data="chartData" :options="chartOptions" class="mt-6" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
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

const { t, tm } = useI18n({ useScope: 'global' });

const subjectOptions = computed(() => {
  const options = tm('dashboard.chart.subjectOptions');
  if (!options || typeof options !== 'object') return [];
  return Object.entries(options).map(([value, label]) => ({ value, label }));
});

const selectedSubject = ref('math');

const chartData = computed(() => {
  const labels = tm('dashboard.chart.labels') ?? [];
  const datasetsConfig = tm('dashboard.chart.datasets') ?? {};
  const colors = {
    math: '#00A392',
    english: '#21516A'
  };

  return {
    labels,
    datasets: Object.entries(datasetsConfig).map(([key, dataset]) => ({
      label: dataset.label,
      backgroundColor: colors[key] ?? '#00A392',
      borderRadius: 14,
      data: dataset.data
    }))
  };
});

const chartOptions = {
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
};
</script>

<style scoped>
div :deep(canvas) {
  height: 280px !important;
}
</style>
