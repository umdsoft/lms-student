<template>
  <div class="flex flex-col items-center justify-center text-center space-y-4 py-16">
    <span class="text-6xl">🧭</span>
    <h2 class="text-2xl font-semibold text-primary-800">{{ t('notFound.title') }}</h2>
    <p class="text-sm text-slate-500 max-w-md">
      {{ t('notFound.description') }}
    </p>
    <RouterLink
      :to="{ name: 'dashboard' }"
      class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-primary-700"
    >
      {{ t('notFound.action') }}
      <span aria-hidden="true">→</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
</script>
