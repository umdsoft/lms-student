import api from './api';

function withCsrf(config = {}) {
  const headers = config.headers || {};
  if (typeof document !== 'undefined') {
    const token = document.cookie
      ?.split('; ')
      ?.find((row) => row.startsWith('csrftoken='))
      ?.split('=')[1];
    if (token) {
      headers['X-CSRF-Token'] = token;
    }
  }
  return { ...config, headers };
}

// Export individual functions
export function post(url, data, config) {
  return api.post(url, data, withCsrf(config));
}

export function put(url, data, config) {
  return api.put(url, data, withCsrf(config));
}

export function patch(url, data, config) {
  return api.patch(url, data, withCsrf(config));
}

export function del(url, config) {
  return api.delete(url, withCsrf(config));
}

// Export as csrfApi object for easier usage
export const csrfApi = {
  post,
  put,
  patch,
  delete: del
};
