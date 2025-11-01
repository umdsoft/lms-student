<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ t('users.table.user') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ t('users.table.role') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ t('users.table.status') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ t('users.table.registered') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ t('users.table.lastActivity') }}
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ t('users.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Loading State -->
          <tr v-if="loading">
            <td colspan="6" class="px-6 py-12 text-center">
              <div class="flex items-center justify-center">
                <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="!users || users.length === 0">
            <td colspan="6" class="px-6 py-12 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('users.table.noData') }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ t('users.empty') }}</p>
            </td>
          </tr>

          <!-- User Rows -->
          <tr v-for="user in users" v-else :key="user.id" class="hover:bg-gray-50">
            <!-- User Info -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div
                    v-if="user.avatar"
                    class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden"
                  >
                    <img :src="user.avatar" :alt="getUserFullName(user)" class="h-full w-full object-cover"/>
                  </div>
                  <div
                    v-else
                    class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium text-sm"
                  >
                    {{ getUserInitials(user) }}
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ getUserFullName(user) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ user.email }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Role -->
            <td class="px-6 py-4 whitespace-nowrap">
              <UserRoleBadge :role="user.role" />
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <UserStatusBadge :status="user.status" show-dot />
            </td>

            <!-- Registered Date -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div>{{ formatDate(user.createdAt) }}</div>
              <div class="text-xs text-gray-400">{{ formatTime(user.createdAt) }}</div>
            </td>

            <!-- Last Activity -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div>{{ formatDate(user.lastActivityAt || user.updatedAt) }}</div>
              <div class="text-xs text-gray-400">{{ formatTime(user.lastActivityAt || user.updatedAt) }}</div>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-3">
                <!-- Edit Button -->
                <button
                  type="button"
                  class="text-blue-600 hover:text-blue-900"
                  :title="t('users.table.actions')"
                  @click="$emit('edit', user)"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>

                <!-- Block/Unblock Button (Admin only) -->
                <button
                  v-if="canManage && user.status !== 'blocked'"
                  type="button"
                  class="text-orange-600 hover:text-orange-900"
                  :title="t('users.block.title')"
                  @click="$emit('block', user)"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                  </svg>
                </button>

                <!-- Delete Button (Admin only) -->
                <button
                  v-if="canManage"
                  type="button"
                  class="text-red-600 hover:text-red-900"
                  :title="t('users.delete.title')"
                  @click="$emit('delete', user)"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && users && users.length > 0" class="bg-gray-50 px-6 py-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex-1 flex items-center justify-between">
          <!-- Results info -->
          <div>
            <p class="text-sm text-gray-700">
              {{ t('users.pagination.showing') }}
              <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
              {{ t('users.pagination.to') }}
              <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
              {{ t('users.pagination.of') }}
              <span class="font-medium">{{ pagination.total }}</span>
              {{ t('users.pagination.results') }}
            </p>
          </div>

          <!-- Pagination controls -->
          <div class="flex space-x-2">
            <button
              type="button"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="$emit('page-change', pagination.page - 1)"
            >
              {{ t('users.pagination.previous') }}
            </button>
            <div class="flex items-center px-4 text-sm text-gray-700">
              {{ t('users.pagination.page') }} {{ pagination.page }} / {{ pagination.totalPages }}
            </div>
            <button
              type="button"
              :disabled="pagination.page >= pagination.totalPages"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="$emit('page-change', pagination.page + 1)"
            >
              {{ t('users.pagination.next') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import UserRoleBadge from './UserRoleBadge.vue';
import UserStatusBadge from './UserStatusBadge.vue';

const props = defineProps({
  users: {
    type: Array,
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    })
  },
  canManage: {
    type: Boolean,
    default: false
  }
});

defineEmits(['edit', 'delete', 'block', 'page-change']);

const { t } = useI18n();

/**
 * Get user's full name
 */
const getUserFullName = (user) => {
  return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'N/A';
};

/**
 * Get user's initials for avatar
 */
const getUserInitials = (user) => {
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  if (firstName) {
    return firstName.substring(0, 2).toUpperCase();
  }

  if (user.email) {
    return user.email.substring(0, 2).toUpperCase();
  }

  return 'U';
};

/**
 * Format date to readable format
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Bugun';
  } else if (diffInDays === 1) {
    return 'Kecha';
  } else if (diffInDays < 7) {
    return `${diffInDays} kun avval`;
  } else {
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

/**
 * Format time to readable format
 */
const formatTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
