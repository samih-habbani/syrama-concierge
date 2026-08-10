'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const villas = [
  {
    name: 'Palm Signature',
    location: 'Palm Jumeirah, Dubai',
    detail: '8 bedrooms · Private pool · 360° sea view',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format',
  },
  {
    name: 'Sky Penthouse',
    location: 'DIFC, Dubai',
    detail: '4 bedrooms · Panoramic terrace · Private chef',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format',
  },
  {
    name: 'Desert Estate',
    location: 'Al Barari, Dubai',
    detail: '12 bedrooms · Spa · 3-hectare estate',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format',
  },
]

export function Villas() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section
      id="villas"
      ref={sectionRef}
      style={{ position: 'relative', padding: '160px 48px', background: 'var(--noir)', overflow: 'hidden' }}
    >
      {/* Subtle background texture */}
      <motion.div
        style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden
      >
        <div style={{
          position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(184,151,74,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 100, alignItems: 'end' }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
                <span className="section-label">Villas & Residences</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.05, color: 'var(--champagne)', margin: 0,
              }}>
                At home,<br />
                <em style={{ fontStyle: 'italic', color: 'var(--or-clair)' }}>everywhere.</em>
              </h2>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9,
              color: 'var(--gris)', alignSelf: 'end',
            }}
          >
            Ultra-luxury villas, penthouses overlooking the marina, private desert estates. Every property is handpicked, inspected, and prepared before your arrival — full staff included.
          </motion.p>
        </div>

        {/* Villa cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {villas.map((villa, i) => (
            <motion.div
              key={villa.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true, margin: '-60px' }}
              data-cursor
              style={{ cursor: 'none', overflow: 'hidden', position: 'relative' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
                <img
                  src={villa.img}
                  alt={villa.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)',
                    filter: 'brightness(0.75)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(6,9,15,0.9) 0%, rgba(6,9,15,0.2) 50%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, fontWeight: 300, color: 'var(--champagne)', lineHeight: 1.2 }}>
                    {villa.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--or)', textTransform: 'uppercase', marginTop: 6 }}>
                    {villa.location}
                  </div>
                </div>
              </div>
              {/* Detail */}
              <div style={{
                padding: '20px 0',
                borderBottom: '1px solid rgba(184,151,74,0.12)',
                fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.1em',
                color: 'var(--gris)',
              }}>
                {villa.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <a
            href="/villas"
            data-cursor
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--or-clair)', textDecoration: 'none',
              paddingBottom: 6, borderBottom: '1px solid rgba(212,180,114,0.3)',
            }}
          >
            View the full portfolio
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
              <line x1="0" y1="4" x2="20" y2="4" stroke="currentColor"/>
              <polyline points="16,1 22,4 16,7" stroke="currentColor" strokeWidth="0.8" fill="none"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Section number bg */}
      <div aria-hidden style={{
        position: 'absolute', left: -20, top: '40%',
        fontFamily: 'var(--font-cormorant)', fontSize: '25vw', fontWeight: 300,
        color: 'rgba(184,151,74,0.12)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>02</div>
    </section>
  )
}
