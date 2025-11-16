import { reactive } from 'vue';

/**
 * Notification composable
 * Provides easy methods for showing notifications
 *
 * @example
 * const { notification, success, error } = useNotification();
 * success('Saved', 'Course was saved successfully');
 */
export function useNotification() {
  const notification = reactive({
    show: false,
    type: 'info',
    title: '',
    message: '',
    duration: 3000
  });

  /**
   * Show notification with custom settings
   * @param {string} type - Type of notification (success, error, warning, info)
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {number} duration - Auto-close duration in milliseconds
   */
  const showNotification = (type, title, message, duration = 3000) => {
    notification.type = type;
    notification.title = title;
    notification.message = message;
    notification.duration = duration;
    notification.show = true;
  };

  /**
   * Hide notification
   */
  const hideNotification = () => {
    notification.show = false;
  };

  /**
   * Show success notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {number} duration - Auto-close duration in milliseconds
   */
  const success = (title, message, duration) => {
    showNotification('success', title, message, duration);
  };

  /**
   * Show error notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {number} duration - Auto-close duration in milliseconds
   */
  const error = (title, message, duration) => {
    showNotification('error', title, message, duration);
  };

  /**
   * Show warning notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {number} duration - Auto-close duration in milliseconds
   */
  const warning = (title, message, duration) => {
    showNotification('warning', title, message, duration);
  };

  /**
   * Show info notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {number} duration - Auto-close duration in milliseconds
   */
  const info = (title, message, duration) => {
    showNotification('info', title, message, duration);
  };

  return {
    notification,
    showNotification,
    hideNotification,
    success,
    error,
    warning,
    info
  };
}
