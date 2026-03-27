'use client'

import { useRef, useEffect, useCallback, useId } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const id = useId()
  const titleId = `${id}-title`
  const messageId = `${id}-message`
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      cancelBtnRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleCancel = useCallback(() => {
    onCancel()
  }, [onCancel])

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/40 bg-white rounded-xl border border-gray-200 p-6 max-w-sm w-full shadow-xl"
      onClose={handleCancel}
      aria-labelledby={titleId}
      aria-describedby={messageId}
    >
      <h3 id={titleId} className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p id={messageId} className="text-sm text-gray-600 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          ref={cancelBtnRef}
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}
