<template>
  <article class="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-primary-800">{{ course.title }}</h3>
        <p class="text-sm text-slate-500">{{ course.mentor }}</p>
      </div>
      <ProgressBadge :tone="course.statusTone" :label="course.statusLabel" />
    </div>
    <p class="text-sm text-slate-600 leading-relaxed">{{ course.description }}</p>
    <div>
      <div class="flex items-center justify-between text-sm text-slate-500 mb-1">
        <span>O'zlashtirish: <strong class="text-primary-600">{{ course.progress }}%</strong></span>
        <span>Oylik o'sish: <strong :class="course.monthlyGrowth >= 0 ? 'text-success' : 'text-danger'">{{ course.monthlyGrowth }}%</strong></span>
      </div>
      <div class="h-2 rounded-full bg-primary-50">
        <div
          class="h-2 rounded-full bg-primary-500 transition-all"
          :style="{ width: `${course.progress}%` }"
        />
      </div>
    </div>
    <div class="flex items-center justify-between pt-2">
      <div class="flex -space-x-2">
        <img
          v-for="(avatar, index) in course.companions"
          :key="index"
          :src="avatar"
          alt="Guruhdosh"
          class="w-10 h-10 rounded-2xl border-2 border-white"
        />
      </div>
      <button type="button" class="text-primary-600 text-sm font-medium hover:underline">Kursga o'tish</button>
    </div>
  </article>
</template>

<script setup>
import ProgressBadge from '@/components/ui/ProgressBadge.vue';

defineProps({
  course: {
    type: Object,
    required: true
  }
});
</script>
