const messages = {
  uz: {
    login: {
      title: 'Tizimga kirish',
      subtitle: 'Bilim sayohatingizni davom ettirish uchun ma’lumotlaringizni kiriting.'
    }
  }
};

export function useI18nHelpers(locale = 'uz') {
  const t = (path) => {
    return path.split('.').reduce((acc, key) => acc?.[key], messages[locale]) ?? path;
  };

  return { t, locale };
}
