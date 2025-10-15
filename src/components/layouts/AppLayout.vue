<template>
  <div class="min-h-screen bg-surface text-ink">
    <div class="flex min-h-screen">
      <aside
        class="hidden lg:flex lg:flex-col w-72 bg-white border-r border-primary-50 px-6 py-8 space-y-8"
        aria-label="Asosiy navigatsiya"
      >
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-primary-400">Huquqiy targ'ibot</p>
          <p class="mt-2 text-2xl font-semibold text-primary-700">Baholash tizimi</p>
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
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
        <div class="bg-primary-50 rounded-3xl p-5 text-sm text-primary-700">
          <h3 class="font-semibold text-primary-800">Matematika va Ingliz tili</h3>
          <p class="mt-2 leading-relaxed">
            Ushbu panelda kurslaringiz, o'sish dinamikangiz va kelgusi olimpiadalar bo'yicha tezkor ma'lumot olasiz.
          </p>
        </div>
      </aside>

      <div class="flex-1 flex flex-col">
        <header class="bg-white border-b border-primary-50/70">
          <div class="px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-sm text-slate-500">Assalomu alaykum!</p>
              <h1 class="text-2xl font-semibold text-primary-700">{{ student.fullName }}</h1>
              <p class="text-xs text-slate-400 mt-1">So'nggi yangilanish: {{ lastUpdated }}</p>
            </div>
            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-2xl">
                <span class="text-primary-500 text-xl">🪙</span>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">Coins</p>
                  <p class="font-semibold text-primary-700">{{ student.coins }} coin</p>
                </div>
              </div>
              <div class="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-2xl">
                <span class="text-secondary text-xl">💳</span>
                <div>
                  <p class="text-xs text-slate-500 uppercase tracking-wide">Balans</p>
                  <p data-testid="balance-value" class="font-semibold text-secondary">{{ formattedBalance }}</p>
                </div>
              </div>
              <button
                type="button"
                @click="onLogout"
                class="inline-flex items-center gap-2 rounded-2xl border border-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
              >
                <span class="hidden sm:inline">Chiqish</span>
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

        <main class="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-4 sm:p-8">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const { user, lastFetchedAt, logout } = useAuth();
const route = useRoute();
const router = useRouter();

const activeRouteName = computed(() => {
  const name = route.name || '';
  if (name.startsWith('profile.')) return 'profile.overview';
  return name;
});

const navItems = [
  { label: 'Dashboard', to: { name: 'dashboard' }, match: 'dashboard', icon: '📊' },
  { label: 'Kurslar', to: { name: 'courses' }, match: 'courses', icon: '📚' },
  { label: 'Olimpiadalar', to: { name: 'olympiads' }, match: 'olympiads', icon: '🏆' },
  { label: 'Profil', to: { name: 'profile.overview' }, match: 'profile.overview', icon: '👤' }
];

const student = computed(() => ({
  fullName: user.value?.fullName ?? 'Mehmon foydalanuvchi',
  coins: user.value?.coins ?? 0,
  cohort: user.value?.cohort ?? 'Kurs hali tanlanmagan',
  balance: user.value?.balance ?? 0,
  avatar:
    user.value?.avatar ??
    'https://api.dicebear.com/7.x/initials/svg?seed=Mehmon+Foydalanuvchi&backgroundColor=b3ebe2'
}));

const formattedBalance = computed(() =>
  `${new Intl.NumberFormat('uz-UZ').format(student.value.balance)} so'm`
);

const lastUpdated = computed(() => {
  if (!lastFetchedAt.value) return 'hali sinxronlanmagan';
  return new Intl.DateTimeFormat('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(lastFetchedAt.value));
});

async function onLogout() {
  await logout();
  router.push({ name: 'login' });
}
</script>
