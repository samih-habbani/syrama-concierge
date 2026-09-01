'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

export function Yachting() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80])
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  return (
    <section
      id="yachting"
      ref={sectionRef}
      style={{ position: 'relative', minHeight: '100vh', background: 'var(--bleu-nuit)', overflow: 'hidden' }}
    >
      {/* Full-bleed image with parallax */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.img
          src="/assets/Yacht.webp"
          alt="Yacht privé devant le Burj Al Arab — Dubai"
          loading="lazy"
          style={{
            position: 'absolute', inset: '-10%',
            width: '100%', height: '120%',
            objectFit: 'cover', objectPosition: 'center 55%',
            filter: 'brightness(0.35) contrast(1.15) saturate(0.8)',
            y: imgY,
          } as any}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(11,18,32,0.85) 0%, rgba(11,18,32,0.3) 60%, rgba(11,18,32,0.7) 100%)',
        }} />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, position: 'relative', zIndex: 2, height: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '160px 48px', width: '100%' }}>
          <div style={{ maxWidth: 620 }}>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
                <span className="section-label">Yachting & Sea</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.0,
                color: 'var(--champagne)', margin: '0 0 40px',
              }}>
                The sea as<br />
                <em style={{ fontStyle: 'italic', color: 'var(--or-clair)' }}>your playground.</em>
              </h2>

              <p style={{
                fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9,
                color: 'var(--gris)', marginBottom: 60,
              }}>
                Superyachts from 30 to 90 metres, bespoke cruises across the Mediterranean, Caribbean, or Maldives. Elite crew, fine dining on board, secret itineraries.
              </p>
            </motion.div>

            {/* Yacht specs grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1px',
                background: 'rgba(184,151,74,0.12)',
                border: '1px solid rgba(184,151,74,0.12)',
                marginBottom: 60,
              }}
            >
              {[
                { label: 'Length', val: '30–90m' },
                { label: 'Crew', val: 'Dedicated' },
                { label: 'Destinations', val: 'Worldwide' },
                { label: 'Lead time', val: '48h max' },
              ].map(({ label, val }) => (
                <div key={label} style={{
                  padding: '24px 28px',
                  background: 'rgba(11,18,32,0.8)',
                }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 300, color: 'var(--or-clair)' }}>{val}</div>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gris)', marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </motion.div>

            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="/yachting"
                data-cursor
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 16,
                  fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: 'var(--or-clair)',
                  textDecoration: 'none', paddingBottom: 6,
                  borderBottom: '1px solid rgba(212,180,114,0.3)',
                }}
              >
                View our fleet
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
                  <line x1="0" y1="4" x2="20" y2="4" stroke="currentColor"/>
                  <polyline points="16,1 22,4 16,7" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                </svg>
              </Link>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section number */}
      <div aria-hidden style={{
        position: 'absolute', right: -20, bottom: '10%',
        fontFamily: 'var(--font-cormorant)', fontSize: '20vw', fontWeight: 300,
        color: 'rgba(184,151,74,0.12)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', zIndex: 1,
      }}>03</div>
    </section>
  )
}
