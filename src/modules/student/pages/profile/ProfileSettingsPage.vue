<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('profile.settings.title') }}</h2>
      <p class="text-sm text-slate-500">{{ t('profile.settings.subtitle') }}</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <form class="bg-white rounded-3xl p-6 shadow-sm space-y-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block text-sm font-medium text-slate-600">
            {{ t('profile.settings.fields.fullName.label') }}
            <input
              type="text"
              class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
              :placeholder="t('profile.settings.fields.fullName.placeholder')"
            />
          </label>
          <label class="block text-sm font-medium text-slate-600">
            {{ t('profile.settings.fields.email.label') }}
            <input
              type="email"
              class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
              :placeholder="t('profile.settings.fields.email.placeholder')"
            />
          </label>
          <label class="block text-sm font-medium text-slate-600">
            {{ t('profile.settings.fields.phone.label') }}
            <input
              type="tel"
              class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
              :placeholder="t('profile.settings.fields.phone.placeholder')"
            />
          </label>
          <label class="block text-sm font-medium text-slate-600">
            {{ t('profile.settings.fields.timezone.label') }}
            <input
              type="text"
              class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
              :placeholder="t('profile.settings.fields.timezone.placeholder')"
            />
          </label>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold text-primary-700">{{ t('profile.settings.password.title') }}</p>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block text-sm text-slate-600">
              {{ t('profile.settings.password.current.label') }}
              <input
                type="password"
                class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
                :placeholder="t('profile.settings.password.current.placeholder')"
              />
            </label>
            <label class="block text-sm text-slate-600">
              {{ t('profile.settings.password.next.label') }}
              <input
                type="password"
                class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none"
                :placeholder="t('profile.settings.password.next.placeholder')"
              />
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p class="text-xs text-slate-500">{{ t('profile.settings.saveHint') }}</p>
          <button type="button" class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-primary-700">
            {{ t('profile.settings.saveAction') }}
            <span aria-hidden="true">✓</span>
          </button>
        </div>
      </form>

      <aside class="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <h3 class="text-lg font-semibold text-primary-800">{{ t('profile.settings.devicesTitle') }}</h3>
        <ul class="space-y-3 text-sm text-slate-600">
          <li v-for="device in devices" :key="device.name" class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-primary-700">{{ device.name }}</p>
              <p class="text-xs text-slate-400">{{ device.meta }}</p>
            </div>
            <button type="button" class="text-primary-600 hover:underline text-xs">{{ t('profile.settings.revoke') }}</button>
          </li>
        </ul>
        <div class="border-t border-primary-50 pt-4 text-xs text-slate-400">
          {{ t('profile.settings.securityNote') }}
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n({ useScope: 'global' });

const devices = computed(() => tm('profile.settings.deviceList') ?? []);
</script>
