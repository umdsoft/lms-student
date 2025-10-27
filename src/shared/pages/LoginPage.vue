<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-2 text-center">
      <h2 class="text-2xl font-semibold text-ink">{{ t('login.title') }}</h2>
      <p class="text-sm text-slate-500">
        {{ otpSent ? `${form.phone} raqamiga kod yuborildi` : t('login.subtitle') }}
      </p>
    </div>

    <div class="space-y-4">
      <!-- Phone input -->
      <label class="block text-left">
        <span class="text-sm font-medium text-slate-600">Telefon raqam</span>
        <input
          v-model="form.phone"
          type="tel"
          required
          :disabled="otpSent"
          autocomplete="tel"
          @input="validatePhone"
          class="mt-2 w-full rounded-lg border px-4 py-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-slate-100"
          :class="phoneError && !otpSent ? 'border-red-300' : 'border-slate-300'"
          placeholder="+998901234567"
        />
        <p v-if="phoneError && !otpSent" class="mt-1 text-xs text-red-600">{{ phoneError }}</p>
        <p v-else class="mt-1 text-xs text-slate-500">Format: +998XXXXXXXXX (9 ta raqam)</p>
      </label>

      <!-- OTP input (only visible after OTP sent) -->
      <div v-if="otpSent" class="space-y-3">
        <label class="block text-left">
          <span class="text-sm font-medium text-slate-600">Tasdiqlash kodi</span>
          <input
            ref="otpInput"
            v-model="form.otp"
            type="text"
            required
            autocomplete="one-time-code"
            inputmode="numeric"
            pattern="\d{6}"
            @input="handleOtpInput"
            class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-lg font-semibold tracking-widest text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="000000"
            maxlength="6"
          />
          <p class="mt-1 text-xs text-slate-500">6 raqamli kodni kiriting</p>
        </label>

        <!-- Resend OTP button with timer -->
        <div class="flex items-center justify-between text-sm">
          <button
            v-if="canResend"
            type="button"
            @click="handleResendOtp"
            :disabled="isLoading"
            class="text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
          >
            Qayta yuborish
          </button>
          <p v-else class="text-slate-500">
            Qayta yuborish: {{ resendTimer }}s
          </p>
          <button
            type="button"
            @click="handleBackToPhone"
            class="text-slate-600 hover:text-slate-900"
          >
            Raqamni o'zgartirish
          </button>
        </div>
      </div>
    </div>

    <button
      type="submit"
      :disabled="isLoading || (otpSent && form.otp.length !== 6) || (!otpSent && !isPhoneValid)"
      class="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="isLoading">Yuklanmoqda...</span>
      <span v-else-if="otpSent">Tasdiqlash va kirish</span>
      <span v-else>OTP kodni yuborish</span>
    </button>

    <p v-if="error" class="text-sm text-red-600 text-center mt-2">{{ error }}</p>
    <p v-if="success" class="text-sm text-green-600 text-center mt-2">{{ success }}</p>
  </form>
</template>

<script setup>
import { reactive, ref, computed, watch, onUnmounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { useI18nHelpers } from '@/shared/composables/useI18nHelpers';
import { useNotifications } from '@/shared/composables/useNotifications';
import { isSafeRedirectPath, resolveDefaultRoute } from '@/shared/utils/navigation';

const router = useRouter();
const route = useRoute();
const { sendOtp, verifyOtp, resetOtp, user, status, otpSent } = useAuth();
const { t } = useI18nHelpers();
const { notifySuccess, notifyError } = useNotifications();

const form = reactive({
  phone: '',
  otp: ''
});

const error = ref('');
const success = ref('');
const phoneError = ref('');
const isLoading = computed(() => status.value === 'loading');

// OTP input ref for auto-focus
const otpInput = ref(null);

// Resend OTP timer
const resendTimer = ref(0);
const canResend = computed(() => resendTimer.value === 0);
let timerInterval = null;

// Phone validation regex for Uzbekistan (+998XXXXXXXXX)
const PHONE_REGEX = /^\+998\d{9}$/;

const isPhoneValid = computed(() => {
  return PHONE_REGEX.test(form.phone);
});

// Watch otpSent to auto-focus OTP input and start timer
watch(otpSent, async (newValue) => {
  if (newValue) {
    // Auto-focus OTP input
    await nextTick();
    otpInput.value?.focus();
    // Start resend timer
    startResendTimer();
  } else {
    // Clear timer when going back
    stopResendTimer();
  }
});

function validatePhone() {
  phoneError.value = '';

  if (!form.phone) {
    return;
  }

  // Auto-format: add +998 prefix if missing
  if (form.phone && !form.phone.startsWith('+')) {
    if (form.phone.startsWith('998')) {
      form.phone = '+' + form.phone;
    } else if (form.phone.length > 0 && !form.phone.startsWith('998')) {
      form.phone = '+998' + form.phone.replace(/^\+?998?/, '');
    }
  }

  // Remove non-numeric characters except +
  const cleaned = form.phone.replace(/[^\d+]/g, '');
  if (cleaned !== form.phone) {
    form.phone = cleaned;
  }

  // Validate format
  if (form.phone.length > 4 && !isPhoneValid.value) {
    phoneError.value = 'Noto\'g\'ri format. Namuna: +998901234567';
  }
}

function handleOtpInput(event) {
  // Only allow numeric input
  form.otp = event.target.value.replace(/\D/g, '');
}

async function handleSubmit() {
  error.value = '';
  success.value = '';

  try {
    if (otpSent.value) {
      // Verify OTP
      if (form.otp.length !== 6) {
        error.value = '6 raqamli kodni to\'liq kiriting';
        return;
      }

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
      if (!isPhoneValid.value) {
        phoneError.value = 'Telefon raqamni to\'g\'ri formatda kiriting';
        error.value = 'Telefon raqamni to\'g\'ri formatda kiriting';
        return;
      }

      await sendOtp(form.phone);
      success.value = 'OTP kodi yuborildi! Telefoningizni tekshiring.';
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || t('login.error');
    error.value = errorMsg;
    notifyError('login');
    console.error('Login error:', err);
  }
}

async function handleResendOtp() {
  if (!canResend.value || isLoading.value) return;

  error.value = '';
  success.value = '';
  form.otp = '';

  try {
    await sendOtp(form.phone);
    success.value = 'OTP kodi qayta yuborildi!';
    startResendTimer();
  } catch (err) {
    error.value = err.response?.data?.message || 'OTP yuborishda xatolik yuz berdi';
    notifyError('login');
  }
}

function handleBackToPhone() {
  // Reset to phone input step
  form.otp = '';
  error.value = '';
  success.value = '';
  stopResendTimer();

  // Reset OTP state in auth store
  resetOtp();
}

function startResendTimer() {
  stopResendTimer(); // Clear any existing timer
  resendTimer.value = 60;

  timerInterval = setInterval(() => {
    if (resendTimer.value > 0) {
      resendTimer.value--;
    } else {
      stopResendTimer();
    }
  }, 1000);
}

function stopResendTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  resendTimer.value = 0;
}

// Cleanup on unmount
onUnmounted(() => {
  stopResendTimer();
});
</script>
