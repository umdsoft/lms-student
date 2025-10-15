<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">Olimpiadalar</h2>
      <p class="text-sm text-slate-500">
        Eng yaqin olimpiadalar va tanlovlarni tanlang, qatnashish shartlari va to'lovlari bilan tanishing.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <OlympiadCard v-for="olympiad in olympiads" :key="olympiad.id" :olympiad="olympiad" />
    </div>
  </section>
</template>

<script setup>
import OlympiadCard from '@/components/olympiads/OlympiadCard.vue';

const olympiads = [
  {
    id: 'olymp-1',
    title: 'Matematika - Respublika bosqichi',
    host: "Oliy va o'rta maxsus ta'lim vazirligi",
    description: "12-sinflar uchun murakkab analiz va kombinatorika bo'yicha tanlov.",
    start: '12-iyun 2024',
    duration: '1 kun',
    format: 'Offline (Toshkent)',
    subject: 'Matematika',
    fee: 120000,
    level: 'success'
  },
  {
    id: 'olymp-2',
    title: 'English Challenge',
    host: 'UzEdu International',
    description: "Speaking va writing bo'yicha IELTS formatidagi xalqaro tanlov.",
    start: '25-iyun 2024',
    duration: '2 kun',
    format: 'Online',
    subject: 'Ingliz tili',
    fee: 90000,
    level: 'warning'
  },
  {
    id: 'olymp-3',
    title: 'STEM Juniors',
    host: 'TechnoPark',
    description: "Matematika va fizika uyg'unligi asosida loyihalar taqdimoti.",
    start: '5-iyul 2024',
    duration: '3 kun',
    format: 'Offline (Samarqand)',
    subject: 'STEM',
    fee: 150000,
    level: 'info'
  },
  {
    id: 'olymp-4',
    title: 'Math Ninja Online',
    host: 'Global Math Club',
    description: "Yevropa darajasidagi kombinatorika masalalari bo'yicha online musobaqa.",
    start: '18-iyul 2024',
    duration: '4 soat',
    format: 'Online',
    subject: 'Matematika',
    fee: 60000,
    level: 'info'
  },
  {
    id: 'olymp-5',
    title: 'Public Speaking Marathon',
    host: 'British Council',
    description: "Ingliz tilida ochiq nutq so'zlash bo'yicha marafon.",
    start: '2-avgust 2024',
    duration: '1 kun',
    format: 'Offline (Toshkent)',
    subject: 'Ingliz tili',
    fee: 110000,
    level: 'success'
  },
  {
    id: 'olymp-6',
    title: 'Future Innovators',
    host: 'Inha University',
    description: "STEM loyihalar bo'yicha pitching va mentorlik sessiyalari.",
    start: '16-avgust 2024',
    duration: '2 kun',
    format: 'Hybrid',
    subject: 'STEM',
    fee: 140000,
    level: 'warning'
  }
];
</script>
