'use client'
import Link from 'next/link'
import { motion, cubicBezier } from 'framer-motion'
import { regionLabel } from '@/lib/property-format'

// Rental villa destinations. `id` is the exact DB region value (used for the
// ?region= filter); `image` is case-sensitive on deploy. Keep this list in
// sync with the regions present in the `property` table.
const DESTINATIONS: { id: string; sub: string; image?: string }[] = [
  { id: 'French Riviera', sub: 'Cannes · Saint-Tropez · Monaco', image: '/images/regions/French_Riviera.webp' },
  { id: 'Balearic Islands', sub: 'Ibiza · Mallorca', image: '/images/regions/Balearic_Islands.webp' },
  { id: 'Courchevel', sub: 'French Alps · 1850', image: '/images/regions/Courchevel.webp' },
  { id: 'Paris', sub: 'France', image: '/images/regions/Paris.webp' },
  { id: 'Italy', sub: 'Amalfi · Tuscany · Como', image: '/images/regions/Italy.webp' },
  { id: 'Greece', sub: 'Mykonos · Santorini · Corfu', image: '/images/regions/Greece.webp' },
  { id: 'Caribbean', sub: 'St. Barts · Bahamas', image: '/images/regions/Caribbean.webp' },
  { id: 'Brazil', sub: 'Rio · Trancoso' },
  { id: 'Morroco', sub: 'Marrakech', image: '/images/regions/Morroco.webp' },
]

export default function VillaDestinationCards() {
  return (
    <div style={{ flex: 1, padding: '64px clamp(24px, 6vw, 96px) 100px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: cubicBezier(0.25, 0.1, 0, 1) }}
        style={{ marginBottom: 56 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1, background: '#b8974a' }} />
          <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>
            Villa Destinations
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(28px, 4.4vw, 62px)', lineHeight: 1.05, color: '#f5eedd', margin: '0 0 20px' }}>
          Explore by Destination.
        </h1>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.8, color: '#8f8f7f', margin: 0, maxWidth: 640 }}>
          Select a region to browse the villas available for rent there.
        </p>
      </motion.div>

      {/* Destination cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {DESTINATIONS.map((dest, i) => {
          const label = regionLabel(dest.id)
          return (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: cubicBezier(0.25, 0.1, 0, 1) }}
            >
              <Link href={`/villas/rentals?region=${encodeURIComponent(dest.id)}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'relative', height: 'clamp(240px, 32vw, 320px)', overflow: 'hidden', cursor: 'pointer', background: '#0a0d12' }}
                  onMouseEnter={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.08)' }}
                  onMouseLeave={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
                >
                  {dest.image ? (
                    <img
                      src={dest.image}
                      alt={label}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)', transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 30% 15%, rgba(184,151,74,0.18), transparent 60%), linear-gradient(150deg, #10151d, #0a0d12 70%)' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.92) 0%, rgba(6,9,15,0.35) 55%, transparent 100%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px' }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, fontWeight: 300, color: '#f5eedd', lineHeight: 1.2, marginBottom: 6 }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9a8e', marginBottom: 16 }}>
                      {dest.sub}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a' }}>
                      View Villas
                      <svg width="14" height="4" viewBox="0 0 14 4" fill="none">
                        <line x1="0" y1="2" x2="10" y2="2" stroke="currentColor" strokeWidth="0.8" />
                        <polyline points="7.5,0.5 12,2 7.5,3.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <Link
          href="/villas/rentals"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#06090f', background: 'linear-gradient(135deg, #b8974a, #d4b472)', padding: '16px 32px',
            textDecoration: 'none', boxShadow: '0 4px 20px rgba(184,151,74,0.35)',
          }}
        >
          View All Villas
          <svg width="16" height="5" viewBox="0 0 16 5" fill="none"><line x1="0" y1="2.5" x2="12" y2="2.5" stroke="currentColor" /><polyline points="9,1 14,2.5 9,4" stroke="currentColor" strokeWidth="0.8" fill="none" /></svg>
        </Link>
      </div>
    </div>
  )
}
