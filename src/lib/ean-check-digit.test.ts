import { describe, it, expect } from 'vitest'
import { calculateEan13CheckDigit, calculateEan8CheckDigit } from './ean-check-digit'

describe('calculateEan13CheckDigit', () => {
  it('returns correct check digit for known EAN-13 codes', () => {
    expect(calculateEan13CheckDigit('590123412345')).toBe('7')
    expect(calculateEan13CheckDigit('400638133393')).toBe('1')
    expect(calculateEan13CheckDigit('789000000000')).toBe('0')
  })

  it('returns "0" when sum is exactly divisible by 10', () => {
    expect(calculateEan13CheckDigit('000000000000')).toBe('0')
  })

  it('returns empty string for wrong length', () => {
    expect(calculateEan13CheckDigit('12345')).toBe('')
    expect(calculateEan13CheckDigit('1234567890123')).toBe('')
    expect(calculateEan13CheckDigit('')).toBe('')
  })

  it('returns empty string for non-numeric input', () => {
    expect(calculateEan13CheckDigit('12345678901a')).toBe('')
    expect(calculateEan13CheckDigit('abcdefghijkl')).toBe('')
  })

  it('returns a single digit string', () => {
    const result = calculateEan13CheckDigit('789000000001')
    expect(result).toMatch(/^\d$/)
  })
})

describe('calculateEan8CheckDigit', () => {
  it('returns correct check digit for known EAN-8 codes', () => {
    expect(calculateEan8CheckDigit('1234567')).toBe('0')
    expect(calculateEan8CheckDigit('9638507')).toBe('4')
  })

  it('returns empty string for wrong length', () => {
    expect(calculateEan8CheckDigit('123456')).toBe('')
    expect(calculateEan8CheckDigit('12345678')).toBe('')
    expect(calculateEan8CheckDigit('')).toBe('')
  })

  it('returns empty string for non-numeric input', () => {
    expect(calculateEan8CheckDigit('123456a')).toBe('')
    expect(calculateEan8CheckDigit('abcdefg')).toBe('')
  })

  it('returns a single digit string', () => {
    const result = calculateEan8CheckDigit('5555555')
    expect(result).toMatch(/^\d$/)
  })
})
