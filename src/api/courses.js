import api from './api';
import { withCsrf } from './api.csrf';

export default {
  /**
   * Get all courses by direction ID
   * @param {number} directionId - Direction ID
   * @param {object} params - Query parameters
   * @returns {Promise} API response
   */
  async getCoursesByDirection(directionId, params = {}) {
    const { data } = await api.get(`/directions/${directionId}/courses`, { params });
    return data;
  },

  /**
   * Get single course by ID
   * @param {number} id - Course ID
   * @returns {Promise} API response
   */
  async getCourse(id) {
    const { data } = await api.get(`/courses/${id}`);
    return data;
  },

  /**
   * Create a new course
   * @param {object} courseData - Course data
   * @returns {Promise} API response
   */
  async createCourse(courseData) {
    return withCsrf(() => api.post('/courses', courseData));
  },

  /**
   * Update existing course
   * @param {number} id - Course ID
   * @param {object} courseData - Updated course data
   * @returns {Promise} API response
   */
  async updateCourse(id, courseData) {
    return withCsrf(() => api.put(`/courses/${id}`, courseData));
  },

  /**
   * Delete a course
   * @param {number} id - Course ID
   * @returns {Promise} API response
   */
  async deleteCourse(id) {
    return withCsrf(() => api.delete(`/courses/${id}`));
  },

  /**
   * Update course status
   * @param {number} id - Course ID
   * @param {string} status - New status (active, inactive, draft)
   * @returns {Promise} API response
   */
  async updateCourseStatus(id, status) {
    return withCsrf(() => api.patch(`/courses/${id}/status`, { status }));
  },

  /**
   * Get course statistics
   * @param {number} id - Course ID
   * @returns {Promise} API response
   */
  async getCourseStatistics(id) {
    const { data } = await api.get(`/courses/${id}/statistics`);
    return data;
  }
};
