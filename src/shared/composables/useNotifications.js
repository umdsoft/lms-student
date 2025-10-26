import { useNotivue } from 'notivue';
import { useI18nHelpers } from '@/shared/composables/useI18nHelpers';

function resolveMessage(t, key, params) {
  const translation = t(key, params);
  return translation === key ? '' : translation;
}

export function useNotifications() {
  const push = useNotivue();
  const { t } = useI18nHelpers();

  function dispatch(type, key, params = {}) {
    const titleKey = `notifications.${type}.${key}.title`;
    const messageKey = `notifications.${type}.${key}.message`;

    let title = resolveMessage(t, titleKey, params);
    let message = resolveMessage(t, messageKey, params);

    if (!title && !message) {
      const fallbackTitleKey = `notifications.${type}.generic.title`;
      const fallbackMessageKey = `notifications.${type}.generic.message`;
      title = resolveMessage(t, fallbackTitleKey, params);
      message = resolveMessage(t, fallbackMessageKey, params);
    }

    const payload = {};
    if (title) payload.title = title;
    if (message) payload.message = message;

    if (typeof push?.[type] === 'function') {
      push[type](payload);
    }
  }

  function notifySuccess(key, params) {
    dispatch('success', key, params);
  }

  function notifyError(key, params) {
    dispatch('error', key, params);
  }

  return {
    notifySuccess,
    notifyError
  };
}
