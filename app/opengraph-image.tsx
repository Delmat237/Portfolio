import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Leonel Delmat AZANGUE — Ingénieur IA & Full-Stack'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #020617 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, color: '#a5b4fc', marginBottom: 16 }}>Portfolio</div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
          Leonel Delmat AZANGUE
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            marginTop: 20,
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Ingénieur IA &amp; Full-Stack
        </div>
        <div style={{ fontSize: 28, color: '#cbd5e1', marginTop: 24, maxWidth: 900 }}>
          IA Agentique · Computer Vision · DevOps · Technologies à impact social
        </div>
        <div style={{ fontSize: 24, color: '#64748b', marginTop: 40 }}>
          azangue-leonel-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
