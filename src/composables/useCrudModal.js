/**
 * CENTRALIZED CRUD MODAL LOGIC
 * ============================
 * Bu composable BARCHA form modallar uchun YAGONA CRUD logikani ta'minlaydi.
 *
 * DRY Principle:
 * - Response handling bir joyda
 * - Error handling bir joyda
 * - Notification bir joyda
 * - Loading state bir joyda
 *
 * @example
 * const { loading, errorMessage, handleSubmit, handleDelete } = useCrudModal({
 *   createFn: (data) => store.create(data),
 *   updateFn: (id, data) => store.update(id, data),
 *   onSuccess: () => closeModal(),
 *   messages: {
 *     createSuccess: 'Yaratildi',
 *     updateSuccess: 'Yangilandi'
 *   }
 * });
 */

import { ref } from 'vue';
import { useNotification } from './useNotification';
import { parseResponse, parseError } from '@/utils/apiHelper';

/**
 * CRUD Modal Composable
 *
 * @param {Object} options - Configuration options
 * @param {Function} [options.createFn] - Store create action (data) => Promise
 * @param {Function} [options.updateFn] - Store update action (id, data) => Promise
 * @param {Function} [options.deleteFn] - Store delete action (id) => Promise
 * @param {Function} [options.onSuccess] - Success callback (data, isEdit, isDelete) => void
 * @param {Function} [options.onError] - Error callback (error) => void
 * @param {Object} [options.messages] - i18n/custom messages
 * @param {string} [options.messages.createSuccess] - Create success message
 * @param {string} [options.messages.updateSuccess] - Update success message
 * @param {string} [options.messages.deleteSuccess] - Delete success message
 * @param {string} [options.messages.createError] - Create error message
 * @param {string} [options.messages.updateError] - Update error message
 * @param {string} [options.messages.deleteError] - Delete error message
 *
 * @returns {Object} CRUD methods and state
 */
export function useCrudModal(options = {}) {
  const {
    createFn,
    updateFn,
    deleteFn,
    onSuccess,
    onError,
    messages = {}
  } = options;

  // Get notification composable
  const notification = useNotification();

  // Reactive state
  const loading = ref(false);
  const errorMessage = ref('');

  /**
   * Default messages (Uzbek)
   */
  const defaultMessages = {
    createSuccess: 'Muvaffaqiyatli yaratildi',
    updateSuccess: 'Muvaffaqiyatli yangilandi',
    deleteSuccess: "Muvaffaqiyatli o'chirildi",
    createError: 'Yaratishda xatolik yuz berdi',
    updateError: 'Yangilashda xatolik yuz berdi',
    deleteError: "O'chirishda xatolik yuz berdi"
  };

  /**
   * Get message with fallback to default
   * @param {string} key - Message key
   * @returns {string} Message
   */
  const getMessage = (key) => {
    return messages[key] || defaultMessages[key];
  };

  /**
   * Handle form submit (create or update)
   *
   * @param {Object} data - Form data to submit
   * @param {Object|null} existingItem - Existing item for edit mode (must have .id)
   * @returns {Promise<boolean>} Success status
   */
  const handleSubmit = async (data, existingItem = null) => {
    const isEditMode = existingItem?.id != null;

    loading.value = true;
    errorMessage.value = '';

    try {
      let response;

      if (isEditMode) {
        // UPDATE
        if (!updateFn) {
          throw new Error('updateFn not provided to useCrudModal');
        }
        response = await updateFn(existingItem.id, data);
      } else {
        // CREATE
        if (!createFn) {
          throw new Error('createFn not provided to useCrudModal');
        }
        response = await createFn(data);
      }

      // UNIFIED RESPONSE PARSING
      const result = parseResponse(response);

      if (result.success) {
        // Success notification
        const successMsg =
          result.message ||
          (isEditMode ? getMessage('updateSuccess') : getMessage('createSuccess'));
        notification.success(successMsg);

        // Success callback
        if (onSuccess) {
          onSuccess(result.data, isEditMode, false);
        }

        return true;
      } else {
        // API returned success: false
        errorMessage.value =
          result.message ||
          (isEditMode ? getMessage('updateError') : getMessage('createError'));
        notification.error(errorMessage.value);

        if (onError) {
          onError(new Error(errorMessage.value));
        }

        return false;
      }
    } catch (error) {
      // Exception occurred
      console.error('CRUD Submit Error:', error);
      errorMessage.value = parseError(error);
      notification.error(errorMessage.value);

      if (onError) {
        onError(error);
      }

      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Handle delete operation
   *
   * @param {number|string} id - Item ID to delete
   * @param {Object} [options] - Delete options
   * @param {Function} [options.deleteFn] - Override delete function
   * @param {string} [options.successMessage] - Override success message
   * @returns {Promise<boolean>} Success status
   */
  const handleDelete = async (id, deleteOptions = {}) => {
    const deleteFunction = deleteOptions.deleteFn || deleteFn;
    const successMsg = deleteOptions.successMessage || getMessage('deleteSuccess');

    if (!deleteFunction) {
      console.error('deleteFn not provided to useCrudModal');
      return false;
    }

    loading.value = true;
    errorMessage.value = '';

    try {
      const response = await deleteFunction(id);
      const result = parseResponse(response);

      if (result.success) {
        notification.success(result.message || successMsg);

        if (onSuccess) {
          onSuccess(null, false, true); // isDelete = true
        }

        return true;
      } else {
        errorMessage.value = result.message || getMessage('deleteError');
        notification.error(errorMessage.value);

        if (onError) {
          onError(new Error(errorMessage.value));
        }

        return false;
      }
    } catch (error) {
      console.error('CRUD Delete Error:', error);
      errorMessage.value = parseError(error);
      notification.error(errorMessage.value);

      if (onError) {
        onError(error);
      }

      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    errorMessage.value = '';
  };

  /**
   * Reset state
   */
  const reset = () => {
    loading.value = false;
    errorMessage.value = '';
  };

  return {
    // State
    loading,
    errorMessage,

    // Methods
    handleSubmit,
    handleDelete,
    clearError,
    reset,

    // Direct access to notification for advanced usage
    notification
  };
}

export default useCrudModal;
