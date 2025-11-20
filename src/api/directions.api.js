import api from '../api';
import { apiRequest, withCsrf } from '../api.csrf';

/**
 * Unified Directions API Service
 * Handles all direction-related API calls with proper error handling and CSRF protection
 * Consolidated from multiple API files to prevent conflicts
 */
export const directionsApi = {
  /**
   * Get all directions
   * @param {Object} params - Query parameters (status, search, etc.)
   * @returns {Promise<Object>} API response with directions array
   */
  async getAll(params = {}) {
    try {
      const response = await api.get('/directions', { params });
      return response.data;
    } catch (error) {
      console.error('Get all directions error:', error);
      throw error;
    }
  },

  /**
   * Get directions (Alias for getAll for backward compatibility)
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} API response
   */
  async getDirections(params = {}) {
    return this.getAll(params);
  },

  /**
   * Get statistics
   * @returns {Promise<Object>} API response with statistics
   */
  async getStatistics() {
    try {
      const response = await api.get('/directions/statistics');
      return response.data;
    } catch (error) {
      console.error('Get statistics error:', error);
      throw error;
    }
  },

  /**
   * Get single direction by ID
   * @param {number} id - Direction ID
   * @returns {Promise<Object>} API response with direction data
   */
  async getById(id) {
    try {
      const response = await api.get(`/directions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get direction by ID error:', error);
      throw error;
    }
  },

  /**
   * Get single direction (Alias for getById for backward compatibility)
   * @param {number} id - Direction ID
   * @returns {Promise<Object>} API response
   */
  async getDirection(id) {
    return this.getById(id);
  },

  /**
   * Get direction with its courses
   * @param {number} id - Direction ID
   * @returns {Promise<Object>} API response with direction and courses
   */
  async getWithCourses(id) {
    try {
      const response = await api.get(`/directions/${id}`, {
        params: { include: 'courses' }
      });
      return response.data;
    } catch (error) {
      console.error('Get direction with courses error:', error);
      throw error;
    }
  },

  /**
   * Create new direction
   * @param {Object} directionData - Direction data to create
   * @returns {Promise<Object>} API response with created direction
   */
  async create(directionData) {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/directions',
        data: directionData
      });
      return response.data;
    } catch (error) {
      console.error('Create direction error:', error);
      throw error;
    }
  },

  /**
   * Create direction (Alias for create for backward compatibility)
   * @param {Object} directionData - Direction data
   * @returns {Promise<Object>} API response
   */
  async createDirection(directionData) {
    return withCsrf(() => api.post('/directions', directionData));
  },

  /**
   * Update existing direction
   * @param {number} id - Direction ID
   * @param {Object} directionData - Updated direction data
   * @returns {Promise<Object>} API response with updated direction
   */
  async update(id, directionData) {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/directions/${id}`,
        data: directionData
      });
      return response.data;
    } catch (error) {
      console.error('Update direction error:', error);
      throw error;
    }
  },

  /**
   * Update direction (Alias for update for backward compatibility)
   * @param {number} id - Direction ID
   * @param {Object} directionData - Updated data
   * @returns {Promise<Object>} API response
   */
  async updateDirection(id, directionData) {
    return withCsrf(() => api.put(`/directions/${id}`, directionData));
  },

  /**
   * Update direction status
   * @param {number} id - Direction ID
   * @param {string} status - New status
   * @returns {Promise<Object>} API response
   */
  async updateStatus(id, status) {
    try {
      const response = await apiRequest({
        method: 'PATCH',
        url: `/directions/${id}/status`,
        data: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Update direction status error:', error);
      throw error;
    }
  },

  /**
   * Update direction status (Alias for backward compatibility)
   * @param {number} id - Direction ID
   * @param {string} status - New status
   * @returns {Promise<Object>} API response
   */
  async updateDirectionStatus(id, status) {
    return withCsrf(() => api.patch(`/directions/${id}/status`, { status }));
  },

  /**
   * Delete direction
   * @param {number} id - Direction ID
   * @returns {Promise<Object>} API response
   */
  async delete(id) {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/directions/${id}`
      });
      return response.data;
    } catch (error) {
      console.error('Delete direction error:', error);
      throw error;
    }
  },

  /**
   * Delete direction (Alias for backward compatibility)
   * @param {number} id - Direction ID
   * @returns {Promise<Object>} API response
   */
  async deleteDirection(id) {
    return withCsrf(() => api.delete(`/directions/${id}`));
  },

  // ============================================
  // Subject Management
  // ============================================

  /**
   * Get subjects for a direction
   * @param {number} directionId - Direction ID
   * @returns {Promise<Object>} API response with subjects
   */
  async getSubjects(directionId) {
    try {
      const response = await api.get(`/directions/${directionId}/subjects`);
      return response.data;
    } catch (error) {
      console.error('Get subjects error:', error);
      throw error;
    }
  },

  /**
   * Add subjects to direction
   * @param {number} directionId - Direction ID
   * @param {Array} subjects - Subjects to add
   * @returns {Promise<Object>} API response
   */
  async addSubjects(directionId, subjects) {
    return withCsrf(() => api.post(`/directions/${directionId}/subjects`, { subjects }));
  },

  /**
   * Create subject for direction
   * @param {number} directionId - Direction ID
   * @param {Object} subjectData - Subject data
   * @returns {Promise<Object>} API response
   */
  async createSubject(directionId, subjectData) {
    return withCsrf(() => api.post(`/directions/${directionId}/subjects`, subjectData));
  },

  /**
   * Update subject
   * @param {number} directionId - Direction ID
   * @param {number} subjectId - Subject ID
   * @param {Object} subjectData - Updated subject data
   * @returns {Promise<Object>} API response
   */
  async updateSubject(directionId, subjectId, subjectData) {
    return withCsrf(() => api.put(`/directions/${directionId}/subjects/${subjectId}`, subjectData));
  },

  /**
   * Remove/Delete subject
   * @param {number} directionId - Direction ID
   * @param {number} subjectId - Subject ID
   * @returns {Promise<Object>} API response
   */
  async removeSubject(directionId, subjectId) {
    return withCsrf(() => api.delete(`/directions/${directionId}/subjects/${subjectId}`));
  },

  /**
   * Reorder subjects
   * @param {number} directionId - Direction ID
   * @param {Array} subjectIds - Ordered array of subject IDs
   * @returns {Promise<Object>} API response
   */
  async reorderSubjects(directionId, subjectIds) {
    return withCsrf(() => api.put(`/directions/${directionId}/subjects/reorder`, { subjectIds }));
  },

  // ============================================
  // Teacher Management
  // ============================================

  /**
   * Get teachers for a direction
   * @param {number} directionId - Direction ID
   * @returns {Promise<Object>} API response with teachers
   */
  async getTeachers(directionId) {
    try {
      const response = await api.get(`/directions/${directionId}/teachers`);
      return response.data;
    } catch (error) {
      console.error('Get teachers error:', error);
      throw error;
    }
  },

  /**
   * Assign teachers to direction
   * @param {number} directionId - Direction ID
   * @param {Array} teacherIds - Teacher IDs to assign
   * @returns {Promise<Object>} API response
   */
  async assignTeachers(directionId, teacherIds) {
    return withCsrf(() => api.post(`/directions/${directionId}/teachers`, { teacherIds }));
  },

  /**
   * Remove teacher from direction
   * @param {number} directionId - Direction ID
   * @param {number} teacherId - Teacher ID to remove
   * @returns {Promise<Object>} API response
   */
  async removeTeacher(directionId, teacherId) {
    return withCsrf(() => api.delete(`/directions/${directionId}/teachers/${teacherId}`));
  },

  // ============================================
  // Course Management
  // ============================================

  /**
   * Get courses for a direction
   * @param {number} directionId - Direction ID
   * @returns {Promise<Object>} API response with courses
   */
  async getCourses(directionId) {
    try {
      const response = await api.get(`/directions/${directionId}/courses`);
      return response.data;
    } catch (error) {
      console.error('Get courses error:', error);
      throw error;
    }
  },

  /**
   * Create course for direction
   * @param {number} directionId - Direction ID
   * @param {Object} courseData - Course data
   * @returns {Promise<Object>} API response
   */
  async createCourse(directionId, courseData) {
    return withCsrf(() => api.post(`/directions/${directionId}/courses`, courseData));
  },

  /**
   * Update course
   * @param {number} directionId - Direction ID
   * @param {number} courseId - Course ID
   * @param {Object} courseData - Updated course data
   * @returns {Promise<Object>} API response
   */
  async updateCourse(directionId, courseId, courseData) {
    return withCsrf(() => api.put(`/directions/${directionId}/courses/${courseId}`, courseData));
  },

  /**
   * Delete course
   * @param {number} directionId - Direction ID
   * @param {number} courseId - Course ID
   * @returns {Promise<Object>} API response
   */
  async deleteCourse(directionId, courseId) {
    return withCsrf(() => api.delete(`/directions/${directionId}/courses/${courseId}`));
  },

  /**
   * Update course status
   * @param {number} directionId - Direction ID
   * @param {number} courseId - Course ID
   * @param {boolean} isPublished - Published status
   * @returns {Promise<Object>} API response
   */
  async updateCourseStatus(directionId, courseId, isPublished) {
    return withCsrf(() => api.patch(`/directions/${directionId}/courses/${courseId}/status`, { isPublished }));
  }
};

// Default export for backward compatibility
export default directionsApi;
