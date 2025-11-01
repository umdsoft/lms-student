import { defineStore } from 'pinia';
import directionsApi from '@/api/directions';

const DEFAULT_STATISTICS = {
  total: 0,
  active: 0,
  inactive: 0,
  totalStudents: 0,
  totalCourses: 0
};

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 0
};

const DEFAULT_FILTERS = {
  search: '',
  status: '',
  sortBy: 'displayOrder',
  sortOrder: 'asc'
};

export const useDirectionsStore = defineStore('directions', {
  state: () => ({
    directions: [],
    currentDirection: null,
    statistics: { ...DEFAULT_STATISTICS },
    pagination: { ...DEFAULT_PAGINATION },
    filters: { ...DEFAULT_FILTERS },
    loading: false,
    statisticsLoading: false,
    error: null
  }),

  getters: {
    directionsList: (state) => state.directions,
    stats: (state) => state.statistics,
    paginationInfo: (state) => state.pagination,
    isLoading: (state) => state.loading,
    hasError: (state) => Boolean(state.error)
  },

  actions: {
    async fetchDirections() {
      this.loading = true;
      this.error = null;

      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          search: this.filters.search,
          status: this.filters.status,
          sortBy: this.filters.sortBy,
          sortOrder: this.filters.sortOrder
        };

        const response = await directionsApi.getDirections(params);

        if (response?.success) {
          this.directions = response.data?.directions ?? [];
          if (response.data?.pagination) {
            this.pagination = {
              ...this.pagination,
              ...response.data.pagination
            };
          }
          if (response.data?.statistics) {
            this.statistics = {
              ...DEFAULT_STATISTICS,
              ...response.data.statistics
            };
          }
        } else {
          throw new Error(response?.message || 'Failed to load directions');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Yo\'nalishlarni yuklashda xatolik';
        this.directions = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchStatistics() {
      this.statisticsLoading = true;
      try {
        const response = await directionsApi.getStatistics();
        if (response?.success) {
          this.statistics = {
            ...DEFAULT_STATISTICS,
            ...response.data
          };
        } else {
          throw new Error(response?.message || 'Failed to load statistics');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Statistikani yuklashda xatolik';
        this.statistics = { ...DEFAULT_STATISTICS };
      } finally {
        this.statisticsLoading = false;
      }
    },

    async fetchDirection(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await directionsApi.getDirection(id);
        if (response?.success) {
          this.currentDirection = response.data;
        } else {
          throw new Error(response?.message || 'Failed to load direction');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Yo\'nalishni yuklashda xatolik';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createDirection(directionData) {
      this.error = null;
      try {
        const response = await directionsApi.createDirection(directionData);
        if (response?.data?.success) {
          await this.fetchDirections();
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create direction');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Yo\'nalish yaratishda xatolik';
        throw error;
      }
    },

    async updateDirection(id, directionData) {
      this.error = null;
      try {
        const response = await directionsApi.updateDirection(id, directionData);
        if (response?.data?.success) {
          await this.fetchDirections();
          if (this.currentDirection?.id === id) {
            await this.fetchDirection(id);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update direction');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Yo\'nalishni yangilashda xatolik';
        throw error;
      }
    },

    async updateDirectionStatus(id, status) {
      this.error = null;
      try {
        const response = await directionsApi.updateDirectionStatus(id, status);
        if (response?.data?.success) {
          await this.fetchDirections();
          if (this.currentDirection?.id === id) {
            await this.fetchDirection(id);
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update status');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Statusni yangilashda xatolik';
        throw error;
      }
    },

    async deleteDirection(id) {
      this.error = null;
      try {
        const response = await directionsApi.deleteDirection(id);
        if (response?.data?.success) {
          await this.fetchDirections();
          if (this.currentDirection?.id === id) {
            this.currentDirection = null;
          }
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete direction');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Yo\'nalishni o\'chirishda xatolik';
        throw error;
      }
    },

    async addSubjects(directionId, subjects) {
      this.error = null;
      try {
        const response = await directionsApi.addSubjects(directionId, subjects);
        if (response?.data?.success) {
          await this.fetchDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to add subjects');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanlarni qo\'shishda xatolik';
        throw error;
      }
    },

    async removeSubject(directionId, subjectId) {
      this.error = null;
      try {
        const response = await directionsApi.removeSubject(directionId, subjectId);
        if (response?.data?.success) {
          await this.fetchDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to remove subject');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanni o\'chirishda xatolik';
        throw error;
      }
    },

    async assignTeachers(directionId, teacherIds) {
      this.error = null;
      try {
        const response = await directionsApi.assignTeachers(directionId, teacherIds);
        if (response?.data?.success) {
          await this.fetchDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to assign teachers');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchilarni tayinlashda xatolik';
        throw error;
      }
    },

    async removeTeacher(directionId, teacherId) {
      this.error = null;
      try {
        const response = await directionsApi.removeTeacher(directionId, teacherId);
        if (response?.data?.success) {
          await this.fetchDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to remove teacher');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchini o\'chirishda xatolik';
        throw error;
      }
    },

    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.pagination.page = 1;
    },

    clearFilters() {
      this.filters = { ...DEFAULT_FILTERS };
      this.pagination.page = 1;
    },

    setPage(page) {
      this.pagination.page = page;
    },

    clearError() {
      this.error = null;
    }
  }
});
