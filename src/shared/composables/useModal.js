import { ref } from 'vue'

/**
 * Modal state management composable
 * @param {Object} options - Modal options
 * @param {boolean} options.initialState - Initial open state
 * @returns {Object} Modal state and methods
 */
export function useModal(options = {}) {
  const {
    initialState = false
  } = options

  const isOpen = ref(initialState)
  const data = ref(null)

  const open = (payload = null) => {
    data.value = payload
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    // Clear data after animation completes
    setTimeout(() => {
      data.value = null
    }, 300)
  }

  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  const setData = (payload) => {
    data.value = payload
  }

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData
  }
}

/**
 * Manage multiple modals
 * @param {Array<string>} modalNames - Array of modal names
 * @returns {Object} Multiple modal states and methods
 */
export function useModals(modalNames = []) {
  const modals = {}

  modalNames.forEach(name => {
    modals[name] = useModal()
  })

  const closeAll = () => {
    Object.values(modals).forEach(modal => modal.close())
  }

  return {
    modals,
    closeAll
  }
}
