'use client'
import { useState } from 'react'
import Link from 'next/link'
import VillaInquiryModal from './VillaInquiryModal'
import VillaAvailabilityModal from './VillaAvailabilityModal'
import ShareButtons from '@/components/yachting/ShareButtons'
import { propertyHref } from '@/lib/slug'
import {
  amenityList, bedDistribution, displayRate, formatRate, regionLabel,
} from '@/lib/property-format'
import type { PropertyDetail, PropertyCard } from '@/lib/property-service'

interface VillaDetailClientProps {
  villa: PropertyDetail
  descriptionHtml: string
  similar?: PropertyCard[]
}

const hasValue = (v: unknown): v is number | string => v !== null && v !== undefined && v !== '' && v !== 0

const STAY_INCLUDES = [
  { title: 'Dedicated concierge', text: 'A single point of contact before and throughout your stay.' },
  { title: 'Private chef on request', text: 'Curated menus, in-villa dining and provisioning.' },
  { title: 'Daily housekeeping', text: 'Full staff, laundry and turndown service.' },
  { title: 'Transfers & drivers', text: 'Airport pick-up, chauffeured cars, helicopter on request.' },
]

export default function VillaDetailClient({ villa, descriptionHtml, similar = [] }: VillaDetailClientProps) {
  const [imgIndex, setImgIndex] = useState(0)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
  const images = villa.media || []
  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setImgIndex(i => (i + 1) % images.length)

  const listParams = new URLSearchParams()
  if (villa.region) listParams.set('region', villa.region)
  const listHref = listParams.size > 0 ? `/villas/rentals?${listParams.toString()}` : '/villas/rentals'

  const surfaceStr = villa.surface ? `${villa.surface} ${villa.surfaceUnit === 'm' ? 'm²' : villa.surfaceUnit || 'm²'}` : null
  const allSpecs: [string, number | string | null | undefined][] = [
    ['Type', villa.type],
    ['Bedrooms', villa.bedrooms],
    ['Bathrooms', villa.bathrooms],
    ['Beds', villa.beds],
    ['Guests', villa.maxGuests],
    ['Surface', surfaceStr],
    ['Region', villa.region ? regionLabel(villa.region) : null],
    ['City', villa.city],
    ['Year', villa.year],
  ]
  const specs = allSpecs.filter(([, v]) => hasValue(v))

  const rate = displayRate(villa)
  const amenities = amenityList(villa.amenities)
  const beds = bedDistribution(villa.bedDistribution)

  const availabilityVilla = {
    title: villa.title || 'Villa',
    city: villa.city,
    region: villa.region,
    imageUrl: images[0]?.url ? `/uploads/yachts/${images[0].url}` : null,
  }

  return (
    <main id="main-content" style={{ background: '#06090f', minHeight: '100vh' }}>
      <nav className="px-5 md:px-12" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20, background: 'rgba(6,9,15,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <Link href={listHref} style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8f8f7f', textDecoration: 'none' }}>← Villas</Link>
        <Link href="/#contact" className="hidden lg:inline-block" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
        <button type="button" onClick={() => setIsInquiryOpen(true)} className="lg:hidden"
          style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
          Request Stay
        </button>
      </nav>

      <div className="h-[56vh] md:h-[70vh]" style={{ position: 'relative', overflow: 'hidden', marginTop: 64, background: '#1a1a1a' }}>
        {images.length > 0 && (
          <img src={`/uploads/yachts/${images[imgIndex].url}`} alt={images[imgIndex].alt || villa.title || 'Villa'} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }} loading="eager" />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(6,9,15,0.9) 100%)' }} />
        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(6,9,15,0.5)', border: '1px solid rgba(184,151,74,0.3)', color: '#b8974a', width: 44, height: 44, cursor: 'pointer', fontSize: 18, backdropFilter: 'blur(8px)' }}>‹</button>
            <button onClick={next} aria-label="Next photo" style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(6,9,15,0.5)', border: '1px solid rgba(184,151,74,0.3)', color: '#b8974a', width: 44, height: 44, cursor: 'pointer', fontSize: 18, backdropFilter: 'blur(8px)' }}>›</button>
            <div style={{ position: 'absolute', bottom: 20, right: 24, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(245,238,221,0.5)' }}>{imgIndex + 1} / {images.length}</div>
          </>
        )}
        <div style={{ position: 'absolute', bottom: 32, left: 'clamp(24px, 6vw, 96px)', right: 'clamp(24px, 6vw, 96px)' }}>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px, 4.6vw, 60px)', fontWeight: 300, color: '#f5eedd', lineHeight: 1.1, margin: 0 }}>{villa.title}</h1>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 8 }}>
            {[villa.type, villa.city, villa.region ? regionLabel(villa.region) : null].filter(Boolean).join(' · ')}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px clamp(24px, 6vw, 96px)', background: '#06090f', overflowX: 'auto' }}>
        {images.map((img, i) => (
          <button key={i} type="button" onClick={() => setImgIndex(i)} aria-label={`View photo ${i + 1} of ${images.length}`} aria-current={imgIndex === i}
            style={{ width: 80, height: 56, overflow: 'hidden', cursor: 'pointer', padding: 0, border: 'none', background: 'none', outline: imgIndex === i ? '2px solid #b8974a' : '2px solid transparent', outlineOffset: 2, transition: 'outline-color 0.2s ease', flexShrink: 0 }}>
            <img src={`/uploads/yachts/${img.url}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: imgIndex === i ? 'brightness(1)' : 'brightness(0.5)', transition: 'filter 0.3s ease' }} loading="lazy" />
          </button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 pt-12 pb-16 md:pt-16 md:pb-[120px]"
        style={{ paddingLeft: 'clamp(24px, 6vw, 96px)', paddingRight: 'clamp(24px, 6vw, 96px)', alignItems: 'start' }}
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

          {descriptionHtml ? (
            <div
              className="villa-desc"
              style={{ marginBottom: 56 }}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : (
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 2, color: '#8f8f7f', marginBottom: 56 }}>
              An exceptional residence available for rent, fully staffed and prepared for your arrival by our concierge team.
            </p>
          )}
          <style>{`
            .villa-desc { font-family: var(--font-tenor); font-size: 14px; line-height: 1.9; color: #8f8f7f; }
            .villa-desc h1, .villa-desc h2, .villa-desc h3, .villa-desc h4 { font-family: var(--font-cormorant); font-weight: 300; color: #f5eedd; font-size: 20px; margin: 28px 0 12px; }
            .villa-desc p { margin: 0 0 14px; }
            .villa-desc strong, .villa-desc b { color: #d4b472; font-weight: 500; }
            .villa-desc ul, .villa-desc ol { margin: 0 0 16px; padding-left: 20px; }
            .villa-desc li { margin: 4px 0; }
            .villa-desc a { color: #b8974a; }
          `}</style>

          {amenities.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 20 }}>Amenities</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px 24px' }}>
                {amenities.map((a) => (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-tenor)', fontSize: 12, color: '#a0a090' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#b8974a', flexShrink: 0 }} />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {beds.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 20 }}>Sleeping arrangements</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {beds.map((b, i) => (
                  <div key={i} style={{ border: '1px solid rgba(184,151,74,0.15)', padding: '14px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 16, color: '#f5eedd' }}>{b.room}</div>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.05em', color: '#8f8f7f', marginTop: 4 }}>
                      {b.beds > 1 ? `${b.beds} × ` : ''}{b.bedType || 'Bed'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Every stay includes */}
          <div style={{ borderTop: '1px solid rgba(184,151,74,0.12)', paddingTop: 40 }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 24 }}>Every stay includes</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 24 }}>
              {STAY_INCLUDES.map((s) => (
                <div key={s.title}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 19, fontWeight: 300, color: '#f5eedd', marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.8, color: '#8f8f7f' }}>{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          {villa.mapIframeSrc && (
            <div style={{ marginTop: 56 }}>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 20 }}>Location</div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', overflow: 'hidden', border: '1px solid rgba(184,151,74,0.15)' }}>
                <iframe
                  src={villa.mapIframeSrc}
                  title={`Map — ${villa.title}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'grayscale(0.4) invert(0.92) hue-rotate(180deg)' }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-[100px]">
          <div style={{ border: '1px solid rgba(184,151,74,0.2)', padding: 36, background: 'rgba(184,151,74,0.02)' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: '#f5eedd', marginBottom: 8, lineHeight: 1.2 }}>{villa.title}</div>
            {rate && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8f8f7f', marginBottom: 8 }}>From</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px, 2.4vw, 30px)', fontWeight: 300, color: '#d4b472', lineHeight: 1 }}>
                  {rate.currency}{rate.amount.toLocaleString('en-US')}
                  <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8f8f7f' }}>/{rate.unit}</span>
                </div>
              </div>
            )}
            <button onClick={() => setIsInquiryOpen(true)} style={{ width: '100%', textAlign: 'center', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '16px', border: 'none', cursor: 'pointer', marginBottom: 16 }}>Request stay</button>
            <button type="button" onClick={() => setIsAvailabilityOpen(true)}
              style={{ display: 'block', width: '100%', textAlign: 'center', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', background: 'none', border: '1px solid rgba(184,151,74,0.3)', padding: '14px', cursor: 'pointer' }}>
              WhatsApp us
            </button>
            {(villa.checkInFrom || villa.checkOutBefore) && (
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(184,151,74,0.12)', fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.05em', color: '#8f8f7f', lineHeight: 1.9 }}>
                {villa.checkInFrom && <div>Check-in from {villa.checkInFrom.slice(0, 5)}</div>}
                {villa.checkOutBefore && <div>Check-out before {villa.checkOutBefore.slice(0, 5)}</div>}
                {villa.petsAllowed && <div>Pets welcome</div>}
              </div>
            )}
          </div>

          <div style={{ marginTop: 24 }}>
            <ShareButtons title={villa.title || 'Villa'} />
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div style={{ padding: '0 clamp(24px, 6vw, 96px) clamp(64px, 8vw, 120px)', borderTop: '1px solid rgba(184,151,74,0.12)' }}>
          <div style={{ paddingTop: 64, marginBottom: 40 }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 12 }}>Explore</div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 300, color: '#f5eedd', margin: 0, marginBottom: 12 }}>Similar Villas</h2>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.8, color: '#8f8f7f', maxWidth: 560, margin: 0 }}>
              Comparable residences that may also suit your plans.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 32 }}>
            {similar.map((sim) => {
              const simRate = displayRate(sim)
              return (
                <Link key={sim.id} href={propertyHref(sim)} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#1a1a1a' }}
                    onMouseEnter={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.05)' }}
                    onMouseLeave={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
                  >
                    {sim.media?.[0]?.url && (
                      <img src={`/uploads/yachts/${sim.media[0].url}`} alt={sim.media[0].alt || sim.title || 'Villa'} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, fontWeight: 300, color: '#f5eedd', lineHeight: 1.2 }}>{sim.title}</div>
                      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 4 }}>
                        {[sim.city, sim.region ? regionLabel(sim.region) : null].filter(Boolean).join(' · ')}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.05em', color: '#8f8f7f' }}>
                      {[sim.bedrooms && `${sim.bedrooms} bed`, sim.maxGuests && `${sim.maxGuests} guests`].filter(Boolean).join(' · ')}
                    </div>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4b472' }}>
                      {simRate ? `From ${formatRate(simRate)}` : 'Price on request'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <VillaInquiryModal
        propertyId={villa.id}
        propertyTitle={villa.title || 'Villa'}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      <VillaAvailabilityModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        villa={availabilityVilla}
      />
    </main>
  )
}
