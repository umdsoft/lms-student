import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api';
import router from '@/router';
import { resolveDefaultRoute } from '@/shared/utils/navigation';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const status = ref('idle');
  const loading = ref(false);
  const error = ref(null);
  const lastFetchedAt = ref(null);

  const isAuthenticated = computed(() => Boolean(user.value));
  const isStudent = computed(() => user.value?.role === 'student');
  const isTeacher = computed(() => user.value?.role === 'teacher');
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Redirect to dashboard based on user role
  function redirectToDashboard(role) {
    const route = resolveDefaultRoute(role);
    router.push(route);
  }

  // Login with phone and password
  async function login({ phone, password }) {
    try {
      loading.value = true;
      status.value = 'loading';
      error.value = null;

      const response = await api.post('/auth/login', {
        phone,
        password
      });

      const { user: userData, accessToken, refreshToken } = response.data.data;

      // Save tokens to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Update state
      user.value = userData;
      lastFetchedAt.value = new Date().toISOString();
      status.value = 'ready';
      loading.value = false;

      // Note: Redirect is handled by the caller (e.g., LoginPage.vue)
      // to support redirect query parameters and other navigation logic

      return response.data;
    } catch (err) {
      status.value = 'error';
      loading.value = false;
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    }
  }

  // Register new user
  async function register(userData) {
    try {
      loading.value = true;
      status.value = 'loading';
      error.value = null;

      const response = await api.post('/auth/register', userData);

      // Auto login after registration
      await login({
        phone: userData.phone,
        password: userData.password
      });

      return response.data;
    } catch (err) {
      status.value = 'error';
      loading.value = false;
      error.value = err.response?.data?.message || 'Registration failed';
      throw err;
    }
  }

  // Get current user from backend
  async function fetchUser() {
    try {
      const response = await api.get('/auth/me');
      user.value = response.data.data?.user || response.data.data;
      lastFetchedAt.value = new Date().toISOString();
      status.value = 'ready';
      return user.value;
    } catch (err) {
      // If fetching user fails, logout
      await logout();
      throw err;
    }
  }

  // Ensure session is loaded (called on app start)
  async function ensureSession() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      status.value = 'ready';
      return;
    }

    if (isAuthenticated.value) {
      return;
    }

    try {
      await fetchUser();
    } catch (err) {
      console.warn('Session hydrate failed', err);
      status.value = 'ready';
    }
  }

  // Initialize auth (alias for ensureSession for backward compatibility)
  async function initAuth() {
    return ensureSession();
  }

  // Refresh access token using refresh token
  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data.data;

      // Save new access token
      localStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (err) {
      // Refresh failed - logout
      await logout();
      throw err;
    }
  }

  // Logout
  async function logout() {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout request failed', err);
    } finally {
      // Clear everything
      user.value = null;
      lastFetchedAt.value = null;
      status.value = 'idle';
      loading.value = false;
      error.value = null;

      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Redirect to login
      router.push('/login');
    }
  }

  // Update user profile
  async function updateProfile(updates) {
    try {
      const response = await api.put('/auth/profile', updates);
      user.value = { ...user.value, ...response.data.data.user };
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // Upload avatar
  async function uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await api.put('/auth/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.data?.user?.avatar) {
        user.value.avatar = response.data.data.user.avatar;
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  return {
    // State
    user,
    status,
    loading,
    error,
    lastFetchedAt,

    // Getters
    isAuthenticated,
    isStudent,
    isTeacher,
    isAdmin,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    ensureSession,
    initAuth,
    refreshAccessToken,
    redirectToDashboard,
    updateProfile,
    uploadAvatar
  };
});
