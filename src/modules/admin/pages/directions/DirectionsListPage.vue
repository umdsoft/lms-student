<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Yo'nalishlar</h1>
        <p class="mt-1 text-sm text-gray-600">O'quv yo'nalishlari va fanlari boshqaruvi</p>
      </div>
      <button @click="openCreateModal" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        <PlusIcon class="h-5 w-5" />
        Yo'nalish qo'shish
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-100">Jami yo'nalishlar</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.total }}</p>
          </div>
          <AcademicCapIcon class="h-12 w-12 text-blue-200" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Aktiv yo'nalishlar</p>
            <p class="mt-2 text-3xl font-bold text-green-600">{{ stats.active }}</p>
          </div>
          <CheckCircleIcon class="h-12 w-12 text-green-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Jami o'quvchilar</p>
            <p class="mt-2 text-3xl font-bold text-purple-600">{{ stats.totalStudents }}</p>
          </div>
          <UsersIcon class="h-12 w-12 text-purple-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Jami kurslar</p>
            <p class="mt-2 text-3xl font-bold text-orange-600">{{ stats.totalCourses }}</p>
          </div>
          <BookOpenIcon class="h-12 w-12 text-orange-400" />
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Qidiruv</label>
          <input
            :value="directionsStore.filters.search"
            @input="updateSearch($event.target.value)"
            type="text"
            placeholder="Yo'nalish nomi..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            :value="directionsStore.filters.status"
            @change="updateStatus($event.target.value)"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="active">Aktiv</option>
            <option value="inactive">Noaktiv</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tartib</label>
          <select
            :value="directionsStore.filters.sortBy"
            @change="updateSort($event.target.value)"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="name">Nom bo'yicha</option>
            <option value="students">O'quvchilar soni</option>
            <option value="courses">Kurslar soni</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Tozalash
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="directionsStore.loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
        <div class="h-24 bg-gray-200 rounded mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Directions Grid -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="direction in filteredDirections"
        :key="direction.id"
        class="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <!-- Card Header with gradient -->
        <div
          :style="{
            background: direction.colorPrimary
              ? `linear-gradient(to bottom right, ${direction.colorPrimary}, ${direction.colorSecondary || direction.colorPrimary})`
              : 'linear-gradient(to bottom right, #3B82F6, #1D4ED8)'
          }"
          class="p-6 text-white"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-bold">{{ direction.name }}</h3>
              <p class="mt-2 text-sm opacity-90">{{ direction.description }}</p>
            </div>
            <component :is="getIcon(direction.icon)" class="h-10 w-10 opacity-80" />
          </div>
          <div class="mt-4 flex items-center gap-4 text-sm">
            <div class="flex items-center gap-1">
              <UsersIcon class="h-4 w-4" />
              <span>{{ direction.totalStudents || 0 }} o'quvchi</span>
            </div>
            <div class="flex items-center gap-1">
              <BookOpenIcon class="h-4 w-4" />
              <span>{{ direction.totalCourses || 0 }} kurs</span>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-6 space-y-4">
          <!-- Status -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Status:</span>
            <span :class="getStatusBadgeClass(direction.isActive)" class="inline-flex rounded-full px-3 py-1 text-xs font-semibold">
              {{ getStatusLabel(direction.isActive) }}
            </span>
          </div>

          <!-- Display Order -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Tartib raqami:</span>
            <span class="text-sm text-gray-900 font-medium">{{ direction.displayOrder || '-' }}</span>
          </div>

          <!-- Total Topics -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Jami mavzular:</span>
            <span class="text-sm text-gray-900 font-medium">{{ direction.totalTopics || 0 }}</span>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pt-4 border-t border-gray-200">
            <button @click="editDirection(direction)" class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <PencilIcon class="h-4 w-4 inline mr-1" />
              Tahrirlash
            </button>
            <button @click="viewDetails(direction)" class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <EyeIcon class="h-4 w-4 inline mr-1" />
              Ko'rish
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!directionsStore.loading && filteredDirections.length === 0 && !directionsStore.error" class="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200">
      <AcademicCapIcon class="mx-auto h-16 w-16 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">Yo'nalishlar topilmadi</h3>
      <p class="mt-2 text-sm text-gray-500">Yangi yo'nalish qo'shish uchun yuqoridagi tugmani bosing</p>
    </div>

    <!-- Error State -->
    <div v-if="!directionsStore.loading && directionsStore.error" class="rounded-2xl bg-white p-12 text-center shadow-sm border border-red-200">
      <ExclamationCircleIcon class="mx-auto h-16 w-16 text-red-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">Xatolik yuz berdi</h3>
      <p class="mt-2 text-sm text-gray-500">{{ directionsStore.error }}</p>
      <button
        @click="loadDirections"
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Qayta urinish
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDirectionsStore } from '@/stores/directions';
import { push } from 'notivue';
import {
  AcademicCapIcon,
  UsersIcon,
  BookOpenIcon,
  CheckCircleIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  BeakerIcon,
  CalculatorIcon,
  GlobeAltIcon,
  LanguageIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline';

// Router
const router = useRouter();

// Store
const directionsStore = useDirectionsStore();

// Local state
const showFormModal = ref(false);
const showDetailsModal = ref(false);
const selectedDirection = ref(null);
const isEditMode = ref(false);

// Load data on mount
onMounted(async () => {
  await loadDirections();
  await directionsStore.fetchStatistics();
});

// Load directions with error handling
const loadDirections = async () => {
  try {
    await directionsStore.fetchDirections();
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: 'Yo\'nalishlarni yuklashda xatolik yuz berdi'
    });
  }
};

