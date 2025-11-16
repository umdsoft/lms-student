<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center space-x-2 text-sm text-gray-600">
      <router-link to="/admin" class="hover:text-blue-600">Admin</router-link>
      <span>/</span>
      <router-link to="/admin/directions" class="hover:text-blue-600">Yo'nalishlar</router-link>
      <span>/</span>
      <span class="text-gray-900 font-medium">{{ currentDirection?.name || 'Yuklanmoqda...' }}</span>
    </nav>

    <!-- Loading State -->
    <div v-if="directionsStore.loading.direction" class="space-y-6">
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
        <div class="h-32 bg-gray-200 rounded"></div>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
          <div class="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else-if="currentDirection">
      <!-- Direction Header Card -->
      <div
        :style="{
          background: currentDirection.colorPrimary
            ? `linear-gradient(135deg, ${currentDirection.colorPrimary}, ${currentDirection.colorSecondary || currentDirection.colorPrimary})`
            : 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
        }"
        class="rounded-2xl p-8 text-white shadow-lg"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-4">
              <component :is="getIcon(currentDirection.icon)" class="h-16 w-16 opacity-90" />
              <div>
                <h1 class="text-3xl font-bold">{{ currentDirection.name }}</h1>
                <p class="mt-2 text-lg opacity-90">{{ currentDirection.description }}</p>
              </div>
            </div>

            <!-- Statistics -->
            <div class="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <div class="flex items-center gap-2">
                <UsersIcon class="h-5 w-5" />
                <span class="font-medium">{{ directionStats?.totalStudents || 0 }} o'quvchi</span>
              </div>
              <div class="flex items-center gap-2">
                <BookOpenIcon class="h-5 w-5" />
                <span class="font-medium">{{ directionStats?.totalCourses || 0 }} kurs</span>
              </div>
              <div class="flex items-center gap-2">
                <AcademicCapIcon class="h-5 w-5" />
                <span class="font-medium">{{ directionStats?.totalSubjects || 0 }} fan</span>
              </div>
              <div class="flex items-center gap-2">
                <UserGroupIcon class="h-5 w-5" />
                <span class="font-medium">{{ directionStats?.totalTeachers || 0 }} o'qituvchi</span>
              </div>
            </div>
          </div>

          <!-- Status Badge -->
          <div class="flex flex-col items-end gap-3">
            <span
              :class="currentDirection.isActive ? 'bg-green-500/20 text-green-100 border-green-300/30' : 'bg-gray-500/20 text-gray-100 border-gray-300/30'"
              class="inline-flex rounded-full border px-4 py-2 text-sm font-semibold"
            >
              {{ currentDirection.isActive ? 'Aktiv' : 'Noaktiv' }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex flex-wrap gap-3">
          <button
            @click="handleEditDirection"
            class="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <PencilIcon class="h-4 w-4" />
            Tahrirlash
          </button>
          <button
            @click="handleToggleStatus"
            :disabled="directionsStore.loading.action"
            class="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <component :is="currentDirection.isActive ? XMarkIcon : CheckIcon" class="h-4 w-4" />
            {{ currentDirection.isActive ? 'Deaktivlashtirish' : 'Aktivlashtirish' }}
          </button>
          <button
            @click="handleDeleteDirection"
            :disabled="directionsStore.loading.action"
            class="inline-flex items-center gap-2 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-4 py-2 text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            <TrashIcon class="h-4 w-4" />
            O'chirish
          </button>
        </div>
      </div>

      <!-- Subjects Section -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Fanlar</h2>
          <button
            @click="handleManageSubjects"
            class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon class="h-5 w-5" />
            Fanlari boshqarish
          </button>
        </div>

        <!-- Subjects Loading -->
        <div v-if="directionsStore.loading.subjects" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="rounded-lg bg-gray-100 p-4 animate-pulse">
            <div class="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        <!-- Subjects Grid -->
        <div v-else-if="sortedSubjects.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="subject in sortedSubjects"
            :key="subject.id"
            class="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ subject.name }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ subject.description }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <span class="text-xs text-gray-500">Tartib: {{ subject.displayOrder }}</span>
                  <span
                    v-if="subject.isActive"
                    class="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                  >
                    Aktiv
                  </span>
                </div>
              </div>
              <button
                @click="handleEditSubject(subject)"
                class="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              >
                <PencilIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Subjects Empty State -->
        <div v-else class="py-12 text-center">
          <BookOpenIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-4 text-lg font-medium text-gray-900">Fanlar mavjud emas</h3>
          <p class="mt-2 text-sm text-gray-500">Yo'nalish uchun fanlarni qo'shib boshlang</p>
        </div>
      </div>

      <!-- Teachers Section -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">O'qituvchilar</h2>
          <button
            @click="handleManageTeachers"
            class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon class="h-5 w-5" />
            O'qituvchilarni boshqarish
          </button>
        </div>

        <!-- Teachers Loading -->
        <div v-if="directionsStore.loading.teachers" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="rounded-lg bg-gray-100 p-4 animate-pulse">
            <div class="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        <!-- Teachers Grid -->
        <div v-else-if="assignedTeachers.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="teacher in assignedTeachers"
            :key="teacher.id"
            class="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start gap-3">
              <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {{ getInitials(teacher.fullName || teacher.name) }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 truncate">{{ teacher.fullName || teacher.name }}</h3>
                <p class="text-sm text-gray-600 truncate">{{ teacher.email }}</p>
              </div>
              <button
                @click="handleUnassignTeacher(teacher.id)"
                :disabled="directionsStore.loading.action"
                class="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Teachers Empty State -->
        <div v-else class="py-12 text-center">
          <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-4 text-lg font-medium text-gray-900">O'qituvchilar tayinlanmagan</h3>
          <p class="mt-2 text-sm text-gray-500">Bu yo'nalish uchun o'qituvchilarni tayinlang</p>
        </div>
      </div>

      <!-- Courses Section -->
      <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Kurslar</h2>
          <button
            @click="handleAddCourse"
            class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon class="h-5 w-5" />
            Kurs qo'shish
          </button>
        </div>

        <!-- Courses Loading -->
        <div v-if="directionsStore.loading.courses" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="rounded-lg bg-gray-100 p-4 animate-pulse">
            <div class="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div v-else-if="directionCourses.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="course in directionCourses"
            :key="course.id"
            class="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <!-- Course Thumbnail -->
            <div class="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpenIcon class="h-12 w-12 text-white opacity-80" />
            </div>

            <!-- Course Content -->
            <div class="p-4">
              <h3 class="font-semibold text-gray-900">{{ course.title || course.name }}</h3>
              <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ course.description }}</p>

              <!-- Course Meta -->
              <div class="mt-3 flex items-center justify-between">
                <span
                  :class="course.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                >
                  {{ course.isPublished ? 'Nashr qilingan' : 'Qoralama' }}
                </span>
                <span v-if="course.price" class="text-sm font-medium text-gray-900">
                  {{ formatPrice(course.price) }} so'm
                </span>
              </div>

              <!-- Course Actions -->
              <div class="mt-4 flex gap-2">
                <button
                  @click="handleEditCourse(course)"
                  class="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Tahrirlash
                </button>
                <button
                  @click="handleToggleCourseStatus(course)"
                  :disabled="directionsStore.loading.action"
                  class="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {{ course.isPublished ? 'Yashirish' : 'Nashr qilish' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Courses Empty State -->
        <div v-else class="py-12 text-center">
          <BookOpenIcon class="mx-auto h-16 w-16 text-gray-400" />
          <h3 class="mt-4 text-lg font-medium text-gray-900">Hozircha kurslar mavjud emas</h3>
          <p class="mt-2 text-sm text-gray-500">Bu yo'nalish uchun birinchi kursni yarating</p>
          <button
            @click="handleAddCourse"
            class="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon class="h-5 w-5" />
            Birinchi kursni yarating
          </button>
        </div>
      </div>
    </template>

    <!-- Error State -->
    <div v-else-if="directionsStore.error" class="rounded-2xl bg-white p-12 text-center shadow-sm border border-red-200">
      <ExclamationCircleIcon class="mx-auto h-16 w-16 text-red-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">Xatolik yuz berdi</h3>
      <p class="mt-2 text-sm text-gray-500">{{ directionsStore.error }}</p>
      <button
        @click="loadDirectionData"
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Qayta urinish
      </button>
    </div>

    <!-- Modals (will be implemented next) -->
    <ManageSubjectsModal
      v-model:show="showSubjectsModal"
      :direction-id="directionId"
      :subjects="sortedSubjects"
    />

    <ManageTeachersModal
      v-model:show="showTeachersModal"
      :direction-id="directionId"
      :assigned-teachers="assignedTeachers"
    />

    <CourseFormModal
      v-model:show="showCourseModal"
      :mode="courseModalMode"
      :direction-id="directionId"
      :subjects="sortedSubjects"
      :course="selectedCourse"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDirectionsStore } from '@/stores/directions';
