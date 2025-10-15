<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-primary-800">Dashboard</h2>
        <p class="text-sm text-slate-500">
          Faolligingiz, kurslardagi o'zgarishlar va kelgusi vazifalar bo'yicha umumiy ko'rinish.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-secondary/90"
      >
        Haftalik reja
        <span aria-hidden="true">→</span>
      </button>
    </header>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="O'quv soatlari"
        value="42 soat"
        :trend-value="12"
        description="Joriy oy davomida yig'ilgan"
        icon="⏱️"
      />
      <StatCard
        label="Yangi yutuqlar"
        value="7 badge"
        :trend-value="4"
        description="Matematika modulidagi faolatingiz"
        icon="🏅"
      />
      <StatCard
        label="Test natijalari"
        value="86%"
        :trend-value="8"
        description="Oxirgi 10 ta testning o'rtacha natijasi"
        icon="🧠"
      />
      <StatCard
        label="Mentor feedback"
        value="4.8/5"
        :trend-value="2"
        description="Mentoring sessiyalari bo'yicha baholash"
        icon="💬"
      />
    </div>

    <div class="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <MonthlyProgressChart />
      <div class="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <h3 class="text-lg font-semibold text-primary-800">Haftalik vazifalar</h3>
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

    <DataTable :columns="tableColumns" :rows="recentActivity" subtitle="So'nggi kuzatuvlar">
      <template #title>
        <div>
          <h3 class="text-lg font-semibold text-primary-800">Faoliyat jurnali</h3>
          <p class="text-sm text-slate-500">Audit log orqali barcha muhim o'zgarishlarni kuzating.</p>
        </div>
      </template>
      <template #cell-action="{ row }">
        <span class="text-xs text-slate-400">{{ row.timestamp }}</span>
      </template>
      <template #action="{ row }">
        <button type="button" class="text-primary-600 text-sm hover:underline">Batafsil</button>
      </template>
    </DataTable>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import StatCard from '@/components/dashboard/StatCard.vue';
import MonthlyProgressChart from '@/components/charts/MonthlyProgressChart.vue';
import ProgressBadge from '@/components/ui/ProgressBadge.vue';
import DataTable from '@/components/ui/DataTable.vue';

const tasks = [
  {
    id: 1,
    title: 'Matematika - Trigonometriya testi',
    description: '9 ta savoldan iborat mini test, yakshanbagacha yakunlang',
    tone: 'info',
    label: 'Jarayonda'
  },
  {
    id: 2,
    title: 'Ingliz tili - Speaking klubi',
    description: 'Payshanba kuni soat 19:00 da, Zoom havolasi emailga yuborildi',
    tone: 'success',
    label: 'Tasdiqlandi'
  },
  {
    id: 3,
    title: "Olimpiada tayyorgarlik",
    description: "Matematika bo'yicha 5 ta murakkab masala, mentor bilan muhokama qiling",
    tone: 'warning',
    label: 'Muhim'
  }
];

const tableColumns = [
  { key: 'event', label: 'Voqea' },
  { key: 'module', label: 'Modul' },
  { key: 'status', label: 'Holat' },
  { key: 'action', label: 'Vaqt' }
];

const recentActivity = computed(() => [
  {
    id: 'log-1',
    event: 'Test yakunlandi',
    module: 'Matematika / Logarifmlar',
    status: '86% natija',
    timestamp: 'Bugun 14:20'
  },
  {
    id: 'log-2',
    event: 'Mentor fikri',
    module: 'Ingliz tili / IELTS Speaking',
    status: '4.9/5 baho',
    timestamp: 'Kecha 19:05'
  },
  {
    id: 'log-3',
    event: 'Fayl yuklandi',
    module: 'Matematika / Trigonometriya',
    status: 'Homework.pdf',
    timestamp: '3 kun avval'
  }
]);
</script>
