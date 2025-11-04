/**
 * Toast Notification Utility
 * Simple toast notifications for user feedback
 */

/**
 * Create and show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    min-width: 300px;
    max-width: 500px;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: white;
    font-size: 14px;
    font-weight: 500;
    pointer-events: auto;
    animation: slideInRight 0.3s ease-out;
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  // Set background color based on type
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  toast.style.backgroundColor = colors[type] || colors.info;

  // Add icon
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  const icon = document.createElement('span');
  icon.textContent = icons[type] || icons.info;
  icon.style.cssText = `
    font-size: 18px;
    font-weight: bold;
    flex-shrink: 0;
  `;
  toast.appendChild(icon);

  // Add message
  const messageEl = document.createElement('span');
  messageEl.textContent = message;
  messageEl.style.cssText = 'flex: 1;';
  toast.appendChild(messageEl);

  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    opacity: 0.8;
    transition: opacity 0.2s;
    flex-shrink: 0;
  `;
  closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
  closeBtn.onmouseout = () => closeBtn.style.opacity = '0.8';
  closeBtn.onclick = () => removeToast(toast);
  toast.appendChild(closeBtn);

  // Add to container
  container.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

/**
 * Remove toast with animation
 * @param {HTMLElement} toast - The toast element to remove
 */
function removeToast(toast) {
  toast.style.animation = 'slideOutRight 0.3s ease-out';
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Add animations to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Toast API
 */
const toast = {
  /**
   * Show success toast
   * @param {string} message - Success message
   * @param {number} duration - Duration in ms (default: 3000)
   */
  success(message, duration = 3000) {
    showToast(message, 'success', duration);
  },

  /**
   * Show error toast
   * @param {string} message - Error message
   * @param {number} duration - Duration in ms (default: 5000)
   */
  error(message, duration = 5000) {
    showToast(message, 'error', duration);
  },

  /**
   * Show warning toast
   * @param {string} message - Warning message
   * @param {number} duration - Duration in ms (default: 4000)
   */
  warning(message, duration = 4000) {
    showToast(message, 'warning', duration);
  },

  /**
   * Show info toast
   * @param {string} message - Info message
   * @param {number} duration - Duration in ms (default: 3000)
   */
  info(message, duration = 3000) {
    showToast(message, 'info', duration);
  }
};

export default toast;
