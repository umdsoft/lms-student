/**
 * Olympiads API Service
 * Handles all olympiad-related API calls to the backend
 */

import api from '@/api';

export const olympiadsService = {
  /**
   * Get all olympiads with optional filters
   * @param {Object} params - Filter parameters (type, status, direction, search, page, limit)
   * @returns {Promise} - Olympiads list with pagination and summary
   */
  async getAll(params = {}) {
    const { data } = await api.get('/olympiads', { params });
    return data;
  },

  /**
   * Get olympiad by ID
   * @param {string} id - Olympiad ID
   * @returns {Promise} - Olympiad details
   */
  async getById(id) {
    const { data } = await api.get(`/olympiads/${id}`);
    return data;
  },

  /**
   * Create new olympiad (Admin only)
   * @param {Object} olympiadData - Olympiad data
   * @returns {Promise} - Created olympiad
   */
  async create(olympiadData) {
    const { data } = await api.post('/olympiads', olympiadData);
    return data;
  },

  /**
   * Update olympiad (Admin only)
   * @param {string} id - Olympiad ID
   * @param {Object} updates - Updated data
   * @returns {Promise} - Updated olympiad
   */
  async update(id, updates) {
    const { data } = await api.put(`/olympiads/${id}`, updates);
    return data;
  },

  /**
   * Delete olympiad (Admin only)
   * @param {string} id - Olympiad ID
   * @returns {Promise} - Success response
   */
  async delete(id) {
    const { data } = await api.delete(`/olympiads/${id}`);
    return data;
  },

  /**
   * Publish olympiad (Admin only)
   * @param {string} id - Olympiad ID
   * @returns {Promise} - Updated olympiad
   */
  async publish(id) {
    const { data } = await api.post(`/olympiads/${id}/publish`);
    return data;
  },

  /**
   * Register for olympiad (Student)
   * @param {string} id - Olympiad ID
   * @returns {Promise} - Registration details
   */
  async register(id) {
    const { data } = await api.post(`/olympiads/${id}/register`);
    return data;
  },

  /**
   * Unregister from olympiad (Student)
   * @param {string} id - Olympiad ID
   * @returns {Promise} - Success response
   */
  async unregister(id) {
    const { data } = await api.post(`/olympiads/${id}/unregister`);
    return data;
  },

  /**
   * Get user's registered olympiads
   * @returns {Promise} - List of registered olympiads
   */
  async getMyOlympiads() {
    const { data } = await api.get('/olympiads/my');
    return data;
  },

  /**
   * Get olympiad results
   * @param {string} id - Olympiad ID
   * @returns {Promise} - Olympiad results
   */
  async getResults(id) {
    const { data } = await api.get(`/olympiads/${id}/results`);
    return data;
  }
};

export default olympiadsService;
