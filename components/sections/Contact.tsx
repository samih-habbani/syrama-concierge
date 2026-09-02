'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ContactForm } from '@/components/shared/ContactForm'
import { SiteFooter } from '@/components/shared/SiteFooter'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--noir)' }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.img
          src="/assets/icon-private-access.webp"
          alt=""
          aria-hidden
          loading="lazy"
          style={{
            position: 'absolute', inset: '-10%', width: '100%', height: '120%',
            objectFit: 'cover', objectPosition: 'center bottom',
            filter: 'brightness(0.15) contrast(1.1)',
            y: bgY,
          } as any}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--noir) 0%, rgba(6,9,15,0.6) 40%, var(--noir) 100%)' }} />
      </div>

      <div className="hp-contact-inner" style={{ position: 'relative', zIndex: 2, maxWidth: 1300, margin: '0 auto', padding: '160px 48px 120px' }}>

        {/* ── Top header row: title left, contact channels right ── */}
        <div className="hp-2col hp-2col--mb" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80, alignItems: 'end' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
              <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
              <span className="section-label">Private Contact</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.05,
              color: 'var(--champagne)', margin: '0 0 32px',
            }}>
              Your next<br />
              journey begins<br />
              <em style={{ fontStyle: 'italic', color: 'var(--or-clair)' }}>here.</em>
            </h2>
            <p style={{
              fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9,
              color: 'var(--gris)', maxWidth: 400,
            }}>
              Every request is handled by a dedicated advisor within 2 hours. No intermediaries — you speak directly with our team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {[
              { label: 'Private WhatsApp', val: '+971 50 554 8034' },
              { label: 'Confidential Email', val: 'contact@syrama.ae' },
              { label: 'Availability', val: '24h/24 · 7j/7 · 365j/an' },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '24px 0', borderBottom: '1px solid rgba(184,151,74,0.08)' }}>
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gris)' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: 'var(--or-clair)' }}>{val}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(184,151,74,0.25) 30%, rgba(184,151,74,0.25) 70%, transparent)', marginBottom: 80 }} />

        {/* ── Bottom row: founder card left, form right ── */}
        <div className="hp-contact-bottom" style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 80, alignItems: 'stretch' }}>

          {/* Founder card */}
          <motion.div
            className="hp-founder-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 500 }}
          >
            {/* Gold top line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 2,
              background: 'linear-gradient(to right, var(--or) 0%, var(--or-clair) 50%, transparent 100%)',
            }} />
            {/* Cross mark */}
            <div style={{
              position: 'absolute', top: 14, right: 14, zIndex: 3,
              width: 26, height: 26, border: '1px solid rgba(184,151,74,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="0" x2="5" y2="10" stroke="var(--or)" strokeWidth="0.8"/>
                <line x1="0" y1="5" x2="10" y2="5" stroke="var(--or)" strokeWidth="0.8"/>
              </svg>
            </div>
            {/* Photo */}
            <img
              src="/assets/sam-habbani.jpg"
              alt="Sam Habbani — Founder Syrama"
              style={{
                width: '100%', height: '100%', minHeight: 500, objectFit: 'cover', objectPosition: 'center top',
                display: 'block',
                filter: 'brightness(0.6) contrast(1.1) saturate(0.85)',
              }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(6,9,15,0.95) 0%, rgba(6,9,15,0.35) 45%, transparent 72%)',
            }} />
            {/* Text */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 22px 20px' }}>
              <div style={{
                fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--or)',
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              }}>
                <div style={{ width: 16, height: 1, background: 'var(--or)' }} />
                Founder & GM
              </div>
              <div style={{
                fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 300,
                color: 'var(--champagne)', lineHeight: 1.15, marginBottom: 16,
              }}>
                Sam<br />Habbani
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <a
                  href="https://www.instagram.com/syrama_services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(245,238,221,0.55)',
                    textDecoration: 'none', paddingBottom: 3,
                    borderBottom: '1px solid rgba(184,151,74,0.3)',
                  }}
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/samih-habbani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(245,238,221,0.55)',
                    textDecoration: 'none', paddingBottom: 3,
                    borderBottom: '1px solid rgba(184,151,74,0.3)',
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>

      <SiteFooter />
    </section>
  )
}
