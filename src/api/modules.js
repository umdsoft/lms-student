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
    const response = await withCsrf(() => api.post(`/courses/${courseId}/modules`, moduleData));
    return response.data;
  },

  /**
   * Update existing module
   * @param {number} id - Module ID
   * @param {object} moduleData - Updated module data
   * @returns {Promise} API response
   */
  async updateModule(id, moduleData) {
    const response = await withCsrf(() => api.put(`/modules/${id}`, moduleData));
    return response.data;
  },

  /**
   * Delete a module
   * @param {number} id - Module ID
   * @returns {Promise} API response
   */
  async deleteModule(id) {
    const response = await withCsrf(() => api.delete(`/modules/${id}`));
    return response.data;
  },

  /**
   * Reorder single module
   * @param {number} id - Module ID
   * @param {number} newOrder - New order position
   * @returns {Promise} API response
   */
  async reorderModule(id, newOrder) {
    const response = await withCsrf(() => api.patch(`/modules/${id}/reorder`, { order: newOrder }));
    return response.data;
  },

  /**
   * Bulk reorder modules
   * @param {number} courseId - Course ID
   * @param {Array} modules - Array of {id, order} objects
   * @returns {Promise} API response
   */
  async bulkReorderModules(courseId, modules) {
    const response = await withCsrf(() => api.post(`/courses/${courseId}/modules/reorder-bulk`, { modules }));
    return response.data;
  },

  /**
   * Reorder modules (legacy)
   * @param {number} courseId - Course ID
   * @param {Array} moduleIds - Array of module IDs in new order
   * @returns {Promise} API response
   */
  async reorderModules(courseId, moduleIds) {
    const response = await withCsrf(() => api.patch(`/courses/${courseId}/modules/reorder`, { moduleIds }));
    return response.data;
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
