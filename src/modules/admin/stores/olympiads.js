/**
 * Olympiads Management Store
 * Handles olympiad CRUD operations and filtering
 */

import { defineStore } from 'pinia';
import { olympiadsApi } from '@/api/mock';

export const useOlympiadsStore = defineStore('olympiads', {
  state: () => ({
    loading: false,
    error: null,
    olympiads: [],
    currentOlympiad: null,
    summary: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    filters: {
      type: null,
      status: null,
      direction: null,
      search: ''
    }
  }),

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    olympiadsList: (state) => state.olympiads,
    selectedOlympiad: (state) => state.currentOlympiad,

    upcomingOlympiads: (state) => state.olympiads.filter(o => o.status === 'upcoming'),
    ongoingOlympiads: (state) => state.olympiads.filter(o => o.status === 'ongoing'),
    completedOlympiads: (state) => state.olympiads.filter(o => o.status === 'completed'),

    publicOlympiads: (state) => state.olympiads.filter(o => o.olympiadType === 'public'),
    platformOlympiads: (state) => state.olympiads.filter(o => o.olympiadType === 'platform')
  },

  actions: {
    async fetchOlympiads(filters = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await olympiadsApi.getAll({
          ...this.filters,
          ...filters,
          page: this.pagination.page,
          limit: this.pagination.limit
        });

        if (response.success) {
          this.olympiads = response.data.olympiads;
          this.summary = response.data.summary;
          this.pagination = response.data.pagination;
        } else {
          this.error = response.error?.message || 'Failed to fetch olympiads';
        }
      } catch (error) {
        this.error = error.message;
        console.error('Fetch olympiads error:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchOlympiadById(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await olympiadsApi.getById(id);

        if (response.success) {
          this.currentOlympiad = response.data;
          return response.data;
        } else {
          this.error = response.error?.message || 'Olympiad not found';
          return null;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Fetch olympiad error:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async createOlympiad(data) {
      this.loading = true;
      this.error = null;

      try {
        const response = await olympiadsApi.create(data);

        if (response.success) {
          await this.fetchOlympiads();
          return response.data;
        } else {
          this.error = response.error?.message || 'Failed to create olympiad';
          return null;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Create olympiad error:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateOlympiad(id, data) {
      this.loading = true;
      this.error = null;

      try {
        const response = await olympiadsApi.update(id, data);

        if (response.success) {
          await this.fetchOlympiads();
          if (this.currentOlympiad?.id === id) {
            this.currentOlympiad = response.data;
          }
          return response.data;
        } else {
          this.error = response.error?.message || 'Failed to update olympiad';
          return null;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Update olympiad error:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async deleteOlympiad(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await olympiadsApi.delete(id);

        if (response.success) {
          await this.fetchOlympiads();
          if (this.currentOlympiad?.id === id) {
            this.currentOlympiad = null;
          }
          return true;
        } else {
          this.error = response.error?.message || 'Failed to delete olympiad';
          return false;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Delete olympiad error:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async publishOlympiad(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await olympiadsApi.publish(id);

        if (response.success) {
          await this.fetchOlympiads();
          return true;
        } else {
          this.error = response.error?.message || 'Failed to publish olympiad';
          return false;
        }
      } catch (error) {
        this.error = error.message;
        console.error('Publish olympiad error:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
      this.pagination.page = 1; // Reset to first page
      this.fetchOlympiads();
    },

    setPage(page) {
      this.pagination.page = page;
      this.fetchOlympiads();
    },

    clearFilters() {
      this.filters = {
        type: null,
        status: null,
        direction: null,
        search: ''
      };
      this.pagination.page = 1;
      this.fetchOlympiads();
    },

    clearError() {
      this.error = null;
    }
  }
});
