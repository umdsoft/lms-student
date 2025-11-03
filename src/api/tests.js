import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  /**
   * Get all tests by lesson ID
   * @param {number} lessonId - Lesson ID
   * @param {object} params - Query parameters
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
   * @param {object} testData - Test data
   * @returns {Promise} API response
   */
  async createTest(testData) {
    return withCsrf(() => api.post('/tests', testData));
  },

  /**
   * Update existing test
   * @param {number} id - Test ID
   * @param {object} testData - Updated test data
   * @returns {Promise} API response
   */
  async updateTest(id, testData) {
    return withCsrf(() => api.put(`/tests/${id}`, testData));
  },

  /**
   * Delete a test
   * @param {number} id - Test ID
   * @returns {Promise} API response
   */
  async deleteTest(id) {
    return withCsrf(() => api.delete(`/tests/${id}`));
  },

  /**
   * Get test statistics
   * @param {number} id - Test ID
   * @returns {Promise} API response
   */
  async getTestStatistics(id) {
    const { data } = await api.get(`/tests/${id}/statistics`);
    return data;
  }
};
