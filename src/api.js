import axios from 'axios';

// Get API base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRF-Token',
  timeout: 10000
});

let isRefreshing = false;
let queuedRequests = [];

function queueRequest(callback) {
  queuedRequests.push(callback);
}

function resolveQueue(error, token) {
  queuedRequests.forEach((callback) => callback(error, token));
  queuedRequests = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors - unauthorized
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // If on browser, redirect to login
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        // Don't redirect if already on login page or if it's an auth endpoint
        if (!currentPath.includes('/login') && !originalRequest.url?.includes('/auth/')) {
          // Store current location for redirect after login
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
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
