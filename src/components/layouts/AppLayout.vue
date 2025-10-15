<template>
  <div class="min-h-screen bg-primary-50 text-ink">
    <div class="flex min-h-screen lg:h-screen lg:overflow-hidden">
      <aside
        class="hidden w-72 space-y-10 border-r border-white/60 bg-white/80 px-6 py-8 shadow-md backdrop-blur lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto"
        :aria-label="t('app.navigation.ariaLabel')"
      >
        <div class="space-y-3">
          <BrandLogo :show-strapline="false" />
          <p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary-400">
            {{ t('app.navigation.menuLabel') }}
          </p>
        </div>
        <nav class="flex-1 space-y-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.match"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors"
            :class="[
              activeRouteName === item.match
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-slate-500 hover:bg-primary-50/70'
            ]"
          >
            <span class="text-lg">{{ item.icon }}</span>
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="typeof item.count === 'number'"
              class="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-primary-100 px-2 text-xs font-semibold text-primary-600"
            >
              {{ item.count }}
            </span>
          </RouterLink>
        </nav>
        <div class="rounded-3xl border border-white/60 bg-white/70 p-5 text-sm text-primary-700 shadow-sm">
          <h3 class="font-semibold text-primary-800">{{ t('app.brand.infoTitle') }}</h3>
          <p class="mt-2 leading-relaxed text-slate-600">{{ t('app.brand.infoDescription') }}</p>
        </div>
      </aside>

      <div class="flex flex-1 min-h-0 flex-col lg:overflow-hidden">
        <header class="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
          <div
            class="mx-auto flex w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 xl:px-14"
          >
            <div>
              <p class="text-sm text-slate-500">{{ t('app.header.greeting') }}</p>
              <h1 class="text-2xl font-semibold text-primary-700">{{ student.fullName }}</h1>
              <p class="text-xs text-slate-400 mt-1">
                {{ t('app.header.lastUpdated') }}: {{ lastUpdated }}
              </p>
            </div>
            <div class="flex items-center gap-4 flex-wrap">
              <RouterLink
                :to="{ name: 'finance.coins' }"
                class="flex items-center gap-2 rounded-2xl bg-primary-50 px-4 py-2 transition hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <span class="text-primary-500 text-xl">🪙</span>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">{{ t('app.header.coinsLabel') }}</p>
                  <p class="font-semibold text-primary-700">
                    {{ t('app.header.coinsValue', { value: student.coins }) }}
                  </p>
                </div>
              </RouterLink>
              <RouterLink
                :to="{ name: 'finance.transactions' }"
                class="flex items-center gap-2 rounded-2xl bg-secondary/10 px-4 py-2 transition hover:bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-secondary/30"
              >
                <span class="text-secondary text-xl">💳</span>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">{{ t('app.header.balanceLabel') }}</p>
                  <p data-testid="balance-value" class="font-semibold text-secondary">{{ formattedBalance }}</p>
                </div>
              </RouterLink>
              <label class="flex items-center gap-2 rounded-2xl border border-primary-100 px-3 py-2 text-sm text-primary-700">
                <span class="hidden sm:inline">{{ t('app.language.label') }}</span>
                <select
                  :value="currentLocale"
                  @change="onLocaleChange"
                  class="bg-transparent focus:outline-none text-primary-700"
                  :aria-label="t('app.language.label')"
                >
                  <option v-for="option in localeOptions" :key="option.code" :value="option.code">
                    {{ option.label }}
                  </option>
                </select>
              </label>
              <button
                type="button"
                @click="onLogout"
                class="inline-flex items-center gap-2 rounded-2xl border border-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                <span class="hidden sm:inline">{{ t('app.header.logout') }}</span>
                <span aria-hidden="true">↗</span>
              </button>
              <div class="flex items-center gap-2">
                <img :src="student.avatar" :alt="student.fullName" class="w-12 h-12 rounded-2xl object-cover" />
                <div class="text-sm">
                  <p class="font-semibold">{{ student.fullName }}</p>
                  <p class="text-xs text-slate-500">{{ student.cohort }}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
          <div class="mx-auto w-full rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-lg sm:p-8">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/stores/i18n';
import { useNotifications } from '@/composables/useNotifications';
import BrandLogo from '@/components/brand/BrandLogo.vue';

const { user, lastFetchedAt, logout } = useAuth();
const route = useRoute();
const router = useRouter();
const { t, tm, locale } = useI18n({ useScope: 'global' });
const i18nStore = useI18nStore();
const { locales: availableLocalesRef, locale: activeLocale } = storeToRefs(i18nStore);
const { notifySuccess, notifyError } = useNotifications();

const activeRouteName = computed(() => {
  const name = route.name || '';
  if (name.startsWith('profile.')) return 'profile.overview';
  return name;
});

const coursesCount = computed(() => {
  const items = tm('courses.items');
  return Array.isArray(items) ? items.length : 0;
});

const olympiadsCount = computed(() => {
  const items = tm('olympiads.items');
  return Array.isArray(items) ? items.length : 0;
});

const navItems = computed(() => [
  { label: t('app.navigation.dashboard'), to: { name: 'dashboard' }, match: 'dashboard', icon: '📊' },
  {
    label: t('app.navigation.courses'),
    to: { name: 'courses' },
    match: 'courses',
    icon: '📚',
    count: coursesCount.value
  },
  {
    label: t('app.navigation.olympiads'),
    to: { name: 'olympiads' },
    match: 'olympiads',
    icon: '🏆',
    count: olympiadsCount.value
  },
  { label: t('app.navigation.profile'), to: { name: 'profile.overview' }, match: 'profile.overview', icon: '👤' }
]);

const student = computed(() => ({
  fullName: user.value?.fullName ?? t('app.header.guestName'),
  coins: user.value?.coins ?? 0,
  cohort: user.value?.cohort ?? t('app.header.cohortFallback'),
  balance: user.value?.balance ?? 0,
  avatar:
    user.value?.avatar ??
    'https://api.dicebear.com/7.x/initials/svg?seed=Student&backgroundColor=b3ebe2'
}));

const formattedBalance = computed(() =>
  t('app.header.balanceValue', {
    value: new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ').format(student.value.balance)
  })
);

const lastUpdated = computed(() => {
  if (!lastFetchedAt.value) return t('app.header.noSync');
  return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(lastFetchedAt.value));
});

async function onLogout() {
  await logout();
  notifySuccess('logout');
  router.push({ name: 'login' });
}

const localeOptions = computed(() => availableLocalesRef.value);
const currentLocale = computed(() => activeLocale.value);

function onLocaleChange(event) {
  const value = event.target.value;
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
