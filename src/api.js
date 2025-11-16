import axios from 'axios';
import { keysToCamelCase, keysToSnakeCase } from './utils/caseConverter';

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

// Request interceptor - add access token and transform data to snake_case
api.interceptors.request.use(
  (config) => {
    // Add access token
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Transform request body to snake_case
    if (config.data && typeof config.data === 'object') {
      config.data = keysToSnakeCase(config.data);
    }

    // Transform query params to snake_case
    if (config.params && typeof config.params === 'object') {
      config.params = keysToSnakeCase(config.params);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Token refresh state management
let isRefreshing = false;
let failedQueue = [];

// Process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor - transform response to camelCase and handle 401/refresh token
api.interceptors.response.use(
  (response) => {
    // Transform response data to camelCase
    if (response.data) {
      response.data = keysToCamelCase(response.data);
    }
    return response;
  },
  async (error) => {
    // Transform error response to camelCase
    if (error.response?.data) {
      error.response.data = keysToCamelCase(error.response.data);
    }
    const originalRequest = error.config;

    // Handle 401 errors - unauthorized
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Skip refresh for login/register endpoints
      if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/register')) {
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // No refresh token - redirect to login
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login')) {
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          }
        }
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Start refresh process
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const accessToken = response?.data?.data?.accessToken;

        if (!accessToken) {
          throw new Error('No access token in refresh response');
        }

        localStorage.setItem('accessToken', accessToken);

        // Process queued requests with new token
        processQueue(null, accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        processQueue(refreshError, null);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login')) {
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle 403 errors - forbidden
    if (error.response?.status === 403) {
      console.warn('Access forbidden:', error.response?.data?.message);
    }

    // Handle 404 errors - not found
    if (error.response?.status === 404) {
      console.warn('Resource not found:', error.config?.url);
    }

    // Handle 500+ errors - server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response?.data?.message);
      error.message = error.response?.data?.message || 'Server xatosi yuz berdi.';
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      error.message = 'So\'rov vaqti tugadi. Iltimos, qayta urinib ko\'ring.';
    }

    // Handle network errors
    if (!error.response && error.code !== 'ECONNABORTED') {
      console.error('Network error - Backend may be offline');
      error.message = 'Tarmoq xatosi. Backend serveriga ulanib bo\'lmadi.';
    }

    return Promise.reject(error);
  }
);

export default api;
