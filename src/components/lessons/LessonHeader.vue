<template>
  <div class="space-y-6">
    <!-- Header with gradient -->
    <div class="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
      <div class="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
        <div class="flex items-start gap-4">
          <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold leading-tight">{{ lesson.name }}</h1>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <!-- Duration -->
              <span class="inline-flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                {{ formatDuration(lesson.duration) }}
              </span>

              <!-- Files count -->
              <span v-if="lesson.files?.length" class="inline-flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"/>
                </svg>
                {{ lesson.files.length }} {{ t('lessons.files.count') }}
              </span>

              <!-- Tests count -->
              <span v-if="testsCount" class="inline-flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ testsCount }} {{ t('lessons.tests.count') }}
              </span>

              <!-- Views -->
              <span v-if="lesson.stats?.views" class="inline-flex items-center gap-2">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                {{ lesson.stats.views }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div v-if="canManage" class="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            @click="$emit('edit')"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            {{ t('common.actions.edit') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            @click="$emit('delete')"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m12 0H3"/>
            </svg>
            {{ t('common.actions.delete') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Video Player -->
    <div v-if="lesson.videoUrl || lesson.videoEmbedUrl" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <LessonVideoPlayer
        :video-url="lesson.videoUrl"
        :video-type="lesson.videoType"
        :embed-url="lesson.videoEmbedUrl"
        :duration="lesson.duration"
      />
    </div>

    <!-- Description -->
    <div v-if="lesson.description" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-900 mb-2">{{ t('lessons.about') }}</h2>
          <p class="text-gray-600 leading-relaxed">{{ lesson.description }}</p>

          <!-- Additional meta -->
          <div class="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span v-if="lesson.createdAt" class="inline-flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {{ formatDate(lesson.createdAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LessonVideoPlayer from '@/components/courses/LessonVideoPlayer.vue';
import { formatVideoDuration } from '@/utils/videoProcessor';

const props = defineProps({
  lesson: { type: Object, required: true },
  testsCount: { type: Number, default: 0 },
  canManage: { type: Boolean, default: false }
});

defineEmits(['edit', 'delete']);

const { t } = useI18n();

const formatDuration = (seconds) => {
  return formatVideoDuration(seconds || 0);
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>
