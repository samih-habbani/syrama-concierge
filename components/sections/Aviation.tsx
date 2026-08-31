'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function Aviation() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  const lineScale = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <section
      id="aviation"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        background: 'var(--bleu-nuit)',
      }}
    >
      {/* Left — image */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 700 }}>
        <motion.div
          ref={imageRef}
          style={{ y: imageY, position: 'absolute', inset: '-10%', overflow: 'hidden' }}
        >
          <img
            src="/assets/Jet.webp"
            alt="Intérieur jet privé ultra-luxe"
            style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.75) contrast(1.05)' }}
          />
          {/* Gold overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(11,18,32,0.6), transparent 60%), linear-gradient(to top, rgba(11,18,32,0.8), transparent 50%)',
          }} />
        </motion.div>

        {/* Image caption */}
        <div style={{
          position: 'absolute', bottom: 40, left: 48,
          fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em',
          color: 'var(--gris)', textTransform: 'uppercase', zIndex: 2,
        }}>
          Bombardier Global 7500 · Dubai DXB
        </div>
      </div>

      {/* Right — content */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 80px 120px 80px',
        position: 'relative',
      }}>
        {/* Section number */}
        <div aria-hidden style={{
          position: 'absolute', top: 60, right: 48,
          fontFamily: 'var(--font-cormorant)', fontSize: 160, fontWeight: 300,
          color: 'rgba(184,151,74,0.12)', lineHeight: 1, userSelect: 'none',
        }}>01</div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
            <span className="section-label">Private Aviation</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.05,
            color: 'var(--champagne)', margin: '0 0 32px',
          }}>
            The sky,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--or-clair)' }}>without limits.</em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9,
            color: 'var(--gris)', maxWidth: 380, marginBottom: 52,
          }}>
            Last-minute private jets, intercontinental charters, helicopter transfers — arranged within 2 hours. We access the world's most exclusive fleets from Dubai.
          </p>

          {/* Services list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 52 }}>
            {[
              'Private jets & ultra long-range',
              'Helicopters & VIP transfers',
              'Airport concierge services',
              'Charter flights to any destination',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
                viewport={{ once: true }}
                style={{ display: 'flex', alignItems: 'center', gap: 16 }}
              >
                <div style={{ width: 20, height: 1, background: 'var(--or)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--champagne)' }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a
            href="/jet"
            data-cursor
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#06090f',
              background: 'linear-gradient(135deg, #b8974a, #d4b472)', padding: '14px 28px',
              textDecoration: 'none', transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 20px rgba(184,151,74,0.4)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(184,151,74,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,151,74,0.4)' }}
          >
            Jet Finder
            <svg width="18" height="6" viewBox="0 0 18 6" fill="none">
              <line x1="0" y1="3" x2="14" y2="3" stroke="currentColor"/>
              <polyline points="11,1 16,3 11,5" stroke="currentColor" strokeWidth="0.8" fill="none"/>
            </svg>
          </a>
          <a
            href="#contact"
            data-cursor
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'var(--or-clair)',
              textDecoration: 'none', paddingBottom: 6,
              borderBottom: '1px solid rgba(212,180,114,0.3)',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--or-clair)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,180,114,0.3)')}
          >
            Speak to us
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
              <line x1="0" y1="4" x2="20" y2="4" stroke="currentColor"/>
              <polyline points="16,1 22,4 16,7" stroke="currentColor" strokeWidth="0.8" fill="none"/>
            </svg>
          </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(to right, transparent, var(--or) 30%, var(--or-clair) 50%, var(--or) 70%, transparent)',
          scaleX: lineScale, transformOrigin: 'left',
        }}
      />
    </section>
  )
}
