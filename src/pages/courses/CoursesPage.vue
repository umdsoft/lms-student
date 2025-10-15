<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">Mening kurslarim</h2>
      <p class="text-sm text-slate-500">
        Hozirgi, yakunlangan va sizga tavsiya etilayotgan kurslarni boshqaring.
      </p>
    </header>

    <div class="bg-white rounded-3xl p-3">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          @click="activeTab = tab.key"
          class="px-4 py-2 rounded-2xl text-sm font-semibold transition"
          :class="[
            activeTab === tab.key
              ? 'bg-primary-600 text-white shadow'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import CourseCard from '@/components/courses/CourseCard.vue';

const tabs = [
  { key: 'active', label: 'Joriy kurslar' },
  { key: 'completed', label: 'Tugallangan kurslar' },
  { key: 'recommended', label: 'Tavsiya qilingan kurslar' }
];

const activeTab = ref('active');

const courses = [
  {
    id: 'math-101',
    title: 'Matematika - Integral hisob',
    mentor: 'Rustam aka',
    description: "Integrallarni tushunish va amaliyotda qo'llash bo'yicha intensiv modul.",
    progress: 78,
    monthlyGrowth: 12,
    statusLabel: 'Joriy',
    statusTone: 'info',
    companions: [
      'https://api.dicebear.com/7.x/initials/svg?seed=AA&backgroundColor=e0f7f4',
      'https://api.dicebear.com/7.x/initials/svg?seed=BB&backgroundColor=b3ebe2',
      'https://api.dicebear.com/7.x/initials/svg?seed=CC&backgroundColor=80ded0'
    ]
  },
  {
    id: 'eng-210',
    title: 'Ingliz tili - IELTS Writing',
    mentor: 'Madina opa',
    description: 'Writing Task 1 va Task 2 uchun yuqori ball olish strategiyalari.',
    progress: 64,
    monthlyGrowth: 9,
    statusLabel: 'Joriy',
    statusTone: 'info',
    companions: [
      'https://api.dicebear.com/7.x/initials/svg?seed=DD&backgroundColor=e0f7f4',
      'https://api.dicebear.com/7.x/initials/svg?seed=EE&backgroundColor=b3ebe2'
    ]
  },
  {
    id: 'math-050',
    title: 'Matematika - Kombinatorika',
    mentor: "Ulug'bek aka",
    description: "Olimpiadaga tayyorlanish uchun kombinatorika va ehtimollik.",
    progress: 100,
    monthlyGrowth: 18,
    statusLabel: 'Tugallangan',
    statusTone: 'success',
    companions: [
      'https://api.dicebear.com/7.x/initials/svg?seed=FF&backgroundColor=e0f7f4',
      'https://api.dicebear.com/7.x/initials/svg?seed=GG&backgroundColor=b3ebe2'
    ]
  },
  {
    id: 'eng-090',
    title: 'Ingliz tili - Grammar Boost',
    mentor: 'Nilufar opa',
    description: 'Intermediate grammatikani mustahkamlash uchun 30 kunlik challenge.',
    progress: 100,
    monthlyGrowth: 22,
    statusLabel: 'Tugallangan',
    statusTone: 'success',
    companions: [
      'https://api.dicebear.com/7.x/initials/svg?seed=HH&backgroundColor=e0f7f4'
    ]
  },
  {
    id: 'math-220',
    title: 'Matematika - Differential tenglamalar',
    mentor: 'Botir aka',
    description: 'Universitetga tayyorlanish uchun differensial tenglamalar kursi.',
    progress: 0,
    monthlyGrowth: 0,
    statusLabel: 'Tavsiya',
    statusTone: 'warning',
    companions: [
      'https://api.dicebear.com/7.x/initials/svg?seed=II&backgroundColor=e0f7f4',
      'https://api.dicebear.com/7.x/initials/svg?seed=JJ&backgroundColor=b3ebe2'
    ]
  },
  {
    id: 'eng-330',
    title: 'Ingliz tili - Advanced Speaking Lab',
    mentor: 'Kamola opa',
    description: "Haftasiga ikki marotaba native speaker bilan amaliy mashg'ulotlar.",
    progress: 0,
    monthlyGrowth: 0,
    statusLabel: 'Tavsiya',
    statusTone: 'warning',
    companions: [
      'https://api.dicebear.com/7.x/initials/svg?seed=KK&backgroundColor=e0f7f4',
      'https://api.dicebear.com/7.x/initials/svg?seed=LL&backgroundColor=b3ebe2',
      'https://api.dicebear.com/7.x/initials/svg?seed=MM&backgroundColor=80ded0'
    ]
  }
];

const filteredCourses = computed(() =>
  courses.filter((course) => {
    if (activeTab.value === 'active') return course.statusLabel === 'Joriy';
    if (activeTab.value === 'completed') return course.statusLabel === 'Tugallangan';
    return course.statusLabel === 'Tavsiya';
  })
);
</script>
