'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/sections/Navbar'
import { ContactForm } from '@/components/shared/ContactForm'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { events, EventCategory } from '@/lib/events-data'

const CATEGORIES: (EventCategory | 'All')[] = ['All', 'Motorsport', 'Arts & Culture', 'Sport & Society', 'Fashion']

const SERVICES = [
  { label: 'VIP access & tickets', desc: 'The most sought-after passes — from paddock clubs to royal enclosures.' },
  { label: 'Private transfers', desc: 'Helicopter, superyacht, or armoured car — from Dubai or onsite.' },
  { label: 'Accommodation', desc: 'The finest suites, private villas and historic palazzos, reserved in advance.' },
  { label: 'On-site concierge', desc: 'A dedicated Syrama concierge accompanies your party throughout.' },
  { label: 'Private security', desc: 'Discreet executive protection for principals and families.' },
  { label: 'Hospitality & dining', desc: 'Exclusive tables, private chefs, and invitation-only soirées.' },
]

export default function EventsPage() {
  const [active, setActive] = useState<EventCategory | 'All'>('All')
  const filtered = active === 'All' ? events : events.filter(e => e.category === active)

  return (
    <main style={{ background: '#06090f', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <img src="/assets/iconic-events.webp" alt="Prestigious events" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,9,15,0.2) 0%, rgba(6,9,15,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(32px,6vw,96px)', paddingBottom: 'clamp(48px,7vw,100px)', paddingTop: 120 }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 48, height: 1, background: '#b8974a' }} />
              <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8974a' }}>Iconic Events</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(52px,8vw,110px)', lineHeight: 0.95, color: '#f5eedd', margin: '0 0 28px', maxWidth: 800 }}>
              The world's<br /><em style={{ fontStyle: 'italic', color: '#d4b472' }}>greatest stages.</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 2, color: 'rgba(106,106,94,0.9)', maxWidth: 520 }}>
              Monaco. Cannes. Wimbledon. Art Basel. We secure access,<br />arrange everything, and accompany you every step.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ padding: '0 clamp(32px,6vw,96px)', borderBottom: '1px solid rgba(184,151,74,0.1)' }}>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '22px 28px 20px', fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: active === cat ? '#f5eedd' : 'rgba(106,106,94,0.5)', borderBottom: active === cat ? '2px solid #b8974a' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'all 0.25s ease' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div style={{ padding: '80px clamp(32px,6vw,96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 2 }}>
          {filtered.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: (i % 3) * 0.1 }} viewport={{ once: true, margin: '-40px' }} style={{ position: 'relative', overflow: 'hidden', aspectRatio: i % 5 === 0 ? '16/10' : '4/3' }} className="event-card">
              <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)', transition: 'transform 1s cubic-bezier(0.25,0.1,0,1), filter 0.6s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.filter = 'brightness(0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.35)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.97) 0%, rgba(6,9,15,0.5) 50%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: 'var(--font-tenor)', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', background: 'rgba(6,9,15,0.7)', padding: '6px 12px', backdropFilter: 'blur(8px)' }}>{event.category}</div>
              <div style={{ position: 'absolute', top: 24, right: 24, fontFamily: 'var(--font-tenor)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.5)', background: 'rgba(6,9,15,0.6)', padding: '6px 12px', backdropFilter: 'blur(8px)' }}>{event.month}</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(106,106,94,0.7)', marginBottom: 8 }}>{event.location} · {event.country}</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 300, color: '#f5eedd', lineHeight: 1.15, marginBottom: 4 }}>{event.name}</div>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.15em', color: '#b8974a', textTransform: 'uppercase', marginBottom: 14 }}>{event.subtitle}</div>
                <div className="event-desc" style={{ overflow: 'hidden', maxHeight: 0, opacity: 0, transition: 'max-height 0.5s ease, opacity 0.4s ease' }}>
                  <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, lineHeight: 1.8, color: 'rgba(106,106,94,0.8)', margin: '0 0 14px' }}>{event.desc}</p>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(184,151,74,0.7)', marginBottom: 16 }}>{event.highlight}</div>
                </div>
                <a
                  href="#enquiry"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d4b472', textDecoration: 'none', borderBottom: '1px solid rgba(212,180,114,0.35)', paddingBottom: 4, marginTop: 12, transition: 'border-color 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#d4b472')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,180,114,0.35)')}
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

      {/* Services */}
      <div style={{ padding: '100px clamp(32px,6vw,96px)', borderTop: '1px solid rgba(184,151,74,0.1)', borderBottom: '1px solid rgba(184,151,74,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 72 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: '#b8974a' }} />
              <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Full orchestration</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(38px,5vw,68px)', lineHeight: 1.0, color: '#f5eedd', margin: 0 }}>We handle<br /><em style={{ color: '#d4b472' }}>every detail.</em></h2>
          </div>
          <div style={{ paddingTop: 16 }}>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 2, color: '#6a6a5e', margin: '0 0 24px' }}>An iconic event is only as extraordinary as the experience surrounding it. We go beyond the ticket — building an entire journey that places you exactly where you want to be, without a single logistical thought.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {SERVICES.map((s, i) => (
            <div key={s.label} style={{ padding: '36px 32px', borderTop: '1px solid rgba(184,151,74,0.12)', borderLeft: i % 3 !== 0 ? '1px solid rgba(184,151,74,0.08)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 4, height: 4, background: '#b8974a', borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f5eedd' }}>{s.label}</div>
              </div>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.8, color: 'rgba(106,106,94,0.7)', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry form — same form as the homepage */}
      <div id="enquiry" style={{ padding: '110px clamp(32px,6vw,96px)', scrollMarginTop: 90 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }} className="hp-2col">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 40, height: 1, background: '#b8974a' }} />
              <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Plan your event</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(34px,4.5vw,58px)', lineHeight: 1.05, color: '#f5eedd', margin: '0 0 24px' }}>
              Tell us where you<br /><em style={{ fontStyle: 'italic', color: '#d4b472' }}>want to be.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 2, color: '#6a6a5e', maxWidth: 420 }}>
              A dedicated advisor replies within 2 hours with access, logistics and a full plan — no intermediaries.
            </p>
          </div>
          <ContactForm defaultRequestType="Private Event" />
        </div>
      </div>

      <SiteFooter />

      <style>{`.event-card:hover .event-desc { max-height: 200px; opacity: 1; }`}</style>
    </main>
  )
}
