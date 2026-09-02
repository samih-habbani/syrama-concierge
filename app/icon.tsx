import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
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
          background: '#06090f',
          color: '#d4b472',
          fontSize: 340,
          fontWeight: 600,
          fontFamily: 'Georgia, "Times New Roman", serif',
          letterSpacing: '-0.04em',
        }}
      >
        S
      </div>
    ),
    { ...size },
  )
}
