/**
 * Case Conversion Utilities
 * Transforms API responses between snake_case and camelCase
 */

/**
 * Convert snake_case to camelCase
 * @param {string} str - Snake case string
 * @returns {string} Camel case string
 */
export function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase to snake_case
 * @param {string} str - Camel case string
 * @returns {string} Snake case string
 */
export function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Recursively convert object keys from snake_case to camelCase
 * @param {any} obj - Object to convert
 * @returns {any} Converted object
 */
export function keysToCamelCase(obj) {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => keysToCamelCase(item));
  }

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = toCamelCase(key);
      converted[camelKey] = keysToCamelCase(value);
    }
    return converted;
  }

  return obj;
}

/**
 * Recursively convert object keys from camelCase to snake_case
 * @param {any} obj - Object to convert
 * @returns {any} Converted object
 */
export function keysToSnakeCase(obj) {
  if (obj === null || obj === undefined) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => keysToSnakeCase(item));
  }

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = toSnakeCase(key);
      converted[snakeKey] = keysToSnakeCase(value);
    }
    return converted;
  }

  return obj;
}
