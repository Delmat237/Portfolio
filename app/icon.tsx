import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 34,
          fontWeight: 800,
          color: 'white',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
          borderRadius: 14,
          fontFamily: 'sans-serif',
        }}
      >
        AL
      </div>
    ),
    { ...size }
  )
}
