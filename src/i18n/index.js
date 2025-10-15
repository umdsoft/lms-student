import { createI18n } from 'vue-i18n';
import uz from './locales/uz.js';
import ru from './locales/ru.js';

export const defaultLocale = 'uz';

export const availableLocales = [
  { code: 'uz', label: 'O‘zbekcha' },
  { code: 'ru', label: 'Русский' }
];

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

const i18n = createI18nInstance();

export default i18n;
