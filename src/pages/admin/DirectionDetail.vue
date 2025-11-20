<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Breadcrumb -->
        <nav class="flex mb-4 text-sm">
          <router-link
            to="/admin"
            class="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Admin
          </router-link>
          <span class="mx-2 text-gray-400">/</span>
          <router-link
            to="/admin/directions"
            class="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Yo'nalishlar
          </router-link>
          <span class="mx-2 text-gray-400">/</span>
          <span class="text-gray-600">{{ direction?.name || 'Yuklanmoqda...' }}</span>
        </nav>

        <!-- Title and actions -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center gap-3">
            <!-- Direction icon -->
            <div
              v-if="direction"
              :style="{ backgroundColor: direction.color || '#3B82F6' }"
              class="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl shadow-md"
            >
              {{ direction.icon || '📚' }}
            </div>

            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ direction?.name }}</h1>
              <p v-if="direction?.description" class="text-gray-600 mt-1">
                {{ direction.description }}
              </p>
            </div>
          </div>

          <!-- Add course button -->
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Kurs qo'shish
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Statistics cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">Jami kurslar</p>
          <p class="text-3xl font-bold text-gray-900">{{ courses.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">Aktiv kurslar</p>
          <p class="text-3xl font-bold text-green-600">{{ activeCourses.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">Qoralama</p>
          <p class="text-3xl font-bold text-yellow-600">{{ draftCourses.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-sm text-gray-600 mb-1">O'quvchilar</p>
          <p class="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Status:</label>
            <select
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Barchasi</option>
              <option value="active">Aktiv</option>
              <option value="draft">Qoralama</option>
              <option value="inactive">Faol emas</option>
              <option value="archived">Arxiv</option>
            </select>
          </div>

          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Daraja:</label>
            <select
              v-model="filters.level"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Barchasi</option>
              <option value="beginner">Boshlang'ich</option>
              <option value="elementary">Elementar</option>
              <option value="intermediate">O'rta</option>
              <option value="advanced">Yuqori</option>
              <option value="expert">Ekspert</option>
            </select>
          </div>

          <div class="flex-1 min-w-[300px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Qidirish:</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Kurs qidirish..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <svg
          class="w-12 h-12 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-red-700 font-medium mb-4">{{ error }}</p>
        <button
          @click="loadData"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Qayta urinish
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="filteredCourses.length === 0 && courses.length === 0"
        class="bg-white rounded-lg shadow p-12 text-center"
      >
        <svg
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Hozircha kurslar mavjud emas
        </h3>
        <p class="text-gray-600 mb-6">
          Birinchi kursni qo'shish uchun yuqoridagi tugmani bosing
        </p>
        <button
          @click="openCreateModal"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Birinchi kursni yaratish
        </button>
      </div>

      <!-- No results from filters -->
      <div
        v-else-if="filteredCourses.length === 0"
        class="bg-white rounded-lg shadow p-12 text-center"
      >
        <svg
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Hech narsa topilmadi
        </h3>
        <p class="text-gray-600 mb-6">
          Qidiruv yoki filtrlar bo'yicha hech qanday kurs topilmadi
        </p>
        <button
          @click="clearFilters"
          class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Filtrlarni tozalash
        </button>
      </div>

      <!-- Courses grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          @view="viewCourse"
          @edit="editCourse"
          @delete="confirmDeleteCourse"
        />
      </div>
    </div>

    <!-- Create/Edit Course Modal -->
    <CreateCourseModal
      :is-open="isModalOpen"
      :course="selectedCourse"
      :direction-id="directionId"
      :teachers="teachers"
      @close="closeModal"
      @success="handleCourseSuccess"
    />

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isDeleteModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-50"
            @click="isDeleteModalOpen = false"
          ></div>
          <div
            class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            @click.stop
          >
            <h3 class="text-lg font-semibold mb-4">Kursni o'chirish</h3>
            <p class="text-gray-600 mb-6">
              Haqiqatan ham "{{ courseToDelete?.name }}" kursini o'chirmoqchimisiz?
              Bu amalni bekor qilib bo'lmaydi.
            </p>
            <div class="flex gap-3 justify-end">
              <button
                @click="isDeleteModalOpen = false"
                :disabled="deleting"
                class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Bekor qilish
              </button>
              <button
                @click="deleteCourse"
                :disabled="deleting"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <svg
                  v-if="deleting"
                  class="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{ deleting ? "O'chirilmoqda..." : "O'chirish" }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Notification -->
    <Notification
      :show="notification.show"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      @close="notification.show = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDirectionsStore } from '@/stores/directions.store';
import { useCoursesStore } from '@/stores/courses.store';
import CourseCard from '@/components/courses/CourseCard.vue';
import CreateCourseModal from '@/components/courses/CreateCourseModal.vue';
import Notification from '@/components/common/Notification.vue';

const route = useRoute();
const router = useRouter();

// 🔧 FIX: Ensure stores are properly initialized
// This fixes SPA navigation issue where store actions might not be available
let directionsStore = useDirectionsStore();
let coursesStore = useCoursesStore();

// 🔧 Defensive check: Verify store has required methods
const ensureStoreReady = () => {
  // Re-initialize stores if methods are missing (HMR/timing issue)
  if (typeof directionsStore?.fetchDirectionById !== 'function') {
    console.warn('⚠️ [DirectionDetail] Directions store not ready, re-initializing...');
    directionsStore = useDirectionsStore();
  }
  if (typeof coursesStore?.fetchCoursesByDirection !== 'function') {
    console.warn('⚠️ [DirectionDetail] Courses store not ready, re-initializing...');
    coursesStore = useCoursesStore();
  }

  // Final verification
  const isReady = typeof directionsStore?.fetchDirectionById === 'function' &&
                  typeof coursesStore?.fetchCoursesByDirection === 'function';

  if (!isReady) {
    console.error('❌ [DirectionDetail] Store methods still missing after re-init:', {
      directionsStore: Object.keys(directionsStore || {}).filter(k => typeof directionsStore?.[k] === 'function'),
      coursesStore: Object.keys(coursesStore || {}).filter(k => typeof coursesStore?.[k] === 'function')
    });
  }

  return isReady;
};

// Get direction ID from route
const directionId = computed(() => parseInt(route.params.id));

// Get data from stores
const direction = computed(() => directionsStore.currentDirection);
const courses = computed(() => coursesStore.getCoursesByDirection(directionId.value));

// 🔧 FIX: Properly check loading state
// directionsStore.loading is an object, not a boolean
// We need to check if ANY of its properties are true
const loading = computed(() => {
  // Use the store's isLoading getter which properly checks the loading object
  const directionsLoading = directionsStore.isLoading || false;
  const coursesLoading = coursesStore.loading || false;

  console.log('🔍 [DirectionDetail] Loading states:', {
    directionsLoading,
    coursesLoading,
    combined: directionsLoading || coursesLoading
  });

  return directionsLoading || coursesLoading;
});

const error = computed(() => directionsStore.error || coursesStore.error);

// Filters
const filters = reactive({
  status: '',
  level: '',
  search: ''
});

const filteredCourses = computed(() => {
  let result = courses.value;

  if (filters.status) {
    result = result.filter((c) => c.status === filters.status);
  }

  if (filters.level) {
    result = result.filter((c) => c.level === filters.level);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description?.toLowerCase().includes(search)
    );
  }

  return result;
});

const clearFilters = () => {
  filters.status = '';
  filters.level = '';
  filters.search = '';
};

// Statistics
const activeCourses = computed(() => courses.value.filter((c) => c.status === 'active'));
const draftCourses = computed(() => courses.value.filter((c) => c.status === 'draft'));

// Modal state
const isModalOpen = ref(false);
const selectedCourse = ref(null);
const teachers = ref([]); // TODO: Load from API

const openCreateModal = () => {
  selectedCourse.value = null;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCourse.value = null;
};

// Delete confirmation
const isDeleteModalOpen = ref(false);
const courseToDelete = ref(null);
const deleting = ref(false);

const confirmDeleteCourse = (course) => {
  courseToDelete.value = course;
  isDeleteModalOpen.value = true;
};

const deleteCourse = async () => {
  if (!courseToDelete.value) return;

  deleting.value = true;
  try {
    await coursesStore.deleteCourse(courseToDelete.value.id);
    showNotification('success', 'Muvaffaqiyatli', "Kurs o'chirildi");
    isDeleteModalOpen.value = false;
    courseToDelete.value = null;
  } catch (error) {
    showNotification('error', 'Xatolik', error.message);
  } finally {
    deleting.value = false;
  }
};

// Notifications
const notification = reactive({
  show: false,
  type: 'info',
  title: '',
  message: ''
});

const showNotification = (type, title, message) => {
  notification.type = type;
  notification.title = title;
  notification.message = message;
  notification.show = true;
};

// Actions
const viewCourse = (course) => {
  router.push(`/admin/courses/${course.id}`);
};

const editCourse = (course) => {
  selectedCourse.value = course;
  isModalOpen.value = true;
};

const handleCourseSuccess = (course) => {
  const isNew = !selectedCourse.value;
  showNotification(
    'success',
    'Muvaffaqiyatli',
    isNew ? "Yangi kurs qo'shildi" : 'Kurs yangilandi'
  );
};

// 🚨 CRITICAL: Load data on mount
const loadData = async () => {
  try {
    const id = directionId.value;

    console.log(`🚀 [DirectionDetail] Loading data for direction: ${id}`);

    // 🔧 FIX: Ensure stores are ready before using them
    if (!ensureStoreReady()) {
      const errorMsg = 'Store\'lar tayyor emas. Iltimos, sahifani yangilang (F5).';
      console.error(`❌ [DirectionDetail] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    // Validate direction ID
    if (!id || isNaN(id)) {
      const errorMsg = 'Noto\'g\'ri yo\'nalish ID';
      console.error(`❌ [DirectionDetail] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    // Load direction info
    console.log(`📥 [DirectionDetail] Fetching direction info...`);
    await directionsStore.fetchDirectionById(id);

    if (!directionsStore.currentDirection) {
      const errorMsg = 'Yo\'nalish topilmadi';
      console.error(`❌ [DirectionDetail] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    console.log(`✅ [DirectionDetail] Direction loaded: ${directionsStore.currentDirection.name}`);

    // Load courses for this direction
    console.log(`📚 [DirectionDetail] Fetching courses...`);
    await coursesStore.fetchCoursesByDirection(id);

    console.log(`✅ [DirectionDetail] Data loaded successfully`);
    console.log(`   - Direction: ${directionsStore.currentDirection.name}`);
    console.log(`   - Courses: ${courses.value.length}`);

    // TODO: Load teachers
    // teachers.value = await teachersApi.getAll();
  } catch (error) {
    console.error('❌ [DirectionDetail] Error loading data:', error);
    console.error('❌ [DirectionDetail] Error details:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });

    // Ensure error is set for UI display
    if (!directionsStore.error && !coursesStore.error) {
      // Manually set error if stores didn't set it
      directionsStore.error = error.message || 'Ma\'lumotlarni yuklashda xatolik yuz berdi';
    }

    // Show notification to user
    showNotification('error', 'Xatolik', error.message || 'Ma\'lumotlarni yuklashda xatolik yuz berdi');
  }
};

onMounted(() => {
  console.log(`🎬 [DirectionDetail] Component mounted, route params:`, route.params);

  // 🔧 Enhanced diagnostic logging
  console.log('🔍 [DirectionDetail] Store diagnostic info:');
  console.log('   - Directions store exists:', !!directionsStore);
  console.log('   - Directions store ID:', directionsStore?.$id);
  console.log('   - fetchDirectionById type:', typeof directionsStore?.fetchDirectionById);
  console.log('   - Courses store exists:', !!coursesStore);
  console.log('   - Courses store ID:', coursesStore?.$id);
  console.log('   - fetchCoursesByDirection type:', typeof coursesStore?.fetchCoursesByDirection);

  loadData();
});

// 🔧 HMR: Accept hot module replacement for this component
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('🔥 [DirectionDetail] HMR triggered - stores will be re-initialized on next use');
  });
}
</script>

<style scoped>
/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
