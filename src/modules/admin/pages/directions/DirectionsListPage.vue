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
            v-model="filters.search"
            type="text"
            placeholder="Yo'nalish nomi..."
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
            <option value="active">Aktiv</option>
            <option value="inactive">Noaktiv</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tartib</label>
          <select
            v-model="filters.sort"
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

    <!-- Directions Grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="direction in filteredDirections"
        :key="direction.id"
        class="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <!-- Card Header with gradient -->
        <div :class="direction.colorClass" class="p-6 text-white">
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
              <span>{{ direction.studentsCount }} o'quvchi</span>
            </div>
            <div class="flex items-center gap-1">
              <BookOpenIcon class="h-4 w-4" />
              <span>{{ direction.coursesCount }} kurs</span>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-6 space-y-4">
          <!-- Status -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Status:</span>
            <span :class="getStatusBadgeClass(direction.status)" class="inline-flex rounded-full px-3 py-1 text-xs font-semibold">
              {{ getStatusLabel(direction.status) }}
            </span>
          </div>

          <!-- Subjects -->
          <div>
            <span class="text-sm font-medium text-gray-700">Fanlar:</span>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="subject in direction.subjects"
                :key="subject"
                class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {{ subject }}
              </span>
            </div>
          </div>

          <!-- Teachers -->
          <div>
            <span class="text-sm font-medium text-gray-700">O'qituvchilar:</span>
            <div class="mt-2 flex -space-x-2">
              <img
                v-for="(teacher, index) in direction.teachers.slice(0, 3)"
                :key="index"
                :src="teacher.avatar"
                :alt="teacher.name"
                :title="teacher.name"
                class="h-8 w-8 rounded-full border-2 border-white"
              />
              <div
                v-if="direction.teachers.length > 3"
                class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600"
              >
                +{{ direction.teachers.length - 3 }}
              </div>
            </div>
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
    <div v-if="filteredDirections.length === 0" class="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200">
      <AcademicCapIcon class="mx-auto h-16 w-16 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">Yo'nalishlar topilmadi</h3>
      <p class="mt-2 text-sm text-gray-500">Yangi yo'nalish qo'shish uchun yuqoridagi tugmani bosing</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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
  LanguageIcon
} from '@heroicons/vue/24/outline';

// Mock data
const directions = ref([
  {
    id: 1,
    name: 'Matematika',
    description: 'Aniq fanlar va matematika asoslari',
    icon: 'calculator',
    colorClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
    status: 'active',
    studentsCount: 150,
    coursesCount: 12,
    subjects: ['Algebra', 'Geometriya', 'Statistika', 'Analiz'],
    teachers: [
      { name: 'Dilnoza Karimova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK' },
      { name: 'Malika Tosheva', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT' },
      { name: 'Zulfiya Normatova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZN' }
    ]
  },
  {
    id: 2,
    name: 'Fizika',
    description: 'Fizika va tabiiy fanlar',
    icon: 'beaker',
    colorClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
    status: 'active',
    studentsCount: 120,
    coursesCount: 10,
    subjects: ['Mexanika', 'Optika', 'Elektr', 'Kvant fizika'],
    teachers: [
      { name: 'Dilnoza Karimova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK' },
      { name: 'Malika Tosheva', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT' }
    ]
  },
  {
    id: 3,
    name: 'Kimyo',
    description: 'Kimyo va biologiya asoslari',
    icon: 'beaker',
    colorClass: 'bg-gradient-to-br from-green-500 to-green-600',
    status: 'active',
    studentsCount: 100,
    coursesCount: 8,
    subjects: ['Organik kimyo', 'Noorganik kimyo', 'Biokimyo'],
    teachers: [
      { name: 'Zulfiya Normatova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZN' }
    ]
  },
  {
    id: 4,
    name: 'Ingliz tili',
    description: 'Chet tillari va filologiya',
    icon: 'language',
    colorClass: 'bg-gradient-to-br from-orange-500 to-orange-600',
    status: 'active',
    studentsCount: 200,
    coursesCount: 15,
    subjects: ['Grammar', 'Speaking', 'Writing', 'IELTS'],
    teachers: [
      { name: 'Dilnoza Karimova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK' },
      { name: 'Malika Tosheva', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT' },
      { name: 'Zulfiya Normatova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZN' },
      { name: 'Nodira Ahmedova', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NA' }
    ]
  },
  {
    id: 5,
    name: 'Tarix',
    description: 'Tarix va ijtimoiy fanlar',
    icon: 'globe',
    colorClass: 'bg-gradient-to-br from-red-500 to-red-600',
    status: 'active',
    studentsCount: 80,
    coursesCount: 6,
    subjects: ['O\'zbekiston tarixi', 'Jahon tarixi', 'Arxeologiya'],
    teachers: [
      { name: 'Malika Tosheva', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT' }
    ]
  },
  {
    id: 6,
    name: 'Informatika',
    description: 'IT va dasturlash asoslari',
    icon: 'academic',
    colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    status: 'inactive',
    studentsCount: 0,
    coursesCount: 0,
    subjects: ['Dasturlash', 'Web development', 'Ma\'lumotlar bazasi'],
    teachers: []
  }
]);

const filters = ref({
  search: '',
  status: '',
  sort: 'name'
});

const stats = computed(() => ({
  total: directions.value.length,
  active: directions.value.filter(d => d.status === 'active').length,
  totalStudents: directions.value.reduce((sum, d) => sum + d.studentsCount, 0),
  totalCourses: directions.value.reduce((sum, d) => sum + d.coursesCount, 0)
}));

const filteredDirections = computed(() => {
  let result = directions.value;

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    result = result.filter(d =>
      d.name.toLowerCase().includes(search) ||
      d.description.toLowerCase().includes(search)
    );
  }

  if (filters.value.status) {
    result = result.filter(d => d.status === filters.value.status);
  }

  // Sort
  result = [...result].sort((a, b) => {
    switch (filters.value.sort) {
      case 'students':
        return b.studentsCount - a.studentsCount;
      case 'courses':
        return b.coursesCount - a.coursesCount;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return result;
});

const getIcon = (iconName) => {
  const icons = {
    calculator: CalculatorIcon,
    beaker: BeakerIcon,
    globe: GlobeAltIcon,
    language: LanguageIcon,
    academic: AcademicCapIcon
  };
  return icons[iconName] || AcademicCapIcon;
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

const resetFilters = () => {
  filters.value = {
    search: '',
    status: '',
    sort: 'name'
  };
};

const openCreateModal = () => {
  alert('Yangi yo\'nalish qo\'shish funksiyasi tez orada qo\'shiladi');
};

const editDirection = (direction) => {
  alert(`${direction.name} ni tahrirlash funksiyasi tez orada qo\'shiladi`);
};

const viewDetails = (direction) => {
  alert(`${direction.name} haqida batafsil ma'lumot tez orada qo\'shiladi`);
};
</script>
