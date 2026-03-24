'use client'

interface AdSlotProps {
  slot: string
  format: 'horizontal' | 'rectangle' | 'responsive'
}

const dimensions = {
  horizontal: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  responsive: { width: '100%', height: 90 },
}

export default function AdSlot({ slot, format }: AdSlotProps) {
  const dim = dimensions[format]

  return (
    <div
      className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 text-gray-400 text-xs rounded"
      style={{
        width: typeof dim.width === 'number' ? `${dim.width}px` : dim.width,
        height: `${dim.height}px`,
        maxWidth: '100%',
      }}
      data-slot={slot}
      data-format={format}
    >
      Publicidade {typeof dim.width === 'number' ? `${dim.width}×${dim.height}` : `Responsivo`}
    </div>
  )
}
