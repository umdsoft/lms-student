/**
 * Users API Service
 *
 * Handles all user-related API requests
 */

import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  /**
   * Get all users with pagination and filters
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search query
   * @param {string} params.role - Filter by role
   * @param {string} params.status - Filter by status
   * @param {string} params.sortBy - Sort field
   * @param {string} params.sortOrder - Sort order (asc/desc)
   * @returns {Promise} API response with users list
   */
  async getUsers(params = {}) {
    const { data } = await api.get('/users', { params });
    return data;
  },

  /**
   * Get user statistics
   * @returns {Promise} API response with statistics
   */
  async getStatistics() {
    const { data } = await api.get('/users/statistics');
    return data;
  },

  /**
   * Get single user by ID
   * @param {number|string} id - User ID
   * @returns {Promise} API response with user data
   */
  async getUser(id) {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  /**
   * Create new user (admin only)
   * @param {Object} userData - User data
   * @param {string} userData.firstName - First name
   * @param {string} userData.lastName - Last name
   * @param {string} userData.email - Email address
   * @param {string} userData.phone - Phone number
   * @param {string} userData.password - Password
   * @param {string} userData.role - User role (student/teacher/admin)
   * @param {string} userData.status - User status (active/inactive)
   * @returns {Promise} API response
   */
  async createUser(userData) {
    return withCsrf(() => api.post('/users', userData));
  },

  /**
   * Update user
   * @param {number|string} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} API response
   */
  async updateUser(id, userData) {
    return withCsrf(() => api.put(`/users/${id}`, userData));
  },

  /**
   * Update user role (admin only)
   * @param {number|string} id - User ID
   * @param {string} role - New role (student/teacher/admin)
   * @returns {Promise} API response
   */
  async updateUserRole(id, role) {
    return withCsrf(() => api.patch(`/users/${id}/role`, { role }));
  },

  /**
   * Update user status - block/unblock (admin only)
   * @param {number|string} id - User ID
   * @param {string} status - New status (active/inactive/blocked)
   * @param {string|null} reason - Reason for blocking (optional)
   * @returns {Promise} API response
   */
  async updateUserStatus(id, status, reason = null) {
    return withCsrf(() => api.patch(`/users/${id}/status`, { status, reason }));
  },

  /**
   * Change user password
   * @param {number|string} id - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} API response
   */
  async changePassword(id, currentPassword, newPassword) {
    return withCsrf(() =>
      api.patch(`/users/${id}/password`, {
        currentPassword,
        newPassword
      })
    );
  },

  /**
   * Soft delete user (admin only)
   * @param {number|string} id - User ID
   * @returns {Promise} API response
   */
  async deleteUser(id) {
    return withCsrf(() => api.delete(`/users/${id}`));
  }
};
