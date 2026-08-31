'use client'
import { useState } from 'react'
import Link from 'next/link'
import ReservationModal from './ReservationModal'
import AvailabilityModal from './AvailabilityModal'
import ShareButtons from './ShareButtons'
import YachtExperienceJourney from './YachtExperienceJourney'
import { yachtHref } from '@/lib/slug'

interface Media {
  id: number
  url: string | null
  alt: string | null
}

interface Yacht {
  id: number
  model: string
  builder: string | null
  length: number
  maxGuests: number | null
  cabins: number
  bathrooms: number | null
  maxSleeping: number | null
  year: number | null
  priceDay: number | null
  priceSale: number | null
  region: string | null
  city: string | null
  status: string | null
  engines: string | null
  engineHours: number | null
  beam: number | null
  beamOpenPlatform: number | null
  draft: number | null
  cruiseSpeed: number | null
  maxSpeed: number | null
  consumption: string | null
  autonomy: string | null
  fuelCapacity: number | null
  waterCapacity: number | null
  navigationClass: string | null
  dryWeight: number | null
  hull: string | null
  media?: Media[]
}

interface SimilarYacht {
  id: number
  model: string
  builder: string | null
  length: number
  maxGuests: number | null
  cabins: number
  priceDay: number | null
  priceSale: number | null
  region: string | null
  status: string | null
  media?: Media[]
}

interface YachtDetailClientProps {
  yacht: Yacht
  similarYachts?: SimilarYacht[]
}

// A field with no real data (null/undefined/empty string, or 0 — some
// imports store a missing number as 0 instead of null) must never be shown
// as if it were a value.
const hasValue = (v: unknown): v is number | string => v !== null && v !== undefined && v !== '' && v !== 0

