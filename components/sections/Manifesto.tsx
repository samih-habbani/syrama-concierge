'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.06])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30])

  const words = "We don't manage requests. We create moments that redefine what you thought was possible.".split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
        background: 'var(--noir)',
      }}
    >
      {/* VIDEO PANEL — left 42% — portrait, not cropped */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '42%',
          height: '100%',
          zIndex: 2,
          overflow: 'hidden',
          scale: videoScale,
        }}
      >
        <video
          src="/assets/networking-web.mp4"
          autoPlay muted loop playsInline aria-hidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            filter: 'brightness(0.8) contrast(1.05) saturate(0.85)',
          }}
        />

        {/* Shadow trail — right edge of video → blends into noir */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to left, var(--noir) 0%, rgba(6,9,15,0.85) 18%, rgba(6,9,15,0.4) 38%, transparent 62%)',
            zIndex: 2,
          }}
        />

        {/* Top fade */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '20%',
          background: 'linear-gradient(to bottom, var(--noir), transparent)',
          zIndex: 3,
        }} />

        {/* Bottom fade */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(to top, var(--noir), transparent)',
          zIndex: 3,
        }} />
      </motion.div>

      {/* Left-edge vignette */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, width: '10%', height: '100%',
        background: 'linear-gradient(to right, rgba(6,9,15,0.6), transparent)',
        zIndex: 3,
      }} />

      {/* Gold top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0, 1] }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(to right, transparent, var(--or) 30%, var(--or-clair) 50%, var(--or) 70%, transparent)',
          transformOrigin: 'left', zIndex: 6,
        }}
      />

      {/* RIGHT CONTENT — 58% */}
      <motion.div
        style={{
          position: 'relative', zIndex: 5,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '140px 48px',
          y: contentY,
        }}
      >
        <div style={{ width: '50%', marginLeft: '46%', paddingRight: 64 }}>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56 }}
          >
            <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
            <span className="section-label">Our Philosophy</span>
          </motion.div>

          {/* Animated quote */}
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            lineHeight: 1.2,
            color: 'var(--champagne)',
            margin: '0 0 64px',
          }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.045, duration: 0.7 }}
                viewport={{ once: true }}
                style={{ display: 'inline-block', marginRight: '0.28em' }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: 'rgba(184,151,74,0.1)',
              border: '1px solid rgba(184,151,74,0.1)',
            }}
          >
            {[
              { num: '500+', label: 'HNWI Clients' },
              { num: '7 yrs', label: 'Dubai Expertise' },
              { num: '24/7', label: 'Availability' },
              { num: '100%', label: 'Discretion' },
            ].map(({ num, label }) => (
              <div key={label} style={{ padding: '28px 32px', background: 'rgba(6,9,15,0.6)' }}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 42, fontWeight: 300, color: 'var(--or-clair)', lineHeight: 1 }}>
                  {num}
                </div>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gris)', marginTop: 10 }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
