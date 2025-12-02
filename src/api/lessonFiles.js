import api from '../api';
import { withCsrf } from '../api.csrf';

export default {
  /**
   * Get all files by lesson ID
   * @param {number} lessonId - Lesson ID
   * @param {object} params - Query parameters
   * @returns {Promise} API response
   */
  async getFilesByLesson(lessonId, params = {}) {
    const { data } = await api.get(`/lessons/${lessonId}/files`, { params });
    return data;
  },

  /**
   * Get single file by ID
   * @param {number} id - File ID
   * @returns {Promise} API response
   */
  async getFile(id) {
    const { data } = await api.get(`/lesson-files/${id}`);
    return data;
  },

  /**
   * Upload file to lesson
   * @param {number} lessonId - Lesson ID
   * @param {FormData} formData - File data
   * @param {function} onProgress - Progress callback
   * @returns {Promise} API response
   */
  async uploadFile(lessonId, formData, onProgress = null) {
    // Axios avtomatik Content-Type va boundary qo'yadi FormData uchun
    const config = {};

    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      };
    }

    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/files`, formData, config));
    return response.data;
  },

  /**
   * Upload multiple files to lesson
   * @param {number} lessonId - Lesson ID
   * @param {FormData} formData - Files data
   * @param {function} onProgress - Progress callback
   * @returns {Promise} API response
   */
  async uploadMultipleFiles(lessonId, formData, onProgress = null) {
    // Axios avtomatik Content-Type va boundary qo'yadi FormData uchun
    const config = {};

    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      };
    }

    const response = await withCsrf(() => api.post(`/lessons/${lessonId}/files/batch`, formData, config));
    return response.data;
  },

  /**
   * Delete a file
   * @param {number} id - File ID
   * @returns {Promise} API response
   */
  async deleteFile(id) {
    const response = await withCsrf(() => api.delete(`/lesson-files/${id}`));
    return response.data;
  },

  /**
   * Download file
   * @param {number} id - File ID
   * @returns {Promise} Blob data
   */
  async downloadFile(id) {
    const response = await api.get(`/lesson-files/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  /**
   * Get file preview URL
   * @param {number} id - File ID
   * @returns {string} Preview URL
   */
  getPreviewUrl(id) {
    return `${api.defaults.baseURL}/lesson-files/${id}/preview`;
  }
};
