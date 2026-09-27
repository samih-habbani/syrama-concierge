import { regionLabel } from '@/lib/property-format'

// Server-rendered so the <h1> is present in the initial HTML even though
// the villa list itself (VillaFleet) is a client component gated behind a
// Suspense boundary — without this, the page's only H1 never made it into
// the static/prerendered markup at all.
export function VillaFleetHeader({ region }: { region?: string | null }) {
  return (
    <div style={{ paddingLeft: 'clamp(32px, 6vw, 96px)', paddingRight: 'clamp(32px, 6vw, 96px)', paddingTop: 80, marginBottom: 60, background: '#06090f' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 32, height: 1, background: '#b8974a' }} />
        <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Villa Collection</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.0, color: '#f5eedd', margin: 0 }}>Our residences.</h1>
          {region && (
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8974a', margin: '12px 0 0 0' }}>
              {regionLabel(region)}
            </p>
          )}
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: '#8f8f7f', margin: '0 0 20px' }}>Handpicked villas, chalets and residences for rent. Every property is inspected and staffed, ready for your arrival.</p>
        </div>
      </div>
    </div>
  )
}
