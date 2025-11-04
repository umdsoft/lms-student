import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  /**
   * Get all modules by course ID
   * @param {number} courseId - Course ID
   * @param {object} params - Query parameters
   * @returns {Promise} API response
   */
  async getModulesByCourse(courseId, params = {}) {
    const { data } = await api.get(`/courses/${courseId}/modules`, { params });
    return data;
  },

  /**
   * Get single module by ID
   * @param {number} id - Module ID
   * @returns {Promise} API response
   */
  async getModule(id) {
    const { data } = await api.get(`/modules/${id}`);
    return data;
  },

  /**
   * Create a new module
   * @param {number} courseId - Course ID
   * @param {object} moduleData - Module data
   * @returns {Promise} API response
   */
  async createModule(courseId, moduleData) {
    return withCsrf(() => api.post(`/courses/${courseId}/modules`, moduleData));
  },

  /**
   * Update existing module
   * @param {number} id - Module ID
   * @param {object} moduleData - Updated module data
   * @returns {Promise} API response
   */
  async updateModule(id, moduleData) {
    return withCsrf(() => api.put(`/modules/${id}`, moduleData));
  },

  /**
   * Delete a module
   * @param {number} id - Module ID
   * @returns {Promise} API response
   */
  async deleteModule(id) {
    return withCsrf(() => api.delete(`/modules/${id}`));
  },

  /**
   * Reorder single module
   * @param {number} id - Module ID
   * @param {number} newOrder - New order position
   * @returns {Promise} API response
   */
  async reorderModule(id, newOrder) {
    return withCsrf(() => api.patch(`/modules/${id}/reorder`, { order: newOrder }));
  },

  /**
   * Bulk reorder modules
   * @param {number} courseId - Course ID
   * @param {Array} modules - Array of {id, order} objects
   * @returns {Promise} API response
   */
  async bulkReorderModules(courseId, modules) {
    return withCsrf(() => api.post(`/courses/${courseId}/modules/reorder-bulk`, { modules }));
  },

  /**
   * Reorder modules (legacy)
   * @param {number} courseId - Course ID
   * @param {Array} moduleIds - Array of module IDs in new order
   * @returns {Promise} API response
   */
  async reorderModules(courseId, moduleIds) {
    return withCsrf(() => api.patch(`/courses/${courseId}/modules/reorder`, { moduleIds }));
  },

  /**
   * Get module statistics
   * @param {number} id - Module ID
   * @returns {Promise} API response
   */
  async getModuleStatistics(id) {
    const { data } = await api.get(`/modules/${id}/statistics`);
    return data;
  }
};
