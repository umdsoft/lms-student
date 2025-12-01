import { defineStore } from 'pinia';
import lessonTestsApi from '@/api/lessonTests';

export const useLessonTestsStore = defineStore('lessonTests', {
  state: () => ({
    tests: [],
    currentTest: null,
    loading: false,
    saving: false,
    error: null,
    filters: {
      difficulty: null // 'easy', 'medium', 'hard'
    },
    statistics: {
      totalTests: 0,
      totalPoints: 0,
      estimatedTime: 0
    }
  }),

  getters: {
    testsList: (state) => state.tests,
    isLoading: (state) => state.loading,
    isSaving: (state) => state.saving,
    hasError: (state) => Boolean(state.error),
    testsCount: (state) => state.tests.length,

    /**
     * Get tests filtered by difficulty
     */
    filteredTests: (state) => {
      if (!state.filters.difficulty) return state.tests;
      return state.tests.filter(t => t.difficulty === state.filters.difficulty);
    },

    /**
     * Get tests by difficulty
     */
    getTestsByDifficulty: (state) => (difficulty) => {
      return state.tests.filter(t => t.difficulty === difficulty);
    },

    /**
     * Get total points
     */
    totalPoints: (state) => {
      return state.tests.reduce((sum, test) => sum + (test.points || 0), 0);
    },

    /**
     * Get estimated time in minutes
     */
    estimatedTimeMinutes: (state) => {
      const totalSeconds = state.tests.reduce((sum, test) => sum + (test.timeLimit || 60), 0);
      return Math.ceil(totalSeconds / 60);
    },

    /**
     * Get difficulty counts
     */
    difficultyCounts: (state) => {
      return {
        easy: state.tests.filter(t => t.difficulty === 'easy').length,
        medium: state.tests.filter(t => t.difficulty === 'medium').length,
        hard: state.tests.filter(t => t.difficulty === 'hard').length
      };
    }
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
        const response = await lessonTestsApi.getTestsByLesson(lessonId, params);
        if (response?.success) {
          this.tests = response.data || [];
          if (response.statistics) {
            this.statistics = response.statistics;
          }
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
        const response = await lessonTestsApi.getTest(id);
        if (response?.success) {
          this.currentTest = response.data;
          return response.data;
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
     * @param {number} lessonId - Lesson ID
     * @param {object} testData - Test data
     * @returns {Promise} API response
     */
    async createTest(lessonId, testData) {
      this.saving = true;
      this.error = null;

      try {
        const response = await lessonTestsApi.createTest(lessonId, testData);
        if (response?.success) {
          await this.fetchTestsByLesson(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to create test');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Test yaratishda xatolik';
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Update existing test
     * @param {number} id - Test ID
     * @param {object} testData - Updated test data
     * @param {number} lessonId - Lesson ID (for refreshing)
     * @returns {Promise} API response
     */
    async updateTest(id, testData, lessonId) {
      this.saving = true;
      this.error = null;

      try {
        const response = await lessonTestsApi.updateTest(id, testData);
        if (response?.success) {
          if (lessonId) {
            await this.fetchTestsByLesson(lessonId);
          }
          if (this.currentTest?.id === id) {
            this.currentTest = { ...this.currentTest, ...testData };
          }
          return response;
        }
        throw new Error(response?.message || 'Failed to update test');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Testni yangilashda xatolik';
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Delete test
     * @param {number} id - Test ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteTest(id, lessonId) {
      this.error = null;

      try {
        const response = await lessonTestsApi.deleteTest(id);
        if (response?.success) {
          if (lessonId) {
            await this.fetchTestsByLesson(lessonId);
          } else {
            this.tests = this.tests.filter(t => t.id !== id);
          }
          if (this.currentTest?.id === id) {
            this.currentTest = null;
          }
          return response;
        }
        throw new Error(response?.message || 'Failed to delete test');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Testni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Reorder tests
     * @param {number} lessonId - Lesson ID
     * @param {Array} testIds - Array of test IDs in new order
     */
    async reorderTests(lessonId, testIds) {
      this.error = null;

      try {
        const response = await lessonTestsApi.reorderTests(lessonId, testIds);
        if (response?.success) {
          await this.fetchTestsByLesson(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to reorder tests');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Testlarni tartibga solishda xatolik';
        throw error;
      }
    },

    /**
     * Import tests from XLSX data (parsed client-side)
     * @param {number} lessonId - Lesson ID
     * @param {Array} tests - Parsed test objects
     * @returns {Promise} API response
     */
    async importTests(lessonId, tests) {
      this.saving = true;
      this.error = null;

      try {
        const response = await lessonTestsApi.bulkCreateTests(lessonId, tests);
        if (response?.success) {
          await this.fetchTestsByLesson(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to import tests');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Testlarni import qilishda xatolik';
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Set difficulty filter
     * @param {string|null} difficulty - Difficulty level or null for all
     */
    setDifficultyFilter(difficulty) {
      this.filters.difficulty = difficulty;
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
      this.saving = false;
      this.error = null;
      this.filters = { difficulty: null };
      this.statistics = { totalTests: 0, totalPoints: 0, estimatedTime: 0 };
    }
  }
});
