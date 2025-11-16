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
    subjects: [],
    teachers: [],
    courses: [],
    statistics: { ...DEFAULT_STATISTICS },
    pagination: { ...DEFAULT_PAGINATION },
    filters: { ...DEFAULT_FILTERS },
    loading: {
      direction: false,
      subjects: false,
      teachers: false,
      courses: false,
      action: false
    },
    statisticsLoading: false,
    error: null
  }),

  getters: {
    directionsList: (state) => state.directions,
    stats: (state) => state.statistics,
    paginationInfo: (state) => state.pagination,
    isLoading: (state) => Object.values(state.loading).some(Boolean),
    hasError: (state) => Boolean(state.error),

    // Direction-specific getters
    directionStats: (state) => {
      if (!state.currentDirection) return null;
      return {
        totalStudents: state.currentDirection.totalStudents || 0,
        totalCourses: state.courses?.length || 0,
        totalSubjects: state.subjects?.length || 0,
        totalTeachers: state.teachers?.length || 0
      };
    },

    // Subject getters
    activeSubjects: (state) => state.subjects.filter(s => s.isActive),
    sortedSubjects: (state) => [...state.subjects].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),

    // Course getters
    publishedCourses: (state) => state.courses.filter(c => c.isPublished),
    draftCourses: (state) => state.courses.filter(c => !c.isPublished)
  },

  actions: {
    async fetchDirections() {
      this.loading.direction = true;
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
        this.loading.direction = false;
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
      this.loading.direction = true;
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
        this.loading.direction = false;
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

    // Enhanced subject management actions
    async fetchSubjects(directionId) {
      this.loading.subjects = true;
      this.error = null;

      try {
        const response = await directionsApi.getSubjects(directionId);
        if (response?.success) {
          this.subjects = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to load subjects');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanlarni yuklashda xatolik';
        this.subjects = [];
        throw error;
      } finally {
        this.loading.subjects = false;
      }
    },

    async createSubject(directionId, subjectData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.createSubject(directionId, subjectData);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create subject');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fan yaratishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async updateSubject(directionId, subjectId, subjectData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.updateSubject(directionId, subjectId, subjectData);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update subject');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanni yangilashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async deleteSubject(directionId, subjectId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.removeSubject(directionId, subjectId);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete subject');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanni o\'chirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async reorderSubjects(directionId, subjectIds) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.reorderSubjects(directionId, subjectIds);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to reorder subjects');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanlar tartibini o\'zgartirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    // Enhanced teacher management actions
    async fetchTeachersForDirection(directionId) {
      this.loading.teachers = true;
      this.error = null;

      try {
        const response = await directionsApi.getTeachers(directionId);
        if (response?.success) {
          this.teachers = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to load teachers');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchilarni yuklashda xatolik';
        this.teachers = [];
        throw error;
      } finally {
        this.loading.teachers = false;
      }
    },

    async assignTeacher(directionId, teacherId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.assignTeachers(directionId, [teacherId]);
        if (response?.data?.success) {
          await this.fetchTeachersForDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to assign teacher');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchi tayinlashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async unassignTeacher(directionId, teacherId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.removeTeacher(directionId, teacherId);
        if (response?.data?.success) {
          await this.fetchTeachersForDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to unassign teacher');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchini bekor qilishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    // Course management actions
    async fetchCoursesForDirection(directionId) {
      this.loading.courses = true;
      this.error = null;

      try {
        const response = await directionsApi.getCourses(directionId);
        if (response?.success) {
          this.courses = response.data || [];
        } else {
          throw new Error(response?.message || 'Failed to load courses');
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurslarni yuklashda xatolik';
        this.courses = [];
        throw error;
      } finally {
        this.loading.courses = false;
      }
    },

    async createCourse(directionId, courseData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.createCourse(directionId, courseData);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to create course');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurs yaratishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async updateCourse(directionId, courseId, courseData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.updateCourse(directionId, courseId, courseData);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update course');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kursni yangilashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async deleteCourse(directionId, courseId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.deleteCourse(directionId, courseId);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to delete course');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kursni o\'chirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    async toggleCourseStatus(directionId, courseId, isPublished) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.updateCourseStatus(directionId, courseId, isPublished);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
          return response.data;
        }
        throw new Error(response?.data?.message || 'Failed to update course status');
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurs holatini o\'zgartirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
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
