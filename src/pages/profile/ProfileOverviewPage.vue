<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('profile.overview.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('profile.overview.subtitle') }}</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div class="space-y-6">
        <div class="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
          <img :src="student.avatar" :alt="student.fullName" class="w-28 h-28 rounded-3xl object-cover" />
            <div class="space-y-2">
              <h3 class="text-xl font-semibold text-primary-800">{{ student.fullName }}</h3>
              <p class="text-sm text-slate-500">{{ student.email }}</p>
              <p class="text-sm text-slate-500">{{ student.phone }}</p>
              <div class="flex flex-wrap items-center gap-3 text-sm">
                <ProgressBadge :label="t('profile.overview.roleLabel')" tone="info" />
                <ProgressBadge :label="t('profile.overview.cohortLabel', { cohort: student.cohort })" tone="success" />
              </div>
              <RouterLink
                :to="{ name: 'profile.settings' }"
                class="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold hover:underline"
              >
                {{ t('profile.overview.editAction') }}
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </div>

        <div class="bg-white rounded-3xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-primary-800">{{ t('profile.overview.statsTitle') }}</h3>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-primary-50 p-4">
              <p class="text-sm text-primary-600">{{ t('profile.overview.stats.points.label') }}</p>
              <p class="text-2xl font-semibold text-primary-800">{{ student.totalPoints }}</p>
            </div>
            <div class="rounded-2xl bg-secondary/10 p-4">
              <p class="text-sm text-secondary">{{ t('profile.overview.stats.streak.label') }}</p>
              <p class="text-2xl font-semibold text-secondary">
                {{ student.studyStreak }}{{ t('profile.overview.stats.streak.suffix') }}
              </p>
            </div>
            <div class="rounded-2xl bg-accent/20 p-4">
              <p class="text-sm text-amber-600">{{ t('profile.overview.stats.sessions.label') }}</p>
              <p class="text-2xl font-semibold text-amber-600">
                {{ student.sessions }}{{ t('profile.overview.stats.sessions.suffix') }}
              </p>
            </div>
            <div class="rounded-2xl bg-green-50 p-4">
              <p class="text-sm text-green-600">{{ t('profile.overview.stats.completed.label') }}</p>
              <p class="text-2xl font-semibold text-green-600">{{ student.completedCourses }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="bg-white rounded-3xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-primary-800">{{ t('profile.overview.quickInfo.title') }}</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-600">
            <li class="flex items-center justify-between">
              <span>{{ t('profile.overview.quickInfo.timezone') }}</span>
              <span class="font-semibold text-primary-700">{{ student.timezone }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>{{ t('profile.overview.quickInfo.joined') }}</span>
              <span class="font-semibold text-primary-700">{{ t('profile.overview.quickInfo.joinedValue') }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>{{ t('profile.overview.quickInfo.lastLogin') }}</span>
              <span class="font-semibold text-primary-700">{{ t('profile.overview.quickInfo.lastLoginValue') }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <h3 class="text-lg font-semibold text-primary-800">{{ t('profile.overview.security.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600">
            <li class="flex items-center justify-between">
              <span>{{ t('profile.overview.security.twoFactor') }}</span>
              <span class="font-semibold text-success">{{ t('profile.overview.security.twoFactorValue') }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>{{ t('profile.overview.security.devices') }}</span>
              <span class="font-semibold text-primary-700">{{ t('profile.overview.security.devicesValue') }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>{{ t('profile.overview.security.sessions') }}</span>
              <span class="font-semibold text-primary-700">{{ t('profile.overview.security.sessionsValue') }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import ProgressBadge from '@/components/ui/ProgressBadge.vue';
import { useAuth } from '@/composables/useAuth';
import { useI18n } from 'vue-i18n';

const { user } = useAuth();
const { t } = useI18n({ useScope: 'global' });

const student = computed(() => ({
  fullName: user.value?.fullName ?? t('profile.overview.fallback.name'),
  email: user.value?.email ?? t('profile.overview.fallback.email'),
  phone: user.value?.phone ?? t('profile.overview.fallback.phone'),
  avatar:
    user.value?.avatar ??
    'https://api.dicebear.com/7.x/initials/svg?seed=Student&backgroundColor=b3ebe2',
  cohort: user.value?.cohort ?? t('profile.overview.fallback.cohort'),
  totalPoints: 12680,
  studyStreak: 18,
  sessions: 12,
  completedCourses: 6,
  timezone: user.value?.timezone ?? 'Asia/Tashkent'
}));
</script>