import { push } from 'notivue';
import {
  AcademicCapIcon,
  BookOpenIcon,
  UsersIcon,
  UserGroupIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  BeakerIcon,
  CalculatorIcon,
  GlobeAltIcon,
  LanguageIcon
} from '@heroicons/vue/24/outline';

// Modal Components
import ManageSubjectsModal from "@/modules/admin/components/directions/ManageSubjectsModal.vue";
import ManageTeachersModal from "@/modules/admin/components/directions/ManageTeachersModal.vue";
import CourseFormModal from "@/modules/admin/components/directions/CourseFormModal.vue";

// Router
const route = useRoute();
const router = useRouter();

// Store
const directionsStore = useDirectionsStore();

// Computed properties
const directionId = computed(() => route.params.id);

// Modal state
const showSubjectsModal = ref(false);
const showTeachersModal = ref(false);
const showCourseModal = ref(false);
const courseModalMode = ref("create");
const selectedCourse = ref(null);
const currentDirection = computed(() => directionsStore.currentDirection);
const directionStats = computed(() => directionsStore.directionStats);
const sortedSubjects = computed(() => directionsStore.sortedSubjects);
const assignedTeachers = computed(() => directionsStore.teachers);
const directionCourses = computed(() => directionsStore.courses);

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

// Helper functions
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price);
};

