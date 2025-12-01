import { defineStore } from 'pinia';
import englishSkillsApi from '@/api/englishSkills';

export const useEnglishSkillsStore = defineStore('englishSkills', {
  state: () => ({
    writing: {
      tasks: [],
      loading: false,
      error: null
    },
    listening: {
      tasks: [],
      loading: false,
      error: null
    },
    speaking: {
      tasks: [],
      loading: false,
      error: null
    },
    reading: {
      tasks: [],
      loading: false,
      error: null
    },
    saving: false,
    activeTab: 'writing'
  }),

  getters: {
    writingTasks: (state) => state.writing.tasks,
    listeningTasks: (state) => state.listening.tasks,
    speakingTasks: (state) => state.speaking.tasks,
    readingTasks: (state) => state.reading.tasks,

    isLoading: (state) => (skill) => state[skill]?.loading || false,
    isSaving: (state) => state.saving,
    hasError: (state) => (skill) => Boolean(state[skill]?.error),

    /**
     * Get tasks count for each skill
     */
    tasksCounts: (state) => ({
      writing: state.writing.tasks.length,
      listening: state.listening.tasks.length,
      speaking: state.speaking.tasks.length,
      reading: state.reading.tasks.length
    }),

    /**
     * Get total tasks count
     */
    totalTasksCount: (state) => {
      return state.writing.tasks.length +
             state.listening.tasks.length +
             state.speaking.tasks.length +
             state.reading.tasks.length;
    }
  },

  actions: {
    // ==================== WRITING ====================

    /**
     * Fetch writing tasks
     * @param {number} lessonId - Lesson ID
     */
    async fetchWritingTasks(lessonId) {
      this.writing.loading = true;
      this.writing.error = null;

      try {
        const response = await englishSkillsApi.getWritingTasks(lessonId);
        if (response?.success) {
          this.writing.tasks = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch writing tasks');
        }
      } catch (error) {
        this.writing.error = error.response?.data?.message || error.message || 'Writing topshiriqlarni yuklashda xatolik';
        this.writing.tasks = [];
      } finally {
        this.writing.loading = false;
      }
    },

    /**
     * Create writing task
     * @param {number} lessonId - Lesson ID
     * @param {object} taskData - Task data
     */
    async createWritingTask(lessonId, taskData) {
      this.saving = true;
      this.writing.error = null;

      try {
        const response = await englishSkillsApi.createWritingTask(lessonId, taskData);
        if (response?.success) {
          await this.fetchWritingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to create writing task');
      } catch (error) {
        this.writing.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Update writing task
     * @param {number} id - Task ID
     * @param {object} taskData - Task data
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async updateWritingTask(id, taskData, lessonId) {
      this.saving = true;
      this.writing.error = null;

      try {
        const response = await englishSkillsApi.updateWritingTask(id, taskData);
        if (response?.success) {
          if (lessonId) await this.fetchWritingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to update writing task');
      } catch (error) {
        this.writing.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Delete writing task
     * @param {number} id - Task ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteWritingTask(id, lessonId) {
      this.writing.error = null;

      try {
        const response = await englishSkillsApi.deleteWritingTask(id);
        if (response?.success) {
          if (lessonId) await this.fetchWritingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to delete writing task');
      } catch (error) {
        this.writing.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

    // ==================== LISTENING ====================

    /**
     * Fetch listening tasks
     * @param {number} lessonId - Lesson ID
     */
    async fetchListeningTasks(lessonId) {
      this.listening.loading = true;
      this.listening.error = null;

      try {
        const response = await englishSkillsApi.getListeningTasks(lessonId);
        if (response?.success) {
          this.listening.tasks = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch listening tasks');
        }
      } catch (error) {
        this.listening.error = error.response?.data?.message || error.message || 'Listening topshiriqlarni yuklashda xatolik';
        this.listening.tasks = [];
      } finally {
        this.listening.loading = false;
      }
    },

    /**
     * Create listening task
     * @param {number} lessonId - Lesson ID
     * @param {object} taskData - Task data
     */
    async createListeningTask(lessonId, taskData) {
      this.saving = true;
      this.listening.error = null;

      try {
        const response = await englishSkillsApi.createListeningTask(lessonId, taskData);
        if (response?.success) {
          await this.fetchListeningTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to create listening task');
      } catch (error) {
        this.listening.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Update listening task
     * @param {number} id - Task ID
     * @param {object} taskData - Task data
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async updateListeningTask(id, taskData, lessonId) {
      this.saving = true;
      this.listening.error = null;

      try {
        const response = await englishSkillsApi.updateListeningTask(id, taskData);
        if (response?.success) {
          if (lessonId) await this.fetchListeningTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to update listening task');
      } catch (error) {
        this.listening.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Delete listening task
     * @param {number} id - Task ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteListeningTask(id, lessonId) {
      this.listening.error = null;

      try {
        const response = await englishSkillsApi.deleteListeningTask(id);
        if (response?.success) {
          if (lessonId) await this.fetchListeningTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to delete listening task');
      } catch (error) {
        this.listening.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

    // ==================== SPEAKING ====================

    /**
     * Fetch speaking tasks
     * @param {number} lessonId - Lesson ID
     */
    async fetchSpeakingTasks(lessonId) {
      this.speaking.loading = true;
      this.speaking.error = null;

      try {
        const response = await englishSkillsApi.getSpeakingTasks(lessonId);
        if (response?.success) {
          this.speaking.tasks = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch speaking tasks');
        }
      } catch (error) {
        this.speaking.error = error.response?.data?.message || error.message || 'Speaking topshiriqlarni yuklashda xatolik';
        this.speaking.tasks = [];
      } finally {
        this.speaking.loading = false;
      }
    },

    /**
     * Create speaking task
     * @param {number} lessonId - Lesson ID
     * @param {object} taskData - Task data
     */
    async createSpeakingTask(lessonId, taskData) {
      this.saving = true;
      this.speaking.error = null;

      try {
        const response = await englishSkillsApi.createSpeakingTask(lessonId, taskData);
        if (response?.success) {
          await this.fetchSpeakingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to create speaking task');
      } catch (error) {
        this.speaking.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Update speaking task
     * @param {number} id - Task ID
     * @param {object} taskData - Task data
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async updateSpeakingTask(id, taskData, lessonId) {
      this.saving = true;
      this.speaking.error = null;

      try {
        const response = await englishSkillsApi.updateSpeakingTask(id, taskData);
        if (response?.success) {
          if (lessonId) await this.fetchSpeakingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to update speaking task');
      } catch (error) {
        this.speaking.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Delete speaking task
     * @param {number} id - Task ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteSpeakingTask(id, lessonId) {
      this.speaking.error = null;

      try {
        const response = await englishSkillsApi.deleteSpeakingTask(id);
        if (response?.success) {
          if (lessonId) await this.fetchSpeakingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to delete speaking task');
      } catch (error) {
        this.speaking.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

    // ==================== READING ====================

    /**
     * Fetch reading tasks
     * @param {number} lessonId - Lesson ID
     */
    async fetchReadingTasks(lessonId) {
      this.reading.loading = true;
      this.reading.error = null;

      try {
        const response = await englishSkillsApi.getReadingTasks(lessonId);
        if (response?.success) {
          this.reading.tasks = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to fetch reading tasks');
        }
      } catch (error) {
        this.reading.error = error.response?.data?.message || error.message || 'Reading topshiriqlarni yuklashda xatolik';
        this.reading.tasks = [];
      } finally {
        this.reading.loading = false;
      }
    },

    /**
     * Create reading task
     * @param {number} lessonId - Lesson ID
     * @param {object} taskData - Task data
     */
    async createReadingTask(lessonId, taskData) {
      this.saving = true;
      this.reading.error = null;

      try {
        const response = await englishSkillsApi.createReadingTask(lessonId, taskData);
        if (response?.success) {
          await this.fetchReadingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to create reading task');
      } catch (error) {
        this.reading.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Update reading task
     * @param {number} id - Task ID
     * @param {object} taskData - Task data
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async updateReadingTask(id, taskData, lessonId) {
      this.saving = true;
      this.reading.error = null;

      try {
        const response = await englishSkillsApi.updateReadingTask(id, taskData);
        if (response?.success) {
          if (lessonId) await this.fetchReadingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to update reading task');
      } catch (error) {
        this.reading.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    /**
     * Delete reading task
     * @param {number} id - Task ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteReadingTask(id, lessonId) {
      this.reading.error = null;

      try {
        const response = await englishSkillsApi.deleteReadingTask(id);
        if (response?.success) {
          if (lessonId) await this.fetchReadingTasks(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to delete reading task');
      } catch (error) {
        this.reading.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

    // ==================== COMMON ====================

    /**
     * Fetch all skills for lesson
     * @param {number} lessonId - Lesson ID
     */
    async fetchAllSkills(lessonId) {
      await Promise.all([
        this.fetchWritingTasks(lessonId),
        this.fetchListeningTasks(lessonId),
        this.fetchSpeakingTasks(lessonId),
        this.fetchReadingTasks(lessonId)
      ]);
    },

    /**
     * Set active tab
     * @param {string} tab - Tab name
     */
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    /**
     * Clear all errors
     */
    clearErrors() {
      this.writing.error = null;
      this.listening.error = null;
      this.speaking.error = null;
      this.reading.error = null;
    },

    /**
     * Reset store to initial state
     */
    reset() {
      this.writing = { tasks: [], loading: false, error: null };
      this.listening = { tasks: [], loading: false, error: null };
      this.speaking = { tasks: [], loading: false, error: null };
      this.reading = { tasks: [], loading: false, error: null };
      this.saving = false;
      this.activeTab = 'writing';
    }
  }
});
