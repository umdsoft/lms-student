import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export function useAuth() {
  const authStore = useAuthStore();
  const { user, status, isAuthenticated, lastFetchedAt } = storeToRefs(authStore);

  const initials = computed(() => {
    if (!user.value?.fullName) return '';
    return user.value.fullName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  });

  const safeRole = computed(() => user.value?.role ?? 'guest');

  async function ensureSession() {
    await authStore.ensureSession();
  }

  async function login(credentials) {
    return authStore.login(credentials);
  }

  async function logout() {
    return authStore.logout();
  }

  return {
    user,
    status,
    initials,
    safeRole,
    isAuthenticated,
    lastFetchedAt,
    ensureSession,
    login,
    logout
  };
}
