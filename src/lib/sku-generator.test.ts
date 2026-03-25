import { describe, it, expect } from 'vitest'
import { generateSku, generateSkuBatch, type SkuConfig } from './sku-generator'

const baseConfig: SkuConfig = {
  prefix: 'LOJA',
  category: 'CAM',
  attributes: ['AZL', 'M'],
  sequential: 1,
  separator: '-',
}

describe('generateSku', () => {
  it('generates a complete SKU with all parts', () => {
    expect(generateSku(baseConfig)).toBe('LOJA-CAM-AZL-M-0001')
  })

  it('omits prefix when empty', () => {
    expect(generateSku({ ...baseConfig, prefix: '' })).toBe('CAM-AZL-M-0001')
    expect(generateSku({ ...baseConfig, prefix: '   ' })).toBe('CAM-AZL-M-0001')
  })

  it('omits category when empty', () => {
    expect(generateSku({ ...baseConfig, category: '' })).toBe('LOJA-AZL-M-0001')
  })

  it('omits empty attributes', () => {
    expect(generateSku({ ...baseConfig, attributes: ['AZL', '', 'M'] }))
      .toBe('LOJA-CAM-AZL-M-0001')
  })

  it('omits sequential when 0', () => {
    expect(generateSku({ ...baseConfig, sequential: 0 })).toBe('LOJA-CAM-AZL-M')
  })

  it('pads sequential to 4 digits', () => {
    expect(generateSku({ ...baseConfig, sequential: 5 })).toBe('LOJA-CAM-AZL-M-0005')
    expect(generateSku({ ...baseConfig, sequential: 999 })).toBe('LOJA-CAM-AZL-M-0999')
    expect(generateSku({ ...baseConfig, sequential: 10000 })).toBe('LOJA-CAM-AZL-M-10000')
  })

  it('uses custom separator', () => {
    expect(generateSku({ ...baseConfig, separator: '_' })).toBe('LOJA_CAM_AZL_M_0001')
    expect(generateSku({ ...baseConfig, separator: '.' })).toBe('LOJA.CAM.AZL.M.0001')
    expect(generateSku({ ...baseConfig, separator: '' })).toBe('LOJACAMAZLM0001')
  })

  it('sanitizes input: uppercase and removes accents', () => {
    expect(generateSku({ ...baseConfig, prefix: 'café', category: 'chá' }))
      .toBe('CAFE-CHA-AZL-M-0001')
  })

  it('sanitizes input: removes special characters', () => {
    expect(generateSku({ ...baseConfig, prefix: 'A@B#' }))
      .toBe('AB-CAM-AZL-M-0001')
  })

  it('truncates parts to 4 characters', () => {
    expect(generateSku({ ...baseConfig, prefix: 'LONGPREFIX' }))
      .toBe('LONG-CAM-AZL-M-0001')
  })

  it('returns empty string when all fields are empty', () => {
    expect(generateSku({ prefix: '', category: '', attributes: [], sequential: 0, separator: '-' }))
      .toBe('')
  })
})

describe('generateSkuBatch', () => {
  it('generates the correct number of SKUs', () => {
    const result = generateSkuBatch(baseConfig, 5)
    expect(result).toHaveLength(5)
  })

  it('increments sequential for each SKU', () => {
    const result = generateSkuBatch(baseConfig, 3)
    expect(result).toEqual([
      'LOJA-CAM-AZL-M-0001',
      'LOJA-CAM-AZL-M-0002',
      'LOJA-CAM-AZL-M-0003',
    ])
  })

  it('starts from the configured sequential number', () => {
    const result = generateSkuBatch({ ...baseConfig, sequential: 50 }, 2)
    expect(result).toEqual([
      'LOJA-CAM-AZL-M-0050',
      'LOJA-CAM-AZL-M-0051',
    ])
  })

  it('returns empty array for count 0', () => {
    expect(generateSkuBatch(baseConfig, 0)).toEqual([])
  })
})
