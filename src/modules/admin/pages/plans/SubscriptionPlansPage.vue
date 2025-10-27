<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Obuna rejalari</h1>
        <p class="mt-1 text-sm text-gray-600">Obuna tariflarini boshqarish va narxlarni sozlash</p>
      </div>
      <button @click="openCreateModal" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        <PlusIcon class="h-5 w-5" />
        Tarif qo'shish
      </button>
    </div>

    <!-- Statistics -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Aktiv obunalar</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ stats.activeSubscriptions }}</p>
          </div>
          <CheckCircleIcon class="h-12 w-12 text-green-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Oylik daromad</p>
            <p class="mt-2 text-3xl font-bold text-green-600">{{ formatCurrency(stats.monthlyRevenue) }}</p>
          </div>
          <CurrencyDollarIcon class="h-12 w-12 text-green-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Jami tariflar</p>
            <p class="mt-2 text-3xl font-bold text-blue-600">{{ stats.totalPlans }}</p>
          </div>
          <TagIcon class="h-12 w-12 text-blue-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Eng mashhur</p>
            <p class="mt-2 text-base font-bold text-purple-600">{{ stats.popularPlan }}</p>
          </div>
          <SparklesIcon class="h-12 w-12 text-purple-400" />
        </div>
      </div>
    </div>

    <!-- Plans Grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <div
        v-for="plan in plans"
        :key="plan.id"
        :class="[
          'rounded-2xl bg-white shadow-sm border-2 overflow-hidden transition-all hover:shadow-lg',
          plan.featured ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
        ]"
      >
        <!-- Featured Badge -->
        <div v-if="plan.featured" class="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-center">
          <p class="text-sm font-semibold text-white">🔥 Eng mashhur</p>
        </div>

        <!-- Plan Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ plan.name }}</h3>
              <p class="mt-1 text-sm text-gray-600">{{ plan.description }}</p>
            </div>
            <span :class="getStatusBadgeClass(plan.status)" class="rounded-full px-3 py-1 text-xs font-semibold">
              {{ getStatusLabel(plan.status) }}
            </span>
          </div>

          <!-- Price -->
          <div class="mt-6">
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-bold text-gray-900">{{ formatPrice(plan.price) }}</span>
              <span class="text-lg text-gray-600">UZS</span>
            </div>
            <p class="mt-1 text-sm text-gray-600">{{ plan.duration }} muddatga</p>
          </div>

          <!-- Subscribers -->
          <div class="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <UsersIcon class="h-4 w-4" />
            <span>{{ plan.subscribersCount }} ta obunachi</span>
          </div>
        </div>

        <!-- Features -->
        <div class="p-6 space-y-3">
          <p class="text-sm font-semibold text-gray-900">Imkoniyatlar:</p>
          <div class="space-y-2">
            <div v-for="(feature, index) in plan.features" :key="index" class="flex items-start gap-2">
              <CheckIcon class="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
              <span class="text-sm text-gray-700">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Limitations (if any) -->
        <div v-if="plan.limitations?.length" class="px-6 pb-6 space-y-3">
          <p class="text-sm font-semibold text-gray-900">Cheklovlar:</p>
          <div class="space-y-2">
            <div v-for="(limitation, index) in plan.limitations" :key="index" class="flex items-start gap-2">
              <XMarkIcon class="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span class="text-sm text-gray-700">{{ limitation }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-6 bg-gray-50 border-t border-gray-200 space-y-3">
          <button @click="editPlan(plan)" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <PencilIcon class="h-4 w-4 inline mr-2" />
            Tahrirlash
          </button>
          <button @click="viewSubscribers(plan)" class="w-full rounded-lg border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
            <EyeIcon class="h-4 w-4 inline mr-2" />
            Obunachilarni ko'rish
          </button>
          <button
            @click="togglePlanStatus(plan)"
            :class="[
              'w-full rounded-lg px-4 py-2 text-sm font-medium',
              plan.status === 'active'
                ? 'border border-red-600 bg-red-50 text-red-600 hover:bg-red-100'
                : 'border border-green-600 bg-green-50 text-green-600 hover:bg-green-100'
            ]"
          >
            <component :is="plan.status === 'active' ? PauseCircleIcon : PlayCircleIcon" class="h-4 w-4 inline mr-2" />
            {{ plan.status === 'active' ? 'Faolsizlantirish' : 'Faollashtirish' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Comparison Table -->
    <div class="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">Tariflar taqqoslash</h2>
        <p class="mt-1 text-sm text-gray-600">Barcha tariflar imkoniyatlarini solishtiring</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xususiyat
              </th>
              <th v-for="plan in plans" :key="plan.id" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ plan.name }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">Narx</td>
              <td v-for="plan in plans" :key="plan.id" class="px-6 py-4 text-center text-sm text-gray-900">
                {{ formatPrice(plan.price) }} UZS
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">Muddat</td>
              <td v-for="plan in plans" :key="plan.id" class="px-6 py-4 text-center text-sm text-gray-900">
                {{ plan.duration }}
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">Obunachilar</td>
              <td v-for="plan in plans" :key="plan.id" class="px-6 py-4 text-center text-sm text-gray-900">
                {{ plan.subscribersCount }}
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">Status</td>
              <td v-for="plan in plans" :key="plan.id" class="px-6 py-4 text-center">
                <span :class="getStatusBadgeClass(plan.status)" class="inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                  {{ getStatusLabel(plan.status) }}
                </span>
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
  PlusIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  TagIcon,
  SparklesIcon,
  UsersIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  EyeIcon,
  PauseCircleIcon,
  PlayCircleIcon
} from '@heroicons/vue/24/outline';

