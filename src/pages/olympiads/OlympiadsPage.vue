<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('olympiads.title') }}</h2>
      <p class="text-sm text-slate-500">
        {{ t('olympiads.subtitle') }}
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <OlympiadCard v-for="olympiad in olympiads" :key="olympiad.id" :olympiad="olympiad" />
    </div>
  </section>
</template>

<script setup>
import OlympiadCard from '@/components/olympiads/OlympiadCard.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t, tm } = useI18n({ useScope: 'global' });

const olympiads = computed(() => tm('olympiads.items') ?? []);
</script>
