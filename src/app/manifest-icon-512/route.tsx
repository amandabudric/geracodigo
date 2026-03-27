import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const SIZE = 512

function Icon() {
  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4f46e5',
        borderRadius: SIZE * 0.2,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div style={{ fontSize: 192, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
          GC
        </div>
        <div style={{ fontSize: 42, fontWeight: 600, color: '#c7d2fe', letterSpacing: 4 }}>
          GERACODE
        </div>
      </div>
    </div>
  )
}

export async function GET() {
  return new ImageResponse(<Icon />, {
    width: SIZE,
    height: SIZE,
  })
}
