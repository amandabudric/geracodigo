import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4f46e5',
          borderRadius: 36,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
            GC
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#c7d2fe', letterSpacing: 2 }}>
            GERACODE
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
