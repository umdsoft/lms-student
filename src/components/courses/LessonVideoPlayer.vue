<template>
  <div class="w-full">
    <!-- YouTube Player -->
    <div v-if="videoType === 'youtube'" class="aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
      <iframe
        :src="embedUrl"
        class="h-full w-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        title="Lesson Video"
      ></iframe>
    </div>

    <!-- Direct Video Player -->
    <div v-else-if="videoType === 'direct'" class="aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
      <video
        :src="videoUrl"
        controls
        controlsList="nodownload"
        class="h-full w-full"
      >
        {{ t('courses.lessons.videoNotSupported') }}
      </video>
    </div>

    <!-- No Video -->
    <div v-else class="aspect-video flex items-center justify-center rounded-xl bg-gray-100 shadow-lg">
      <div class="text-center">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        <p class="mt-4 text-sm text-gray-600">{{ t('courses.lessons.noVideo') }}</p>
      </div>
    </div>

    <!-- Video Info -->
    <div v-if="videoType" class="mt-4 flex items-center justify-between">
      <div class="flex items-center gap-3 text-sm text-gray-600">
        <span v-if="videoType === 'youtube'" class="inline-flex items-center gap-1">
          <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </span>
        <span v-else class="inline-flex items-center gap-1">
          <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
          {{ t('courses.lessons.directVideo') }}
        </span>
        <span v-if="duration" class="inline-flex items-center gap-1">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          {{ formatDuration(duration) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { formatVideoDuration } from '@/utils/videoProcessor';

const { t } = useI18n();

defineProps({
  videoUrl: {
    type: String,
    default: ''
  },
  videoType: {
    type: String,
    default: 'youtube',
    validator: (value) => ['youtube', 'direct', null].includes(value)
  },
  embedUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  }
});

const formatDuration = (seconds) => {
  return formatVideoDuration(seconds);
};
</script>
