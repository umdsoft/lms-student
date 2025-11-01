import { defineStore } from 'pinia';
import coursesApi from '@/api/courses';

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    currentCourse: null,
    loading: false,
    error: null
  }),

  getters: {
    coursesList: (state) => state.courses,
    isLoading: (state) => state.loading,
    hasError: (state) => Boolean(state.error),

    /**
     * Get courses filtered by status
     */
    activeCourses: (state) => state.courses.filter(c => c.status === 'active'),
    inactiveCourses: (state) => state.courses.filter(c => c.status === 'inactive'),
    draftCourses: (state) => state.courses.filter(c => c.status === 'draft'),

    /**
     * Get total enrolled students across all courses
     */
    totalEnrolledStudents: (state) => {
      return state.courses.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);
    }
  },

  actions: {
    /**
     * Fetch courses by direction ID
     * @param {number} directionId - Direction ID
     * @param {object} params - Query parameters
     */
    async fetchCoursesByDirection(directionId, params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await coursesApi.getCoursesByDirection(directionId, params);
        if (response?.success) {
          this.courses = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch courses');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurslarni yuklashda xatolik';
        this.courses = [];
        console.error('Fetch courses error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single course by ID
     * @param {number} id - Course ID
     */
    async fetchCourse(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await coursesApi.getCourse(id);
        if (response?.success) {
          this.currentCourse = response.data;
        } else {
          throw new Error(response?.message || 'Failed to fetch course');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kursni yuklashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new course
     * @param {object} courseData - Course data
     * @returns {Promise} API response
     */
    async createCourse(courseData) {
      this.error = null;

      try {
        const response = await coursesApi.createCourse(courseData);
        if (response?.data?.success) {
          // Refresh courses list for this direction
          if (courseData.directionId) {
            await this.fetchCoursesByDirection(courseData.directionId);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create course');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurs yaratishda xatolik';
        throw error;
      }
    },

    /**
     * Update existing course
     * @param {number} id - Course ID
     * @param {object} courseData - Updated course data
     * @returns {Promise} API response
     */
    async updateCourse(id, courseData) {
      this.error = null;

      try {
        const response = await coursesApi.updateCourse(id, courseData);
        if (response?.data?.success) {
          // Refresh courses list for this direction
          if (courseData.directionId) {
            await this.fetchCoursesByDirection(courseData.directionId);
          }
          // Update current course if it's the one being edited
          if (this.currentCourse?.id === id) {
            await this.fetchCourse(id);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update course');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kursni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Delete course
     * @param {number} id - Course ID
     * @param {number} directionId - Direction ID (for refreshing list)
     */
    async deleteCourse(id, directionId) {
      this.error = null;

      try {
        const response = await coursesApi.deleteCourse(id);
        if (response?.data?.success) {
          // Refresh courses list
          if (directionId) {
            await this.fetchCoursesByDirection(directionId);
          }
          // Clear current course if it's the deleted one
          if (this.currentCourse?.id === id) {
            this.currentCourse = null;
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete course');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Kursni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Update course status
     * @param {number} id - Course ID
     * @param {string} status - New status
     * @param {number} directionId - Direction ID (for refreshing list)
     */
    async updateCourseStatus(id, status, directionId) {
      this.error = null;

      try {
        const response = await coursesApi.updateCourseStatus(id, status);
        if (response?.data?.success) {
          // Refresh courses list
          if (directionId) {
            await this.fetchCoursesByDirection(directionId);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update status');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Statusni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Get course statistics
     * @param {number} id - Course ID
     */
    async fetchCourseStatistics(id) {
      try {
        const response = await coursesApi.getCourseStatistics(id);
        if (response?.success) {
          return response.data;
        }
        throw new Error(response?.message || 'Failed to fetch statistics');
      } catch (error) {
        console.error('Fetch statistics error:', error);
        throw error;
      }
    },

    /**
     * Clear error state
     */
    clearError() {
      this.error = null;
    },

    /**
     * Reset store to initial state
     */
    reset() {
      this.courses = [];
      this.currentCourse = null;
      this.loading = false;
      this.error = null;
    }
  }
});
