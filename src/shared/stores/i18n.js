import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import i18n, { availableLocales, defaultLocale, localeStorageKey } from '@/i18n';

export const useI18nStore = defineStore('i18n', () => {
  const locale = ref(i18n.global.locale.value || defaultLocale);

  const locales = computed(() => {
    const activeLocale = i18n.global.locale.value;
    void activeLocale;

    return availableLocales.map((item) => ({
      code: item.code,
      label:
        (item.labelKey ? i18n.global.t(item.labelKey) : undefined) ??
        item.label ??
        item.code.toUpperCase()
    }));
  });

  applyDocumentLocale(locale.value);
  persistLocale(locale.value);

  function applyDocumentLocale(value) {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value;
    }
  }

  function persistLocale(value) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(localeStorageKey, value);
    }
  }

  function setLocale(newLocale) {
    if (!locales.value.some((item) => item.code === newLocale)) {
      return false;
    }

    locale.value = newLocale;
    i18n.global.locale.value = newLocale;

    applyDocumentLocale(newLocale);
    persistLocale(newLocale);

    return true;
  }

  return {
    locale,
    locales,
    setLocale
  };
});
