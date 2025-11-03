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
   * @param {object} moduleData - Module data
   * @returns {Promise} API response
   */
  async createModule(moduleData) {
    return withCsrf(() => api.post('/modules', moduleData));
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
   * Reorder modules
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
