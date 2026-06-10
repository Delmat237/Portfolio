import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 96,
          fontWeight: 800,
          color: 'white',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
          fontFamily: 'sans-serif',
        }}
      >
        AL
      </div>
    ),
    { ...size }
  )
}
