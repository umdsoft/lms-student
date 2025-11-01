<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500/60 transition-opacity" aria-hidden="true" @click="handleClose" />
      <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

      <div class="inline-block w-full transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-3xl sm:align-middle">
        <div class="bg-white px-6 pb-6 pt-5 sm:p-8">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ t('directions.teachers.manage') }}</h2>
              <p class="mt-1 text-sm text-gray-500">{{ t('directions.teachers.description') }}</p>
            </div>
            <button
              type="button"
              class="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
              @click="handleClose"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mt-6">
            <label for="teacher-search" class="block text-sm font-medium text-gray-700">
              {{ t('directions.teachers.search') }}
            </label>
            <div class="mt-2">
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="teacher-search"
                  v-model="searchQuery"
                  type="search"
                  :placeholder="t('directions.teachers.searchPlaceholder')"
                  class="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  @input="handleSearch"
                />
              </div>
            </div>
          </div>

          <div class="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 class="text-sm font-medium text-gray-700">{{ t('directions.teachers.available') }}</h3>
              <div class="mt-3 rounded-lg border border-gray-200">
                <div v-if="loading" class="space-y-3 p-4">
                  <div v-for="i in 3" :key="i" class="h-10 animate-pulse rounded bg-gray-100" />
                </div>
                <div v-else-if="filteredAvailableTeachers.length" class="max-h-64 divide-y divide-gray-100 overflow-y-auto">
                  <label
                    v-for="teacher in filteredAvailableTeachers"
                    :key="teacher.id"
                    class="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ formatTeacherName(teacher) }}</p>
                      <p class="text-xs text-gray-500">{{ teacher.email }}</p>
                    </div>
                    <input
                      v-model="selectedTeachers"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      :value="teacher.id"
                    />
                  </label>
                </div>
                <div v-else class="p-6 text-center text-sm text-gray-500">
                  {{ t('directions.teachers.emptySearch') }}
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-700">{{ t('directions.teachers.assigned') }}</h3>
              <div v-if="teachers?.length" class="mt-3 space-y-2">
                <div
                  v-for="teacher in teachers"
                  :key="teacher.id"
                  class="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-2"
                >
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ formatTeacherName(teacher) }}</p>
                    <p class="text-xs text-gray-500">{{ teacher.email }}</p>
                  </div>
                  <button
                    type="button"
                    class="text-sm font-medium text-red-600 hover:text-red-700"
                    @click="emit('remove', teacher)"
                  >
                    {{ t('directions.teachers.remove') }}
                  </button>
                </div>
              </div>
              <div v-else class="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                {{ t('directions.teachers.empty') }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            @click="handleClose"
          >
            {{ t('directions.form.cancel') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            :disabled="selectedTeachers.length === 0"
            @click="handleAssign"
          >
            {{ t('directions.teachers.assign') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import usersApi from '@/api/users';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  teachers: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:show', 'assign', 'remove']);

const { t } = useI18n();

const searchQuery = ref('');
const availableTeachers = ref([]);
const loading = ref(false);
const selectedTeachers = ref([]);
let searchTimeout = null;

const assignedTeacherIds = computed(() => props.teachers?.map((teacher) => teacher.id) ?? []);

const filteredAvailableTeachers = computed(() =>
  availableTeachers.value.filter((teacher) => !assignedTeacherIds.value.includes(teacher.id))
);

const formatTeacherName = (teacher) => `${teacher.firstName ?? ''} ${teacher.lastName ?? ''}`.trim();

const loadTeachers = async (search = '') => {
  loading.value = true;
  try {
    const response = await usersApi.getUsers({
      page: 1,
      limit: 20,
      role: 'teacher',
      search
    });
    if (response?.success) {
      availableTeachers.value = response.data?.users ?? [];
    } else {
      availableTeachers.value = [];
    }
  } catch (error) {
    console.error('Failed to load teachers', error);
    availableTeachers.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    loadTeachers(searchQuery.value.trim());
  }, 500);
};

const handleAssign = () => {
  if (!selectedTeachers.value.length) return;
  emit('assign', [...selectedTeachers.value]);
  selectedTeachers.value = [];
};

const handleClose = () => {
  emit('update:show', false);
};

watch(
  () => props.show,
  (value) => {
    if (value) {
      loadTeachers();
    } else {
      searchQuery.value = '';
      selectedTeachers.value = [];
    }
  }
);

onMounted(() => {
  if (props.show) {
    loadTeachers();
  }
});
</script>
