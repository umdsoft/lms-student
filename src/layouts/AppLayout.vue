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
            {{ layoutConfig.menuLabel }}
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
          <h3 class="font-semibold text-primary-800">{{ layoutConfig.infoTitle }}</h3>
          <p class="mt-2 leading-relaxed text-slate-600">{{ layoutConfig.infoDescription }}</p>
        </div>
      </aside>

      <div class="flex flex-1 min-h-0 flex-col lg:overflow-hidden">
        <header class="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
          <div
            class="mx-auto flex w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 xl:px-14"
          >
            <div>
              <p class="text-sm text-slate-500">{{ layoutConfig.greeting }}</p>
              <h1 class="text-2xl font-semibold text-primary-700">{{ profile.fullName }}</h1>
              <p class="text-xs text-slate-400 mt-1">
                {{ layoutConfig.lastUpdatedLabel }}: {{ lastUpdated }}
              </p>
            </div>
            <div class="flex items-center gap-4 flex-wrap">
              <RouterLink
                v-if="layoutConfig.showCoins"
                :to="{ name: 'student.finance.coins' }"
                class="flex items-center gap-2 rounded-2xl bg-primary-50 px-4 py-2 transition hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
              >
                <span class="text-primary-500 text-xl">🪙</span>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">{{ t('app.header.coinsLabel') }}</p>
                  <p class="font-semibold text-primary-700">
                    {{ t('app.header.coinsValue', { value: profile.coins }) }}
                  </p>
                </div>
              </RouterLink>
              <RouterLink
                v-if="layoutConfig.showBalance"
                :to="{ name: 'student.finance.transactions' }"
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
                <img :src="profile.avatar" :alt="profile.fullName" class="w-12 h-12 rounded-2xl object-cover" />
                <div class="text-sm">
                  <p class="font-semibold">{{ profile.fullName }}</p>
                  <p class="text-xs text-slate-500">{{ profileSubtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
          <div class="mx-auto w-full rounded-[32px] p-6 sm:p-8">
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
import { useAuth } from '@/shared/composables/useAuth';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/shared/stores/i18n';
import { useNotifications } from '@/shared/composables/useNotifications';
import BrandLogo from '@/shared/components/common/BrandLogo.vue';
import { useOlympiadStore } from '@/modules/student/stores/olympiads';

const { user, lastFetchedAt, logout } = useAuth();
const route = useRoute();
const router = useRouter();
const { t, tm, locale } = useI18n({ useScope: 'global' });
const i18nStore = useI18nStore();
const { locales: availableLocalesRef, locale: activeLocale } = storeToRefs(i18nStore);
const { notifySuccess, notifyError } = useNotifications();
const olympiadStore = useOlympiadStore();
const { registeredCount } = storeToRefs(olympiadStore);

const activeRouteName = computed(() => {
  const name = route.name || '';
  if (name.startsWith('student.profile.')) return 'student.profile.overview';
  if (name.startsWith('student.courses.')) return 'student.courses';
  if (name.startsWith('student.olympiads.')) {
    return name.includes('.my') ? 'student.olympiads.my' : 'student.olympiads';
  }
  if (name.startsWith('student.finance.')) {
    return name.endsWith('.coins') ? 'student.finance.coins' : 'student.finance.transactions';
  }
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

const myOlympiadsCount = computed(() => registeredCount.value || 0);

const layoutKey = computed(() => route.meta?.layout ?? 'student');

const studentNavItems = computed(() => [
  { label: t('app.navigation.dashboard'), to: { name: 'student.dashboard' }, match: 'student.dashboard', icon: '📊' },
  {
    label: t('app.navigation.courses'),
    to: { name: 'student.courses' },
    match: 'student.courses',
    icon: '📚',
    count: coursesCount.value
  },
  {
    label: t('app.navigation.olympiads'),
    to: { name: 'student.olympiads' },
    match: 'student.olympiads',
    icon: '🏆',
    count: olympiadsCount.value
  },
  {
    label: t('app.navigation.myOlympiads'),
    to: { name: 'student.olympiads.my' },
    match: 'student.olympiads.my',
    icon: '🎯',
    count: myOlympiadsCount.value
  },
  {
    label: t('app.navigation.profile'),
    to: { name: 'student.profile.overview' },
    match: 'student.profile.overview',
    icon: '👤'
  }
]);

const layoutConfig = computed(() => {
  if (layoutKey.value === 'teacher') {
    return {
      navItems: [
        {
          label: t('teacher.navigation.dashboard'),
          to: { name: 'teacher.dashboard' },
          match: 'teacher.dashboard',
          icon: '📘'
        }
      ],
      showCoins: false,
      showBalance: false,
      infoTitle: t('teacher.brand.infoTitle'),
      infoDescription: t('teacher.brand.infoDescription'),
      menuLabel: t('app.navigation.menuLabel'),
      greeting: t('teacher.header.greeting'),
      lastUpdatedLabel: t('teacher.header.lastUpdated'),
      avatarSeed: 'Teacher',
      subtitle: user.value?.department ?? t('teacher.header.subtitle')
    };
  }

  if (layoutKey.value === 'control') {
    return {
      navItems: [
        {
          label: t('control.navigation.dashboard'),
          to: { name: 'control.dashboard' },
          match: 'control.dashboard',
          icon: '🛡️'
        }
      ],
      showCoins: false,
      showBalance: false,
      infoTitle: t('control.brand.infoTitle'),
      infoDescription: t('control.brand.infoDescription'),
      menuLabel: t('app.navigation.menuLabel'),
      greeting: t('control.header.greeting'),
      lastUpdatedLabel: t('control.header.lastUpdated'),
      avatarSeed: 'Admin',
      subtitle: t('control.header.subtitle')
    };
  }

  return {
    navItems: studentNavItems.value,
    showCoins: true,
    showBalance: true,
    infoTitle: t('app.brand.infoTitle'),
    infoDescription: t('app.brand.infoDescription'),
    menuLabel: t('app.navigation.menuLabel'),
    greeting: t('app.header.greeting'),
    lastUpdatedLabel: t('app.header.lastUpdated'),
    avatarSeed: 'Student',
    subtitle: user.value?.cohort ?? t('app.header.cohortFallback')
  };
});

const navItems = computed(() => layoutConfig.value.navItems);

const profile = computed(() => ({
  fullName: user.value?.fullName ?? t('app.header.guestName'),
  coins: user.value?.coins ?? 0,
  balance: user.value?.balance ?? 0,
  avatar:
    user.value?.avatar ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(layoutConfig.value.avatarSeed)}&backgroundColor=b3ebe2`
}));

const profileSubtitle = computed(() => layoutConfig.value.subtitle);

const formattedBalance = computed(() =>
  t('app.header.balanceValue', {
    value: new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ').format(profile.value.balance)
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
