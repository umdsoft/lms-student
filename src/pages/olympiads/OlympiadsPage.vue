<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('olympiads.title') }}</h2>
      <p class="text-sm text-slate-500">
        {{ t('olympiads.subtitle') }}
      </p>
    </header>

    <div class="space-y-10">
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-primary-700">{{ t('olympiads.groups.upcoming') }}</h3>
          <span class="text-sm text-slate-400">{{ upcomingOlympiads.length }}</span>
        </div>
        <p class="text-sm text-slate-500">{{ t('olympiads.groups.upcomingHint') }}</p>
        <div v-if="upcomingOlympiads.length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <OlympiadCard v-for="olympiad in upcomingOlympiads" :key="olympiad.id" :olympiad="olympiad" />
        </div>
        <p v-else class="rounded-3xl border border-dashed border-primary-100 bg-white/60 p-6 text-sm text-slate-500">
          {{ t('olympiads.empty.upcoming') }}
        </p>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-primary-700">{{ t('olympiads.groups.finished') }}</h3>
          <span class="text-sm text-slate-400">{{ finishedOlympiads.length }}</span>
        </div>
        <p class="text-sm text-slate-500">{{ t('olympiads.groups.finishedHint') }}</p>
        <div v-if="finishedOlympiads.length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <OlympiadCard v-for="olympiad in finishedOlympiads" :key="olympiad.id" :olympiad="olympiad" />
        </div>
        <p v-else class="rounded-3xl border border-dashed border-primary-100 bg-white/60 p-6 text-sm text-slate-500">
          {{ t('olympiads.empty.finished') }}
        </p>
      </section>
    </div>
  </section>
</template>

<script setup>
import OlympiadCard from '@/components/olympiads/OlympiadCard.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t, tm } = useI18n({ useScope: 'global' });

const olympiads = computed(() => tm('olympiads.items') ?? []);
const upcomingOlympiads = computed(() => olympiads.value.filter((item) => item.status !== 'finished'));
const finishedOlympiads = computed(() => olympiads.value.filter((item) => item.status === 'finished'));
</script>
