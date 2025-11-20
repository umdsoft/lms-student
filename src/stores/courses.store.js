import { defineStore } from 'pinia';
import { coursesApi } from '@/api/courses.api';

/**
 * Courses Pinia Store
 * Manages reactive state for all course-related data
 */
export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],              // Array of all courses
    currentCourse: null,      // Selected course for detail view
    loading: false,           // Loading indicator
    error: null,              // Error message
    pagination: {             // Pagination info
      page: 1,
      limit: 10,
      total: 0
    }
  }),

  getters: {
    /**
     * Get courses filtered by direction ID
     * @param {number} directionId - Direction ID to filter by
     * @returns {Array} Courses for the specified direction
     */
    getCoursesByDirection: (state) => (directionId) => {
      return state.courses.filter(c => c.directionId === directionId);
    },

    /**
     * Get courses filtered by status
     * @param {string} status - Status to filter by
     * @returns {Array} Courses with the specified status
     */
    getCoursesByStatus: (state) => (status) => {
      return state.courses.filter(c => c.status === status);
    },

    /**
     * Get courses filtered by level
     * @param {string} level - Level to filter by
     * @returns {Array} Courses with the specified level
     */
    getCoursesByLevel: (state) => (level) => {
      return state.courses.filter(c => c.level === level);
    },

    /**
     * Count of active courses
     * @returns {number} Number of active courses
     */
    activeCourseCount: (state) => {
      return state.courses.filter(c => c.status === 'active').length;
    },

    /**
     * Count of draft courses
     * @returns {number} Number of draft courses
     */
    draftCourseCount: (state) => {
      return state.courses.filter(c => c.status === 'draft').length;
    },

    /**
     * Get course by ID
     * @param {number} id - Course ID
     * @returns {Object|null} Course object or null
     */
    getCourseById: (state) => (id) => {
      return state.courses.find(c => c.id === id) || null;
    }
  },

  actions: {
    /**
     * Fetch all courses
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} API response
     */
    async fetchAllCourses(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.getAll(params);
        if (response.success) {
          this.courses = response.data;
          if (response.pagination) {
            this.pagination = response.pagination;
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Kurslarni yuklashda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch courses for a specific direction
     * @param {number} directionId - Direction ID
     * @returns {Promise<Object>} API response
     */
    async fetchCoursesByDirection(directionId) {
      this.loading = true;
      this.error = null;

      try {
        console.log(`🔍 [Courses Store] Fetching courses for direction: ${directionId}`);

        const response = await coursesApi.getByDirection(directionId);

        if (response.success) {
          // Remove old courses for this direction
          this.courses = this.courses.filter(c => c.directionId !== directionId);

          // Add new courses - ensure response.data is an array
          let coursesArray = [];

          if (Array.isArray(response.data)) {
            coursesArray = response.data;
          } else if (response.data) {
            // If response.data is an object with courses array
            coursesArray = response.data.courses || response.data.data || [];
          }

          // 🔥 CRITICAL FIX: Add directionId to each course
          // Backend doesn't include directionId in response, so we add it manually
          const coursesWithDirection = coursesArray.map(course => ({
            ...course,
            directionId: directionId // Add directionId field for filtering
          }));

          this.courses.push(...coursesWithDirection);

          console.log(`✅ [Courses Store] Loaded ${coursesWithDirection.length} courses for direction ${directionId}`);
        } else {
          console.warn('⚠️ [Courses Store] Response success is false:', response);
        }

        return response;
      } catch (error) {
        console.error('❌ [Courses Store] Error fetching courses:', error);
        this.error = error.response?.data?.message || 'Kurslarni yuklashda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single course by ID
     * @param {number} id - Course ID
     * @returns {Promise<Object>} API response
     */
    async fetchCourseById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.getById(id);
        if (response.success) {
          this.currentCourse = response.data;

          // Update in courses array if exists
          const index = this.courses.findIndex(c => c.id === id);
          if (index !== -1) {
            this.courses[index] = response.data;
          } else {
            this.courses.push(response.data);
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Kursni yuklashda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single course by slug
     * @param {string} slug - Course slug
     * @returns {Promise<Object>} API response
     */
    async fetchCourseBySlug(slug) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.getBySlug(slug);
        if (response.success) {
          this.currentCourse = response.data;

          // Update in courses array if exists
          const index = this.courses.findIndex(c => c.slug === slug);
          if (index !== -1) {
            this.courses[index] = response.data;
          } else {
            this.courses.push(response.data);
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Kursni yuklashda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new course
     * @param {Object} courseData - Course data to create
     * @returns {Promise<Object>} API response
     */
    async createCourse(courseData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.create(courseData);
        if (response.success) {
          // ⚡ CRITICAL: Add to store immediately for reactive UI update
          this.courses.push(response.data);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Kursni yaratishda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update existing course
     * @param {number} id - Course ID
     * @param {Object} courseData - Updated course data
     * @returns {Promise<Object>} API response
     */
    async updateCourse(id, courseData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.update(id, courseData);
        if (response.success) {
          // Update in courses array
          const index = this.courses.findIndex(c => c.id === id);
          if (index !== -1) {
            this.courses[index] = response.data;
          }

          // Update current course if it's the one being edited
          if (this.currentCourse && this.currentCourse.id === id) {
            this.currentCourse = response.data;
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Kursni yangilashda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Delete course
     * @param {number} id - Course ID
     * @returns {Promise<Object>} API response
     */
    async deleteCourse(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.delete(id);
        if (response.success) {
          // Remove from courses array
          this.courses = this.courses.filter(c => c.id !== id);

          // Clear current course if it's the one being deleted
          if (this.currentCourse && this.currentCourse.id === id) {
            this.currentCourse = null;
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "Kursni o'chirishda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update course status
     * @param {number} id - Course ID
     * @param {string} status - New status
     * @returns {Promise<Object>} API response
     */
    async updateCourseStatus(id, status) {
      this.loading = true;
      this.error = null;
      try {
        const response = await coursesApi.updateStatus(id, status);
        if (response.success) {
          // Update in courses array
          const index = this.courses.findIndex(c => c.id === id);
          if (index !== -1) {
            this.courses[index] = response.data;
          }

          // Update current course if it's the one being updated
          if (this.currentCourse && this.currentCourse.id === id) {
            this.currentCourse = response.data;
          }
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Kurs statusini yangilashda xatolik yuz berdi';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Clear all courses from store
     */
    clearCourses() {
      this.courses = [];
      this.currentCourse = null;
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

// 🔧 HMR: Prevent store corruption during hot module replacement
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log('🔥 [Courses Store] HMR update received');
  });
}
