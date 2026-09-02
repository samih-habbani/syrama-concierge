'use client'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { PrestigiousEvent } from '@/lib/event-service'

const FILTERS = ['All', 'Motorsport', 'Arts & Culture', 'Sport & Society', 'Fashion', 'Music & Lifestyle']

export function EventsExplorer({ events }: { events: PrestigiousEvent[] }) {
  const [active, setActive] = useState('All')

  // Only show filters that actually have events.
  const filters = useMemo(() => {
    const used = new Set(events.map((e) => e.category))
    return FILTERS.filter((f) => f === 'All' || used.has(f))
  }, [events])

  const filtered = active === 'All' ? events : events.filter((e) => e.category === active)

  return (
    <>
      <div style={{ padding: '0 clamp(32px,6vw,96px)', borderBottom: '1px solid rgba(184,151,74,0.1)' }}>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {filters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '22px 28px 20px', fontFamily: 'var(--font-tenor)', fontSize: 9,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: active === cat ? '#f5eedd' : '#9a9a8c',
                borderBottom: active === cat ? '2px solid #b8974a' : '2px solid transparent',
                whiteSpace: 'nowrap', transition: 'all 0.25s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '80px clamp(32px,6vw,96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 2 }}>
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1 }}
              viewport={{ once: true, margin: '-40px' }}
              className="event-card"
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: i % 5 === 0 ? '16/10' : '4/3' }}
            >
              <img
                src={event.image}
                alt={event.name}
                className="event-card-img"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)', transition: 'transform 1s cubic-bezier(0.25,0.1,0,1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.97) 0%, rgba(6,9,15,0.5) 50%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: 'var(--font-tenor)', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', background: 'rgba(6,9,15,0.7)', padding: '6px 12px', backdropFilter: 'blur(8px)' }}>{event.category}</div>
              {event.month && (
                <div style={{ position: 'absolute', top: 24, right: 24, fontFamily: 'var(--font-tenor)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.62)', background: 'rgba(6,9,15,0.6)', padding: '6px 12px', backdropFilter: 'blur(8px)' }}>{event.month}</div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
                {(event.location || event.country) && (
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9a8c', marginBottom: 8 }}>
                    {[event.location, event.country].filter(Boolean).join(' · ')}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 300, color: '#f5eedd', lineHeight: 1.15, marginBottom: 4 }}>{event.name}</div>
                {event.subtitle && (
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.15em', color: '#b8974a', textTransform: 'uppercase', marginBottom: 14 }}>{event.subtitle}</div>
                )}
                <div className="event-desc" style={{ overflow: 'hidden', maxHeight: 0, opacity: 0, transition: 'max-height 0.5s ease, opacity 0.4s ease' }}>
                  {event.desc && <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, lineHeight: 1.8, color: 'rgba(154,154,140,0.96)', margin: '0 0 14px' }}>{event.desc}</p>}
                  {event.highlight && <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(184,151,74,0.8)', marginBottom: 16 }}>{event.highlight}</div>}
                </div>
                <a
                  href="#enquiry"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d4b472', textDecoration: 'none', borderBottom: '1px solid rgba(212,180,114,0.35)', paddingBottom: 4, marginTop: 12, transition: 'border-color 0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#d4b472')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(212,180,114,0.35)')}
                >
                  Request access
                  <svg width="20" height="7" viewBox="0 0 24 8" fill="none">
                    <line x1="0" y1="4" x2="19" y2="4" stroke="currentColor" />
                    <polyline points="15,1 21,4 15,7" stroke="currentColor" strokeWidth="0.8" fill="none" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
