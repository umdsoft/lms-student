<template>
  <BaseModal
    :show="show"
    title="O'qituvchilarni boshqarish"
    size="lg"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
  >
    <div class="space-y-6">
      <!-- Search and Add Teachers -->
      <div class="rounded-lg bg-blue-50 p-4">
        <h3 class="text-sm font-semibold text-blue-900 mb-3">O'qituvchi qo'shish</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">O'qituvchilarni qidirish</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Ism yoki email bo'yicha qidiring..."
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <!-- Available Teachers List -->
          <div v-if="searchQuery && filteredAvailableTeachers.length > 0" class="max-h-48 overflow-y-auto space-y-2">
            <div
              v-for="teacher in filteredAvailableTeachers"
              :key="teacher.id"
              class="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {{ getInitials(teacher.fullName || teacher.name) }}
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 text-sm">{{ teacher.fullName || teacher.name }}</h4>
                  <p class="text-xs text-gray-600">{{ teacher.email }}</p>
                </div>
              </div>
              <button
                @click="handleAssignTeacher(teacher.id)"
                :disabled="loading"
                class="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Qo'shish
              </button>
            </div>
          </div>
          <div v-else-if="searchQuery" class="text-center py-4 text-sm text-gray-500">
            O'qituvchi topilmadi
          </div>
        </div>
      </div>

      <!-- Assigned Teachers -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Tayinlangan o'qituvchilar ({{ assignedTeachers.length }})</h3>
        <div v-if="assignedTeachers.length === 0" class="text-center py-8 text-gray-500 text-sm">
          Hozircha o'qituvchilar tayinlanmagan
        </div>
        <div v-else class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="teacher in assignedTeachers"
            :key="teacher.id"
            class="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
          >
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {{ getInitials(teacher.fullName || teacher.name) }}
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ teacher.fullName || teacher.name }}</h4>
                <p class="text-sm text-gray-600">{{ teacher.email }}</p>
                <p v-if="teacher.phone" class="text-xs text-gray-500">{{ teacher.phone }}</p>
              </div>
            </div>
            <button
              @click="handleUnassignTeacher(teacher.id)"
              :disabled="loading"
              class="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
              title="Bekor qilish"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        @click="handleClose"
        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Yopish
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDirectionsStore } from '@/stores/directions';
import { push } from 'notivue';
import { TrashIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import BaseModal from '@/components/common/BaseModal.vue';
import usersApi from '@/api/users';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  directionId: {
    type: [String, Number],
    required: true
  },
  assignedTeachers: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:show', 'close']);

const directionsStore = useDirectionsStore();
const loading = ref(false);
const searchQuery = ref('');
const allTeachers = ref([]);

// Helper function
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Computed
const assignedTeacherIds = computed(() => {
  return props.assignedTeachers.map(t => t.id);
});

const availableTeachers = computed(() => {
  return allTeachers.value.filter(t => !assignedTeacherIds.value.includes(t.id));
});

const filteredAvailableTeachers = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  return availableTeachers.value.filter(teacher => {
    const name = (teacher.fullName || teacher.name || '').toLowerCase();
    const email = (teacher.email || '').toLowerCase();
    return name.includes(query) || email.includes(query);
  });
});

// Load all teachers
const loadAllTeachers = async () => {
  try {
    const response = await usersApi.getUsers({ role: 'teacher', limit: 100 });
    if (response?.success) {
      allTeachers.value = response.data || [];
    }
  } catch (error) {
    console.error('Error loading teachers:', error);
  }
};

// Actions
const handleAssignTeacher = async (teacherId) => {
  loading.value = true;
  try {
    await directionsStore.assignTeacher(props.directionId, teacherId);
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'O\'qituvchi muvaffaqiyatli tayinlandi'
    });
    searchQuery.value = '';
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'O\'qituvchi tayinlashda xatolik yuz berdi'
    });
  } finally {
    loading.value = false;
  }
};

const handleUnassignTeacher = async (teacherId) => {
  const confirmed = confirm('Bu o\'qituvchini bekor qilishni xohlaysizmi?');
  if (!confirmed) return;

  loading.value = true;
  try {
    await directionsStore.unassignTeacher(props.directionId, teacherId);
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'O\'qituvchi muvaffaqiyatli bekor qilindi'
    });
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'O\'qituvchini bekor qilishda xatolik yuz berdi'
    });
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  searchQuery.value = '';
  emit('update:show', false);
  emit('close');
};

// Lifecycle
onMounted(() => {
  loadAllTeachers();
});
</script>
