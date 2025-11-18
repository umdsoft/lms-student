import { defineStore } from 'pinia';
import { directionsApi } from '@/api/directions.api';

/**
 * Directions Pinia Store
 * Manages reactive state for all direction-related data
 */
export const useDirectionsStore = defineStore('directions', {
  state: () => ({
    directions: [],           // Array of all directions
    currentDirection: null,   // Selected direction for detail view
    loading: false,           // Loading indicator
    error: null              // Error message
  }),

  getters: {
    /**
     * Get direction by ID
     * @param {number} id - Direction ID
     * @returns {Object|null} Direction object or null
     */
    getDirectionById: (state) => (id) => {
      return state.directions.find(d => d.id === id) || null;
    },

    /**
     * Get directions filtered by status
     * @param {string} status - Status to filter by
     * @returns {Array} Directions with the specified status
     */
    getDirectionsByStatus: (state) => (status) => {
      return state.directions.filter(d => d.status === status);
    },

    /**
     * Count of active directions
     * @returns {number} Number of active directions
     */
    activeDirectionCount: (state) => {
      return state.directions.filter(d => d.status === 'active').length;
    }
  },

  actions: {
    /**
     * Fetch all directions
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} API response
     */
    async fetchAllDirections(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const response = await directionsApi.getAll(params);
        if (response.success) {
          this.directions = response.data;
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Yo'nalishlarni yuklashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single direction by ID
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async fetchDirectionById(id) {
      this.loading = true;
      this.error = null;

      try {
        console.log(`🔍 [Directions Store] Fetching direction: ${id}`);

        const response = await directionsApi.getById(id);

        if (response.success) {
          this.currentDirection = response.data;

          // Update in directions array if exists
          const index = this.directions.findIndex(d => d.id === id);
          if (index !== -1) {
            this.directions[index] = response.data;
          } else {
            this.directions.push(response.data);
          }

          console.log(`✅ [Directions Store] Direction loaded: ${response.data.name}`);
        } else {
          console.warn('⚠️ [Directions Store] Response success is false:', response);
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Error fetching direction:', error);
        this.error = error.response?.data?.message || "Yo'nalishni yuklashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch direction with its courses
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async fetchDirectionWithCourses(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await directionsApi.getWithCourses(id);
        if (response.success) {
          this.currentDirection = response.data;

          // Update in directions array if exists
          const index = this.directions.findIndex(d => d.id === id);
          if (index !== -1) {
            this.directions[index] = response.data;
          } else {
            this.directions.push(response.data);
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Yo'nalishni yuklashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new direction
     * @param {Object} directionData - Direction data to create
     * @returns {Promise<Object>} API response
     */
    async createDirection(directionData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await directionsApi.create(directionData);
        if (response.success) {
          // Add to store immediately for reactive UI update
          this.directions.push(response.data);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Yo'nalishni yaratishda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update existing direction
     * @param {number} id - Direction ID
     * @param {Object} directionData - Updated direction data
     * @returns {Promise<Object>} API response
     */
    async updateDirection(id, directionData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await directionsApi.update(id, directionData);
        if (response.success) {
          // Update in directions array
          const index = this.directions.findIndex(d => d.id === id);
          if (index !== -1) {
            this.directions[index] = response.data;
          }

          // Update current direction if it's the one being edited
          if (this.currentDirection && this.currentDirection.id === id) {
            this.currentDirection = response.data;
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Yo'nalishni yangilashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Delete direction
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async deleteDirection(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await directionsApi.delete(id);
        if (response.success) {
          // Remove from directions array
          this.directions = this.directions.filter(d => d.id !== id);

          // Clear current direction if it's the one being deleted
          if (this.currentDirection && this.currentDirection.id === id) {
            this.currentDirection = null;
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Yo'nalishni o'chirishda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Set current direction
     * @param {Object} direction - Direction object
     */
    setCurrentDirection(direction) {
      this.currentDirection = direction;
    },

    /**
     * Clear all directions from store
     */
    clearDirections() {
      this.directions = [];
      this.currentDirection = null;
      this.error = null;
    },

    /**
     * Clear error message
     */
    clearError() {
      this.error = null;
    }
  }
});
