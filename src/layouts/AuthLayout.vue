<template>
  <div class="min-h-screen bg-primary-50 flex flex-col md:flex-row">
    <aside class="md:w-2/5 bg-primary-700 text-white flex flex-col justify-between gap-10 p-10">
      <div class="space-y-8">
        <BrandLogo variant="dark" />
        <div>
          <p class="text-sm uppercase tracking-widest text-primary-100">{{ t('authLayout.strapline') }}</p>
          <h1 class="mt-4 text-3xl font-semibold leading-tight">
            {{ t('authLayout.headline') }}
          </h1>
          <p class="mt-6 text-primary-50/90 max-w-sm">
            {{ t('authLayout.description') }}
          </p>
        </div>
      </div>
      <footer class="text-xs text-primary-200/80">
        {{ t('authLayout.footer') }}
      </footer>
    </aside>
    <main class="flex-1 flex items-center justify-center p-6 sm:p-10">
      <div
        class="w-full max-w-md space-y-8 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-dashboard backdrop-blur"
      >
        <BrandLogo :show-text="false" alignment="center" />
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import BrandLogo from '@/shared/components/common/BrandLogo.vue';

const { t } = useI18n({ useScope: 'global' });
</script>