export default function YachtDetailClient({ yacht, similarYachts = [] }: YachtDetailClientProps) {
  const [imgIndex, setImgIndex] = useState(0)
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
  const images = yacht.media || []
  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setImgIndex(i => (i + 1) % images.length)

  const fleetParams = new URLSearchParams()
  if (yacht.region) fleetParams.set('region', yacht.region)
  const fleetHref = fleetParams.size > 0 ? `/yachting/fleet?${fleetParams.toString()}` : '/yachting/fleet'

  // A charter guest planning a trip needs the essentials to picture the
  // cruise — size, capacity/comfort, brand, and where to embark. A spec with
  // no real data is dropped instead of being shown blank or as a 0.
  const charterSpecs: [string, number | string | null | undefined][] = [
    ['Length', `${yacht.length}m`],
    ['Builder', yacht.builder],
    ['Year', yacht.year],
    ['Cabins', yacht.cabins],
    ['Bathrooms', yacht.bathrooms],
    ['Guests', yacht.maxGuests],
    ['Region', yacht.region],
    ['City', yacht.city],
  ]
  const specs = charterSpecs.filter(([, value]) => hasValue(value))

  const availabilityYacht = {
    model: yacht.model,
    builder: yacht.builder,
    length: yacht.length,
    imageUrl: images[0]?.url ? `/uploads/yachts/${images[0].url}` : null,
  }

  // Keeps every content block on the same centred column so nothing hugs
  // the screen edges on wide monitors (the hero image stays full-bleed).
  const container: React.CSSProperties = {
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'clamp(24px, 6vw, 96px)',
    paddingRight: 'clamp(24px, 6vw, 96px)',
  }

  return (
    <main id="main-content" style={{ background: '#06090f', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(6,9,15,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20 }}>
          <Link href={fleetHref} style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8f8f7f', textDecoration: 'none' }}>← Our fleet</Link>
          <Link href="/#contact" className="hidden lg:inline-block" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            className="lg:hidden"
            style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', border: 'none', cursor: 'pointer' }}
          >
            Request Charter
          </button>
        </div>
      </nav>

      <div className="h-[56vh] md:h-[70vh]" style={{ position: 'relative', overflow: 'hidden', marginTop: 64, background: '#1a1a1a' }}>
        {images.length > 0 && (
          <img
            src={`/uploads/yachts/${images[imgIndex].url}`}
            alt={images[imgIndex].alt || yacht.model}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }}
            loading="eager"
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(6,9,15,0.9) 100%)' }} />
        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(6,9,15,0.5)', border: '1px solid rgba(184,151,74,0.3)', color: '#b8974a', width: 44, height: 44, cursor: 'pointer', fontSize: 18, backdropFilter: 'blur(8px)' }}>‹</button>
            <button onClick={next} aria-label="Next photo" style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(6,9,15,0.5)', border: '1px solid rgba(184,151,74,0.3)', color: '#b8974a', width: 44, height: 44, cursor: 'pointer', fontSize: 18, backdropFilter: 'blur(8px)' }}>›</button>
            <div style={{ position: 'absolute', bottom: 20, right: 24, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(245,238,221,0.5)' }}>{imgIndex + 1} / {images.length}</div>
          </>
        )}
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0 }}>
          <div style={container}>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#f5eedd', lineHeight: 1.1, margin: 0 }}>{yacht.model}</h1>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 8 }}>
              {[`${yacht.length}m`, yacht.builder, hasValue(yacht.year) ? yacht.year : null].filter(hasValue).join(' · ')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...container, display: 'flex', gap: 8, paddingTop: 12, paddingBottom: 12, background: '#06090f', overflowX: 'auto' }}>
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setImgIndex(i)}
            aria-label={`View photo ${i + 1} of ${images.length}`}
            aria-current={imgIndex === i}
            style={{ width: 80, height: 56, overflow: 'hidden', cursor: 'pointer', padding: 0, border: 'none', background: 'none', outline: imgIndex === i ? '2px solid #b8974a' : '2px solid transparent', outlineOffset: 2, transition: 'outline-color 0.2s ease', flexShrink: 0 }}
          >
            <img src={`/uploads/yachts/${img.url}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: imgIndex === i ? 'brightness(1)' : 'brightness(0.5)', transition: 'filter 0.3s ease' }} loading="lazy" />
          </button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 pt-12 pb-16 md:pt-16 md:pb-[120px]"
        style={{ ...container, alignItems: 'start' }}
      >
        <div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
            {specs.map(([label, value]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8f8f7f', marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, fontWeight: 300, color: '#d4b472' }}>{value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 2, color: '#8f8f7f', marginBottom: 48, maxWidth: 620 }}>
            Premium yacht available for charter. Experience luxury maritime travel with a professional crew, curated itineraries and world-class amenities, arranged end to end by our concierge team.
          </p>
        </div>

        <div className="lg:sticky lg:top-[100px]">
          <div style={{ border: '1px solid rgba(184,151,74,0.2)', padding: 36, background: 'rgba(184,151,74,0.02)' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 300, color: '#f5eedd', marginBottom: 8 }}>{yacht.model}</div>
            {yacht.priceDay && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8f8f7f', marginBottom: 8 }}>From</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px, 2.4vw, 30px)', fontWeight: 300, color: '#d4b472', lineHeight: 1 }}>
                  €{yacht.priceDay.toLocaleString('en-US')}
                  <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8f8f7f' }}>/day</span>
                </div>
              </div>
            )}
            <button onClick={() => setIsReservationOpen(true)} style={{ width: '100%', textAlign: 'center', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '16px', border: 'none', cursor: 'pointer', marginBottom: 16 }}>Request charter</button>
            <button
              type="button"
              onClick={() => setIsAvailabilityOpen(true)}
              style={{ display: 'block', width: '100%', textAlign: 'center', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', background: 'none', border: '1px solid rgba(184,151,74,0.3)', padding: '14px', cursor: 'pointer' }}
            >
              WhatsApp us
            </button>
          </div>

          <div style={{ marginTop: 24 }}>
            <ShareButtons title={yacht.model} />
          </div>
        </div>
      </div>

      <YachtExperienceJourney
        onRequestExperience={() => setIsReservationOpen(true)}
        onWhatsApp={() => setIsAvailabilityOpen(true)}
      />

      {similarYachts.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(184,151,74,0.12)' }}>
         <div style={{ ...container, paddingBottom: 'clamp(64px, 8vw, 120px)' }}>
          <div style={{ paddingTop: 64, marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 12 }}>Explore</div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 300, color: '#f5eedd', margin: 0, marginBottom: 12 }}>Similar Yachts</h2>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.8, color: '#8f8f7f', maxWidth: 560, margin: 0 }}>
              Comparable in size to {yacht.model}, these yachts may also suit your plans.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 32 }}>
            {similarYachts.map((sim) => (
              <Link key={sim.id} href={yachtHref(sim)} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#1a1a1a' }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img')
                    if (img) img.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img')
                    if (img) img.style.transform = 'scale(1)'
                  }}
                >
                  {sim.media?.[0]?.url && (
                    <img
                      src={`/uploads/yachts/${sim.media[0].url}`}
                      alt={sim.media[0].alt || sim.model}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)' }}
                    />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 60%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: '#f5eedd', lineHeight: 1.2 }}>{sim.model}</div>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 4 }}>
                      {sim.length}m{sim.builder ? ` · ${sim.builder}` : ''}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.05em', color: '#8f8f7f' }}>
                    {sim.maxGuests && `${sim.maxGuests} guests`}{sim.cabins ? ` · ${sim.cabins} cabins` : ''}
                  </div>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4b472' }}>
                    {sim.priceDay ? `From €${sim.priceDay.toLocaleString('en-US')}/day` : 'Price on request'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
         </div>
        </div>
      )}

      <ReservationModal
        yachtId={yacht.id}
        yachtModel={yacht.model}
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <AvailabilityModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        yacht={availabilityYacht}
      />
    </main>
  )
}
