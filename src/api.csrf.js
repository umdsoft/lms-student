/**
 * CSRF Token Helper
 *
 * This module provides utilities for handling CSRF protection
 * with axios requests.
 */

import api from './api';

/**
 * Get CSRF token from meta tag or cookie
 * @returns {string|null} CSRF token or null if not found
 */
export function getCsrfToken() {
  // Try to get from meta tag first
  const metaToken = document.querySelector('meta[name="csrf-token"]');
  if (metaToken) {
    return metaToken.getAttribute('content');
  }

  // Try to get from cookie
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Wrapper for API calls that require CSRF protection
 * Automatically adds CSRF token to request headers
 *
 * @param {Function} requestFn - Async function that performs the API call
 * @returns {Promise} API response
 *
 * @example
 * await withCsrf(() => api.post('/users', userData));
 * await withCsrf(() => api.delete('/users/123'));
 */
export async function withCsrf(requestFn) {
  const token = getCsrfToken();

  // Configure CSRF token header if available
  const originalHeaders = api.defaults.headers.common;

  if (token) {
    api.defaults.headers.common['X-CSRF-TOKEN'] = token;
    api.defaults.headers.common['X-XSRF-TOKEN'] = token;
  }

  try {
    const response = await requestFn();
    return response;
  } finally {
    // Restore original headers
    if (token) {
      delete api.defaults.headers.common['X-CSRF-TOKEN'];
      delete api.defaults.headers.common['X-XSRF-TOKEN'];
    }
  }
}

/**
 * Fetch CSRF token from backend
 * Useful for SPA applications that need to request CSRF token
 *
 * @returns {Promise<string>} CSRF token
 */
export async function fetchCsrfToken() {
  try {
    const response = await api.get('/csrf-token');
    const token = response.data?.token || response.data?.data?.token;

    if (token) {
      // Store in meta tag for future use
      let metaTag = document.querySelector('meta[name="csrf-token"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'csrf-token';
        document.head.appendChild(metaTag);
      }
      metaTag.content = token;
    }

    return token;
  } catch (error) {
    console.warn('Failed to fetch CSRF token:', error);
    return null;
  }
}

/**
 * Make an API request with CSRF protection
 * Automatically adds CSRF token to request headers for state-changing operations
 *
 * @param {Object} config - Axios request configuration
 * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE, PATCH, etc.)
 * @param {string} config.url - Request URL
 * @param {Object} [config.data] - Request data
 * @param {Object} [config.params] - Query parameters
 * @param {Object} [config.headers] - Additional headers
 * @returns {Promise} API response
 *
 * @example
 * await apiRequest({ method: 'POST', url: '/users', data: userData });
 * await apiRequest({ method: 'DELETE', url: '/users/123' });
 */
export async function apiRequest(config) {
  return withCsrf(() => api.request(config));
}

export default {
  getCsrfToken,
  withCsrf,
  fetchCsrfToken,
  apiRequest
};
