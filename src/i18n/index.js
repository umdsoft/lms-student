import { createI18n } from 'vue-i18n';
import uz from './locales/uz.js';
import ru from './locales/ru.js';

export const defaultLocale = 'uz';
export const localeStorageKey = 'lms-student.locale';

export const availableLocales = [
  { code: 'uz', labelKey: 'app.language.options.uz', label: 'O‘zbekcha' },
  { code: 'ru', labelKey: 'app.language.options.ru', label: 'Русский' }
];

function isSupportedLocale(value) {
  return availableLocales.some((item) => item.code === value);
}

function resolveStartingLocale() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (stored && isSupportedLocale(stored)) {
      return stored;
    }
  }

  if (typeof navigator !== 'undefined') {
    const browserLocale = navigator.language?.split('-')[0];
    if (browserLocale && isSupportedLocale(browserLocale)) {
      return browserLocale;
    }
  }

  return defaultLocale;
}

export function createI18nInstance(locale = defaultLocale) {
  return createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    fallbackLocale: defaultLocale,
    messages: {
      uz,
      ru
    }
  });
}

const i18n = createI18nInstance(resolveStartingLocale());

export default i18n;
