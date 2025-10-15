<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-primary-800">Oy davomida o'sish</h3>
        <p class="text-sm text-slate-500">Fanlar kesimida o'zlashtirish darajasi</p>
      </div>
      <select class="bg-primary-50 text-primary-700 text-sm rounded-2xl px-3 py-1.5 focus:outline-none">
        <option>Matematika</option>
        <option>Ingliz tili</option>
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartData = computed(() => ({
  labels: ['1-hafta', '2-hafta', '3-hafta', '4-hafta'],
  datasets: [
    {
      label: 'Matematika',
      backgroundColor: '#00A392',
      borderRadius: 14,
      data: [72, 78, 84, 91]
    },
    {
      label: 'Ingliz tili',
      backgroundColor: '#21516A',
      borderRadius: 14,
      data: [65, 70, 74, 82]
    }
  ]
}));

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
