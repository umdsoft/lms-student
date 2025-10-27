import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/shared/stores/auth';

export function useAuth() {
  const authStore = useAuthStore();
  const { user, status, loading, error, isAuthenticated } = storeToRefs(authStore);

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

  async function register(userData) {
    return authStore.register(userData);
  }

  async function logout() {
    return authStore.logout();
  }

  async function updateProfile(updates) {
    return authStore.updateProfile(updates);
  }

  async function uploadAvatar(file) {
    return authStore.uploadAvatar(file);
  }

  return {
    user,
    status,
    loading,
    error,
    initials,
    safeRole,
    isAuthenticated,
    ensureSession,
    login,
    register,
    logout,
    updateProfile,
    uploadAvatar
  };
}
