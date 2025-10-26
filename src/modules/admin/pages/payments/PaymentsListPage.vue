<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">To'lovlar</h1>
        <p class="mt-1 text-sm text-gray-600">Barcha to'lovlar tarixi va monitoring</p>
      </div>
      <div class="flex gap-3">
        <button @click="exportPayments" class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <ArrowDownTrayIcon class="h-5 w-5" />
          Export
        </button>
        <button @click="refreshData" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <ArrowPathIcon :class="{'animate-spin': loading}" class="h-5 w-5" />
          Yangilash
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-100">Jami daromad</p>
            <p class="mt-2 text-3xl font-bold">{{ formatCurrency(stats.totalRevenue) }}</p>
            <p class="mt-2 text-xs text-green-100">+12% o'tgan oyga nisbatan</p>
          </div>
          <CurrencyDollarIcon class="h-12 w-12 text-green-200" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Bugungi daromad</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ formatCurrency(stats.todayRevenue) }}</p>
            <p class="mt-2 text-xs text-gray-500">{{ stats.todayPayments }} ta to'lov</p>
          </div>
          <CalendarIcon class="h-12 w-12 text-blue-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Muvaffaqiyatli</p>
            <p class="mt-2 text-3xl font-bold text-green-600">{{ stats.successfulPayments }}</p>
            <p class="mt-2 text-xs text-gray-500">{{ stats.successRate }}% muvaffaqiyat</p>
          </div>
          <CheckCircleIcon class="h-12 w-12 text-green-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Kutilmoqda</p>
            <p class="mt-2 text-3xl font-bold text-yellow-600">{{ stats.pendingPayments }}</p>
            <p class="mt-2 text-xs text-gray-500">{{ formatCurrency(stats.pendingAmount) }}</p>
          </div>
          <ClockIcon class="h-12 w-12 text-yellow-400" />
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Qidiruv</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Transaction ID yoki foydalanuvchi..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="filters.status"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="success">Muvaffaqiyatli</option>
            <option value="pending">Kutilmoqda</option>
            <option value="failed">Bekor qilingan</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">To'lov turi</label>
          <select
            v-model="filters.type"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="subscription">Obuna</option>
            <option value="course">Kurs</option>
            <option value="olympiad">Olimpiada</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sana</label>
          <input
            v-model="filters.date"
            type="date"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Tozalash
          </button>
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Foydalanuvchi
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mahsulot
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summa
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sana
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm font-mono font-medium text-gray-900">{{ payment.transactionId }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="payment.user.avatar" :alt="payment.user.name" class="h-8 w-8 rounded-full" />
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ payment.user.name }}</div>
                    <div class="text-xs text-gray-500">{{ payment.user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ payment.product.name }}</div>
                <div class="text-xs text-gray-500">{{ getTypeLabel(payment.product.type) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">{{ formatCurrency(payment.amount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(payment.status)" class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold">
                  <component :is="getStatusIcon(payment.status)" class="h-3 w-3" />
                  {{ getStatusLabel(payment.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(payment.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="viewPayment(payment)" class="text-blue-600 hover:text-blue-900">
                  <EyeIcon class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Ko'rsatilmoqda <span class="font-medium">{{ startIndex }}</span> dan <span class="font-medium">{{ endIndex }}</span> gacha, jami <span class="font-medium">{{ filteredPayments.length }}</span>
          </div>
          <div class="flex gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Oldingi
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage >= totalPages"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Keyingi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  EyeIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline';

const loading = ref(false);

// Mock data
const payments = ref([
  {
    id: 1,
    transactionId: 'TXN-2024-001234',
    user: {
      name: 'Aziz Rahimov',
      email: 'aziz@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AR'
    },
    product: {
      name: 'Premium obuna - 3 oy',
      type: 'subscription'
    },
    amount: 150000,
    status: 'success',
    createdAt: '2024-10-26T10:30:00Z'
  },
  {
    id: 2,
    transactionId: 'TXN-2024-001235',
    user: {
      name: 'Dilnoza Karimova',
      email: 'dilnoza@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK'
    },
    product: {
      name: 'Matematika kursi',
      type: 'course'
    },
    amount: 200000,
    status: 'success',
    createdAt: '2024-10-26T09:15:00Z'
  },
  {
    id: 3,
    transactionId: 'TXN-2024-001236',
    user: {
      name: 'Bobur Aliev',
      email: 'bobur@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BA'
    },
    product: {
      name: 'Bahorgi olimpiada',
      type: 'olympiad'
    },
    amount: 50000,
    status: 'pending',
    createdAt: '2024-10-26T08:45:00Z'
  },
  {
    id: 4,
    transactionId: 'TXN-2024-001237',
    user: {
      name: 'Malika Tosheva',
      email: 'malika@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT'
    },
    product: {
      name: 'Fizika kursi',
      type: 'course'
    },
    amount: 180000,
    status: 'success',
    createdAt: '2024-10-25T16:20:00Z'
  },
  {
    id: 5,
    transactionId: 'TXN-2024-001238',
    user: {
      name: 'Jasur Umarov',
      email: 'jasur@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JU'
    },
    product: {
      name: 'Standard obuna - 1 oy',
      type: 'subscription'
    },
    amount: 75000,
    status: 'failed',
    createdAt: '2024-10-25T14:10:00Z'
  },
  {
    id: 6,
    transactionId: 'TXN-2024-001239',
    user: {
      name: 'Sarvar Yusupov',
      email: 'sarvar@example.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SY'
    },
    product: {
      name: 'Kimyo kursi',
      type: 'course'
    },
    amount: 190000,
    status: 'success',
    createdAt: '2024-10-25T11:30:00Z'
  }
]);

const filters = ref({
  search: '',
  status: '',
  type: '',
  date: ''
});

const currentPage = ref(1);
const itemsPerPage = 10;

const stats = computed(() => {
  const successPayments = payments.value.filter(p => p.status === 'success');
  const pendingPayments = payments.value.filter(p => p.status === 'pending');
  const todayPayments = payments.value.filter(p => {
    const paymentDate = new Date(p.createdAt).toDateString();
    const today = new Date().toDateString();
    return paymentDate === today;
  });

  return {
    totalRevenue: successPayments.reduce((sum, p) => sum + p.amount, 0),
    todayRevenue: todayPayments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0),
    todayPayments: todayPayments.length,
    successfulPayments: successPayments.length,
    successRate: Math.round((successPayments.length / payments.value.length) * 100),
    pendingPayments: pendingPayments.length,
    pendingAmount: pendingPayments.reduce((sum, p) => sum + p.amount, 0)
  };
});

const filteredPayments = computed(() => {
  let result = payments.value;

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    result = result.filter(p =>
      p.transactionId.toLowerCase().includes(search) ||
      p.user.name.toLowerCase().includes(search) ||
      p.user.email.toLowerCase().includes(search)
    );
  }

  if (filters.value.status) {
    result = result.filter(p => p.status === filters.value.status);
  }

  if (filters.value.type) {
    result = result.filter(p => p.product.type === filters.value.type);
  }

  if (filters.value.date) {
    result = result.filter(p => {
      const paymentDate = new Date(p.createdAt).toISOString().split('T')[0];
      return paymentDate === filters.value.date;
    });
  }

  return result;
});

const totalPages = computed(() => Math.ceil(filteredPayments.value.length / itemsPerPage));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage, filteredPayments.value.length));

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(amount) + ' UZS';
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

const getStatusBadgeClass = (status) => {
  const classes = {
    success: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  };
  return classes[status] || classes.pending;
};

const getStatusLabel = (status) => {
  const labels = {
    success: 'Muvaffaqiyatli',
    pending: 'Kutilmoqda',
    failed: 'Bekor qilingan'
  };
  return labels[status] || status;
};

const getStatusIcon = (status) => {
  const icons = {
    success: CheckCircleIcon,
    pending: ClockIcon,
    failed: XCircleIcon
  };
  return icons[status] || ClockIcon;
};

const getTypeLabel = (type) => {
  const labels = {
    subscription: 'Obuna',
    course: 'Kurs',
    olympiad: 'Olimpiada'
  };
  return labels[type] || type;
};

const resetFilters = () => {
  filters.value = {
    search: '',
    status: '',
    type: '',
    date: ''
  };
  currentPage.value = 1;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const refreshData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    alert('Ma\'lumotlar yangilandi');
  }, 1000);
};

const exportPayments = () => {
  alert('To\'lovlar eksport funksiyasi tez orada qo\'shiladi');
};

const viewPayment = (payment) => {
  alert(`To'lov ${payment.transactionId} haqida batafsil ma'lumot tez orada qo'shiladi`);
};
</script>
