/**
 * Notifications API Service
 * Handles all notification-related API calls
 */

import api from '@/api';

export const notificationsService = {
  /**
   * Get all notifications for current user
   * @param {Object} params - Query parameters (page, limit, read)
   * @returns {Promise} - Notifications list
   */
  async getAll(params = {}) {
    const { data } = await api.get('/notifications', { params });
    return data;
  },

  /**
   * Mark notification as read
   * @param {string} id - Notification ID
   * @returns {Promise} - Updated notification
   */
  async markAsRead(id) {
    const { data } = await api.put(`/notifications/${id}/read`);
    return data;
  },

  /**
   * Mark all notifications as read
   * @returns {Promise} - Success response
   */
  async markAllAsRead() {
    const { data } = await api.put('/notifications/read-all');
    return data;
  },

  /**
   * Delete notification
   * @param {string} id - Notification ID
   * @returns {Promise} - Success response
   */
  async delete(id) {
    const { data } = await api.delete(`/notifications/${id}`);
    return data;
  },

  /**
   * Get unread count
   * @returns {Promise} - Unread count
   */
  async getUnreadCount() {
    const { data } = await api.get('/notifications/unread-count');
    return data;
  }
};

export default notificationsService;
