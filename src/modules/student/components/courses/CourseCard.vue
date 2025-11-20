<template>
  <article class="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary-200">
    <!-- Gradient Background Accent -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

    <!-- Card Content -->
    <div class="relative z-10 p-6 flex flex-col gap-5">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary-700">
            {{ course.title }}
          </h3>
          <div class="flex items-center gap-2 mt-1.5">
            <User :size="14" class="text-slate-400" />
            <p class="text-sm text-slate-600 font-medium">{{ course.mentor }}</p>
          </div>
        </div>
        <ProgressBadge :tone="course.statusTone" :label="course.statusLabel" />
      </div>

      <!-- Description -->
      <p class="text-sm text-slate-600 leading-relaxed line-clamp-2">{{ course.description }}</p>

      <!-- Progress Section -->
      <div class="space-y-3">
        <!-- Progress Stats -->
        <div class="flex items-center justify-between text-xs font-semibold">
          <div class="flex items-center gap-1.5">
            <Target :size="14" class="text-primary-500" />
            <span class="text-slate-500">{{ t('components.courseCard.mastery') }}:</span>
            <span class="text-primary-700">{{ course.progress }}%</span>
          </div>
          <div class="flex items-center gap-1.5">
            <TrendingUp v-if="course.monthlyGrowth >= 0" :size="14" class="text-success" />
            <TrendingDown v-else :size="14" class="text-danger" />
            <span class="text-slate-500">{{ t('components.courseCard.growth') }}:</span>
            <span :class="course.monthlyGrowth >= 0 ? 'text-success' : 'text-danger'">
              {{ course.monthlyGrowth }}%
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="relative h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 shadow-sm"
            :style="{ width: `${course.progress}%` }"
          >
            <div class="absolute inset-0 bg-white/20"></div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-100">
        <!-- Companions -->
        <div class="flex -space-x-2.5">
          <img
            v-for="(avatar, index) in course.companions"
            :key="index"
            :src="avatar"
            :alt="t('components.courseCard.companionAlt')"
            class="w-9 h-9 rounded-lg border-2 border-white shadow-sm transition-transform hover:scale-110 hover:z-10"
          />
        </div>

        <!-- Action Button -->
        <RouterLink
          :to="{ name: 'student.courses.details', params: { slug: course.slug || course.id } }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold shadow-sm transition-all hover:bg-primary-700 hover:shadow-md group-hover:scale-105"
        >
          <span>{{ t('components.courseCard.action') }}</span>
          <ArrowRight :size="16" class="transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </div>
    </div>

    <!-- Shine Effect on Hover -->
    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
  </article>
</template>

<script setup>
import { User, Target, TrendingUp, TrendingDown, ArrowRight } from 'lucide-vue-next';
import ProgressBadge from '@/shared/components/ui/ProgressBadge.vue';
import { useI18n } from 'vue-i18n';

defineProps({
  course: {
    type: Object,
    required: true
  }
});

const { t } = useI18n({ useScope: 'global' });
</script>
