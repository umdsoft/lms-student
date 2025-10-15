import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useI18nStore } from '@/stores/i18n';

export function useI18nHelpers() {
  const store = useI18nStore();
  const { t, locale } = useI18n({ useScope: 'global' });

  return {
    t,
    locale: computed(() => locale.value),
    setLocale: store.setLocale
  };
}
