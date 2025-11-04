<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t('courses.modules.title') }}
      </h2>
      <button
        v-if="canManage"
        @click="openCreateModal"
        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        {{ t('courses.modules.add') }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded-lg bg-gray-100"/>
    </div>

    <!-- Empty State -->
    <div v-else-if="!modules.length" class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <h3 class="mt-4 text-lg font-semibold text-gray-900">
        {{ t('courses.modules.empty') }}
      </h3>
      <p class="mt-2 text-sm text-gray-600">
        {{ t('courses.modules.emptyDescription') }}
      </p>
      <button
        v-if="canManage"
        @click="openCreateModal"
        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        {{ t('courses.modules.createFirst') }}
      </button>
    </div>

    <!-- Modules List -->
    <div v-else class="space-y-3">
      <ModuleCard
        v-for="(module, index) in sortedModules"
        :key="module.id"
        :module="module"
        :index="index"
        :is-first="index === 0"
        :is-last="index === sortedModules.length - 1"
        @edit="openEditModal(module)"
        @view="$emit('view-module', module)"
        @delete="openDeleteModal(module)"
        @move-up="handleMoveUp(index)"
        @move-down="handleMoveDown(index)"
      />
    </div>

    <!-- Modals -->
    <ModuleFormModal
      v-model:show="showFormModal"
      :course-id="courseId"
      :module="selectedModule"
      :mode="formMode"
      @save="handleSave"
    />

    <ModuleDeleteModal
      v-model:show="showDeleteModal"
      :module="selectedModule"
      :course-id="courseId"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import ModuleCard from './ModuleCard.vue';
import ModuleFormModal from './ModuleFormModal.vue';
import ModuleDeleteModal from './ModuleDeleteModal.vue';
import { useModulesStore } from '@/stores/modules';

const { t } = useI18n();
const router = useRouter();
const modulesStore = useModulesStore();

const props = defineProps({
  courseId: {
    type: Number,
    required: true
  },
  canManage: {
    type: Boolean,
    default: false
  }
});

defineEmits(['view-module']);

const showFormModal = ref(false);
const showDeleteModal = ref(false);
const selectedModule = ref(null);
const formMode = ref('create');

const loading = computed(() => modulesStore.isLoading);
const modules = computed(() => modulesStore.modules);
const sortedModules = computed(() => modulesStore.sortedModules);

onMounted(() => {
  loadModules();
});

const loadModules = () => {
  modulesStore.fetchModulesByCourse(props.courseId);
};

const openCreateModal = () => {
  selectedModule.value = null;
  formMode.value = 'create';
  showFormModal.value = true;
};

const openEditModal = (module) => {
  selectedModule.value = module;
  formMode.value = 'edit';
  showFormModal.value = true;
};

const openDeleteModal = (module) => {
  selectedModule.value = module;
  showDeleteModal.value = true;
};

const handleSave = () => {
  loadModules();
};

const handleDelete = () => {
  loadModules();
};

const handleMoveUp = async (index) => {
  const module = sortedModules.value[index];
  if (module) {
    await modulesStore.moveModuleUp(module.id, props.courseId);
  }
};

const handleMoveDown = async (index) => {
  const module = sortedModules.value[index];
  if (module) {
    await modulesStore.moveModuleDown(module.id, props.courseId);
  }
};
</script>
