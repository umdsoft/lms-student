<template>
  <div class="w-full max-w-sm mx-auto space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">Kirish</h1>
      <p class="text-sm text-gray-500">Davom etish uchun hisobingizga kiring</p>
    </div>

    <!-- Login Form -->
    <form class="space-y-6" @submit.prevent="handleLogin">
      <!-- Phone Input -->
      <div class="space-y-2">
        <label for="phone" class="block text-sm font-medium text-gray-900">
          Telefon
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          required
          autocomplete="tel"
          :disabled="loading"
          @input="validatePhone"
          class="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition disabled:bg-gray-50 disabled:cursor-not-allowed"
          :class="phoneError ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : ''"
          placeholder="+998 90 123 45 67"
        />
        <p v-if="phoneError" class="text-xs text-red-600">{{ phoneError }}</p>
      </div>

      <!-- Password Input -->
      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-900">
          Parol
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="current-password"
            :disabled="loading"
            class="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition disabled:bg-gray-50 disabled:cursor-not-allowed pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabindex="-1"
            aria-label="Toggle password visibility"
          >
            <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="rounded-lg bg-red-50 border border-red-100 px-3.5 py-3 text-sm text-red-700">
        {{ error }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="w-full bg-gray-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Yuklanmoqda...
        </span>
        <span v-else>Kirish</span>
      </button>
    </form>

    <!-- Footer -->
    <div class="text-center">
      <p class="text-sm text-gray-600">
        Hisobingiz yo'qmi?
        <router-link to="/register" class="font-medium text-gray-900 hover:text-gray-700 transition">
          Ro'yxatdan o'tish
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { useNotifications } from '@/shared/composables/useNotifications';
import { isSafeRedirectPath, resolveDefaultRoute } from '@/shared/utils/navigation';

const router = useRouter();
const route = useRoute();
const { login, user } = useAuth();
const { notifySuccess, notifyError } = useNotifications();

const form = reactive({
  phone: '',
  password: ''
});

const error = ref('');
const phoneError = ref('');
const loading = ref(false);
const showPassword = ref(false);

// Phone validation regex for Uzbekistan (+998XXXXXXXXX)
const PHONE_REGEX = /^\+998\d{9}$/;

const isPhoneValid = computed(() => {
  return PHONE_REGEX.test(form.phone);
});

const isFormValid = computed(() => {
  return isPhoneValid.value && form.password.length > 0;
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

async function handleLogin() {
  if (!isFormValid.value) return;

  error.value = '';
  loading.value = true;

  try {
    await login({
      phone: form.phone,
      password: form.password
    });

    notifySuccess('Xush kelibsiz!', { name: user.value?.fullName ?? form.phone });

    // Redirect to intended page or default dashboard
    const redirect = route.query.redirect;
    if (isSafeRedirectPath(redirect)) {
      router.push(redirect);
    } else {
      router.push(resolveDefaultRoute(user.value?.role));
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Telefon yoki parol noto\'g\'ri';
    error.value = errorMsg;
    notifyError(errorMsg);
    console.error('Login error:', err);
  } finally {
    loading.value = false;
  }
}
</script>
