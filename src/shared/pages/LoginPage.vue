<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-2 text-center">
      <h2 class="text-2xl font-semibold text-ink">{{ t('login.title') }}</h2>
      <p class="text-sm text-slate-500">{{ otpSent ? 'OTP kodni kiriting' : t('login.subtitle') }}</p>
    </div>

    <div class="space-y-4">
      <!-- Phone input (always visible) -->
      <label class="block text-left">
        <span class="text-sm font-medium text-slate-600">Telefon raqam</span>
        <input
          v-model="form.phone"
          type="tel"
          required
          :disabled="otpSent"
          autocomplete="tel"
          class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-slate-100"
          placeholder="+998901234567"
        />
      </label>

      <!-- OTP input (only visible after OTP sent) -->
      <label v-if="otpSent" class="block text-left">
        <span class="text-sm font-medium text-slate-600">OTP kod</span>
        <input
          v-model="form.otp"
          type="text"
          required
          autocomplete="one-time-code"
          class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          placeholder="123456"
          maxlength="6"
        />
        <p class="mt-1 text-xs text-slate-500">Console'da OTP kodni ko'ring (development)</p>
      </label>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="isLoading">Yuklanmoqda...</span>
      <span v-else-if="otpSent">Tasdiqlash</span>
      <span v-else>OTP yuborish</span>
    </button>

    <button
      v-if="otpSent"
      type="button"
      @click="resetForm"
      class="w-full text-sm text-slate-600 hover:text-slate-900"
    >
      Orqaga
    </button>

    <p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>
    <p v-if="success" class="text-sm text-green-600 text-center">{{ success }}</p>
  </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { useI18nHelpers } from '@/shared/composables/useI18nHelpers';
import { useNotifications } from '@/shared/composables/useNotifications';
import { isSafeRedirectPath, resolveDefaultRoute } from '@/shared/utils/navigation';

const router = useRouter();
const route = useRoute();
const { sendOtp, verifyOtp, user, status, otpSent } = useAuth();
const { t } = useI18nHelpers();
const { notifySuccess, notifyError } = useNotifications();

const form = reactive({
  phone: '',
  otp: ''
});

const error = ref('');
const success = ref('');
const isLoading = computed(() => status.value === 'loading');

async function handleSubmit() {
  error.value = '';
  success.value = '';

  try {
    if (otpSent.value) {
      // Verify OTP
      await verifyOtp(form.otp);
      notifySuccess('login', { name: user.value?.fullName ?? form.phone });

      const redirect = route.query.redirect;
      if (isSafeRedirectPath(redirect)) {
        router.push(redirect);
        return;
      }
      router.push(resolveDefaultRoute(user.value?.role));
    } else {
      // Send OTP
      await sendOtp(form.phone);
      success.value = 'OTP yuborildi! Telefonigizni tekshiring.';
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || t('login.error');
    notifyError('login');
    console.error(err);
  }
}

function resetForm() {
  form.phone = '';
  form.otp = '';
  error.value = '';
  success.value = '';
}
</script>
