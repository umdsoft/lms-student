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
    try {
      // Try the dedicated lessons endpoint first
      const { data } = await api.get(`/modules/${moduleId}/lessons`, { params });
      return data;
    } catch (error) {
      // If lessons endpoint fails, try getting lessons from module data
      if (error.response?.status === 404 || error.response?.status === 500) {
        const { data } = await api.get(`/modules/${moduleId}`);
        if (data?.success && data?.data?.lessons) {
          return {
            success: true,
            data: data.data.lessons
          };
        }
      }
      throw error;
    }
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
   * @param {number} moduleId - Module ID
   * @param {object} lessonData - Lesson data
   * @returns {Promise} API response
   */
  async createLesson(moduleId, lessonData) {
    const response = await withCsrf(() => api.post(`/modules/${moduleId}/lessons`, lessonData));
    return response.data;
  },

  /**
   * Update existing lesson
   * @param {number} id - Lesson ID
   * @param {object} lessonData - Updated lesson data
   * @returns {Promise} API response
   */
  async updateLesson(id, lessonData) {
    const response = await withCsrf(() => api.put(`/lessons/${id}`, lessonData));
    return response.data;
  },

  /**
   * Delete a lesson
   * @param {number} id - Lesson ID
   * @returns {Promise} API response
   */
  async deleteLesson(id) {
    const response = await withCsrf(() => api.delete(`/lessons/${id}`));
    return response.data;
  },

  /**
   * Reorder single lesson
   * @param {number} id - Lesson ID
   * @param {number} newOrder - New order position
   * @returns {Promise} API response
   */
  async reorderLesson(id, newOrder) {
    const response = await withCsrf(() => api.patch(`/lessons/${id}/reorder`, { order: newOrder }));
    return response.data;
  },

  /**
   * Bulk reorder lessons
   * @param {number} moduleId - Module ID
   * @param {Array} lessons - Array of {id, order} objects
   * @returns {Promise} API response
   */
  async bulkReorderLessons(moduleId, lessons) {
    const response = await withCsrf(() => api.post(`/modules/${moduleId}/lessons/reorder-bulk`, { lessons }));
    return response.data;
  },

  /**
   * Reorder lessons (legacy)
   * @param {number} moduleId - Module ID
   * @param {Array} lessonIds - Array of lesson IDs in new order
   * @returns {Promise} API response
   */
  async reorderLessons(moduleId, lessonIds) {
    const response = await withCsrf(() => api.patch(`/modules/${moduleId}/lessons/reorder`, { lessonIds }));
    return response.data;
  },

  /**
   * Get lesson files
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getLessonFiles(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/files`);
    return data;
  },

  /**
   * Upload lesson file
   * @param {number} lessonId - Lesson ID
   * @param {FormData} formData - File data
   * @returns {Promise} API response
   */
  async uploadLessonFile(lessonId, formData) {
    const response = await withCsrf(() =>
      api.post(`/lessons/${lessonId}/files`, formData)
    );
    return response.data;
  },

  /**
   * Upload lesson file (legacy)
   * @param {number} lessonId - Lesson ID
   * @param {FormData} formData - File data
   * @returns {Promise} API response
   */
  async uploadFile(lessonId, formData) {
    const response = await withCsrf(() =>
      api.post(`/lessons/${lessonId}/files`, formData)
    );
    return response.data;
  },

  /**
   * Delete lesson file
   * @param {number} fileId - File ID
   * @returns {Promise} API response
   */
  async deleteLessonFile(fileId) {
    const response = await withCsrf(() => api.delete(`/lesson-files/${fileId}`));
    return response.data;
  },

  /**
   * Delete lesson file (legacy)
   * @param {number} lessonId - Lesson ID
   * @param {number} fileId - File ID
   * @returns {Promise} API response
   */
  async deleteFile(lessonId, fileId) {
    const response = await withCsrf(() => api.delete(`/lessons/${lessonId}/files/${fileId}`));
    return response.data;
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
