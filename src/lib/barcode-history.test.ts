import { describe, it, expect, beforeEach, vi } from 'vitest'

const STORAGE_KEY = 'geracode_barcode_history'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn(() => null as string | null),
  }
})()

Object.defineProperty(globalThis, 'window', { value: globalThis, writable: true })
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

const { getHistory, addToHistory, removeFromHistory, clearHistory } = await import('./barcode-history')

describe('barcode-history', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  describe('getHistory', () => {
    it('returns empty array when no history exists', () => {
      expect(getHistory()).toEqual([])
    })

    it('returns parsed items from localStorage', () => {
      const items = [{ id: '1', value: '123', format: 'EAN13', createdAt: 1000 }]
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(items))
      expect(getHistory()).toEqual(items)
    })

    it('returns empty array for corrupted data', () => {
      localStorageMock.setItem(STORAGE_KEY, 'not-json')
      expect(getHistory()).toEqual([])
    })
  })

  describe('addToHistory', () => {
    it('adds a new item to history', () => {
      addToHistory('7891234567890', 'EAN13')
      const history = getHistory()
      expect(history).toHaveLength(1)
      expect(history[0].value).toBe('7891234567890')
      expect(history[0].format).toBe('EAN13')
    })

    it('prepends new items (most recent first)', () => {
      addToHistory('AAA', 'CODE128')
      addToHistory('BBB', 'CODE128')
      const history = getHistory()
      expect(history[0].value).toBe('BBB')
      expect(history[1].value).toBe('AAA')
    })

    it('deduplicates by value+format and moves to top', () => {
      addToHistory('AAA', 'CODE128')
      addToHistory('BBB', 'CODE128')
      addToHistory('AAA', 'CODE128')
      const history = getHistory()
      expect(history).toHaveLength(2)
      expect(history[0].value).toBe('AAA')
    })

    it('allows same value with different format', () => {
      addToHistory('123', 'CODE128')
      addToHistory('123', 'EAN13')
      const history = getHistory()
      expect(history).toHaveLength(2)
    })

    it('limits history to 30 items', () => {
      for (let i = 0; i < 35; i++) {
        addToHistory(`code-${i}`, 'CODE128')
      }
      const history = getHistory()
      expect(history).toHaveLength(30)
      expect(history[0].value).toBe('code-34')
    })
  })

  describe('removeFromHistory', () => {
    it('removes an item by id', () => {
      addToHistory('AAA', 'CODE128')
      const history = getHistory()
      const id = history[0].id
      removeFromHistory(id)
      expect(getHistory()).toHaveLength(0)
    })

    it('does nothing for non-existent id', () => {
      addToHistory('AAA', 'CODE128')
      removeFromHistory('fake-id')
      expect(getHistory()).toHaveLength(1)
    })
  })

  describe('clearHistory', () => {
    it('removes all history', () => {
      addToHistory('AAA', 'CODE128')
      addToHistory('BBB', 'EAN13')
      clearHistory()
      expect(getHistory()).toEqual([])
    })
  })
})
