import { ImageResponse } from 'next/og'

export const alt = 'Syrama · Dubai Private Concierge — private aviation, villas, yachting and bespoke events'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #06090f 0%, #0b1220 55%, #06090f 100%)',
          color: '#f5eedd',
          padding: 80,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 2, background: '#b8974a' }} />
          <div style={{ fontSize: 22, letterSpacing: 14, textTransform: 'uppercase', color: '#b8974a', fontFamily: 'Arial, sans-serif' }}>
            Dubai · Private Concierge
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 128, letterSpacing: 24, textTransform: 'uppercase', color: '#f5eedd' }}>
            Syrama
          </div>
          <div style={{ fontSize: 34, color: '#d4b472', fontStyle: 'italic' }}>
            Exclusive access. Absolute discretion.
          </div>
        </div>

        <div style={{ fontSize: 24, color: '#8a8a7c', fontFamily: 'Arial, sans-serif', letterSpacing: 2 }}>
          Private Aviation · Villas · Yachting · Events · Bespoke
        </div>
      </div>
    ),
    { ...size },
  )
}
