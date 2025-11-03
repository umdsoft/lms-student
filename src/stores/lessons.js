import { defineStore } from 'pinia';
import lessonsApi from '@/api/lessons';

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    lessons: [],
    currentLesson: null,
    loading: false,
    error: null,
    uploadProgress: 0
  }),

  getters: {
    lessonsList: (state) => state.lessons,
    isLoading: (state) => state.loading,
    hasError: (state) => Boolean(state.error),

    /**
     * Get lessons sorted by order
     */
    sortedLessons: (state) => {
      return [...state.lessons].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  },

  actions: {
    /**
     * Fetch lessons by module ID
     * @param {number} moduleId - Module ID
     * @param {object} params - Query parameters
     */
    async fetchLessonsByModule(moduleId, params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await lessonsApi.getLessonsByModule(moduleId, params);
        if (response?.success) {
          this.lessons = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch lessons');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Darslarni yuklashda xatolik';
        this.lessons = [];
        console.error('Fetch lessons error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single lesson by ID
     * @param {number} id - Lesson ID
     */
    async fetchLesson(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await lessonsApi.getLesson(id);
        if (response?.success) {
          this.currentLesson = response.data;
        } else {
          throw new Error(response?.message || 'Failed to fetch lesson');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Darsni yuklashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new lesson
     * @param {object} lessonData - Lesson data
     * @returns {Promise} API response
     */
    async createLesson(lessonData) {
      this.error = null;

      try {
        const response = await lessonsApi.createLesson(lessonData);
        if (response?.data?.success) {
          // Refresh lessons list for this module
          if (lessonData.moduleId) {
            await this.fetchLessonsByModule(lessonData.moduleId);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create lesson');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Dars yaratishda xatolik';
        throw error;
      }
    },

    /**
     * Update existing lesson
     * @param {number} id - Lesson ID
     * @param {object} lessonData - Updated lesson data
     * @returns {Promise} API response
     */
    async updateLesson(id, lessonData) {
      this.error = null;

      try {
        const response = await lessonsApi.updateLesson(id, lessonData);
        if (response?.data?.success) {
          // Refresh lessons list for this module
          if (lessonData.moduleId) {
            await this.fetchLessonsByModule(lessonData.moduleId);
          }
          // Update current lesson if it's the one being edited
          if (this.currentLesson?.id === id) {
            await this.fetchLesson(id);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update lesson');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Darsni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Delete lesson
     * @param {number} id - Lesson ID
     * @param {number} moduleId - Module ID (for refreshing list)
     */
    async deleteLesson(id, moduleId) {
      this.error = null;

      try {
        const response = await lessonsApi.deleteLesson(id);
        if (response?.data?.success) {
          // Refresh lessons list
          if (moduleId) {
            await this.fetchLessonsByModule(moduleId);
          }
          // Clear current lesson if it's the deleted one
          if (this.currentLesson?.id === id) {
            this.currentLesson = null;
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete lesson');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Darsni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Reorder lessons
     * @param {number} moduleId - Module ID
     * @param {Array} lessonIds - Array of lesson IDs in new order
     */
    async reorderLessons(moduleId, lessonIds) {
      this.error = null;

      try {
        const response = await lessonsApi.reorderLessons(moduleId, lessonIds);
        if (response?.data?.success) {
          // Refresh lessons list
          await this.fetchLessonsByModule(moduleId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to reorder lessons');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Darslarni tartibga solishda xatolik';
        throw error;
      }
    },

    /**
     * Move lesson up in order
     * @param {number} moduleId - Module ID
     * @param {number} index - Current index
     */
    async moveLessonUp(moduleId, index) {
      if (index <= 0) return;

      const sortedLessons = this.sortedLessons;
      const newOrder = [...sortedLessons];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];

      const lessonIds = newOrder.map(l => l.id);
      await this.reorderLessons(moduleId, lessonIds);
    },

    /**
     * Move lesson down in order
     * @param {number} moduleId - Module ID
     * @param {number} index - Current index
     */
    async moveLessonDown(moduleId, index) {
      const sortedLessons = this.sortedLessons;
      if (index >= sortedLessons.length - 1) return;

      const newOrder = [...sortedLessons];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];

      const lessonIds = newOrder.map(l => l.id);
      await this.reorderLessons(moduleId, lessonIds);
    },

    /**
     * Upload file for lesson
     * @param {number} lessonId - Lesson ID
     * @param {File} file - File to upload
     */
    async uploadFile(lessonId, file) {
      this.error = null;
      this.uploadProgress = 0;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await lessonsApi.uploadFile(lessonId, formData);
        if (response?.data?.success) {
          // Refresh current lesson
          await this.fetchLesson(lessonId);
          this.uploadProgress = 100;
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to upload file');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Faylni yuklashda xatolik';
        throw error;
      } finally {
        setTimeout(() => {
          this.uploadProgress = 0;
        }, 1000);
      }
    },

    /**
     * Delete file from lesson
     * @param {number} lessonId - Lesson ID
     * @param {number} fileId - File ID
     */
    async deleteFile(lessonId, fileId) {
      this.error = null;

      try {
        const response = await lessonsApi.deleteFile(lessonId, fileId);
        if (response?.data?.success) {
          // Refresh current lesson
          await this.fetchLesson(lessonId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete file');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Faylni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Get lesson statistics
     * @param {number} id - Lesson ID
     */
    async fetchLessonStatistics(id) {
      try {
        const response = await lessonsApi.getLessonStatistics(id);
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
      this.lessons = [];
      this.currentLesson = null;
      this.loading = false;
      this.error = null;
      this.uploadProgress = 0;
    }
  }
});
