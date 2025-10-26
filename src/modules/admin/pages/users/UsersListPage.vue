<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Foydalanuvchilar</h1>
        <p class="mt-1 text-sm text-gray-600">Barcha foydalanuvchilarni boshqarish va monitoring</p>
      </div>
      <button @click="openCreateModal" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        <UserPlusIcon class="h-5 w-5" />
        Foydalanuvchi qo'shish
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Qidiruv</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Ism yoki email..."
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Rol</label>
          <select
            v-model="filters.role"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="student">O'quvchi</option>
            <option value="teacher">O'qituvchi</option>
            <option value="admin">Admin</option>
          </select>
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
            <option value="blocked">Bloklangan</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Tozalash
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-blue-50 p-6 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-600">Jami foydalanuvchilar</p>
            <p class="mt-2 text-3xl font-bold text-blue-900">{{ stats.total }}</p>
          </div>
          <UsersIcon class="h-12 w-12 text-blue-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-green-50 p-6 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-600">Aktiv</p>
            <p class="mt-2 text-3xl font-bold text-green-900">{{ stats.active }}</p>
          </div>
          <CheckCircleIcon class="h-12 w-12 text-green-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-purple-50 p-6 border border-purple-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-600">O'quvchilar</p>
            <p class="mt-2 text-3xl font-bold text-purple-900">{{ stats.students }}</p>
          </div>
          <AcademicCapIcon class="h-12 w-12 text-purple-400" />
        </div>
      </div>
      <div class="rounded-2xl bg-orange-50 p-6 border border-orange-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-600">O'qituvchilar</p>
            <p class="mt-2 text-3xl font-bold text-orange-900">{{ stats.teachers }}</p>
          </div>
          <UserGroupIcon class="h-12 w-12 text-orange-400" />
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Foydalanuvchi
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ro'yxatdan o'tgan
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Oxirgi faoliyat
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="user.avatar" :alt="user.fullName" class="h-10 w-10 rounded-full" />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.fullName }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getRoleBadgeClass(user.role)" class="inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(user.status)" class="inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                  {{ getStatusLabel(user.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastActivity) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900">
                    <PencilIcon class="h-5 w-5" />
                  </button>
                  <button @click="toggleUserStatus(user)" class="text-gray-600 hover:text-gray-900">
                    <LockClosedIcon v-if="user.status === 'active'" class="h-5 w-5" />
                    <LockOpenIcon v-else class="h-5 w-5" />
                  </button>
                  <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Ko'rsatilmoqda <span class="font-medium">{{ startIndex }}</span> dan <span class="font-medium">{{ endIndex }}</span> gacha, jami <span class="font-medium">{{ filteredUsers.length }}</span>
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
import { ref, computed, onMounted } from 'vue';
import {
  UsersIcon,
  UserPlusIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon
} from '@heroicons/vue/24/outline';

// Mock data
const users = ref([
  {
    id: 1,
    fullName: 'Aziz Rahimov',
    email: 'aziz@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AR',
    role: 'student',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastActivity: '2024-10-26T08:20:00Z'
  },
  {
    id: 2,
    fullName: 'Dilnoza Karimova',
    email: 'dilnoza@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DK',
    role: 'teacher',
    status: 'active',
    createdAt: '2024-02-10T14:20:00Z',
    lastActivity: '2024-10-25T15:40:00Z'
  },
  {
    id: 3,
    fullName: 'Bobur Aliev',
    email: 'bobur@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BA',
    role: 'student',
    status: 'active',
    createdAt: '2024-03-05T09:15:00Z',
    lastActivity: '2024-10-26T12:00:00Z'
  },
  {
    id: 4,
    fullName: 'Malika Tosheva',
    email: 'malika@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT',
    role: 'teacher',
    status: 'active',
    createdAt: '2024-01-20T11:45:00Z',
    lastActivity: '2024-10-24T17:30:00Z'
  },
  {
    id: 5,
    fullName: 'Jasur Umarov',
    email: 'jasur@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JU',
    role: 'student',
    status: 'inactive',
    createdAt: '2024-04-12T08:00:00Z',
    lastActivity: '2024-09-15T10:20:00Z'
  },
  {
    id: 6,
    fullName: 'Nodira Ahmedova',
    email: 'nodira@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NA',
    role: 'admin',
    status: 'active',
    createdAt: '2023-12-01T10:00:00Z',
    lastActivity: '2024-10-26T09:45:00Z'
  },
  {
    id: 7,
    fullName: 'Sarvar Yusupov',
    email: 'sarvar@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SY',
    role: 'student',
    status: 'blocked',
    createdAt: '2024-05-08T13:30:00Z',
    lastActivity: '2024-08-20T14:15:00Z'
  },
  {
    id: 8,
    fullName: 'Zulfiya Normatova',
    email: 'zulfiya@example.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZN',
    role: 'teacher',
    status: 'active',
    createdAt: '2024-02-28T16:10:00Z',
    lastActivity: '2024-10-26T11:20:00Z'
  }
]);

const filters = ref({
  search: '',
  role: '',
  status: ''
});

const currentPage = ref(1);
const itemsPerPage = 10;

const stats = computed(() => ({
  total: users.value.length,
  active: users.value.filter(u => u.status === 'active').length,
  students: users.value.filter(u => u.role === 'student').length,
  teachers: users.value.filter(u => u.role === 'teacher').length
}));

const filteredUsers = computed(() => {
  let result = users.value;

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    result = result.filter(u =>
      u.fullName.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
  }

  if (filters.value.role) {
    result = result.filter(u => u.role === filters.value.role);
  }

  if (filters.value.status) {
    result = result.filter(u => u.status === filters.value.status);
  }

  return result;
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage, filteredUsers.value.length));

const getRoleBadgeClass = (role) => {
  const classes = {
    student: 'bg-blue-100 text-blue-800',
    teacher: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800'
  };
  return classes[role] || classes.student;
};

const getRoleLabel = (role) => {
  const labels = {
    student: 'O\'quvchi',
    teacher: 'O\'qituvchi',
    admin: 'Admin'
  };
  return labels[role] || role;
};

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    blocked: 'bg-red-100 text-red-800'
  };
  return classes[status] || classes.active;
};

const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktiv',
    inactive: 'Noaktiv',
    blocked: 'Bloklangan'
  };
  return labels[status] || status;
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

const resetFilters = () => {
  filters.value = {
    search: '',
    role: '',
    status: ''
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

const openCreateModal = () => {
  alert('Yangi foydalanuvchi qo\'shish funksiyasi tez orada qo\'shiladi');
};

const editUser = (user) => {
  alert(`${user.fullName} ni tahrirlash funksiyasi tez orada qo\'shiladi`);
};

const toggleUserStatus = (user) => {
  const newStatus = user.status === 'active' ? 'blocked' : 'active';
  user.status = newStatus;
  alert(`Foydalanuvchi holati ${getStatusLabel(newStatus)} ga o'zgartirildi`);
};

const deleteUser = (user) => {
  if (confirm(`${user.fullName} ni o'chirishga ishonchingiz komilmi?`)) {
    const index = users.value.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users.value.splice(index, 1);
      alert('Foydalanuvchi muvaffaqiyatli o\'chirildi');
    }
  }
};

onMounted(() => {
  console.log('UsersListPage mounted');
});
</script>
