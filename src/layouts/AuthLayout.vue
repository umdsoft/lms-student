<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto flex min-h-screen max-w-6xl flex-col overflow-hidden rounded-none lg:grid lg:grid-cols-5">
      <aside class="relative hidden flex-col justify-between bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-10 text-white lg:flex lg:col-span-2">
        <div class="space-y-10">
          <BrandLogo variant="dark" />
          <div class="space-y-4">
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-primary-100">
              {{ t('authLayout.strapline') }}
            </p>
            <h1 class="text-3xl font-semibold leading-snug">{{ t('authLayout.headline') }}</h1>
            <p class="max-w-sm text-sm text-primary-50/90">
              {{ t('authLayout.description') }}
            </p>
          </div>
        </div>
        <footer class="text-xs text-primary-100/80">
          {{ t('authLayout.footer') }}
        </footer>
        <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-40 bg-white/10 blur-3xl lg:block" aria-hidden="true"></div>
      </aside>
      <main class="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:col-span-3">
        <div class="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <BrandLogo :show-text="false" alignment="center" />
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import BrandLogo from '@/shared/components/common/BrandLogo.vue';

const { t } = useI18n({ useScope: 'global' });
</script>
