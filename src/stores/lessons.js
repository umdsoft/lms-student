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
          // Handle different response formats:
          // 1. Direct array: { success: true, data: [...] }
          // 2. Nested in module: { success: true, data: { id: 1, lessons: [...] } }
          if (Array.isArray(response.data)) {
            this.lessons = response.data;
          } else if (response.data?.lessons && Array.isArray(response.data.lessons)) {
            this.lessons = response.data.lessons;
          } else {
            this.lessons = [];
          }
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
     * @param {number} moduleId - Module ID
     * @param {object} lessonData - Lesson data
     * @returns {Promise} API response
     */
    async createLesson(moduleId, lessonData) {
      this.error = null;

      try {
        const response = await lessonsApi.createLesson(moduleId, lessonData);
        if (response?.success) {
          // Refresh lessons list for this module
          await this.fetchLessonsByModule(moduleId);
          return response;
        }
        throw new Error(response?.message || 'Failed to create lesson');
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
        if (response?.success) {
          // Refresh lessons list for this module
          if (lessonData.moduleId) {
            await this.fetchLessonsByModule(lessonData.moduleId);
          }
          // Update current lesson if it's the one being edited
          if (this.currentLesson?.id === id) {
            await this.fetchLesson(id);
          }
          return response;
        }
        throw new Error(response?.message || 'Failed to update lesson');
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
        if (response?.success) {
          // Refresh lessons list
          if (moduleId) {
            await this.fetchLessonsByModule(moduleId);
          }
          // Clear current lesson if it's the deleted one
          if (this.currentLesson?.id === id) {
            this.currentLesson = null;
          }
          return response;
        }
        throw new Error(response?.message || 'Failed to delete lesson');
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
        if (response?.success) {
          // Refresh lessons list
          await this.fetchLessonsByModule(moduleId);
          return response;
        }
        throw new Error(response?.message || 'Failed to reorder lessons');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Darslarni tartibga solishda xatolik';
        throw error;
      }
    },

    /**
     * Reorder single lesson
     * @param {number} id - Lesson ID
     * @param {number} newOrder - New order position
     * @param {number} moduleId - Module ID (for refreshing)
     */
    async reorderLesson(id, newOrder, moduleId) {
      this.error = null;

      try {
        const response = await lessonsApi.reorderLesson(id, newOrder);
        if (response?.success) {
          // Refresh lessons list
          await this.fetchLessonsByModule(moduleId);
          return response;
        }
        throw new Error(response?.message || 'Failed to reorder lesson');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Darsni tartibga solishda xatolik';
        throw error;
      }
    },

    /**
     * Move lesson up in order
     * @param {number} lessonId - Lesson ID
     * @param {number} moduleId - Module ID
     */
    async moveLessonUp(lessonId, moduleId) {
      const index = this.lessons.findIndex(l => l.id === lessonId);
      if (index > 0) {
        const newOrder = this.lessons[index - 1].order;
        await this.reorderLesson(lessonId, newOrder, moduleId);
      }
    },

    /**
     * Move lesson down in order
     * @param {number} lessonId - Lesson ID
     * @param {number} moduleId - Module ID
     */
    async moveLessonDown(lessonId, moduleId) {
      const index = this.lessons.findIndex(l => l.id === lessonId);
      if (index < this.lessons.length - 1) {
        const newOrder = this.lessons[index + 1].order;
        await this.reorderLesson(lessonId, newOrder, moduleId);
      }
    },

    /**
     * Upload file for lesson
     * @param {number} lessonId - Lesson ID
     * @param {File|FormData} fileData - File or FormData to upload
     */
    async uploadLessonFile(lessonId, fileData) {
      this.error = null;
      this.uploadProgress = 0;

      const formData = fileData instanceof FormData ? fileData : (() => {
        const fd = new FormData();
        fd.append('file', fileData);
        return fd;
      })();

      try {
        const response = await lessonsApi.uploadLessonFile(lessonId, formData);
        if (response?.success) {
          // Refresh current lesson
          await this.fetchLesson(lessonId);
          this.uploadProgress = 100;
          return response;
        }
        throw new Error(response?.message || 'Failed to upload file');
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
     * Upload file for lesson (legacy)
     * @param {number} lessonId - Lesson ID
     * @param {File} file - File to upload
     */
    async uploadFile(lessonId, file) {
      return this.uploadLessonFile(lessonId, file);
    },

    /**
     * Delete file from lesson
     * @param {number} fileId - File ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteLessonFile(fileId, lessonId) {
      this.error = null;

      try {
        const response = await lessonsApi.deleteLessonFile(fileId);
        if (response?.success) {
          // Refresh current lesson
          if (lessonId) {
            await this.fetchLesson(lessonId);
          }
          return response;
        }
        throw new Error(response?.message || 'Failed to delete file');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Faylni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Delete file from lesson (legacy)
     * @param {number} lessonId - Lesson ID
     * @param {number} fileId - File ID
     */
    async deleteFile(lessonId, fileId) {
      return this.deleteLessonFile(fileId, lessonId);
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
