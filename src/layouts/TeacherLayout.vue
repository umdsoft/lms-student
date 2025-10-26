<template>
  <AppShell
    :nav-items="navItems"
    :profile="shellProfile"
    :locale-options="localeOptions"
    :current-locale="currentLocale"
    @change-locale="onLocaleChange"
    @logout="onLogout"
  >
    <template #logo>
      <BrandLogo :show-strapline="false" />
    </template>

    <template #sidebar-footer>
      <h3 class="font-semibold text-ink">{{ t('teacher.brand.infoTitle') }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ t('teacher.brand.infoDescription') }}
      </p>
    </template>

    <template #header>
      <p class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ t('teacher.header.greeting') }}</p>
      <div class="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-ink">{{ profile.fullName }}</h1>
          <p class="text-xs text-slate-500">{{ profileSubtitle }}</p>
        </div>
        <p class="text-xs text-slate-400 sm:text-right">
          {{ t('teacher.header.lastUpdated') }}: {{ lastUpdated }}
        </p>
      </div>
    </template>

    <slot />
  </AppShell>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/shared/composables/useAuth';
import { useNotifications } from '@/shared/composables/useNotifications';
import { useI18nStore } from '@/shared/stores/i18n';
import BrandLogo from '@/shared/components/common/BrandLogo.vue';
import AppShell from '@/shared/components/layout/AppShell.vue';

const { user, lastFetchedAt, logout } = useAuth();
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n({ useScope: 'global' });
const { notifySuccess, notifyError } = useNotifications();
const i18nStore = useI18nStore();
const { locales: availableLocalesRef, locale: activeLocale } = storeToRefs(i18nStore);

const profile = computed(() => ({
  fullName: user.value?.fullName ?? t('app.header.guestName'),
  avatar:
    user.value?.avatar ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent('Teacher')}&backgroundColor=fbbf24`
}));

const profileSubtitle = computed(() => user.value?.department ?? t('teacher.header.subtitle'));

const shellProfile = computed(() => ({
  fullName: profile.value.fullName,
  subtitle: profileSubtitle.value,
  avatar: profile.value.avatar
}));

const lastUpdated = computed(() => {
  if (!lastFetchedAt.value) return t('app.header.noSync');
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(lastFetchedAt.value));
});

const navItems = computed(() => {
  const name = route.name || '';
  return [
    {
      id: 'teacher-dashboard',
      label: t('teacher.navigation.dashboard'),
      to: { name: 'teacher.dashboard' },
      icon: '📘',
      active: name === 'teacher.dashboard'
    }
  ];
});

const localeOptions = computed(() => availableLocalesRef.value);
const currentLocale = computed(() => activeLocale.value);

async function onLogout() {
  await logout();
  notifySuccess('logout');
  router.push({ name: 'login' });
}

function onLocaleChange(value) {
  if (value === currentLocale.value) {
    return;
  }

  const success = i18nStore.setLocale(value);
  if (!success) {
    notifyError('generic');
    return;
  }

  locale.value = value;

  const selected = localeOptions.value.find((option) => option.code === value);
  notifySuccess('localeChange', {
    language: selected?.label ?? value.toUpperCase()
  });
}
</script>
