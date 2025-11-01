/**
 * Users Pinia Store
 *
 * Manages user data, statistics, pagination, and filters
 */

import { defineStore } from 'pinia';
import usersApi from '../api/users';

export const useUsersStore = defineStore('users', {
  state: () => ({
    // Users list
    users: [],

    // Current selected user
    currentUser: null,

    // Statistics
    statistics: {
      total: 0,
      active: 0,
      inactive: 0,
      blocked: 0,
      byRole: {
        student: 0,
        teacher: 0,
        admin: 0
      }
    },

    // Pagination
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    },

    // Filters
    filters: {
      search: '',
      role: '',
      status: '',
      sortBy: 'created_at',
      sortOrder: 'desc'
    },

    // Loading states
    loading: false,

    // Error handling
    error: null
  }),

  getters: {
    /**
     * Get users list
     */
    usersList: (state) => state.users,

    /**
     * Get statistics
     */
    stats: (state) => state.statistics,

    /**
     * Check if loading
     */
    isLoading: (state) => state.loading,

    /**
     * Check if has error
     */
    hasError: (state) => state.error !== null,

    /**
     * Get pagination info
     */
    paginationInfo: (state) => state.pagination,

    /**
     * Get current filters
     */
    currentFilters: (state) => state.filters
  },

  actions: {
    /**
     * Fetch users list with current filters and pagination
     */
    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          search: this.filters.search,
          role: this.filters.role,
          status: this.filters.status,
          sortBy: this.filters.sortBy,
          sortOrder: this.filters.sortOrder
        };

        const response = await usersApi.getUsers(params);

        if (response.success) {
          this.users = response.data.users || [];
          this.pagination = response.data.pagination || this.pagination;

          // Update statistics if available
          if (response.data.statistics) {
            this.statistics = response.data.statistics;
          }
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Foydalanuvchilarni yuklashda xatolik';
        console.error('Fetch users error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch statistics separately
     */
    async fetchStatistics() {
      try {
        const response = await usersApi.getStatistics();
        if (response.success) {
          this.statistics = response.data;
        }
      } catch (error) {
        console.error('Fetch statistics error:', error);
      }
    },

    /**
     * Fetch single user by ID
     * @param {number|string} id - User ID
     */
    async fetchUser(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await usersApi.getUser(id);
        if (response.success) {
          this.currentUser = response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Foydalanuvchini yuklashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new user
     * @param {Object} userData - User data
     */
    async createUser(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await usersApi.createUser(userData);
        if (response.data.success) {
          await this.fetchUsers(); // Refresh list
          await this.fetchStatistics(); // Refresh statistics
          return response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Foydalanuvchi yaratishda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update user
     * @param {number|string} id - User ID
     * @param {Object} userData - Updated user data
     */
    async updateUser(id, userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await usersApi.updateUser(id, userData);
        if (response.data.success) {
          await this.fetchUsers(); // Refresh list
          return response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Foydalanuvchini yangilashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update user role
     * @param {number|string} id - User ID
     * @param {string} role - New role
     */
    async updateUserRole(id, role) {
      try {
        const response = await usersApi.updateUserRole(id, role);
        if (response.data.success) {
          await this.fetchUsers();
          await this.fetchStatistics();
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Rolni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Block/Unblock user
     * @param {number|string} id - User ID
     * @param {string} status - New status
     * @param {string|null} reason - Reason for blocking
     */
    async updateUserStatus(id, status, reason = null) {
      try {
        const response = await usersApi.updateUserStatus(id, status, reason);
        if (response.data.success) {
          await this.fetchUsers();
          await this.fetchStatistics();
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Statusni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Delete user
     * @param {number|string} id - User ID
     */
    async deleteUser(id) {
      try {
        const response = await usersApi.deleteUser(id);
        if (response.data.success) {
          await this.fetchUsers();
          await this.fetchStatistics();
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Foydalanuvchini o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Set filters
     * @param {Object} newFilters - New filter values
     */
    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.pagination.page = 1; // Reset to first page
    },

    /**
     * Clear all filters
     */
    clearFilters() {
      this.filters = {
        search: '',
        role: '',
        status: '',
        sortBy: 'created_at',
        sortOrder: 'desc'
      };
      this.pagination.page = 1;
    },

    /**
     * Set current page
     * @param {number} page - Page number
     */
    setPage(page) {
      this.pagination.page = page;
    },

    /**
     * Set items per page
     * @param {number} limit - Items per page
     */
    setLimit(limit) {
      this.pagination.limit = limit;
      this.pagination.page = 1;
    },

    /**
     * Clear error
     */
    clearError() {
      this.error = null;
    }
  }
});
