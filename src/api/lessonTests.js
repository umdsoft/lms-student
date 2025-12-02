import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  /**
   * Get all tests by lesson ID
   * @param {number} lessonId - Lesson ID
   * @param {object} params - Query parameters (difficulty, status, etc.)
   * @returns {Promise} API response
   */
  async getTestsByLesson(lessonId, params = {}) {
    const { data } = await api.get(`/lessons/${lessonId}/tests`, { params });
    return data;
  },

  /**
   * Get single test by ID
   * @param {number} id - Test ID
   * @returns {Promise} API response
   */
  async getTest(id) {
    const { data } = await api.get(`/tests/${id}`);
    return data;
  },

  /**
   * Create a new test
   * @param {number} lessonId - Lesson ID
   * @param {object} testData - Test data
   * @returns {Promise} API response
   */
  async createTest(lessonId, testData) {
    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/tests`, testData));
    return response.data;
  },

  /**
   * Update existing test
   * @param {number} id - Test ID
   * @param {object} testData - Updated test data
   * @returns {Promise} API response
   */
  async updateTest(id, testData) {
    const response = await withCsrf(() => api.put(`/tests/${id}`, testData));
    return response.data;
  },

  /**
   * Delete a test
   * @param {number} id - Test ID
   * @returns {Promise} API response
   */
  async deleteTest(id) {
    const response = await withCsrf(() => api.delete(`/tests/${id}`));
    return response.data;
  },

  /**
   * Reorder tests
   * @param {number} lessonId - Lesson ID
   * @param {Array} testIds - Array of test IDs in new order
   * @returns {Promise} API response
   */
  async reorderTests(lessonId, testIds) {
    const response = await withCsrf(() => api.patch(`/lessons/${lessonId}/tests/reorder`, { testIds }));
    return response.data;
  },

  /**
   * Import tests from XLSX
   * @param {number} lessonId - Lesson ID
   * @param {FormData} formData - XLSX file data
   * @returns {Promise} API response
   */
  async importFromXlsx(lessonId, formData) {
    const response = await withCsrf(() =>
      api.post(`/lessons/${lessonId}/tests/import`, formData)
    );
    return response.data;
  },

  /**
   * Bulk create tests
   * @param {number} lessonId - Lesson ID
   * @param {Array} tests - Array of test objects
   * @returns {Promise} API response
   */
  async bulkCreateTests(lessonId, tests) {
    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/tests/bulk`, { tests }));
    return response.data;
  },

  /**
   * Get test statistics
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getTestsStatistics(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/tests/statistics`);
    return data;
  },

  /**
   * Upload test image
   * @param {number} testId - Test ID
   * @param {FormData} formData - Image data
   * @returns {Promise} API response
   */
  async uploadTestImage(testId, formData) {
    const response = await withCsrf(() =>
      api.post(`/tests/${testId}/image`, formData)
    );
    return response.data;
  }
};
