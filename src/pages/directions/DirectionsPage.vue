<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ t('directions.title') }}</h1>
        <p class="mt-1 text-sm text-gray-600">{{ t('directions.subtitle') }}</p>
      </div>

      <button
        v-if="canManage"
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        @click="openCreateModal"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ t('directions.addNew') }}
      </button>
    </div>

    <transition name="fade">
      <div
        v-if="directionsStore.hasError"
        class="flex items-start justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        <div class="flex items-start gap-3">
          <svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5 13a7 7 0 1114 0 7 7 0 01-14 0z" />
          </svg>
          <span>{{ directionsStore.error }}</span>
        </div>
        <button
          type="button"
          class="text-red-600 transition-colors hover:text-red-800"
          @click="directionsStore.clearError()"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <DirectionStatsCards :stats="directionsStore.stats" />

    <DirectionFilters
      :filters="directionsStore.filters"
      @update:filters="handleFiltersUpdate"
      @search="handleSearch"
      @clear="handleClearFilters"
    />

    <div v-if="directionsStore.isLoading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div class="h-24 rounded-lg bg-gray-200/60" />
        <div class="mt-6 space-y-3">
          <div class="h-4 rounded bg-gray-200/60" />
          <div class="h-4 w-2/3 rounded bg-gray-200/60" />
          <div class="h-10 rounded bg-gray-200/60" />
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="directionsStore.directionsList.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DirectionCard
          v-for="direction in directionsStore.directionsList"
          :key="direction.id"
          :direction="direction"
          @edit="openEditModal"
          @view="viewDirection"
          @delete="openDeleteModal"
        />
      </div>
      <div v-else class="mt-12 text-center">
        <svg class="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p class="mt-4 text-lg font-medium text-gray-600">{{ t('directions.empty') }}</p>
      </div>
    </div>

    <div
      v-if="directionsStore.directionsList.length && directionsStore.paginationInfo.totalPages > 1"
      class="mt-8 flex justify-center"
    >
      <div class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
        <button
          type="button"
          class="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="directionsStore.paginationInfo.page === 1"
          @click="handlePageChange(directionsStore.paginationInfo.page - 1)"
        >
          {{ t('common.pagination.previous') }}
        </button>
        <span class="text-sm text-gray-600">
          {{ t('common.pagination.page') }} {{ directionsStore.paginationInfo.page }}
          {{ t('common.pagination.of') }} {{ directionsStore.paginationInfo.totalPages }}
        </span>
        <button
          type="button"
          class="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="directionsStore.paginationInfo.page >= directionsStore.paginationInfo.totalPages"
          @click="handlePageChange(directionsStore.paginationInfo.page + 1)"
        >
          {{ t('common.pagination.next') }}
        </button>
      </div>
    </div>

    <DirectionFormModal
      v-model:show="showFormModal"
      :direction="selectedDirection"
      :mode="formMode"
      @save="handleSaveDirection"
    />

    <DirectionDeleteModal
      v-model:show="showDeleteModal"
      :direction="selectedDirection"
      @confirm="handleDeleteDirection"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import DirectionStatsCards from '@/components/directions/DirectionStatsCards.vue';
import DirectionFilters from '@/components/directions/DirectionFilters.vue';
import DirectionCard from '@/components/directions/DirectionCard.vue';
import DirectionFormModal from '@/components/directions/DirectionFormModal.vue';
import DirectionDeleteModal from '@/components/directions/DirectionDeleteModal.vue';
import { useDirectionsStore } from '@/stores/directions';
import { useAuthStore } from '@/shared/stores/auth';

const directionsStore = useDirectionsStore();
const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();

const showFormModal = ref(false);
const showDeleteModal = ref(false);
const selectedDirection = ref(null);
const formMode = ref('create');

const canManage = computed(() => authStore.user?.role === 'admin');

onMounted(async () => {
  await Promise.all([directionsStore.fetchDirections(), directionsStore.fetchStatistics()]);
});

const handleFiltersUpdate = (newFilters) => {
  directionsStore.setFilters(newFilters);
};

const handleSearch = () => {
  directionsStore.fetchDirections();
};

const handleClearFilters = () => {
  directionsStore.clearFilters();
  directionsStore.fetchDirections();
};

const handlePageChange = (page) => {
  directionsStore.setPage(page);
  directionsStore.fetchDirections();
};

const openCreateModal = () => {
  selectedDirection.value = null;
  formMode.value = 'create';
  showFormModal.value = true;
};

const openEditModal = (direction) => {
  selectedDirection.value = direction;
  formMode.value = 'edit';
  showFormModal.value = true;
};

const openDeleteModal = (direction) => {
  selectedDirection.value = direction;
  showDeleteModal.value = true;
};

const viewDirection = (direction) => {
  // Navigate to direction detail page
  if (!direction?.id) {
    push.error({
      title: 'Xatolik',
      message: "Yo'nalish ID topilmadi"
    });
    return;
  }

  router.push({
    name: 'admin.direction-detail',
    params: { id: direction.id }
  }).catch((error) => {
    console.error('Navigation error:', error);
    push.error({
      title: 'Xatolik',
      message: "Sahifaga o'tishda xatolik yuz berdi"
    });
  });
};

const handleSaveDirection = async (directionData) => {
  try {
    if (formMode.value === 'create') {
      await directionsStore.createDirection(directionData);
      push.success({
        title: 'Muvaffaqiyatli',
        message: "Yangi yo'nalish muvaffaqiyatli qo'shildi"
      });
    } else if (selectedDirection.value) {
      await directionsStore.updateDirection(selectedDirection.value.id, directionData);
      push.success({
        title: 'Muvaffaqiyatli',
        message: "Yo'nalish muvaffaqiyatli yangilandi"
      });
    }
    await directionsStore.fetchStatistics();
    showFormModal.value = false;
    selectedDirection.value = null;
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || "Yo'nalishni saqlashda xatolik yuz berdi"
    });
  }
};

const handleDeleteDirection = async () => {
  if (!selectedDirection.value) return;
  try {
    await directionsStore.deleteDirection(selectedDirection.value.id);
    push.success({
      title: 'Muvaffaqiyatli',
      message: "Yo'nalish muvaffaqiyatli o'chirildi"
    });
    await directionsStore.fetchStatistics();
    showDeleteModal.value = false;
    selectedDirection.value = null;
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || "Yo'nalishni o'chirishda xatolik yuz berdi"
    });
  }
};
</script>
