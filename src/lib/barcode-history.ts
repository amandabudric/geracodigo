const STORAGE_KEY = 'geracode_barcode_history'
const MAX_ITEMS = 30

export interface BarcodeHistoryItem {
  id: string
  value: string
  format: string
  createdAt: number
}

export function getHistory(): BarcodeHistoryItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as BarcodeHistoryItem[]
  } catch {
    return []
  }
}

export function addToHistory(value: string, format: string): void {
  if (typeof window === 'undefined') return
  try {
    const items = getHistory()
    const existing = items.findIndex(i => i.value === value && i.format === format)
    if (existing !== -1) items.splice(existing, 1)

    items.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      value,
      format,
      createdAt: Date.now(),
    })

    if (items.length > MAX_ITEMS) items.length = MAX_ITEMS
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch { /* localStorage full or unavailable */ }
}

export function removeFromHistory(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const items = getHistory().filter(i => i.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch { /* noop */ }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch { /* noop */ }
}
