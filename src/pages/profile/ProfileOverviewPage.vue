<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">Profil ma'lumotlari</h2>
      <p class="text-sm text-slate-500">Shaxsiy ma'lumotlaringiz va o'quv statistikasi.</p>
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
              <ProgressBadge :label="student.roleLabel" tone="info" />
              <ProgressBadge :label="`Cohort: ${student.cohort}`" tone="success" />
            </div>
            <RouterLink
              :to="{ name: 'profile.settings' }"
              class="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold hover:underline"
            >
              Sozlamalarni tahrirlash
              <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-primary-800">O'quv statistikasi</h3>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-primary-50 p-4">
              <p class="text-sm text-primary-600">Umumiy ball</p>
              <p class="text-2xl font-semibold text-primary-800">{{ student.totalPoints }}</p>
            </div>
            <div class="rounded-2xl bg-secondary/10 p-4">
              <p class="text-sm text-secondary">Oylik davomiylik</p>
              <p class="text-2xl font-semibold text-secondary">{{ student.studyStreak }} kun</p>
            </div>
            <div class="rounded-2xl bg-accent/20 p-4">
              <p class="text-sm text-amber-600">Mentor seanslari</p>
              <p class="text-2xl font-semibold text-amber-600">{{ student.sessions }} ta</p>
            </div>
            <div class="rounded-2xl bg-green-50 p-4">
              <p class="text-sm text-green-600">Yakunlangan kurslar</p>
              <p class="text-2xl font-semibold text-green-600">{{ student.completedCourses }}</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="bg-white rounded-3xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-primary-800">Tezkor ma'lumot</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-600">
            <li class="flex items-center justify-between">
              <span>Time-zone</span>
              <span class="font-semibold text-primary-700">{{ student.timezone }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Qo'shilgan sana</span>
              <span class="font-semibold text-primary-700">2023-09-01</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Oxirgi kirish</span>
              <span class="font-semibold text-primary-700">Bugun 08:15</span>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <h3 class="text-lg font-semibold text-primary-800">Xavfsizlik</h3>
          <ul class="space-y-3 text-sm text-slate-600">
            <li class="flex items-center justify-between">
              <span>Ikki faktorli himoya</span>
              <span class="font-semibold text-success">Faol</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Qurilmalar</span>
              <span class="font-semibold text-primary-700">3 ta</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Sessionlar</span>
              <span class="font-semibold text-primary-700">1 ta faol</span>
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

const { user } = useAuth();

const student = computed(() => ({
  fullName: user.value?.fullName ?? 'Mehmon foydalanuvchi',
  email: user.value?.email ?? 'student@example.com',
  phone: user.value?.phone ?? '+998 -- --- -- --',
  avatar:
    user.value?.avatar ??
    'https://api.dicebear.com/7.x/initials/svg?seed=Student&backgroundColor=b3ebe2',
  cohort: user.value?.cohort ?? 'Matematika intensiv',
  roleLabel: 'Talaba',
  totalPoints: 12680,
  studyStreak: 18,
  sessions: 12,
  completedCourses: 6,
  timezone: user.value?.timezone ?? 'Asia/Tashkent'
}));
</script>
