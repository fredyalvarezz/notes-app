import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

const AUTO_DISMISS_MS = 3000

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = nextId.current++
      setToasts((prev) => [...prev, { id, message, type }])

      setTimeout(() => {
        dismissToast(id)
      }, AUTO_DISMISS_MS)
    },
    [dismissToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider')
  }
  return context
}
