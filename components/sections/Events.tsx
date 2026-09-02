'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { PrimaryCta, GhostCta } from '@/components/shared/Cta'

export function Events() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -30])

  return (
    <section
      id="events"
      ref={sectionRef}
      className="hp-sec"
      style={{ position: 'relative', padding: '160px 48px', background: 'var(--noir)', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div className="hp-2col hp-2col--mb" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 100 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
              <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
              <span className="section-label">Private Events</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.05,
              color: 'var(--champagne)', margin: 0,
            }}>
              Moments<br />that exist<br />
              <em style={{ fontStyle: 'italic', color: 'var(--or-clair)' }}>nowhere else.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 24 }}
          >
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9, color: 'var(--gris)' }}>
              We don't offer a catalogue. We create the event you've never experienced — in a place no one else knows.
            </p>
            <div style={{ alignSelf: 'flex-start' }}>
              <GhostCta href="/#contact" label="Plan an event" />
            </div>
          </motion.div>
        </div>

        {/* Asymmetric image layout */}
        <div className="hp-events-gallery" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>

          {/* Col 1 — tall image */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/5' }}>
              <img
                src="/assets/iconic-events.webp"
                alt="Grand Prix Monaco — Iconic Events"
                loading="lazy"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                  filter: 'brightness(0.7) contrast(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.25,0.1,0,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 60%)',
              }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--or)', textTransform: 'uppercase', marginBottom: 8 }}>Iconic Events</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: 'var(--champagne)' }}>Front Row Access</div>
              </div>
            </div>
          </motion.div>

          {/* Col 2 — two stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 60 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true }}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}
            >
              <img
                src="/assets/champion-access.webp"
                alt="Private tennis champion access"
                loading="lazy"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                  filter: 'brightness(0.6) contrast(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.25,0.1,0,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.8) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--or)', textTransform: 'uppercase', marginBottom: 6 }}>Private Sport</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, fontWeight: 300, color: 'var(--champagne)' }}>Champions Access</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.25, 0.1, 0, 1] }}
              viewport={{ once: true }}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}
            >
              <img
                src="/assets/private-sport-takeover.webp"
                alt="Private night skiing with helicopter"
                loading="lazy"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                  filter: 'brightness(0.65) contrast(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.25,0.1,0,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.8) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--or)', textTransform: 'uppercase', marginBottom: 6 }}>Unique Experience</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, fontWeight: 300, color: 'var(--champagne)' }}>Sport Takeover</div>
              </div>
            </motion.div>
          </div>

          {/* Col 3 — tall image offset down */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/5' }}>
              <img
                src="/assets/unique-experience.webp"
                alt="Skydiving over the pyramids"
                loading="lazy"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                  filter: 'brightness(0.65) contrast(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.25,0.1,0,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 55%)',
              }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', color: 'var(--or)', textTransform: 'uppercase', marginBottom: 8 }}>Bespoke Adventure</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: 'var(--champagne)', lineHeight: 1.2 }}>Above the World</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom categories strip */}
        <motion.div
          className="hp-events-cats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(184,151,74,0.12)',
            marginTop: 60,
          }}
        >
          {[
            { icon: '◈', title: 'Exceptional Dinners', desc: 'Secret venues, starred chefs' },
            { icon: '◇', title: 'VIP Access', desc: 'Backstage, boxes, F1 paddock' },
            { icon: '◉', title: 'Private Events', desc: 'Galas, bespoke evenings' },
            { icon: '◈', title: 'Art & Culture', desc: 'Exclusive openings, private sales' },
          ].map((ev, i) => (
            <div key={ev.title} style={{
              padding: '40px 28px',
              borderRight: i < 3 ? '1px solid rgba(184,151,74,0.12)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--or)', marginBottom: 16 }}>{ev.icon}</div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--champagne)', marginBottom: 10 }}>{ev.title}</div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.7, color: 'var(--gris)' }}>{ev.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA band */}
        <motion.div
          className="hp-cta-band"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginTop: 72, padding: '56px 40px',
            border: '1px solid rgba(184,151,74,0.18)',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28,
          }}
        >
          <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 34px)', color: 'var(--champagne)', lineHeight: 1.2, maxWidth: 520 }}>
            Tell us the moment you have in mind — we design the rest.
          </div>
          <PrimaryCta href="/#contact" label="Start planning" />
        </motion.div>
      </div>

      {/* Section number */}
      <div aria-hidden style={{
        position: 'absolute', right: -20, top: '20%',
        fontFamily: 'var(--font-cormorant)', fontSize: '20vw', fontWeight: 300,
        color: 'rgba(184,151,74,0.12)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>04</div>
    </section>
  )
}
