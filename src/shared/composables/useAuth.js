import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/shared/stores/auth';

export function useAuth() {
  const authStore = useAuthStore();
  const { user, status, isAuthenticated, lastFetchedAt, otpSent, phoneNumber } = storeToRefs(authStore);

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

  async function sendOtp(phone) {
    return authStore.sendOtp(phone);
  }

  async function verifyOtp(otp) {
    return authStore.verifyOtp(otp);
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
    initials,
    safeRole,
    isAuthenticated,
    lastFetchedAt,
    otpSent,
    phoneNumber,
    ensureSession,
    login,
    logout,
    sendOtp,
    verifyOtp,
    updateProfile,
    uploadAvatar
  };
}
