<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Analitika</h1>
        <p class="mt-1 text-sm text-gray-600">Platformaning to'liq statistikasi va analitika ma'lumotlari</p>
      </div>
      <div class="flex gap-3">
        <select
          v-model="selectedPeriod"
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <option value="7d">So'nggi 7 kun</option>
          <option value="30d">So'nggi 30 kun</option>
          <option value="90d">So'nggi 90 kun</option>
          <option value="1y">So'nggi yil</option>
        </select>
        <button @click="refreshData" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <ArrowPathIcon :class="{'animate-spin': loading}" class="h-5 w-5" />
          Yangilash
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-100">Jami daromad</p>
            <p class="mt-2 text-3xl font-bold">{{ formatCurrency(metrics.revenue) }}</p>
            <div class="mt-2 flex items-center gap-1 text-sm">
              <ArrowTrendingUpIcon class="h-4 w-4" />
              <span>+12.5%</span>
            </div>
          </div>
          <CurrencyDollarIcon class="h-12 w-12 text-blue-200" />
        </div>
      </div>

      <div class="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-100">Foydalanuvchilar</p>
            <p class="mt-2 text-3xl font-bold">{{ metrics.users }}</p>
            <div class="mt-2 flex items-center gap-1 text-sm">
              <ArrowTrendingUpIcon class="h-4 w-4" />
              <span>+8.2%</span>
            </div>
          </div>
          <UsersIcon class="h-12 w-12 text-green-200" />
        </div>
      </div>

      <div class="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-100">Aktiv obunalar</p>
            <p class="mt-2 text-3xl font-bold">{{ metrics.activeSubscriptions }}</p>
            <div class="mt-2 flex items-center gap-1 text-sm">
              <ArrowTrendingUpIcon class="h-4 w-4" />
              <span>+15.3%</span>
            </div>
          </div>
          <CreditCardIcon class="h-12 w-12 text-purple-200" />
        </div>
      </div>

      <div class="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-100">Tugallangan kurslar</p>
            <p class="mt-2 text-3xl font-bold">{{ metrics.completedCourses }}</p>
            <div class="mt-2 flex items-center gap-1 text-sm">
              <ArrowTrendingUpIcon class="h-4 w-4" />
              <span>+5.7%</span>
            </div>
          </div>
          <AcademicCapIcon class="h-12 w-12 text-orange-200" />
        </div>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Revenue Chart -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Daromad dinamikasi</h3>
            <p class="text-sm text-gray-600">Oylik daromad statistikasi</p>
          </div>
          <ChartBarIcon class="h-6 w-6 text-gray-400" />
        </div>
        <div class="h-80">
          <LineChart v-if="revenueChartData" :data="revenueChartData" />
        </div>
      </div>

      <!-- User Growth Chart -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Foydalanuvchilar o'sishi</h3>
            <p class="text-sm text-gray-600">Yangi ro'yxatdan o'tganlar</p>
          </div>
          <UsersIcon class="h-6 w-6 text-gray-400" />
        </div>
        <div class="h-80">
          <AreaChart v-if="userGrowthChartData" :data="userGrowthChartData" />
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Direction Distribution -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Yo'nalishlar bo'yicha taqsimot</h3>
            <p class="text-sm text-gray-600">O'quvchilar soni</p>
          </div>
          <ChartPieIcon class="h-6 w-6 text-gray-400" />
        </div>
        <div class="h-80">
          <DonutChart v-if="directionChartData" :data="directionChartData" />
        </div>
      </div>

      <!-- Activity by Day -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Haftalik faollik</h3>
            <p class="text-sm text-gray-600">Kun bo'yicha aktivlik</p>
          </div>
          <CalendarIcon class="h-6 w-6 text-gray-400" />
        </div>
        <div class="h-80">
          <BarChart v-if="activityChartData" :data="activityChartData" />
        </div>
      </div>
    </div>

    <!-- Detailed Statistics -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Top Courses -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Eng mashhur kurslar</h3>
        <div class="space-y-4">
          <div v-for="(course, index) in topCourses" :key="course.id" class="flex items-center gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold">
              {{ index + 1 }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ course.name }}</p>
              <p class="text-xs text-gray-500">{{ course.students }} o'quvchi</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ course.rating }}</div>
              <div class="text-xs text-gray-500">★ reyting</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Teachers -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Eng faol o'qituvchilar</h3>
        <div class="space-y-4">
          <div v-for="(teacher, index) in topTeachers" :key="teacher.id" class="flex items-center gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 font-bold">
              {{ index + 1 }}
            </div>
            <img :src="teacher.avatar" :alt="teacher.name" class="h-10 w-10 rounded-full" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ teacher.name }}</p>
              <p class="text-xs text-gray-500">{{ teacher.courses }} kurs</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ teacher.students }}</div>
              <div class="text-xs text-gray-500">o'quvchi</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">So'nggi faoliyat</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3">
            <div :class="getActivityIconClass(activity.type)" class="rounded-lg p-2">
              <component :is="getActivityIcon(activity.type)" class="h-4 w-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Table -->
    <div class="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">Yo'nalishlar samaradorligi</h2>
        <p class="mt-1 text-sm text-gray-600">Har bir yo'nalish bo'yicha batafsil statistika</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yo'nalish</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O'quvchilar</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tugallash %</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O'rtacha reyting</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daromad</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in performanceData" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div :class="item.colorClass" class="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold">
                    {{ item.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">{{ item.courses }} kurs</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.students }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                    <div :class="getProgressBarClass(item.completionRate)" class="h-2 rounded-full" :style="{width: item.completionRate + '%'}"></div>
                  </div>
                  <span class="text-sm text-gray-900">{{ item.completionRate }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <span class="text-sm font-medium text-gray-900">{{ item.rating }}</span>
                  <span class="text-yellow-400">★</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">{{ formatCurrency(item.revenue) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CurrencyDollarIcon,
  UsersIcon,
  CreditCardIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChartPieIcon,
  CalendarIcon,
  UserPlusIcon,
  BookOpenIcon,
  TrophyIcon,
  BellIcon
} from '@heroicons/vue/24/outline';
import LineChart from '@/shared/components/charts/LineChart.vue';
import BarChart from '@/shared/components/charts/BarChart.vue';
import AreaChart from '@/shared/components/charts/AreaChart.vue';
import DonutChart from '@/shared/components/charts/DonutChart.vue';

const loading = ref(false);
const selectedPeriod = ref('30d');

const metrics = ref({
  revenue: 28500000,
  users: 548,
  activeSubscriptions: 240,
  completedCourses: 1250
});

const revenueChartData = ref({
  labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt'],
  datasets: [
    {
      label: 'Daromad (UZS)',
      data: [1200000, 1900000, 1500000, 2200000, 2800000, 2400000, 3100000, 2900000, 3200000, 2850000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    }
  ]
});

const userGrowthChartData = ref({
  labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt'],
  datasets: [
    {
      label: 'Foydalanuvchilar',
      data: [120, 180, 250, 320, 380, 420, 470, 510, 540, 548],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.2)'
    }
  ]
});

const directionChartData = ref({
  labels: ['Matematika', 'Fizika', 'Kimyo', 'Ingliz tili', 'Tarix', 'Boshqalar'],
  datasets: [
    {
      data: [150, 120, 100, 200, 80, 98],
      backgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(168, 85, 247)',
        'rgb(34, 197, 94)',
        'rgb(251, 146, 60)',
        'rgb(239, 68, 68)',
        'rgb(156, 163, 175)'
      ]
    }
  ]
});

const activityChartData = ref({
  labels: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
  datasets: [
    {
      label: 'Faol foydalanuvchilar',
      data: [420, 480, 510, 490, 450, 320, 280],
      backgroundColor: 'rgba(168, 85, 247, 0.8)'
    }
  ]
});

const topCourses = ref([
  { id: 1, name: 'Matematika - Algebra asoslari', students: 145, rating: '4.9' },
  { id: 2, name: 'IELTS Speaking - Band 7+', students: 132, rating: '4.8' },
  { id: 3, name: 'Fizika - Mexanika', students: 98, rating: '4.7' },
  { id: 4, name: 'Kimyo - Organik kimyo', students: 87, rating: '4.6' },
  { id: 5, name: 'Ingliz tili - Grammar', students: 76, rating: '4.5' }
]);

const topTeachers = ref([
  {
    id: 1,
    name: 'Dilnoza Karimova',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK',
    courses: 8,
    students: 245
  },
  {
    id: 2,
    name: 'Malika Tosheva',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT',
    courses: 6,
    students: 198
  },
  {
    id: 3,
    name: 'Zulfiya Normatova',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZN',
    courses: 5,
    students: 156
  },
  {
    id: 4,
    name: 'Nodira Ahmedova',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NA',
    courses: 4,
    students: 134
  }
]);

const recentActivities = ref([
  { id: 1, type: 'user', title: 'Aziz Rahimov ro\'yxatdan o\'tdi', time: '5 daqiqa oldin' },
  { id: 2, type: 'course', title: 'Yangi kurs "Python asoslari" qo\'shildi', time: '15 daqiqa oldin' },
  { id: 3, type: 'payment', title: 'Dilnoza Premium obunaga o\'tdi', time: '1 soat oldin' },
  { id: 4, type: 'olympiad', title: 'Bahorgi olimpiada tugadi', time: '2 soat oldin' },
  { id: 5, type: 'alert', title: 'Server yuklanishi 80% dan oshdi', time: '3 soat oldin' }
]);

const performanceData = ref([
  {
    id: 1,
    name: 'Matematika',
    courses: 12,
    students: 150,
    completionRate: 85,
    rating: 4.8,
    revenue: 7500000,
    colorClass: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Ingliz tili',
    courses: 15,
    students: 200,
    completionRate: 78,
    rating: 4.7,
    revenue: 9000000,
    colorClass: 'bg-orange-500'
  },
  {
    id: 3,
    name: 'Fizika',
    courses: 10,
    students: 120,
    completionRate: 82,
    rating: 4.6,
    revenue: 6000000,
    colorClass: 'bg-purple-500'
  },
  {
    id: 4,
    name: 'Kimyo',
    courses: 8,
    students: 100,
    completionRate: 80,
    rating: 4.5,
    revenue: 5000000,
    colorClass: 'bg-green-500'
  },
  {
    id: 5,
    name: 'Tarix',
    courses: 6,
    students: 80,
    completionRate: 75,
    rating: 4.4,
    revenue: 4000000,
    colorClass: 'bg-red-500'
  }
]);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(amount) + ' UZS';
};

const getActivityIconClass = (type) => {
  const classes = {
    user: 'bg-blue-100 text-blue-600',
    course: 'bg-purple-100 text-purple-600',
    payment: 'bg-green-100 text-green-600',
    olympiad: 'bg-orange-100 text-orange-600',
    alert: 'bg-red-100 text-red-600'
  };
  return classes[type] || classes.user;
};

const getActivityIcon = (type) => {
  const icons = {
    user: UserPlusIcon,
    course: BookOpenIcon,
    payment: CreditCardIcon,
    olympiad: TrophyIcon,
    alert: BellIcon
  };
  return icons[type] || UserPlusIcon;
};

const getProgressBarClass = (rate) => {
  if (rate >= 80) return 'bg-green-500';
  if (rate >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

const refreshData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    alert('Ma\'lumotlar yangilandi');
  }, 1000);
};
</script>
