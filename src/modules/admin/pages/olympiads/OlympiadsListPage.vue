<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Olimpiadalar</h1>
        <p class="mt-1 text-sm text-gray-600">Barcha olimpiadalarni boshqarish</p>
      </div>
      <button
        @click="navigateToCreate"
        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <PlusIcon class="h-5 w-5" />
        Yangi olimpiada
      </button>
    </div>

    <!-- Summary Stats -->
    <div v-if="summary" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-sm text-gray-600">Jami olimpiadalar</p>
        <p class="mt-2 text-2xl font-bold text-gray-900">{{ summary.totalOlympiads }}</p>
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-sm text-gray-600">Yaqinlashayotgan</p>
        <p class="mt-2 text-2xl font-bold text-blue-600">{{ summary.upcoming }}</p>
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-sm text-gray-600">Tugallangan</p>
        <p class="mt-2 text-2xl font-bold text-green-600">{{ summary.completed }}</p>
      </div>
      <div class="rounded-xl border border-gray-200 bg-white p-4">
        <p class="text-sm text-gray-600">Jami daromad</p>
        <p class="mt-2 text-2xl font-bold text-purple-600">{{ formatCurrency(summary.totalRevenue) }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-xl border border-gray-200 bg-white p-6">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Turi</label>
          <select v-model="filters.type" @change="applyFilters" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option :value="null">Barchasi</option>
            <option value="public">Ommaviy</option>
            <option value="platform">Platform</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Holati</label>
          <select v-model="filters.status" @change="applyFilters" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option :value="null">Barchasi</option>
            <option value="upcoming">Yaqinlashayotgan</option>
            <option value="ongoing">Davom etayotgan</option>
            <option value="completed">Tugallangan</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Yo'nalish</label>
          <select v-model="filters.direction" @change="applyFilters" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option :value="null">Barchasi</option>
            <option value="dir-1">Matematika</option>
            <option value="dir-2">Ingliz tili</option>
            <option value="dir-3">Dasturlash</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Qidirish</label>
          <input
            v-model="filters.search"
            @input="applyFilters"
            type="text"
            placeholder="Olimpiada nomi..."
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="mt-4 flex gap-2">
        <button
          @click="clearFilters"
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Tozalash
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>

    <!-- Olympiads Table -->
    <div v-else-if="olympiads.length > 0" class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Olimpiada</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Turi</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Holati</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Ishtirokchilar</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Daromad</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Sana</th>
            <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Harakatlar</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="olympiad in olympiads" :key="olympiad.id" class="hover:bg-gray-50">
            <td class="whitespace-nowrap px-6 py-4">
              <div class="flex items-center">
                <div>
                  <div class="font-medium text-gray-900">{{ olympiad.title }}</div>
                  <div class="text-sm text-gray-500">{{ olympiad.direction }}</div>
                </div>
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <span
                :class="olympiad.olympiadType === 'public' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'"
                class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
              >
                {{ olympiad.olympiadType === 'public' ? 'Ommaviy' : 'Platform' }}
              </span>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
              <span
                :class="getStatusClass(olympiad.status)"
                class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
              >
                {{ getStatusText(olympiad.status) }}
              </span>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
              {{ olympiad.currentParticipants }}{{ olympiad.maxParticipants ? ` / ${olympiad.maxParticipants}` : '' }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
              {{ formatCurrency(olympiad.stats?.totalRevenue || 0) }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ formatDate(olympiad.startDate) }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
              <div class="flex justify-end gap-2">
                <button
                  @click="viewOlympiad(olympiad.id)"
                  class="text-blue-600 hover:text-blue-900"
                  title="Ko'rish"
                >
                  <EyeIcon class="h-5 w-5" />
                </button>
                <button
                  @click="editOlympiad(olympiad.id)"
                  class="text-gray-600 hover:text-gray-900"
                  title="Tahrirlash"
                >
                  <PencilIcon class="h-5 w-5" />
                </button>
                <button
                  @click="deleteOlympiad(olympiad.id)"
                  class="text-red-600 hover:text-red-900"
                  title="O'chirish"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="rounded-xl border border-gray-200 bg-white p-12 text-center">
      <TrophyIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">Olimpiadalar topilmadi</h3>
      <p class="mt-2 text-sm text-gray-500">Yangi olimpiada yarating yoki filterlarni o'zgartiring</p>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Jami: <span class="font-medium">{{ pagination.total }}</span> ta olimpiada
      </div>
      <div class="flex gap-2">
        <button
          @click="previousPage"
          :disabled="pagination.page === 1"
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Oldingi
        </button>
        <span class="flex items-center px-4 text-sm text-gray-700">
          {{ pagination.page }} / {{ pagination.totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="pagination.page === pagination.totalPages"
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Keyingi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useOlympiadsStore } from '../../stores/olympiads';
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const olympiadsStore = useOlympiadsStore();

const olympiads = computed(() => olympiadsStore.olympiadsList);
const loading = computed(() => olympiadsStore.isLoading);
const summary = computed(() => olympiadsStore.summary);
const pagination = computed(() => olympiadsStore.pagination);

const filters = ref({
  type: null,
  status: null,
  direction: null,
  search: ''
});

onMounted(() => {
  olympiadsStore.fetchOlympiads();
});

const applyFilters = () => {
  olympiadsStore.setFilters(filters.value);
};

const clearFilters = () => {
  filters.value = {
    type: null,
    status: null,
    direction: null,
    search: ''
  };
  olympiadsStore.clearFilters();
};

const previousPage = () => {
  if (pagination.value.page > 1) {
    olympiadsStore.setPage(pagination.value.page - 1);
  }
};

const nextPage = () => {
  if (pagination.value.page < pagination.value.totalPages) {
    olympiadsStore.setPage(pagination.value.page + 1);
  }
};

const navigateToCreate = () => {
  router.push({ name: 'admin.olympiads.create' });
};

const viewOlympiad = (id) => {
  router.push({ name: 'admin.olympiads.detail', params: { id } });
};

const editOlympiad = (id) => {
  router.push({ name: 'admin.olympiads.edit', params: { id } });
};

const deleteOlympiad = async (id) => {
  if (confirm('Haqiqatan ham bu olimpiadani o\'chirmoqchimisiz?')) {
    await olympiadsStore.deleteOlympiad(id);
  }
};

const getStatusClass = (status) => {
  const classes = {
    upcoming: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return classes[status] || classes.upcoming;
};

const getStatusText = (status) => {
  const texts = {
    upcoming: 'Kutilmoqda',
    ongoing: 'Davom etmoqda',
    completed: 'Tugallangan',
    cancelled: 'Bekor qilingan'
  };
  return texts[status] || status;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>
