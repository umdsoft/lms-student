<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ t('users.title') }}</h1>
        <p class="mt-1 text-sm text-gray-600">{{ t('users.subtitle') }}</p>
      </div>

      <button
        v-if="canManageUsers"
        type="button"
        class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
        @click="openCreateModal"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ t('users.addNew') }}
      </button>
    </div>

    <!-- Error Alert -->
    <div
      v-if="usersStore.hasError"
      class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ usersStore.error }}</span>
      </div>
      <button type="button" class="text-red-600 hover:text-red-800" @click="usersStore.clearError()">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Statistics Cards -->
    <UserStatsCards :stats="usersStore.stats" />

    <!-- Filters -->
    <UserFilters
      :filters="usersStore.currentFilters"
      @update:filters="handleFiltersUpdate"
      @search="handleSearch"
      @clear="handleClearFilters"
    />

    <!-- Users Table -->
    <UserTable
      :users="usersStore.usersList"
      :loading="usersStore.isLoading"
      :pagination="usersStore.paginationInfo"
      :can-manage="canManageUsers"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @block="openBlockModal"
      @page-change="handlePageChange"
    />

    <!-- Create/Edit Modal -->
    <UserFormModal
      v-model:show="showFormModal"
      :user="selectedUser"
      :mode="formMode"
      @save="handleSaveUser"
    />

    <!-- Delete Confirmation Modal -->
    <UserDeleteModal v-model:show="showDeleteModal" :user="selectedUser" @confirm="handleDeleteUser" />

    <!-- Block Modal -->
    <UserBlockModal v-model:show="showBlockModal" :user="selectedUser" @confirm="handleBlockUser" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUsersStore } from '../../stores/users';
import { useAuthStore } from '../../shared/stores/auth';
import UserStatsCards from '../../components/users/UserStatsCards.vue';
import UserFilters from '../../components/users/UserFilters.vue';
import UserTable from '../../components/users/UserTable.vue';
import UserFormModal from '../../components/users/UserFormModal.vue';
import UserDeleteModal from '../../components/users/UserDeleteModal.vue';
import UserBlockModal from '../../components/users/UserBlockModal.vue';

const { t } = useI18n();
const usersStore = useUsersStore();
const authStore = useAuthStore();

// Modal states
const showFormModal = ref(false);
const showDeleteModal = ref(false);
const showBlockModal = ref(false);
const selectedUser = ref(null);
const formMode = ref('create'); // 'create' or 'edit'

// Permissions
const canManageUsers = computed(() => authStore.user?.role === 'admin');

// Lifecycle
onMounted(() => {
  usersStore.fetchUsers();
  usersStore.fetchStatistics();
});

// Handlers
const handleFiltersUpdate = (newFilters) => {
  usersStore.setFilters(newFilters);
};

const handleSearch = () => {
  usersStore.fetchUsers();
};

const handleClearFilters = () => {
  usersStore.clearFilters();
  usersStore.fetchUsers();
};

const handlePageChange = (page) => {
  usersStore.setPage(page);
  usersStore.fetchUsers();
};

const openCreateModal = () => {
  selectedUser.value = null;
  formMode.value = 'create';
  showFormModal.value = true;
};

const openEditModal = (user) => {
  selectedUser.value = user;
  formMode.value = 'edit';
  showFormModal.value = true;
};

const openDeleteModal = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const openBlockModal = (user) => {
  selectedUser.value = user;
  showBlockModal.value = true;
};

const handleSaveUser = async (userData) => {
  try {
    if (formMode.value === 'create') {
      await usersStore.createUser(userData);
    } else {
      await usersStore.updateUser(selectedUser.value.id, userData);
    }
    showFormModal.value = false;
    selectedUser.value = null;
  } catch (error) {
    console.error('Save user error:', error);
  }
};

const handleDeleteUser = async () => {
  try {
    await usersStore.deleteUser(selectedUser.value.id);
    showDeleteModal.value = false;
    selectedUser.value = null;
  } catch (error) {
    console.error('Delete user error:', error);
  }
};

const handleBlockUser = async (reason) => {
  try {
    await usersStore.updateUserStatus(selectedUser.value.id, 'blocked', reason);
    showBlockModal.value = false;
    selectedUser.value = null;
  } catch (error) {
    console.error('Block user error:', error);
  }
};
</script>
