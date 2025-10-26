/**
 * Admin Dashboard Store
 * Manages dashboard data, KPIs, and statistics
 */

import { defineStore } from 'pinia';
import { dashboardApi } from '@/api/mock';

export const useAdminDashboardStore = defineStore('adminDashboard', {
  state: () => ({
    loading: false,
    error: null,
    data: null,
    kpis: null,
    recentActivity: [],
    alerts: []
  }),

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    dashboardData: (state) => state.data,

    // KPI getters
    totalUsers: (state) => state.kpis?.totalUsers?.value || 0,
    activeSubscriptions: (state) => state.kpis?.activeSubscriptions?.value || 0,
    monthlyRevenue: (state) => state.kpis?.monthlyRevenue?.value || 0,
    totalOlympiads: (state) => state.kpis?.totalOlympiads?.value || 0,

    // Alerts by severity
    criticalAlerts: (state) => state.alerts.filter(a => a.severity === 'high'),
    warningAlerts: (state) => state.alerts.filter(a => a.severity === 'medium'),
    infoAlerts: (state) => state.alerts.filter(a => a.severity === 'low')
  },

  actions: {
    async fetchDashboard() {
      this.loading = true;
      this.error = null;

      try {
        const response = await dashboardApi.getDashboard();

        if (response.success) {
          this.data = response.data;
          this.kpis = response.data.kpis;
          this.recentActivity = response.data.recentActivity;
          this.alerts = response.data.alerts;
        } else {
          this.error = response.error?.message || 'Failed to fetch dashboard data';
        }
      } catch (error) {
        this.error = error.message || 'An error occurred';
        console.error('Dashboard fetch error:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchKPIs() {
      try {
        const response = await dashboardApi.getKPIs();
        if (response.success) {
          this.kpis = response.data;
        }
      } catch (error) {
        console.error('KPIs fetch error:', error);
      }
    },

    async fetchRecentActivity(limit = 10) {
      try {
        const response = await dashboardApi.getRecentActivity(limit);
        if (response.success) {
          this.recentActivity = response.data;
        }
      } catch (error) {
        console.error('Activity fetch error:', error);
      }
    },

    async fetchAlerts() {
      try {
        const response = await dashboardApi.getAlerts();
        if (response.success) {
          this.alerts = response.data;
        }
      } catch (error) {
        console.error('Alerts fetch error:', error);
      }
    },

    clearError() {
      this.error = null;
    }
  }
});
