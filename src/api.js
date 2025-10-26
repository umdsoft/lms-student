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

// Mock users for different roles
const mockUsers = {
  student: {
    id: 'std-2045',
    fullName: 'Dilnoza Rahimova',
    email: 'student@example.com',
    phone: '+998 90 123 45 67',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Dilnoza+Rahimova',
    coins: 320,
    balance: 125000,
    streak: 18,
    cohort: 'Matematika (Intensiv)',
    timezone: 'Asia/Tashkent'
  },
  teacher: {
    id: 'tch-1001',
    fullName: 'Aziza Karimova',
    email: 'teacher@example.com',
    phone: '+998 91 234 56 78',
    role: 'teacher',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Aziza+Karimova',
    department: 'Matematika',
    subjects: ['Algebra', 'Geometriya'],
    timezone: 'Asia/Tashkent'
  },
  admin: {
    id: 'adm-5000',
    fullName: 'Sardor Rahmonov',
    email: 'admin@example.com',
    phone: '+998 93 345 67 89',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sardor+Rahmonov',
    permissions: ['all'],
    timezone: 'Asia/Tashkent'
  }
};

// Get current mock user from localStorage or default to student
function getCurrentMockUser() {
  try {
    const stored = localStorage.getItem('mockCurrentUser');
    if (stored) {
      const role = JSON.parse(stored);
      return mockUsers[role] || mockUsers.student;
    }
  } catch (e) {
    console.warn('Failed to get stored user role', e);
  }
  return mockUsers.student;
}

// Set current mock user role in localStorage
function setCurrentMockUser(role) {
  try {
    localStorage.setItem('mockCurrentUser', JSON.stringify(role));
  } catch (e) {
    console.warn('Failed to store user role', e);
  }
}

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
        const currentUser = getCurrentMockUser();
        return {
          data: { user: currentUser },
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        };
      }

      if (config.url === '/login' && config.method === 'post') {
        // Detect role from login credentials (email or login field)
        const loginField = config.data?.login || config.data?.email || '';
        let userRole = 'student';

        if (loginField.includes('admin')) {
          userRole = 'admin';
        } else if (loginField.includes('teacher')) {
          userRole = 'teacher';
        } else if (loginField.includes('student')) {
          userRole = 'student';
        }

        // Set the current user role
        setCurrentMockUser(userRole);
        const currentUser = mockUsers[userRole];

        return {
          data: { user: currentUser, csrfToken: 'mock-token' },
          status: 200,
          statusText: 'OK',
          headers: { 'x-csrf-token': 'mock-token' },
          config
        };
      }

      if (config.url === '/logout' && config.method === 'post') {
        // Clear the stored user role on logout
        localStorage.removeItem('mockCurrentUser');
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
