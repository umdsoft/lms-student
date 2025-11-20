import { defineStore } from 'pinia';
import { directionsApi } from '@/api/directions.api';

/**
 * Unified Directions Pinia Store
 * Manages reactive state for all direction-related data
 * Consolidated from multiple store files to prevent conflicts
 */

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
    directions: [],           // Array of all directions
    currentDirection: null,   // Selected direction for detail view
    subjects: [],             // Subjects for current direction
    teachers: [],             // Teachers for current direction
    courses: [],              // Courses for current direction
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
    // Direction getters
    directionsList: (state) => state.directions,

    getDirectionById: (state) => (id) => {
      return state.directions.find(d => d.id === id) || null;
    },

    getDirectionsByStatus: (state) => (status) => {
      return state.directions.filter(d => d.status === status);
    },

    activeDirectionCount: (state) => {
      return state.directions.filter(d => d.status === 'active').length;
    },

    // Statistics getters
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
    /**
     * Fetch all directions
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} API response
     */
    async fetchAllDirections(params = {}) {
      this.loading.direction = true;
      this.error = null;

      try {
        console.log('🔍 [Directions Store] Fetching all directions with params:', params);

        const response = await directionsApi.getAll(params);

        if (response?.success) {
          this.directions = response.data;
          if (response.pagination) {
            this.pagination = {
              ...this.pagination,
              ...response.pagination
            };
          }
          console.log(`✅ [Directions Store] Loaded ${this.directions.length} directions`);
        } else {
          console.warn('⚠️ [Directions Store] Response success is false:', response);
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Error fetching directions:', error);
        this.error = error.response?.data?.message || error.message || "Yo'nalishlarni yuklashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading.direction = false;
      }
    },

    /**
     * Fetch directions with pagination and filtering
     * @returns {Promise<void>}
     */
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

        console.log('🔍 [Directions Store] Fetching directions with filters:', params);

        const response = await directionsApi.getAll(params);

        if (response?.success) {
          this.directions = response.data?.directions || response.data || [];
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
          console.log(`✅ [Directions Store] Loaded ${this.directions.length} directions`);
        } else {
          throw new Error(response?.message || 'Failed to load directions');
        }
      } catch (error) {
        console.error('❌ [Directions Store] Error:', error);
        this.error = error.response?.data?.message || error.message || 'Yo\'nalishlarni yuklashda xatolik';
        this.directions = [];
      } finally {
        this.loading.direction = false;
      }
    },

    /**
     * Fetch statistics
     * @returns {Promise<void>}
     */
    async fetchStatistics() {
      this.statisticsLoading = true;
      try {
        const response = await directionsApi.getStatistics?.();
        if (response?.success) {
          this.statistics = {
            ...DEFAULT_STATISTICS,
            ...response.data
          };
        }
      } catch (error) {
        console.error('❌ [Directions Store] Statistics error:', error);
        this.statistics = { ...DEFAULT_STATISTICS };
      } finally {
        this.statisticsLoading = false;
      }
    },

    /**
     * Fetch single direction by ID (Primary method - used by most components)
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async fetchDirectionById(id) {
      this.loading.direction = true;
      this.error = null;

      try {
        console.log(`🔍 [Directions Store] Fetching direction by ID: ${id}`);

        const response = await directionsApi.getById(id);

        if (response?.success) {
          this.currentDirection = response.data;

          // Update in directions array if exists
          const index = this.directions.findIndex(d => d.id === id);
          if (index !== -1) {
            this.directions[index] = response.data;
          } else {
            this.directions.push(response.data);
          }

          console.log(`✅ [Directions Store] Direction loaded: ${response.data.name}`);
        } else {
          console.warn('⚠️ [Directions Store] Response success is false:', response);
          throw new Error(response?.message || 'Failed to load direction');
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Error fetching direction:', error);
        this.error = error.response?.data?.message || error.message || "Yo'nalishni yuklashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading.direction = false;
      }
    },

    /**
     * Fetch single direction (Alias for backward compatibility)
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async fetchDirection(id) {
      return this.fetchDirectionById(id);
    },

    /**
     * Fetch direction with its courses
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async fetchDirectionWithCourses(id) {
      this.loading.direction = true;
      this.error = null;

      try {
        console.log(`🔍 [Directions Store] Fetching direction with courses: ${id}`);

        const response = await directionsApi.getWithCourses(id);

        if (response?.success) {
          this.currentDirection = response.data;

          // Update in directions array if exists
          const index = this.directions.findIndex(d => d.id === id);
          if (index !== -1) {
            this.directions[index] = response.data;
          } else {
            this.directions.push(response.data);
          }

          console.log(`✅ [Directions Store] Direction with courses loaded: ${response.data.name}`);
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Error:', error);
        this.error = error.response?.data?.message || error.message || "Yo'nalishni yuklashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading.direction = false;
      }
    },

    /**
     * Create new direction
     * @param {Object} directionData - Direction data to create
     * @returns {Promise<Object>} API response
     */
    async createDirection(directionData) {
      this.loading.action = true;
      this.error = null;

      try {
        console.log('📝 [Directions Store] Creating direction:', directionData);

        const response = await directionsApi.create(directionData);

        if (response?.success || response?.data?.success) {
          // Add to store immediately for reactive UI update
          const newDirection = response.data?.data || response.data;
          this.directions.push(newDirection);

          // Refresh the list to ensure consistency
          await this.fetchDirections();

          console.log('✅ [Directions Store] Direction created successfully');
        } else {
          throw new Error(response?.message || response?.data?.message || 'Failed to create direction');
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Create error:', error);
        this.error = error.response?.data?.message || error.message || "Yo'nalishni yaratishda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Update existing direction
     * @param {number} id - Direction ID
     * @param {Object} directionData - Updated direction data
     * @returns {Promise<Object>} API response
     */
    async updateDirection(id, directionData) {
      this.loading.action = true;
      this.error = null;

      try {
        console.log(`📝 [Directions Store] Updating direction ${id}:`, directionData);

        const response = await directionsApi.update(id, directionData);

        if (response?.success || response?.data?.success) {
          const updatedDirection = response.data?.data || response.data;

          // Update in directions array
          const index = this.directions.findIndex(d => d.id === id);
          if (index !== -1) {
            this.directions[index] = updatedDirection;
          }

          // Update current direction if it's the one being edited
          if (this.currentDirection && this.currentDirection.id === id) {
            this.currentDirection = updatedDirection;
          }

          // Refresh the list to ensure consistency
          await this.fetchDirections();
          if (this.currentDirection?.id === id) {
            await this.fetchDirectionById(id);
          }

          console.log('✅ [Directions Store] Direction updated successfully');
        } else {
          throw new Error(response?.message || response?.data?.message || 'Failed to update direction');
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Update error:', error);
        this.error = error.response?.data?.message || error.message || "Yo'nalishni yangilashda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Update direction status
     * @param {number} id - Direction ID
     * @param {string} status - New status
     * @returns {Promise<Object>} API response
     */
    async updateDirectionStatus(id, status) {
      this.loading.action = true;
      this.error = null;

      try {
        console.log(`📝 [Directions Store] Updating direction ${id} status to: ${status}`);

        const response = await directionsApi.updateStatus?.(id, status);

        if (response?.success || response?.data?.success) {
          await this.fetchDirections();
          if (this.currentDirection?.id === id) {
            await this.fetchDirectionById(id);
          }

          console.log('✅ [Directions Store] Status updated successfully');
        } else {
          throw new Error(response?.message || response?.data?.message || 'Failed to update status');
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Status update error:', error);
        this.error = error.response?.data?.message || error.message || 'Statusni yangilashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Delete direction
     * @param {number} id - Direction ID
     * @returns {Promise<Object>} API response
     */
    async deleteDirection(id) {
      this.loading.action = true;
      this.error = null;

      try {
        console.log(`🗑️ [Directions Store] Deleting direction: ${id}`);

        const response = await directionsApi.delete(id);

        if (response?.success || response?.data?.success) {
          // Remove from directions array
          this.directions = this.directions.filter(d => d.id !== id);

          // Clear current direction if it's the one being deleted
          if (this.currentDirection && this.currentDirection.id === id) {
            this.currentDirection = null;
          }

          await this.fetchDirections();

          console.log('✅ [Directions Store] Direction deleted successfully');
        } else {
          throw new Error(response?.message || response?.data?.message || 'Failed to delete direction');
        }

        return response;
      } catch (error) {
        console.error('❌ [Directions Store] Delete error:', error);
        this.error = error.response?.data?.message || error.message || "Yo'nalishni o'chirishda xatolik yuz berdi";
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Fetch subjects for a direction
     * @param {number} directionId - Direction ID
     * @returns {Promise<void>}
     */
    async fetchSubjects(directionId) {
      this.loading.subjects = true;
      this.error = null;

      try {
        console.log(`🔍 [Directions Store] Fetching subjects for direction: ${directionId}`);

        const response = await directionsApi.getSubjects?.(directionId);

        if (response?.success) {
          this.subjects = response.data || [];
          console.log(`✅ [Directions Store] Loaded ${this.subjects.length} subjects`);
        } else {
          throw new Error(response?.message || 'Failed to load subjects');
        }
      } catch (error) {
        console.error('❌ [Directions Store] Subjects error:', error);
        this.error = error.response?.data?.message || error.message || 'Fanlarni yuklashda xatolik';
        this.subjects = [];
        throw error;
      } finally {
        this.loading.subjects = false;
      }
    },

    /**
     * Fetch teachers for a direction
     * @param {number} directionId - Direction ID
     * @returns {Promise<void>}
     */
    async fetchTeachersForDirection(directionId) {
      this.loading.teachers = true;
      this.error = null;

      try {
        console.log(`🔍 [Directions Store] Fetching teachers for direction: ${directionId}`);

        const response = await directionsApi.getTeachers?.(directionId);

        if (response?.success) {
          this.teachers = response.data || [];
          console.log(`✅ [Directions Store] Loaded ${this.teachers.length} teachers`);
        } else {
          throw new Error(response?.message || 'Failed to load teachers');
        }
      } catch (error) {
        console.error('❌ [Directions Store] Teachers error:', error);
        this.error = error.response?.data?.message || error.message || 'O\'qituvchilarni yuklashda xatolik';
        this.teachers = [];
        throw error;
      } finally {
        this.loading.teachers = false;
      }
    },

    /**
     * Fetch courses for a direction
     * @param {number} directionId - Direction ID
     * @returns {Promise<void>}
     */
    async fetchCoursesForDirection(directionId) {
      this.loading.courses = true;
      this.error = null;

      try {
        console.log(`🔍 [Directions Store] Fetching courses for direction: ${directionId}`);

        const response = await directionsApi.getCourses?.(directionId);

        if (response?.success) {
          this.courses = response.data || [];
          console.log(`✅ [Directions Store] Loaded ${this.courses.length} courses`);
        } else {
          throw new Error(response?.message || 'Failed to load courses');
        }
      } catch (error) {
        console.error('❌ [Directions Store] Courses error:', error);
        this.error = error.response?.data?.message || error.message || 'Kurslarni yuklashda xatolik';
        this.courses = [];
        throw error;
      } finally {
        this.loading.courses = false;
      }
    },

    /**
     * Add subjects to direction
     * @param {number} directionId - Direction ID
     * @param {Array} subjects - Subjects to add
     * @returns {Promise<Object>} API response
     */
    async addSubjects(directionId, subjects) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.addSubjects?.(directionId, subjects);
        if (response?.success || response?.data?.success) {
          await this.fetchDirectionById(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanlarni qo\'shishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Create subject for direction
     * @param {number} directionId - Direction ID
     * @param {Object} subjectData - Subject data
     * @returns {Promise<Object>} API response
     */
    async createSubject(directionId, subjectData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.createSubject?.(directionId, subjectData);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fan yaratishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Update subject
     * @param {number} directionId - Direction ID
     * @param {number} subjectId - Subject ID
     * @param {Object} subjectData - Updated subject data
     * @returns {Promise<Object>} API response
     */
    async updateSubject(directionId, subjectId, subjectData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.updateSubject?.(directionId, subjectId, subjectData);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanni yangilashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Remove/Delete subject
     * @param {number} directionId - Direction ID
     * @param {number} subjectId - Subject ID
     * @returns {Promise<Object>} API response
     */
    async removeSubject(directionId, subjectId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.removeSubject?.(directionId, subjectId);
        if (response?.success || response?.data?.success) {
          await this.fetchDirectionById(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanni o\'chirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Delete subject (Alias for removeSubject)
     */
    async deleteSubject(directionId, subjectId) {
      return this.removeSubject(directionId, subjectId);
    },

    /**
     * Reorder subjects
     * @param {number} directionId - Direction ID
     * @param {Array} subjectIds - Ordered array of subject IDs
     * @returns {Promise<Object>} API response
     */
    async reorderSubjects(directionId, subjectIds) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.reorderSubjects?.(directionId, subjectIds);
        if (response?.data?.success) {
          await this.fetchSubjects(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Fanlar tartibini o\'zgartirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Assign teachers to direction
     * @param {number} directionId - Direction ID
     * @param {Array} teacherIds - Teacher IDs to assign
     * @returns {Promise<Object>} API response
     */
    async assignTeachers(directionId, teacherIds) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.assignTeachers?.(directionId, teacherIds);
        if (response?.success || response?.data?.success) {
          await this.fetchDirectionById(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchilarni tayinlashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Assign single teacher to direction
     * @param {number} directionId - Direction ID
     * @param {number} teacherId - Teacher ID
     * @returns {Promise<Object>} API response
     */
    async assignTeacher(directionId, teacherId) {
      return this.assignTeachers(directionId, [teacherId]);
    },

    /**
     * Remove teacher from direction
     * @param {number} directionId - Direction ID
     * @param {number} teacherId - Teacher ID
     * @returns {Promise<Object>} API response
     */
    async removeTeacher(directionId, teacherId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.removeTeacher?.(directionId, teacherId);
        if (response?.success || response?.data?.success) {
          await this.fetchDirectionById(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'O\'qituvchini o\'chirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Unassign teacher (Alias for removeTeacher)
     */
    async unassignTeacher(directionId, teacherId) {
      return this.removeTeacher(directionId, teacherId);
    },

    /**
     * Create course for direction
     * @param {number} directionId - Direction ID
     * @param {Object} courseData - Course data
     * @returns {Promise<Object>} API response
     */
    async createCourse(directionId, courseData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.createCourse?.(directionId, courseData);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurs yaratishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Update course
     * @param {number} directionId - Direction ID
     * @param {number} courseId - Course ID
     * @param {Object} courseData - Updated course data
     * @returns {Promise<Object>} API response
     */
    async updateCourse(directionId, courseId, courseData) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.updateCourse?.(directionId, courseId, courseData);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kursni yangilashda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Delete course
     * @param {number} directionId - Direction ID
     * @param {number} courseId - Course ID
     * @returns {Promise<Object>} API response
     */
    async deleteCourse(directionId, courseId) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.deleteCourse?.(directionId, courseId);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kursni o\'chirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Toggle course status
     * @param {number} directionId - Direction ID
     * @param {number} courseId - Course ID
     * @param {boolean} isPublished - Published status
     * @returns {Promise<Object>} API response
     */
    async toggleCourseStatus(directionId, courseId, isPublished) {
      this.loading.action = true;
      this.error = null;

      try {
        const response = await directionsApi.updateCourseStatus?.(directionId, courseId, isPublished);
        if (response?.data?.success) {
          await this.fetchCoursesForDirection(directionId);
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Kurs holatini o\'zgartirishda xatolik';
        throw error;
      } finally {
        this.loading.action = false;
      }
    },

    /**
     * Set current direction
     * @param {Object} direction - Direction object
     */
    setCurrentDirection(direction) {
      this.currentDirection = direction;
    },

    /**
     * Set filters
     * @param {Object} newFilters - New filter values
     */
    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.pagination.page = 1;
    },

    /**
     * Clear filters
     */
    clearFilters() {
      this.filters = { ...DEFAULT_FILTERS };
      this.pagination.page = 1;
    },

    /**
     * Set page
     * @param {number} page - Page number
     */
    setPage(page) {
      this.pagination.page = page;
    },

    /**
     * Clear all directions from store
     */
    clearDirections() {
      this.directions = [];
      this.currentDirection = null;
      this.error = null;
    },

    /**
     * Clear error message
     */
    clearError() {
      this.error = null;
    }
  }
});

// 🔧 HMR: Prevent store corruption during hot module replacement
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log('🔥 [Directions Store] HMR update received');
  });
}
