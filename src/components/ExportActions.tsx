'use client'

interface ExportAction {
  label: string
  ariaLabel: string
  onClick: () => void
  variant: 'primary' | 'secondary' | 'outline'
  loading?: boolean
  loadingLabel?: string
}

interface ExportActionsProps {
  actions: ExportAction[]
  disabled?: boolean
}

const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
  secondary: 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus-visible:ring-indigo-500',
  outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400',
}

export default function ExportActions({ actions, disabled = false }: ExportActionsProps) {
  const colsClass = actions.length <= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
  return (
    <div className={`grid grid-cols-2 ${colsClass} gap-2`}>
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          disabled={disabled || action.loading}
          aria-label={action.ariaLabel}
          className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] ${variantStyles[action.variant]}`}
        >
          {action.loading ? (action.loadingLabel ?? 'Gerando…') : action.label}
        </button>
      ))}
    </div>
  )
}
