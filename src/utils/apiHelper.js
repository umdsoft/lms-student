/**
 * CENTRALIZED API RESPONSE HANDLER
 * ================================
 * Bu fayl barcha store va componentlarda API response'larni
 * YAGONA FORMAT ga keltirib beradi.
 *
 * DRY Principle: Bir joyda yozib, hamma joyda ishlatish
 *
 * @example
 * import { parseResponse, parseError } from '@/utils/apiHelper';
 *
 * const result = parseResponse(storeResponse);
 * if (result.success) {
 *   // Handle success
 * }
 */

/**
 * Parse API/Store response to unified format
 *
 * Handles multiple response formats:
 * 1. Axios response: { data: { success, data, message }, status }
 * 2. Direct API response: { success, data, message }
 * 3. Legacy format: { data: ... } (assumes success)
 * 4. Raw data: any (assumes success)
 *
 * @param {Object|any} response - Axios response yoki Store result
 * @returns {{ success: boolean, data: any, message: string }}
 */
export const parseResponse = (response) => {
  // Guard: null/undefined
  if (!response) {
    return {
      success: false,
      data: null,
      message: 'Javob olinmadi'
    };
  }

  // CASE 1: Axios response wrapper { data: { success, data, message }, status }
  // This is when axios returns the full response object
  if (
    response.data &&
    typeof response.data === 'object' &&
    'success' in response.data
  ) {
    return {
      success: Boolean(response.data.success),
      data: response.data.data ?? null,
      message: response.data.message ?? ''
    };
  }

  // CASE 2: Direct backend response { success, data, message }
  // This is when store already extracts response.data
  if ('success' in response) {
    return {
      success: Boolean(response.success),
      data: response.data ?? null,
      message: response.message ?? ''
    };
  }

  // CASE 3: Axios response with data but no success flag { data: {...} }
  // Legacy format - assume success if data exists
  if (response.data && !('success' in response.data)) {
    return {
      success: true,
      data: response.data,
      message: ''
    };
  }

  // CASE 4: Raw data (anything else)
  // Return as-is with success=true
  return {
    success: true,
    data: response,
    message: ''
  };
};

/**
 * Parse error to user-friendly message
 *
 * Handles:
 * - Axios errors with backend message
 * - HTTP status codes
 * - Network errors
 * - Timeout errors
 * - Generic JS errors
 *
 * @param {Error|Object} error - Error object
 * @returns {string} User-friendly error message
 */
export const parseError = (error) => {
  // Axios error with backend message
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // HTTP Status code based messages
  const status = error.response?.status;
  const statusMessages = {
    400: "Noto'g'ri so'rov",
    401: 'Sessiya tugadi. Qayta kiring',
    403: "Ruxsat yo'q",
    404: "Ma'lumot topilmadi",
    409: "Bu ma'lumot allaqachon mavjud",
    422: "Ma'lumotlar noto'g'ri",
    429: "Juda ko'p so'rov. Biroz kuting",
    500: 'Server xatosi',
    502: 'Server vaqtincha ishlamayapti',
    503: 'Xizmat mavjud emas'
  };

  if (status && statusMessages[status]) {
    return statusMessages[status];
  }

  // Network error (no internet)
  if (error.message === 'Network Error') {
    return "Internet aloqasi yo'q";
  }

  // Timeout error
  if (error.code === 'ECONNABORTED') {
    return "So'rov vaqti tugadi";
  }

  // Axios cancel
  if (error.name === 'CanceledError') {
    return "So'rov bekor qilindi";
  }

  // Generic error message
  return error.message || 'Xatolik yuz berdi';
};

/**
 * Check if response indicates success
 * Utility function for quick success checking
 *
 * @param {Object} response - API/Store response
 * @returns {boolean}
 */
export const isSuccessResponse = (response) => {
  const parsed = parseResponse(response);
  return parsed.success;
};

/**
 * Extract data from response
 * Returns null if response is not successful
 *
 * @param {Object} response - API/Store response
 * @returns {any|null}
 */
export const extractData = (response) => {
  const parsed = parseResponse(response);
  return parsed.success ? parsed.data : null;
};

/**
 * Extract message from response
 *
 * @param {Object} response - API/Store response
 * @returns {string}
 */
export const extractMessage = (response) => {
  const parsed = parseResponse(response);
  return parsed.message;
};

export default {
  parseResponse,
  parseError,
  isSuccessResponse,
  extractData,
  extractMessage
};
