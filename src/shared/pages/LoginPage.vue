<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <!-- Logo and Title -->
      <div class="text-center space-y-2">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">LMS Student</h2>
        <p class="text-sm text-gray-600">Bilim sayohatingizni davom ettirish uchun tizimga kiring</p>
      </div>

      <!-- Login Form -->
      <form class="space-y-5" @submit.prevent="handleLogin">
        <!-- Phone Input -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
            Telefon raqam
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            autocomplete="tel"
            :disabled="loading"
            @input="validatePhone"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            :class="phoneError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''"
            placeholder="+998901234567"
          />
          <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
          <p v-else class="mt-1 text-xs text-gray-500">Format: +998XXXXXXXXX</p>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
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
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
              placeholder="Parolingizni kiriting"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabindex="-1"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Yuklanmoqda...
          </span>
          <span v-else>Kirish</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-600">
        <p>
          Hali ro'yxatdan o'tmaganmisiz?
          <router-link to="/register" class="text-primary-600 hover:text-primary-700 font-medium">
            Ro'yxatdan o'tish
          </router-link>
        </p>
      </div>
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
