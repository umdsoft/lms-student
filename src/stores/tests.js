import { defineStore } from 'pinia';
import testsApi from '@/api/tests';

export const useTestsStore = defineStore('tests', {
  state: () => ({
    tests: [],
    currentTest: null,
    loading: false,
    error: null
  }),

  getters: {
    testsList: (state) => state.tests,
    isLoading: (state) => state.loading,
    hasError: (state) => Boolean(state.error)
  },

  actions: {
    /**
     * Fetch tests by lesson ID
     * @param {number} lessonId - Lesson ID
     * @param {object} params - Query parameters
     */
    async fetchTestsByLesson(lessonId, params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await testsApi.getTestsByLesson(lessonId, params);
        if (response?.success) {
          this.tests = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch tests');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Testlarni yuklashda xatolik';
        this.tests = [];
        console.error('Fetch tests error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single test by ID
     * @param {number} id - Test ID
     */
    async fetchTest(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await testsApi.getTest(id);
        if (response?.success) {
          this.currentTest = response.data;
        } else {
          throw new Error(response?.message || 'Failed to fetch test');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Testni yuklashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new test
     * @param {object} testData - Test data
     * @returns {Promise} API response
     */
    async createTest(testData) {
      this.error = null;

      try {
        const response = await testsApi.createTest(testData);
        if (response?.data?.success) {
          // Refresh tests list for this lesson
          if (testData.lessonId) {
            await this.fetchTestsByLesson(testData.lessonId);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create test');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Test yaratishda xatolik';
        throw error;
      }
    },

    /**
     * Update existing test
     * @param {number} id - Test ID
     * @param {object} testData - Updated test data
     * @returns {Promise} API response
     */
    async updateTest(id, testData) {
      this.error = null;

      try {
        const response = await testsApi.updateTest(id, testData);
        if (response?.data?.success) {
          // Refresh tests list for this lesson
          if (testData.lessonId) {
            await this.fetchTestsByLesson(testData.lessonId);
          }
          // Update current test if it's the one being edited
          if (this.currentTest?.id === id) {
            await this.fetchTest(id);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update test');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Testni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Delete test
     * @param {number} id - Test ID
     * @param {number} lessonId - Lesson ID (for refreshing list)
     */
    async deleteTest(id, lessonId) {
      this.error = null;

      try {
        const response = await testsApi.deleteTest(id);
        if (response?.data?.success) {
          // Refresh tests list
          if (lessonId) {
            await this.fetchTestsByLesson(lessonId);
          }
          // Clear current test if it's the deleted one
          if (this.currentTest?.id === id) {
            this.currentTest = null;
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete test');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Testni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Get test statistics
     * @param {number} id - Test ID
     */
    async fetchTestStatistics(id) {
      try {
        const response = await testsApi.getTestStatistics(id);
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
      this.tests = [];
      this.currentTest = null;
      this.loading = false;
      this.error = null;
    }
  }
});
