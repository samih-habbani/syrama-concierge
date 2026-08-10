'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { yachts } from '@/lib/yachts-data'

export default function YachtFleetPage() {
  return (
    <main style={{ background: '#06090f', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', background: 'rgba(6,9,15,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 2 }}>Dubai · Concierge</div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Link href="/yachting" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a6a5e', textDecoration: 'none' }}>← Destinations</Link>
          <Link href="/#contact" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
        </div>
      </nav>

      <div style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 'clamp(32px, 6vw, 96px)', paddingRight: 'clamp(32px, 6vw, 96px)', borderBottom: '1px solid rgba(184,151,74,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: '#b8974a' }} />
            <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Private Yacht Charter</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a6a5e', marginBottom: 12 }}>Mediterranean · Caribbean · Indian Ocean · Global</div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.0, color: '#f5eedd', margin: 0 }}>Our fleet.</h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: '#6a6a5e', margin: '0 0 20px' }}>Four superyachts, each a floating palace. From a 28-metre day yacht to a 62-metre flagship with helipad — every vessel is staffed, provisioned and ready on request.</p>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, fontWeight: 300, color: '#b8974a' }}>Available: <em>Year-round</em></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ padding: '80px clamp(32px, 6vw, 96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 40 }}>
          {yachts.map((yacht, i) => (
            <motion.div key={yacht.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.25, 0.1, 0, 1] }} viewport={{ once: true, margin: '-40px' }}>
              <Link href={`/yachting/fleet/${yacht.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={yacht.images[0]} alt={yacht.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, fontWeight: 300, color: '#f5eedd', lineHeight: 1.2 }}>{yacht.name}</div>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 4 }}>{yacht.length} · {yacht.builder}</div>
                  </div>
                  <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.6)', background: 'rgba(6,9,15,0.5)', padding: '6px 10px' }}>View →</div>
                </div>
                <div style={{ padding: '18px 0', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.1em', color: '#6a6a5e', marginBottom: 12 }}>{yacht.guests} · {yacht.crew} · {yacht.range}</div>
                  <div style={{ display: 'flex', gap: 28 }}>
                    {[['Length', yacht.length], ['Guests', yacht.guests], ['Speed', yacht.speed]].map(([label, value]) => (
                      <div key={label}>
                        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(106,106,94,0.5)', marginBottom: 4 }}>{label}</div>
                        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, fontWeight: 300, color: '#d4b472' }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 300, color: '#f5eedd', marginBottom: 16 }}>Looking for a specific vessel?</div>
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.8, color: '#6a6a5e', maxWidth: 480, margin: '0 auto 32px' }}>Our network gives us access to the world\'s finest charter yachts — including vessels not listed publicly.</p>
          <Link href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '16px 36px', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#d4b472')}
            onMouseLeave={e => (e.currentTarget.style.background = '#b8974a')}
          >Speak to a concierge</Link>
        </div>
      </div>
    </main>
  )
}
