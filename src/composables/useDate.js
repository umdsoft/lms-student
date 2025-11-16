/**
 * Date Formatting Composable
 * Handles both camelCase and snake_case timestamp fields
 */
export function useDate() {
  /**
   * Get timestamp from object (supports both naming conventions)
   * @param {Object} obj - Object with timestamp field
   * @param {string} field - Field name ('created' or 'updated')
   * @returns {string|null} ISO timestamp
   */
  const getTimestamp = (obj, field = 'created') => {
    if (!obj) return null;

    const camelCase = `${field}At`;
    const snakeCase = `${field}_at`;

    return obj[camelCase] || obj[snakeCase] || null;
  };

  /**
   * Format date for display
   * @param {string} timestamp - ISO timestamp
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} Formatted date
   */
  const formatDate = (timestamp, options = {}) => {
    if (!timestamp) return '';

    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    try {
      return new Date(timestamp).toLocaleDateString('uz-UZ', {
        ...defaultOptions,
        ...options
      });
    } catch (error) {
      console.error('Date format error:', error);
      return '';
    }
  };

  /**
   * Format date with time
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Formatted date and time
   */
  const formatDateTime = (timestamp) => {
    return formatDate(timestamp, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Get relative time (e.g., "2 hours ago")
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Relative time
   */
  const relativeTime = (timestamp) => {
    if (!timestamp) return '';

    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Hozirgina';
      if (diffMins < 60) return `${diffMins} daqiqa oldin`;
      if (diffHours < 24) return `${diffHours} soat oldin`;
      if (diffDays < 7) return `${diffDays} kun oldin`;

      return formatDate(timestamp);
    } catch (error) {
      return '';
    }
  };

  return {
    getTimestamp,
    formatDate,
    formatDateTime,
    relativeTime
  };
}
