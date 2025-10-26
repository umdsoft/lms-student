<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-2 text-center">
      <h2 class="text-2xl font-semibold text-ink">{{ t('login.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('login.subtitle') }}</p>
    </div>

    <div class="space-y-4">
      <label class="block text-left">
        <span class="text-sm font-medium text-slate-600">{{ t('login.loginLabel') }}</span>
        <input
          v-model="form.login"
          type="text"
          required
          autocomplete="username"
          class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          :placeholder="t('login.loginPlaceholder')"
        />
      </label>

      <label class="block text-left">
        <span class="text-sm font-medium text-slate-600">{{ t('login.passwordLabel') }}</span>
        <input
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
          class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          :placeholder="t('login.passwordPlaceholder')"
        />
      </label>

      <div class="flex items-center justify-between text-sm">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="form.remember" class="rounded border-primary-200 text-primary-600" />
          <span>{{ t('login.remember') }}</span>
        </label>
        <a class="text-primary-600 hover:underline" href="#">{{ t('login.forgot') }}</a>
      </div>
    </div>

    <button
      type="submit"
      class="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
    >
      {{ t('login.submit') }}
    </button>

    <p v-if="error" class="text-sm text-danger text-center">{{ error }}</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { useI18nHelpers } from '@/shared/composables/useI18nHelpers';
import { useNotifications } from '@/shared/composables/useNotifications';
import { isSafeRedirectPath, resolveDefaultRoute } from '@/shared/utils/navigation';

const router = useRouter();
const route = useRoute();
const { login, user } = useAuth();
const { t } = useI18nHelpers();
const { notifySuccess, notifyError } = useNotifications();

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
    notifySuccess('login', { name: user.value?.fullName ?? form.login });
    const redirect = route.query.redirect;
    if (isSafeRedirectPath(redirect)) {
      router.push(redirect);
      return;
    }
    router.push(resolveDefaultRoute(user.value?.role));
  } catch (err) {
    error.value = t('login.error');
    notifyError('login');
    console.error(err);
  }
}
</script>
