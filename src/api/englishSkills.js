import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  // ==================== WRITING ====================

  /**
   * Get writing tasks by lesson ID
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getWritingTasks(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/english-skills/writing`);
    return data;
  },

  /**
   * Create writing task
   * @param {number} lessonId - Lesson ID
   * @param {object} taskData - Task data
   * @returns {Promise} API response
   */
  async createWritingTask(lessonId, taskData) {
    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/english-skills/writing`, taskData));
    return response.data;
  },

  /**
   * Update writing task
   * @param {number} id - Task ID
   * @param {object} taskData - Updated task data
   * @returns {Promise} API response
   */
  async updateWritingTask(id, taskData) {
    const response = await withCsrf(() => api.put(`/english-skills/writing/${id}`, taskData));
    return response.data;
  },

  /**
   * Delete writing task
   * @param {number} id - Task ID
   * @returns {Promise} API response
   */
  async deleteWritingTask(id) {
    const response = await withCsrf(() => api.delete(`/english-skills/writing/${id}`));
    return response.data;
  },

  /**
   * Upload writing task image
   * @param {number} taskId - Task ID
   * @param {FormData} formData - Image data
   * @returns {Promise} API response
   */
  async uploadWritingImage(taskId, formData) {
    const response = await withCsrf(() =>
      api.post(`/english-skills/writing/${taskId}/image`, formData)
    );
    return response.data;
  },

  // ==================== LISTENING ====================

  /**
   * Get listening tasks by lesson ID
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getListeningTasks(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/english-skills/listening`);
    return data;
  },

  /**
   * Create listening task
   * @param {number} lessonId - Lesson ID
   * @param {object} taskData - Task data
   * @returns {Promise} API response
   */
  async createListeningTask(lessonId, taskData) {
    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/english-skills/listening`, taskData));
    return response.data;
  },

  /**
   * Update listening task
   * @param {number} id - Task ID
   * @param {object} taskData - Updated task data
   * @returns {Promise} API response
   */
  async updateListeningTask(id, taskData) {
    const response = await withCsrf(() => api.put(`/english-skills/listening/${id}`, taskData));
    return response.data;
  },

  /**
   * Delete listening task
   * @param {number} id - Task ID
   * @returns {Promise} API response
   */
  async deleteListeningTask(id) {
    const response = await withCsrf(() => api.delete(`/english-skills/listening/${id}`));
    return response.data;
  },

  /**
   * Upload listening audio
   * @param {number} taskId - Task ID
   * @param {FormData} formData - Audio data
   * @returns {Promise} API response
   */
  async uploadListeningAudio(taskId, formData) {
    const response = await withCsrf(() =>
      api.post(`/english-skills/listening/${taskId}/audio`, formData)
    );
    return response.data;
  },

  // ==================== SPEAKING ====================

  /**
   * Get speaking tasks by lesson ID
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getSpeakingTasks(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/english-skills/speaking`);
    return data;
  },

  /**
   * Create speaking task
   * @param {number} lessonId - Lesson ID
   * @param {object} taskData - Task data
   * @returns {Promise} API response
   */
  async createSpeakingTask(lessonId, taskData) {
    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/english-skills/speaking`, taskData));
    return response.data;
  },

  /**
   * Update speaking task
   * @param {number} id - Task ID
   * @param {object} taskData - Updated task data
   * @returns {Promise} API response
   */
  async updateSpeakingTask(id, taskData) {
    const response = await withCsrf(() => api.put(`/english-skills/speaking/${id}`, taskData));
    return response.data;
  },

  /**
   * Delete speaking task
   * @param {number} id - Task ID
   * @returns {Promise} API response
   */
  async deleteSpeakingTask(id) {
    const response = await withCsrf(() => api.delete(`/english-skills/speaking/${id}`));
    return response.data;
  },

  // ==================== READING ====================

  /**
   * Get reading tasks by lesson ID
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getReadingTasks(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/english-skills/reading`);
    return data;
  },

  /**
   * Create reading task
   * @param {number} lessonId - Lesson ID
   * @param {object} taskData - Task data
   * @returns {Promise} API response
   */
  async createReadingTask(lessonId, taskData) {
    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/english-skills/reading`, taskData));
    return response.data;
  },

  /**
   * Update reading task
   * @param {number} id - Task ID
   * @param {object} taskData - Updated task data
   * @returns {Promise} API response
   */
  async updateReadingTask(id, taskData) {
    const response = await withCsrf(() => api.put(`/english-skills/reading/${id}`, taskData));
    return response.data;
  },

  /**
   * Delete reading task
   * @param {number} id - Task ID
   * @returns {Promise} API response
   */
  async deleteReadingTask(id) {
    const response = await withCsrf(() => api.delete(`/english-skills/reading/${id}`));
    return response.data;
  },

  // ==================== COMMON ====================

  /**
   * Get all skills summary for lesson
   * @param {number} lessonId - Lesson ID
   * @returns {Promise} API response
   */
  async getSkillsSummary(lessonId) {
    const { data } = await api.get(`/lessons/${lessonId}/english-skills/summary`);
    return data;
  }
};
