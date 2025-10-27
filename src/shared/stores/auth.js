import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api';
import { csrfApi } from '@/api.csrf';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const status = ref('idle');
  const lastFetchedAt = ref(null);
  const otpSent = ref(false);
  const phoneNumber = ref('');

  const isAuthenticated = computed(() => Boolean(user.value));

  // Get current session from backend
  async function hydrate() {
    if (status.value === 'loading') return;
    status.value = 'loading';
    try {
      const { data } = await api.get('/auth/me');
      user.value = data.user || data;
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
      console.warn('Session hydrate failed', error);
    }
  }

  // Send OTP to phone number
  async function sendOtp(phone) {
    status.value = 'loading';
    try {
      const { data } = await csrfApi.post('/auth/send-otp', {
        phone,
        purpose: 'LOGIN'
      });
      phoneNumber.value = phone;
      otpSent.value = true;
      status.value = 'ready';
      return data;
    } catch (error) {
      status.value = 'error';
      throw error;
    }
  }

  // Verify OTP and login/register
  async function verifyOtp(otpCode) {
    status.value = 'loading';
    try {
      const { data } = await csrfApi.post('/auth/verify-otp', {
        phone: phoneNumber.value,
        otpCode,
        purpose: 'LOGIN'
      });
      user.value = data.user || data;
      lastFetchedAt.value = new Date().toISOString();
      status.value = 'ready';
      otpSent.value = false;
      phoneNumber.value = '';
      return data;
    } catch (error) {
      status.value = 'error';
      throw error;
    }
  }

  // Legacy login support (for backward compatibility)
  async function login(payload) {
    // If payload has phone and otp/otpCode, use OTP verification
    if (payload.phone && (payload.otp || payload.otpCode)) {
      phoneNumber.value = payload.phone;
      return verifyOtp(payload.otp || payload.otpCode);
    }

    // If payload only has phone, send OTP
    if (payload.phone) {
      return sendOtp(payload.phone);
    }

    // Otherwise, try legacy login
    status.value = 'loading';
    try {
      const { data } = await csrfApi.post('/auth/login', payload);
      user.value = data.user || data;
      lastFetchedAt.value = new Date().toISOString();
      status.value = 'ready';
      return data;
    } catch (error) {
      status.value = 'error';
      throw error;
    }
  }

  async function logout() {
    try {
      await csrfApi.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed', error);
    } finally {
      user.value = null;
      status.value = 'idle';
      lastFetchedAt.value = null;
      otpSent.value = false;
      phoneNumber.value = '';
    }
  }

  // Update user profile
  async function updateProfile(updates) {
    try {
      const { data } = await csrfApi.put('/auth/profile', updates);
      user.value = { ...user.value, ...data.user };
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Upload avatar
  async function uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const { data } = await csrfApi.put('/auth/profile/avatar', formData);
      if (data.user?.avatar) {
        user.value.avatar = data.user.avatar;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Reset OTP state to go back to phone input
  function resetOtp() {
    otpSent.value = false;
    phoneNumber.value = '';
    status.value = 'idle';
  }

  return {
    user,
    status,
    isAuthenticated,
    lastFetchedAt,
    otpSent,
    phoneNumber,
    login,
    logout,
    hydrate,
    ensureSession,
    sendOtp,
    verifyOtp,
    updateProfile,
    uploadAvatar,
    resetOtp
  };
});
