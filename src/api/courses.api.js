import api from '../api';
import { apiRequest } from '../api.csrf';

/**
 * Courses API Service
 * Handles all course-related API calls with proper error handling and CSRF protection
 */
export const coursesApi = {
  /**
   * Get all courses with optional filters
   * @param {Object} params - Query parameters (status, level, search, directionId, etc.)
   * @returns {Promise<Object>} API response with courses array
   */
  async getAll(params = {}) {
    try {
      const response = await api.get('/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Get all courses error:', error);
      throw error;
    }
  },

  /**
   * Get courses for a specific direction
   * @param {number} directionId - Direction ID
   * @returns {Promise<Object>} API response with courses array
   */
  async getByDirection(directionId) {
    try {
      const response = await api.get(`/directions/${directionId}/courses`);
      return response.data;
    } catch (error) {
      console.error('Get courses by direction error:', error);
      throw error;
    }
  },

  /**
   * Get single course by ID
   * @param {number} id - Course ID
   * @returns {Promise<Object>} API response with course data
   */
  async getById(id) {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get course by ID error:', error);
      throw error;
    }
  },

  /**
   * Get single course by slug
   * @param {string} slug - Course slug
   * @returns {Promise<Object>} API response with course data
   */
  async getBySlug(slug) {
    try {
      const response = await api.get(`/courses/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Get course by slug error:', error);
      throw error;
    }
  },

  /**
   * Create new course
   * @param {Object} courseData - Course data to create
   * @returns {Promise<Object>} API response with created course
   */
  async create(courseData) {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/courses',
        data: courseData
      });
      return response.data;
    } catch (error) {
      console.error('Create course error:', error);
      throw error;
    }
  },

  /**
   * Update existing course
   * @param {number} id - Course ID
   * @param {Object} courseData - Updated course data
   * @returns {Promise<Object>} API response with updated course
   */
  async update(id, courseData) {
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/courses/${id}`,
        data: courseData
      });
      return response.data;
    } catch (error) {
      console.error('Update course error:', error);
      throw error;
    }
  },

  /**
   * Delete course
   * @param {number} id - Course ID
   * @returns {Promise<Object>} API response
   */
  async delete(id) {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: `/courses/${id}`
      });
      return response.data;
    } catch (error) {
      console.error('Delete course error:', error);
      throw error;
    }
  },

  /**
   * Update course status
   * @param {number} id - Course ID
   * @param {string} status - New status (active, draft, inactive, archived)
   * @returns {Promise<Object>} API response with updated course
   */
  async updateStatus(id, status) {
    try {
      const response = await apiRequest({
        method: 'PATCH',
        url: `/courses/${id}/status`,
        data: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Update course status error:', error);
      throw error;
    }
  }
};
