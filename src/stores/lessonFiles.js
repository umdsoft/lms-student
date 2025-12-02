import { defineStore } from 'pinia';
import lessonFilesApi from '@/api/lessonFiles';

export const useLessonFilesStore = defineStore('lessonFiles', {
  state: () => ({
    files: [],
    loading: false,
    uploading: false,
    uploadProgress: 0,
    error: null
  }),

  getters: {
    filesList: (state) => state.files,
    isLoading: (state) => state.loading,
    isUploading: (state) => state.uploading,
    hasError: (state) => Boolean(state.error),
    filesCount: (state) => state.files.length,

    /**
     * Get files by type
     */
    getFilesByType: (state) => (type) => {
      return state.files.filter(f => f.type === type || f.mimeType?.startsWith(type));
    },

    /**
     * Get images only
     */
    images: (state) => {
      return state.files.filter(f => f.mimeType?.startsWith('image/'));
    },

    /**
     * Get documents only
     */
    documents: (state) => {
      return state.files.filter(f =>
        f.mimeType?.includes('pdf') ||
        f.mimeType?.includes('word') ||
        f.mimeType?.includes('document') ||
        f.mimeType?.includes('spreadsheet') ||
        f.mimeType?.includes('excel')
      );
    }
  },

  actions: {
    /**
     * Fetch files by lesson ID
     * @param {number} lessonId - Lesson ID
     */
    async fetchFilesByLesson(lessonId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await lessonFilesApi.getFilesByLesson(lessonId);
        if (response?.success) {
          // Handle different response formats:
          // 1. Direct array: { success: true, data: [...] }
          // 2. Nested files: { success: true, data: { files: [...], total: N } }
          // 3. Nested items: { success: true, data: { items: [...], total: N } }
          if (Array.isArray(response.data)) {
            this.files = response.data;
          } else if (response.data?.files && Array.isArray(response.data.files)) {
            this.files = response.data.files;
          } else if (response.data?.items && Array.isArray(response.data.items)) {
            this.files = response.data.items;
          } else {
            this.files = [];
          }
        } else {
          throw new Error(response?.message || 'Failed to fetch files');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fayllarni yuklashda xatolik';
        this.files = [];
        console.error('Fetch files error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Upload file to lesson
     * @param {number} lessonId - Lesson ID
     * @param {File} file - File to upload
     * @returns {Promise} API response
     */
    async uploadFile(lessonId, file) {
      this.uploading = true;
      this.uploadProgress = 0;
      this.error = null;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await lessonFilesApi.uploadFile(lessonId, formData, (progress) => {
          this.uploadProgress = progress;
        });

        if (response?.success) {
          await this.fetchFilesByLesson(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to upload file');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Faylni yuklashda xatolik';
        throw error;
      } finally {
        this.uploading = false;
        setTimeout(() => {
          this.uploadProgress = 0;
        }, 1000);
      }
    },

    /**
     * Upload multiple files to lesson
     * @param {number} lessonId - Lesson ID
     * @param {File[]} files - Files to upload
     * @returns {Promise} API response
     */
    async uploadMultipleFiles(lessonId, files) {
      this.uploading = true;
      this.uploadProgress = 0;
      this.error = null;

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      try {
        const response = await lessonFilesApi.uploadMultipleFiles(lessonId, formData, (progress) => {
          this.uploadProgress = progress;
        });

        if (response?.success) {
          await this.fetchFilesByLesson(lessonId);
          return response;
        }
        throw new Error(response?.message || 'Failed to upload files');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fayllarni yuklashda xatolik';
        throw error;
      } finally {
        this.uploading = false;
        setTimeout(() => {
          this.uploadProgress = 0;
        }, 1000);
      }
    },

    /**
     * Delete file
     * @param {number} fileId - File ID
     * @param {number} lessonId - Lesson ID (for refreshing)
     */
    async deleteFile(fileId, lessonId) {
      this.error = null;

      try {
        const response = await lessonFilesApi.deleteFile(fileId);
        if (response?.success) {
          if (lessonId) {
            await this.fetchFilesByLesson(lessonId);
          } else {
            this.files = this.files.filter(f => f.id !== fileId);
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
     * Download file
     * @param {object} file - File object
     */
    async downloadFile(file) {
      try {
        const blob = await lessonFilesApi.downloadFile(file.id);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name || file.originalName || 'file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        this.error = error.message || 'Faylni yuklab olishda xatolik';
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
      this.files = [];
      this.loading = false;
      this.uploading = false;
      this.uploadProgress = 0;
      this.error = null;
    }
  }
});
