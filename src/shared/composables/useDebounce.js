import { ref, watch, customRef } from 'vue'

/**
 * Debounce a value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Ref} Debounced value
 */
export function useDebounce(value, delay = 300) {
  return customRef((track, trigger) => {
    let timeout
    return {
      get() {
        track()
        return value.value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value.value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

/**
 * Debounce a function
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function useDebouncedFn(fn, delay = 300) {
  let timeout

  const debouncedFn = (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  debouncedFn.cancel = () => {
    clearTimeout(timeout)
  }

  return debouncedFn
}

/**
 * Watch a ref with debounce
 * @param {Ref} source - The ref to watch
 * @param {Function} callback - Callback function
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Stop watch function
 */
export function useDebouncedWatch(source, callback, delay = 300) {
  const debouncedValue = ref(source.value)

  let timeout
  const stopWatch = watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
      callback(newValue)
    }, delay)
  })

  return {
    debouncedValue,
    stop: () => {
      clearTimeout(timeout)
      stopWatch()
    }
  }
}
