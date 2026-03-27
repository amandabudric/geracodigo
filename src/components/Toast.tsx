'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface ToastMessage {
  id: number
  text: string
  type: ToastType
}

let toastId = 0
const listeners = new Set<(msg: ToastMessage) => void>()

export function showToast(text: string, type: ToastType = 'info') {
  const msg: ToastMessage = { id: ++toastId, text, type }
  listeners.forEach(fn => fn(msg))
}

const icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

const styles: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-indigo-50 border-indigo-200 text-indigo-800',
}

const iconStyles: Record<ToastType, string> = {
  success: 'bg-green-100 text-green-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-indigo-100 text-indigo-600',
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setToasts(prev => [...prev.slice(-4), msg])
      const timer = setTimeout(() => removeToast(msg.id), msg.type === 'error' ? 5000 : 3000)
      timersRef.current.set(msg.id, timer)
    }
    listeners.add(handler)
    const timers = timersRef.current
    return () => {
      listeners.delete(handler)
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [removeToast])

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      aria-relevant="additions"
      className="fixed bottom-4 right-4 z-[9998] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          role={toast.type === 'error' ? 'alert' : 'status'}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-up ${styles[toast.type]}`}
        >
          <span
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${iconStyles[toast.type]}`}
            aria-hidden="true"
          >
            {icons[toast.type]}
          </span>
          <p className="text-sm font-medium flex-1">{toast.text}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity p-1"
            aria-label="Fechar notificação"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
