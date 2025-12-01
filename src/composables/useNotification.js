/**
 * CENTRALIZED NOTIFICATION SYSTEM
 * ================================
 * Bu fayl loyihadagi BARCHA notificationlarni boshqaradi.
 * Notivue kutubxonasini wrap qiladi va yagona API taqdim etadi.
 *
 * DRY Principle: Notification logikasi faqat shu joyda
 *
 * @example
 * import { useNotification } from '@/composables/useNotification';
 *
 * const { success, error } = useNotification();
 * success('Muvaffaqiyatli saqlandi');
 * error('Xatolik yuz berdi');
 */

// Notivue v2.x: push is a direct export, NOT from useNotivue()
import { push } from 'notivue';

/**
 * Notification composable - Notivue wrapper
 * Provides unified notification API across the application
 *
 * @returns {Object} Notification methods
 */
export function useNotification() {

  /**
   * Show success notification
   * @param {string} message - Notification message (required)
   * @param {string} [title] - Optional title
   * @param {number} [duration=4000] - Duration in ms
   */
  const success = (message, title = '', duration = 4000) => {
    push.success({
      title: title || 'Muvaffaqiyat',
      message,
      duration
    });
  };

  /**
   * Show error notification
   * @param {string} message - Notification message (required)
   * @param {string} [title] - Optional title
   * @param {number} [duration=6000] - Duration in ms (longer for errors)
   */
  const error = (message, title = '', duration = 6000) => {
    push.error({
      title: title || 'Xatolik',
      message,
      duration
    });
  };

  /**
   * Show warning notification
   * @param {string} message - Notification message (required)
   * @param {string} [title] - Optional title
   * @param {number} [duration=5000] - Duration in ms
   */
  const warning = (message, title = '', duration = 5000) => {
    push.warning({
      title: title || 'Ogohlantirish',
      message,
      duration
    });
  };

  /**
   * Show info notification
   * @param {string} message - Notification message (required)
   * @param {string} [title] - Optional title
   * @param {number} [duration=4000] - Duration in ms
   */
  const info = (message, title = '', duration = 4000) => {
    push.info({
      title: title || "Ma'lumot",
      message,
      duration
    });
  };

  /**
   * Show loading notification (returns clear function)
   * @param {string} message - Loading message
   * @returns {Function} Function to clear the notification
   */
  const loading = (message = 'Yuklanmoqda...') => {
    return push.load({
      message,
      duration: Infinity
    });
  };

  /**
   * Show promise-based notification
   * @param {Promise} promise - Promise to track
   * @param {Object} messages - { loading, success, error }
   */
  const promise = (promiseInstance, messages = {}) => {
    const loadingNotification = push.load({
      message: messages.loading || 'Yuklanmoqda...',
      duration: Infinity
    });

    promiseInstance
      .then(() => {
        loadingNotification.clear();
        if (messages.success) {
          success(messages.success);
        }
      })
      .catch((err) => {
        loadingNotification.clear();
        error(messages.error || err.message || 'Xatolik yuz berdi');
      });

    return loadingNotification;
  };

  return {
    success,
    error,
    warning,
    info,
    loading,
    promise,
    // Direct access to push for advanced usage
    push
  };
}

export default useNotification;
