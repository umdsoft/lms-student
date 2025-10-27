import axios from 'axios';

// Get API base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor - add access token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors - unauthorized
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && !originalRequest.url?.includes('/auth/login')) {
        try {
          const response = await axios.post(
            `${BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login')) {
              window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
            }
          }
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token - redirect to login
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login')) {
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          }
        }
      }
    }

    // Handle 403 errors - forbidden
    if (error.response?.status === 403) {
      console.warn('Access forbidden:', error.response?.data?.message);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error - Backend may be offline');
      error.message = 'Tarmoq xatosi. Backend serveriga ulanib bo\'lmadi.';
    }

    return Promise.reject(error);
  }
);

export default api;
