import { defineStore } from 'pinia';
import modulesApi from '@/api/modules';

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [],
    currentModule: null,
    loading: false,
    error: null
  }),

  getters: {
    modulesList: (state) => state.modules,
    isLoading: (state) => state.loading,
    hasError: (state) => Boolean(state.error),

    /**
     * Get modules sorted by order
     */
    sortedModules: (state) => {
      return [...state.modules].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  },

  actions: {
    /**
     * Fetch modules by course ID
     * @param {number} courseId - Course ID
     * @param {object} params - Query parameters
     */
    async fetchModulesByCourse(courseId, params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await modulesApi.getModulesByCourse(courseId, params);
        if (response?.success) {
          this.modules = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch modules');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Modullarni yuklashda xatolik';
        this.modules = [];
        console.error('Fetch modules error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetch single module by ID
     * @param {number} id - Module ID
     */
    async fetchModule(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await modulesApi.getModule(id);
        if (response?.success) {
          this.currentModule = response.data;
        } else {
          throw new Error(response?.message || 'Failed to fetch module');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Modulni yuklashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create new module
     * @param {object} moduleData - Module data
     * @returns {Promise} API response
     */
    async createModule(moduleData) {
      this.error = null;

      try {
        const response = await modulesApi.createModule(moduleData);
        if (response?.data?.success) {
          // Refresh modules list for this course
          if (moduleData.courseId) {
            await this.fetchModulesByCourse(moduleData.courseId);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create module');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Modul yaratishda xatolik';
        throw error;
      }
    },

    /**
     * Update existing module
     * @param {number} id - Module ID
     * @param {object} moduleData - Updated module data
     * @returns {Promise} API response
     */
    async updateModule(id, moduleData) {
      this.error = null;

      try {
        const response = await modulesApi.updateModule(id, moduleData);
        if (response?.data?.success) {
          // Refresh modules list for this course
          if (moduleData.courseId) {
            await this.fetchModulesByCourse(moduleData.courseId);
          }
          // Update current module if it's the one being edited
          if (this.currentModule?.id === id) {
            await this.fetchModule(id);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update module');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Modulni yangilashda xatolik';
        throw error;
      }
    },

    /**
     * Delete module
     * @param {number} id - Module ID
     * @param {number} courseId - Course ID (for refreshing list)
     */
    async deleteModule(id, courseId) {
      this.error = null;

      try {
        const response = await modulesApi.deleteModule(id);
        if (response?.data?.success) {
          // Refresh modules list
          if (courseId) {
            await this.fetchModulesByCourse(courseId);
          }
          // Clear current module if it's the deleted one
          if (this.currentModule?.id === id) {
            this.currentModule = null;
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete module');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || "Modulni o'chirishda xatolik";
        throw error;
      }
    },

    /**
     * Reorder modules
     * @param {number} courseId - Course ID
     * @param {Array} moduleIds - Array of module IDs in new order
     */
    async reorderModules(courseId, moduleIds) {
      this.error = null;

      try {
        const response = await modulesApi.reorderModules(courseId, moduleIds);
        if (response?.data?.success) {
          // Refresh modules list
          await this.fetchModulesByCourse(courseId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to reorder modules');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Modullarni tartibga solishda xatolik';
        throw error;
      }
    },

    /**
     * Move module up in order
     * @param {number} courseId - Course ID
     * @param {number} index - Current index
     */
    async moveModuleUp(courseId, index) {
      if (index <= 0) return;

      const sortedModules = this.sortedModules;
      const newOrder = [...sortedModules];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];

      const moduleIds = newOrder.map(m => m.id);
      await this.reorderModules(courseId, moduleIds);
    },

    /**
     * Move module down in order
     * @param {number} courseId - Course ID
     * @param {number} index - Current index
     */
    async moveModuleDown(courseId, index) {
      const sortedModules = this.sortedModules;
      if (index >= sortedModules.length - 1) return;

      const newOrder = [...sortedModules];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];

      const moduleIds = newOrder.map(m => m.id);
      await this.reorderModules(courseId, moduleIds);
    },

    /**
     * Get module statistics
     * @param {number} id - Module ID
     */
    async fetchModuleStatistics(id) {
      try {
        const response = await modulesApi.getModuleStatistics(id);
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
      this.modules = [];
      this.currentModule = null;
      this.loading = false;
      this.error = null;
    }
  }
});
