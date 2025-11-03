import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  /**
   * Get all lessons by module ID
   * @param {number} moduleId - Module ID
   * @param {object} params - Query parameters
   * @returns {Promise} API response
   */
  async getLessonsByModule(moduleId, params = {}) {
    const { data } = await api.get(`/modules/${moduleId}/lessons`, { params });
    return data;
  },

  /**
   * Get single lesson by ID
   * @param {number} id - Lesson ID
   * @returns {Promise} API response
   */
  async getLesson(id) {
    const { data } = await api.get(`/lessons/${id}`);
    return data;
  },

  /**
   * Create a new lesson
   * @param {object} lessonData - Lesson data
   * @returns {Promise} API response
   */
  async createLesson(lessonData) {
    return withCsrf(() => api.post('/lessons', lessonData));
  },

  /**
   * Update existing lesson
   * @param {number} id - Lesson ID
   * @param {object} lessonData - Updated lesson data
   * @returns {Promise} API response
   */
  async updateLesson(id, lessonData) {
    return withCsrf(() => api.put(`/lessons/${id}`, lessonData));
  },

  /**
   * Delete a lesson
   * @param {number} id - Lesson ID
   * @returns {Promise} API response
   */
  async deleteLesson(id) {
    return withCsrf(() => api.delete(`/lessons/${id}`));
  },

  /**
   * Reorder lessons
   * @param {number} moduleId - Module ID
   * @param {Array} lessonIds - Array of lesson IDs in new order
   * @returns {Promise} API response
   */
  async reorderLessons(moduleId, lessonIds) {
    return withCsrf(() => api.patch(`/modules/${moduleId}/lessons/reorder`, { lessonIds }));
  },

  /**
   * Upload lesson file
   * @param {number} lessonId - Lesson ID
   * @param {FormData} formData - File data
   * @returns {Promise} API response
   */
  async uploadFile(lessonId, formData) {
    return withCsrf(() =>
      api.post(`/lessons/${lessonId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    );
  },

  /**
   * Delete lesson file
   * @param {number} lessonId - Lesson ID
   * @param {number} fileId - File ID
   * @returns {Promise} API response
   */
  async deleteFile(lessonId, fileId) {
    return withCsrf(() => api.delete(`/lessons/${lessonId}/files/${fileId}`));
  },

  /**
   * Get lesson statistics
   * @param {number} id - Lesson ID
   * @returns {Promise} API response
   */
  async getLessonStatistics(id) {
    const { data } = await api.get(`/lessons/${id}/statistics`);
    return data;
  }
};