// Mock data
const plans = ref([
  {
    id: 1,
    name: 'Basic',
    description: 'Boshlang\'ich o\'quvchilar uchun',
    price: 50000,
    duration: '1 oy',
    status: 'active',
    featured: false,
    subscribersCount: 45,
    features: [
      'Barcha yo\'nalishlarga kirish',
      '10 ta kursga ruxsat',
      'Asosiy darsliklar',
      'Forum yordami',
      'Sertifikat'
    ],
    limitations: [
      'Premium kurslarga yo\'q',
      'Individual darslar yo\'q',
      'Olimpiadalarga kirish yo\'q'
    ]
  },
  {
    id: 2,
    name: 'Premium',
    description: 'Eng mashhur tanlov',
    price: 150000,
    duration: '3 oy',
    status: 'active',
    featured: true,
    subscribersCount: 120,
    features: [
      'Barcha yo\'nalishlarga kirish',
      'Cheksiz kurslarga kirish',
      'Premium kurslarga kirish',
      'Individual konsultatsiya (2 marta/oy)',
      'Olimpiadalarga kirish',
      'Prioritet qo\'llab-quvvatlash',
      'Sertifikat',
      'Bonus materiallar'
    ],
    limitations: []
  },
  {
    id: 3,
    name: 'Pro',
    description: 'Professional o\'quvchilar uchun',
    price: 300000,
    duration: '6 oy',
    status: 'active',
    featured: false,
    subscribersCount: 75,
    features: [
      'Barcha yo\'nalishlarga kirish',
      'Cheksiz kurslarga kirish',
      'Premium va VIP kurslarga kirish',
      'Individual konsultatsiya (8 marta/oy)',
      'Barcha olimpiadalarga kirish',
      '24/7 qo\'llab-quvvatlash',
      'Maxsus sertifikat',
      'Bonus materiallar va darsliklar',
      'Mentorlik dasturi',
      'Ishga joylashishda yordam'
    ],
    limitations: []
  },
  {
    id: 4,
    name: 'Student',
    description: 'Talabalar uchun maxsus chegirma',
    price: 35000,
    duration: '1 oy',
    status: 'inactive',
    featured: false,
    subscribersCount: 0,
    features: [
      'Barcha yo\'nalishlarga kirish',
      '5 ta kursga ruxsat',
      'Asosiy darsliklar',
      'Talabalar jamoasi',
      'Sertifikat'
    ],
    limitations: [
      'Premium kurslarga yo\'q',
      'Individual darslar yo\'q'
    ]
  }
]);

const stats = computed(() => ({
  activeSubscriptions: plans.value.reduce((sum, p) => sum + (p.status === 'active' ? p.subscribersCount : 0), 0),
  monthlyRevenue: plans.value.reduce((sum, p) => {
    if (p.status === 'active' && p.duration) {
      const durationParts = p.duration.split(' ');
      const months = durationParts.length > 0 ? parseInt(durationParts[0]) : 1;
      if (!isNaN(months) && months > 0) {
        return sum + (p.price / months) * p.subscribersCount;
      }
    }
    return sum;
  }, 0),
  totalPlans: plans.value.length,
  popularPlan: plans.value.find(p => p.featured)?.name || 'Premium'
}));

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800'
  };
  return classes[status] || classes.active;
};

const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktiv',
    inactive: 'Noaktiv'
  };
  return labels[status] || status;
};

const openCreateModal = () => {
  alert('Yangi tarif qo\'shish funksiyasi tez orada qo\'shiladi');
};

const editPlan = (plan) => {
  alert(`${plan.name} tarifini tahrirlash funksiyasi tez orada qo\'shiladi`);
};

const viewSubscribers = (plan) => {
  alert(`${plan.name} tarifi obunachilarini ko'rish funksiyasi tez orada qo\'shiladi`);
};

const togglePlanStatus = (plan) => {
  plan.status = plan.status === 'active' ? 'inactive' : 'active';
  alert(`Tarif ${getStatusLabel(plan.status)} holatga o'zgartirildi`);
};
</script>