// Load direction data
const loadDirectionData = async () => {
  try {
    await Promise.all([
      directionsStore.fetchDirection(directionId.value),
      directionsStore.fetchSubjects(directionId.value),
      directionsStore.fetchTeachersForDirection(directionId.value),
      directionsStore.fetchCoursesForDirection(directionId.value)
    ]);
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: 'Yo\'nalish ma\'lumotlarini yuklashda xatolik yuz berdi'
    });
  }
};

// Lifecycle
onMounted(() => {
  loadDirectionData();
});

// Direction actions
const handleEditDirection = () => {
  push.info({
    title: 'Xususiyat',
    message: 'Tahrirlash modali keyinchalik qo\'shiladi'
  });
  // TODO: Open edit modal
};

const handleToggleStatus = async () => {
  if (!currentDirection.value) return;

  try {
    await directionsStore.updateDirectionStatus(
      directionId.value,
      currentDirection.value.isActive ? 'inactive' : 'active'
    );
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'Yo\'nalish holati o\'zgartirildi'
    });
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'Holatni o\'zgartirishda xatolik yuz berdi'
    });
  }
};

const handleDeleteDirection = async () => {
  if (!currentDirection.value) return;

  const confirmed = confirm(
    `${currentDirection.value.name} yo'nalishini o'chirishni xohlaysizmi? Bu barcha kurslar va ma'lumotlarni ham o'chiradi.`
  );

  if (!confirmed) return;

  try {
    await directionsStore.deleteDirection(directionId.value);
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'Yo\'nalish muvaffaqiyatli o\'chirildi'
    });
    router.push('/admin/directions');
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'Yo\'nalishni o\'chirishda xatolik yuz berdi'
    });
  }
};

// Subject actions
const handleManageSubjects = () => {
  push.info({
    title: 'Xususiyat',
    message: 'Fanlarni boshqarish modali keyinchalik qo\'shiladi'
  });
  showSubjectsModal.value = true;
};

const handleEditSubject = (subject) => {
  push.info({
    title: 'Xususiyat',
    message: `${subject.name} fanni tahrirlash modali keyinchalik qo\'shiladi`
  });
  // TODO: Open edit subject modal
};

// Teacher actions
const handleManageTeachers = () => {
  push.info({
    title: 'Xususiyat',
    message: 'O\'qituvchilarni boshqarish modali keyinchalik qo\'shiladi'
  });
  showTeachersModal.value = true;
};

const handleUnassignTeacher = async (teacherId) => {
  const confirmed = confirm('Bu o\'qituvchini yo\'nalishdan olib tashlashni xohlaysizmi?');
  if (!confirmed) return;

  try {
    await directionsStore.unassignTeacher(directionId.value, teacherId);
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'O\'qituvchi muvaffaqiyatli olib tashlandi'
    });
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'O\'qituvchini olib tashlashda xatolik yuz berdi'
    });
  }
};

// Course actions
const handleAddCourse = () => {
  push.info({
    title: 'Xususiyat',
    message: 'Kurs qo\'shish modali keyinchalik qo\'shiladi'
  });
  courseModalMode.value = "create"; selectedCourse.value = null; showCourseModal.value = true;
};

const handleEditCourse = (course) => {
  push.info({
    title: 'Xususiyat',
    message: `${course.title || course.name} kursini tahrirlash modali keyinchalik qo\'shiladi`
  });
  courseModalMode.value = "edit"; selectedCourse.value = course; showCourseModal.value = true;
};

const handleToggleCourseStatus = async (course) => {
  try {
    await directionsStore.toggleCourseStatus(
      directionId.value,
      course.id,
      !course.isPublished
    );
    push.success({
      title: 'Muvaffaqiyatli',
      message: course.isPublished ? 'Kurs nashrdan olindi' : 'Kurs nashr qilindi'
    });
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'Kurs holatini o\'zgartirishda xatolik yuz berdi'
    });
  }
};
</script>
