import DOMPurify from 'dompurify';

export function useSanitize() {
  const sanitize = (input, config) => {
    if (!input) return '';
    return DOMPurify.sanitize(input, {
      USE_PROFILES: { html: true },
      ...config
    });
  };

  return { sanitize };
}
