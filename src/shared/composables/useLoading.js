import { ref } from 'vue'

/**
 * Loading state management composable
 * @param {boolean} initialState - Initial loading state
 * @returns {Object} Loading state and methods
 */
export function useLoading(initialState = false) {
  const loading = ref(initialState)
  const error = ref(null)

  const setLoading = (state) => {
    loading.value = state
    if (state) {
      error.value = null
    }
  }

  const setError = (err) => {
    error.value = err
    loading.value = false
  }

  const clearError = () => {
    error.value = null
  }

  /**
   * Wrap an async function with loading state
   * @param {Function} fn - Async function to wrap
   * @returns {Function} Wrapped function
   */
  const withLoading = (fn) => {
    return async (...args) => {
      setLoading(true)
      try {
        const result = await fn(...args)
        setLoading(false)
        return result
      } catch (err) {
        setError(err)
        throw err
      }
    }
  }

  return {
    loading,
    error,
    setLoading,
    setError,
    clearError,
    withLoading
  }
}

/**
 * Manage multiple loading states
 * @param {Array<string>} keys - Array of loading state keys
 * @returns {Object} Multiple loading states and methods
 */
export function useLoadingStates(keys = []) {
  const states = {}

  keys.forEach(key => {
    states[key] = useLoading()
  })

  const isAnyLoading = () => {
    return Object.values(states).some(state => state.loading.value)
  }

  const hasAnyError = () => {
    return Object.values(states).some(state => state.error.value)
  }

  const clearAllErrors = () => {
    Object.values(states).forEach(state => state.clearError())
  }

  return {
    states,
    isAnyLoading,
    hasAnyError,
    clearAllErrors
  }
}