// Watch filters and reload data
watch(
  () => [
    directionsStore.filters.search,
    directionsStore.filters.status,
    directionsStore.filters.sortBy
  ],
  () => {
    loadDirections();
  }
);

// Stats from store
const stats = computed(() => directionsStore.stats);

// Get filtered directions from store
const filteredDirections = computed(() => {
  let result = directionsStore.directions;

  if (directionsStore.filters.search) {
    const search = directionsStore.filters.search.toLowerCase();
    result = result.filter(d =>
      d.name?.toLowerCase().includes(search) ||
      d.description?.toLowerCase().includes(search)
    );
  }

  if (directionsStore.filters.status) {
    const statusFilter = directionsStore.filters.status;
    result = result.filter(d => {
      if (statusFilter === 'active') return d.isActive === true;
      if (statusFilter === 'inactive') return d.isActive === false;
      return true;
    });
  }

  // Sort
  result = [...result].sort((a, b) => {
    switch (directionsStore.filters.sortBy) {
      case 'students':
        return (b.totalStudents || 0) - (a.totalStudents || 0);
      case 'courses':
        return (b.totalCourses || 0) - (a.totalCourses || 0);
      case 'name':
      default:
        return (a.name || '').localeCompare(b.name || '');
    }
  });

  return result;
});

// Icon mapping
const getIcon = (iconName) => {
  const icons = {
    calculator: CalculatorIcon,
    beaker: BeakerIcon,
    globe: GlobeAltIcon,
    language: LanguageIcon,
    academic: AcademicCapIcon,
    'code-bracket': AcademicCapIcon
  };
  return icons[iconName] || AcademicCapIcon;
};

// Get color class based on direction colors
const getColorClass = (direction) => {
  if (direction.colorPrimary) {
    return `bg-gradient-to-br from-[${direction.colorPrimary}] to-[${direction.colorSecondary || direction.colorPrimary}]`;
  }
  return 'bg-gradient-to-br from-blue-500 to-blue-600';
};

// Status badge
const getStatusBadgeClass = (isActive) => {
  return isActive
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (isActive) => {
  return isActive ? 'Aktiv' : 'Noaktiv';
};

// Filters
const updateSearch = (value) => {
  directionsStore.setFilters({ search: value });
};

const updateStatus = (value) => {
  directionsStore.setFilters({ status: value });
};

const updateSort = (value) => {
  directionsStore.setFilters({ sortBy: value });
};

const resetFilters = () => {
  directionsStore.clearFilters();
};

// CRUD operations
const openCreateModal = () => {
  selectedDirection.value = null;
  isEditMode.value = false;
  showFormModal.value = true;
};

const editDirection = (direction) => {
  selectedDirection.value = direction;
  isEditMode.value = true;
  showFormModal.value = true;
};

const viewDetails = async (direction) => {
  // Navigate to direction detail page
  router.push({
    name: 'admin.direction-detail',
    params: { id: direction.id }
  });
};

const handleDelete = async (direction) => {
  if (!confirm(`${direction.name} yo'nalishini o'chirishni xohlaysizmi?`)) {
    return;
  }

  try {
    await directionsStore.deleteDirection(direction.id);
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'Yo\'nalish muvaffaqiyatli o\'chirildi'
    });
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: 'Yo\'nalishni o\'chirishda xatolik yuz berdi'
    });
  }
};
</script>
