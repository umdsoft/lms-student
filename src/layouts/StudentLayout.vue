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
      <h3 class="font-semibold text-ink">{{ t('app.brand.infoTitle') }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ t('app.brand.infoDescription') }}
      </p>
    </template>

    <template #header>
      <p class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ t('app.header.greeting') }}</p>
      <div class="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-ink">{{ profile.fullName }}</h1>
          <p class="text-xs text-slate-500">{{ profileSubtitle }}</p>
        </div>
        <p class="text-xs text-slate-400 sm:text-right">
          {{ t('app.header.lastUpdated') }}: {{ lastUpdated }}
        </p>
      </div>
    </template>

    <template #header-actions>
      <RouterLink
        :to="{ name: 'student.finance.coins' }"
        class="inline-flex items-center gap-2.5 rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-2.5 text-sm shadow-sm transition-all hover:shadow-md hover:from-primary-100 hover:to-primary-200"
      >
        <Coins :size="20" class="text-primary-600" />
        <div class="text-left">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-primary-600">{{ t('app.header.coinsLabel') }}</p>
          <p class="font-bold text-primary-700">{{ t('app.header.coinsValue', { value: profile.coins }) }}</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'student.finance.transactions' }"
        class="inline-flex items-center gap-2.5 rounded-xl border border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/20 px-4 py-2.5 text-sm shadow-sm transition-all hover:shadow-md hover:from-secondary/20 hover:to-secondary/30"
      >
        <CreditCard :size="20" class="text-secondary" />
        <div class="text-left">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-secondary/90">{{ t('app.header.balanceLabel') }}</p>
          <p data-testid="balance-value" class="font-bold text-secondary">{{ formattedBalance }}</p>
        </div>
      </RouterLink>
    </template>

    <slot />
  </AppShell>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Wallet,
  User,
  CreditCard,
  Coins
} from 'lucide-vue-next';
import { useAuth } from '@/shared/composables/useAuth';
import { useNotifications } from '@/shared/composables/useNotifications';
import { useI18nStore } from '@/shared/stores/i18n';
import BrandLogo from '@/shared/components/common/BrandLogo.vue';
import AppShell from '@/shared/components/layout/AppShell.vue';
import { useOlympiadStore } from '@/modules/student/stores/olympiads';

const { user, lastFetchedAt, logout } = useAuth();
const route = useRoute();
const router = useRouter();
const { t, tm, locale } = useI18n({ useScope: 'global' });
const { notifySuccess, notifyError } = useNotifications();
const i18nStore = useI18nStore();
const { locales: availableLocalesRef, locale: activeLocale } = storeToRefs(i18nStore);
const olympiadStore = useOlympiadStore();
const { registeredCount } = storeToRefs(olympiadStore);

const profile = computed(() => ({
  fullName: user.value?.fullName ?? t('app.header.guestName'),
  coins: user.value?.coins ?? 0,
  balance: user.value?.balance ?? 0,
  avatar:
    user.value?.avatar ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent('Student')}&backgroundColor=b3ebe2`
}));

const profileSubtitle = computed(() => user.value?.cohort ?? t('app.header.cohortFallback'));

const shellProfile = computed(() => ({
  fullName: profile.value.fullName,
  subtitle: profileSubtitle.value,
  avatar: profile.value.avatar
}));

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

const coursesCount = computed(() => {
  const items = tm('courses.items');
  return Array.isArray(items) ? items.length : 0;
});

const olympiadsCount = computed(() => {
  const items = tm('olympiads.items');
  return Array.isArray(items) ? items.length : 0;
});

const myOlympiadsCount = computed(() => registeredCount.value || 0);

const navItems = computed(() => {
  const name = route.name || '';
  return [
    {
      id: 'student-dashboard',
      label: t('app.navigation.dashboard'),
      to: { name: 'student.dashboard' },
      iconComponent: LayoutDashboard,
      active: name === 'student.dashboard'
    },
    {
      id: 'student-courses',
      label: t('app.navigation.courses'),
      to: { name: 'student.courses' },
      iconComponent: BookOpen,
      badge: coursesCount.value,
      active: name.startsWith('student.courses'),
      children: [
        {
          id: 'student-courses-overview',
          label: t('app.navigation.coursesOverview'),
          to: { name: 'student.courses' },
          active: name === 'student.courses'
        }
      ]
    },
    {
      id: 'student-olympiads',
      label: t('app.navigation.olympiads'),
      to: { name: 'student.olympiads' },
      iconComponent: Trophy,
      badge: olympiadsCount.value,
      active: name.startsWith('student.olympiads'),
      children: [
        {
          id: 'student-olympiads-all',
          label: t('app.navigation.olympiadsAll'),
          to: { name: 'student.olympiads' },
          active: name === 'student.olympiads'
        },
        {
          id: 'student-olympiads-my',
          label: t('app.navigation.olympiadsMy'),
          to: { name: 'student.olympiads.my' },
          badge: myOlympiadsCount.value,
          active: name === 'student.olympiads.my'
        }
      ]
    },
    {
      id: 'student-finance',
      label: t('app.navigation.finance'),
      to: { name: 'student.finance.transactions' },
      iconComponent: Wallet,
      active: name.startsWith('student.finance'),
      children: [
        {
          id: 'student-finance-transactions',
          label: t('app.navigation.financeTransactions'),
          to: { name: 'student.finance.transactions' },
          active: name === 'student.finance.transactions'
        },
        {
          id: 'student-finance-coins',
          label: t('app.navigation.financeCoins'),
          to: { name: 'student.finance.coins' },
          active: name === 'student.finance.coins'
        }
      ]
    },
    {
      id: 'student-profile',
      label: t('app.navigation.profile'),
      to: { name: 'student.profile.overview' },
      iconComponent: User,
      active: name.startsWith('student.profile'),
      children: [
        {
          id: 'student-profile-overview',
          label: t('app.navigation.profileOverview'),
          to: { name: 'student.profile.overview' },
          active: name === 'student.profile.overview'
        },
        {
          id: 'student-profile-settings',
          label: t('app.navigation.profileSettings'),
          to: { name: 'student.profile.settings' },
          active: name === 'student.profile.settings'
        }
      ]
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
