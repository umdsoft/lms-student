import api from '../api';
import { apiRequest } from '../api.csrf';
/**
 * Directions API Service
 * Handles all direction-related API calls with proper error handling and CSRF protection
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
  }
};
