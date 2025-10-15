import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api';

const FALLBACK_USER = {
  id: 'std-2045',
  fullName: 'Dilnoza Rahimova',
  email: 'dilnoza.rahimova@example.com',
  phone: '+998 90 123 45 67',
  role: 'student',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Dilnoza+Rahimova',
  coins: 320,
  balance: 125000,
  streak: 18,
  cohort: 'Matematika (Intensiv)',
  timezone: 'Asia/Tashkent'
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const status = ref('idle');
  const lastFetchedAt = ref(null);

  const isAuthenticated = computed(() => Boolean(user.value));

  async function hydrate() {
    if (status.value === 'loading') return;
    status.value = 'loading';
    try {
      const { data } = await api.get('/session');
      user.value = {
        ...FALLBACK_USER,
        ...data?.user
      };
      lastFetchedAt.value = new Date().toISOString();
      status.value = 'ready';
    } catch (error) {
      status.value = 'error';
      user.value = null;
      throw error;
    }
  }

  async function ensureSession() {
    if (isAuthenticated.value) return;
    try {
      await hydrate();
    } catch (error) {
      console.warn('Session hydrate failed (mock)', error);
    }
  }

  async function login(payload) {
    status.value = 'loading';
    try {
      const { data } = await api.post('/login', payload);
      user.value = {
        ...FALLBACK_USER,
        ...data?.user
      };
      lastFetchedAt.value = new Date().toISOString();
      status.value = 'ready';
      return true;
    } catch (error) {
      status.value = 'error';
      throw error;
    }
  }

  async function logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.warn('Logout request failed (mock)', error);
    } finally {
      user.value = null;
      status.value = 'idle';
      lastFetchedAt.value = null;
    }
  }

  return {
    user,
    status,
    isAuthenticated,
    lastFetchedAt,
    login,
    logout,
    hydrate,
    ensureSession
  };
});
