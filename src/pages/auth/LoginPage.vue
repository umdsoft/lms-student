<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-2 text-center">
      <h2 class="text-2xl font-semibold text-primary-700">{{ t('login.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('login.subtitle') }}</p>
    </div>

    <div class="space-y-4">
      <label class="block text-left">
        <span class="text-sm font-medium text-slate-600">Login</span>
        <input
          v-model="form.login"
          type="text"
          required
          autocomplete="username"
          class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
          placeholder="email yoki telefon"
        />
      </label>

      <label class="block text-left">
        <span class="text-sm font-medium text-slate-600">Parol</span>
        <input
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
          class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
          placeholder="********"
        />
      </label>

      <div class="flex items-center justify-between text-sm">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="form.remember" class="rounded border-primary-200 text-primary-600" />
          <span>Meni eslab qol</span>
        </label>
        <a class="text-primary-600 hover:underline" href="#">Parolni unutdingizmi?</a>
      </div>
    </div>

    <button
      type="submit"
      class="w-full bg-primary-600 text-white rounded-2xl py-3 font-semibold hover:bg-primary-700 transition"
    >
      Kirish
    </button>

    <p v-if="error" class="text-sm text-danger text-center">{{ error }}</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useI18nHelpers } from '@/composables/useI18nHelpers';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const { t } = useI18nHelpers();

const form = reactive({
  login: '',
  password: '',
  remember: false
});

const error = ref('');

async function handleSubmit() {
  error.value = '';
  try {
    await login(form);
    const redirect = route.query.redirect;
    if (redirect && typeof redirect === 'string') {
      const safeRedirects = ['/', '/courses', '/olympiads', '/profile', '/profile/settings'];
      if (safeRedirects.includes(redirect)) {
        router.push(redirect);
        return;
      }
    }
    router.push({ name: 'dashboard' });
  } catch (err) {
    error.value = "Kirishda xatolik yuz berdi. Qayta urinib ko'ring";
    console.error(err);
  }
}
</script>
