import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import i18n, { availableLocales, defaultLocale } from '@/i18n';

export const useI18nStore = defineStore('i18n', () => {
  const locale = ref(i18n.global.locale.value || defaultLocale);

  const locales = computed(() => availableLocales);

  function setLocale(newLocale) {
    if (!locales.value.some((item) => item.code === newLocale)) {
      return;
    }

    locale.value = newLocale;
    i18n.global.locale.value = newLocale;
  }

  return {
    locale,
    locales,
    setLocale
  };
});
