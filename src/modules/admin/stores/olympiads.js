/**
 * Olympiads Management Store
 * Handles olympiad CRUD operations and filtering
 */

import { defineStore } from 'pinia';
import { olympiadsService } from '@/api/services/olympiads';

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
        const data = await olympiadsService.getAll({
          ...this.filters,
          ...filters,
          page: this.pagination.page,
          limit: this.pagination.limit
        });

        // Backend returns { olympiads, summary, pagination }
        this.olympiads = data.olympiads || data.data?.olympiads || [];
        this.summary = data.summary || data.data?.summary || null;
        this.pagination = data.pagination || data.data?.pagination || this.pagination;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error('Fetch olympiads error:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchOlympiadById(id) {
      this.loading = true;
      this.error = null;

      try {
        const data = await olympiadsService.getById(id);
        this.currentOlympiad = data.olympiad || data;
        return this.currentOlympiad;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
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
        const result = await olympiadsService.create(data);
        await this.fetchOlympiads();
        return result.olympiad || result;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
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
        const result = await olympiadsService.update(id, data);
        await this.fetchOlympiads();
        if (this.currentOlympiad?.id === id) {
          this.currentOlympiad = result.olympiad || result;
        }
        return result.olympiad || result;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
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
        await olympiadsService.delete(id);
        await this.fetchOlympiads();
        if (this.currentOlympiad?.id === id) {
          this.currentOlympiad = null;
        }
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
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
        await olympiadsService.publish(id);
        await this.fetchOlympiads();
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
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
