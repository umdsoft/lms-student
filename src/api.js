import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRF-Token',
  timeout: 10000
});

let isRefreshing = false;
let queuedRequests = [];

const mockUser = {
  id: 'std-2045',
  fullName: 'Dilnoza Rahimova',
  email: 'dilnoza.rahimova@example.com',
  phone: '+998 90 123 45 67',
  role: 'student'
};

const enableMocks = typeof process !== 'undefined' ? process.env.NODE_ENV !== 'production' : true;

function queueRequest(callback) {
  queuedRequests.push(callback);
}

function resolveQueue(error, token) {
  queuedRequests.forEach((callback) => callback(error, token));
  queuedRequests = [];
}

api.interceptors.request.use((config) => {
  if (enableMocks) {
    config.adapter = async () => {
      if (config.url === '/session' && config.method === 'get') {
        return {
          data: { user: mockUser },
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        };
      }

      if (config.url === '/login' && config.method === 'post') {
        return {
          data: { user: mockUser, csrfToken: 'mock-token' },
          status: 200,
          statusText: 'OK',
          headers: { 'x-csrf-token': 'mock-token' },
          config
        };
      }

      if (config.url === '/logout' && config.method === 'post') {
        return {
          data: { ok: true },
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        };
      }

      if (config.url === '/refresh' && config.method === 'post') {
        return {
          data: { accessToken: 'refreshed-token' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        };
      }

      return {
        data: { ok: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      };
    };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest || originalRequest.__isRetryRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queueRequest((refreshError) => {
            if (refreshError) {
              reject(refreshError);
              return;
            }
            originalRequest.__isRetryRequest = true;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await api.post('/refresh', {}, { __skipAuthInterceptor: true });
        resolveQueue(null);
        originalRequest.__isRetryRequest = true;
        return api(originalRequest);
      } catch (refreshError) {
        resolveQueue(refreshError);
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
