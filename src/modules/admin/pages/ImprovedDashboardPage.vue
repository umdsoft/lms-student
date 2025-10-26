<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-600">Admin boshqaruv paneli - platformaning umumiy ko'rinishi</p>
      </div>
      <div class="flex gap-3">
        <button @click="refreshData" :disabled="loading" class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
          <ArrowPathIcon :class="{'animate-spin': loading}" class="h-4 w-4" />
          Yangilash
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div v-if="!loading && kpis" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Jami foydalanuvchilar"
        :value="kpis.totalUsers.value"
        :change="kpis.totalUsers.change"
        :trend="kpis.totalUsers.trend"
        :icon="UsersIcon"
        color="blue"
        format="number"
      />
      <KPICard
        title="Aktiv obunalar"
        :value="kpis.activeSubscriptions.value"
        :change="kpis.activeSubscriptions.change"
        :trend="kpis.activeSubscriptions.trend"
        :icon="CreditCardIcon"
        color="green"
        format="number"
      />
      <KPICard
        title="Oylik daromad"
        :value="kpis.monthlyRevenue.value"
        :change="kpis.monthlyRevenue.change"
        :trend="kpis.monthlyRevenue.trend"
        :icon="CurrencyDollarIcon"
        color="purple"
        format="currency"
      />
      <KPICard
        title="Jami olimpiadalar"
        :value="kpis.totalOlympiads.value"
        :change="kpis.totalOlympiads.change"
        :trend="kpis.totalOlympiads.trend"
        :icon="TrophyIcon"
        color="orange"
        format="number"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 4" :key="i" class="h-32 animate-pulse rounded-2xl bg-gray-200"></div>
    </div>

    <!-- Charts Row -->
    <div v-if="!loading && dashboardData" class="grid gap-6 lg:grid-cols-2">
      <!-- Revenue Chart -->
      <StatsCard title="Daromad dinamikasi" subtitle="So'nggi 6 oylik statistika">
        <div class="h-64">
          <LineChart v-if="dashboardData.revenueChart" :data="dashboardData.revenueChart" />
        </div>
      </StatsCard>

      <!-- Direction Stats -->
      <StatsCard title="Yo'nalishlar bo'yicha" subtitle="O'quvchilar taqsimoti">
        <div class="h-64">
          <BarChart v-if="dashboardData.directionStatsChart" :data="dashboardData.directionStatsChart" />
        </div>
      </StatsCard>
    </div>

    <!-- Activity and Alerts -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <StatsCard title="So'nggi faoliyat" subtitle="Platformadagi oxirgi harakatlar">
          <div class="space-y-3">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <div :class="getActivityColorClass(activity.color)" class="rounded-lg p-2">
                <component :is="getActivityIcon(activity.icon)" class="h-5 w-5" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900">{{ activity.title }}</p>
                <p class="mt-1 text-sm text-gray-600">{{ activity.description }}</p>
                <p class="mt-1 text-xs text-gray-500">{{ activity.timestamp }}</p>
              </div>
            </div>
          </div>
        </StatsCard>
      </div>

      <!-- Alerts -->
      <div>
        <StatsCard title="Ogohlantirishlar" subtitle="Diqqat talab qiladi">
          <div class="space-y-3">
            <div
              v-for="alert in alerts"
              :key="alert.id"
              :class="getAlertClass(alert.type)"
              class="rounded-xl border p-4"
            >
              <div class="flex items-start gap-3">
                <component :is="getAlertIcon(alert.type)" class="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-sm">{{ alert.title }}</p>
                  <p class="mt-1 text-xs opacity-90">{{ alert.message }}</p>
                  <button
                    v-if="alert.action"
                    class="mt-2 text-xs font-medium hover:underline"
                  >
                    {{ alert.action.label }} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </StatsCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useAdminDashboardStore } from '../stores/dashboard';
import KPICard from '../components/dashboard/KPICard.vue';
import StatsCard from '../components/shared/StatsCard.vue';
import LineChart from '@/shared/components/charts/LineChart.vue';
import BarChart from '@/shared/components/charts/BarChart.vue';
import {
  UsersIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ArrowPathIcon,
  UserPlusIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline';

const dashboardStore = useAdminDashboardStore();

const loading = computed(() => dashboardStore.isLoading);
const kpis = computed(() => dashboardStore.kpis);
const dashboardData = computed(() => dashboardStore.dashboardData);
const recentActivity = computed(() => dashboardStore.recentActivity);
const alerts = computed(() => dashboardStore.alerts);

onMounted(() => {
  dashboardStore.fetchDashboard();
});

const refreshData = () => {
  dashboardStore.fetchDashboard();
};

const getActivityColorClass = (color) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };
  return colors[color] || colors.blue;
};

const getActivityIcon = (iconName) => {
  const icons = {
    'user-plus': UserPlusIcon,
    'credit-card': CreditCardIcon,
    'academic-cap': AcademicCapIcon,
    'document-text': DocumentTextIcon,
    'trophy': TrophyIcon,
    'arrow-path': ArrowPathIcon
  };
  return icons[iconName] || UserPlusIcon;
};

const getAlertClass = (type) => {
  const classes = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };
  return classes[type] || classes.info;
};

const getAlertIcon = (type) => {
  const icons = {
    warning: ExclamationTriangleIcon,
    error: ExclamationTriangleIcon,
    info: InformationCircleIcon,
    success: CheckCircleIcon
  };
  return icons[type] || InformationCircleIcon;
};
</script>
