'use client'
import { motion } from 'framer-motion'
import { PrimaryCta } from '@/components/shared/Cta'

const experiences = [
  {
    img: '/assets/gastronomy.webp',
    title: 'Starred Tables',
    label: 'Gastronomy',
    desc: 'Impossible-to-book dinners, private chefs at home, rare vintages.',
    position: 'center',
  },
  {
    img: '/assets/high-end-mobility.webp',
    title: 'High-End Ground & Hybrid Mobility',
    label: 'Private Transport',
    desc: 'Rolls-Royce, Bentley, armoured SUVs, supercars — chauffeured or self-driven, on demand.',
    position: 'center',
  },
  {
    img: '/assets/desert-signature.webp',
    title: 'Desert Escape',
    label: 'Dubai Experience',
    desc: 'Private dune buggy at sunset. Access to areas closed to the public.',
    position: 'center',
  },
  {
    img: '/assets/luxury-maison.webp',
    title: 'Fashion & Jewellery',
    label: 'Luxury Maison',
    desc: 'Impossible-to-find pieces, Hermès bags, unique jewellery — private and discreet sourcing.',
    position: 'center',
  },
  {
    img: '/assets/signature-experiences.webp',
    title: 'Signature Experiences',
    label: 'Bespoke Only',
    desc: 'Curated moments designed around you — unrepeatable, undisclosed, unforgettable.',
    position: 'center',
  },
  {
    img: '/assets/icon-private-access.webp',
    title: 'Iconic Access',
    label: 'Secret Venues',
    desc: 'Pyramids, closed museums, heritage sites — private access before opening or after closing.',
    position: 'center 40%',
  },
  {
    img: '/assets/unique-experience.webp',
    title: 'To the Edge of the World',
    label: 'Bespoke Adventure',
    desc: 'Skydiving over the pyramids, immersion in history — moments that exist nowhere else.',
    position: 'center',
  },
]

const marqueeItems = [
  'Source an impossible Hermès bag',
  'Private training with a champion',
  'Desert safari in Dubai',
  'Close protection 24/7',
  'Impossible-to-book table',
  'Night skiing, helicopter included',
  'Pyramids access at dawn',
  'Dinner at the top of Burj Khalifa',
]

export function Bespoke() {
  return (
    <section
      id="bespoke"
      style={{ position: 'relative', background: 'var(--noir)', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="hp-bespoke-head" style={{ padding: '160px 48px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="hp-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
              <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
              <span className="section-label">Bespoke</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.05,
              color: 'var(--champagne)', margin: 0,
            }}>
              If you can imagine it,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--or-clair)' }}>we make it happen.</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9, color: 'var(--gris)' }}
          >
            Our global network gives us access to what others consider impossible. No request too ambitious — only solutions, delivered with discretion.
          </motion.p>
        </div>
      </div>

      {/* Marquee — CSS transform loop, stays on the compositor */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(184,151,74,0.1)',
        borderBottom: '1px solid rgba(184,151,74,0.1)',
        padding: '28px 0', marginBottom: 80,
      }}>
        <div
          className="bespoke-marquee"
          style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...marqueeItems, ...marqueeItems].map((r, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300,
              fontSize: 28,
              color: i % 4 === 1 ? 'var(--or-clair)' : 'rgba(245,238,221,0.18)',
              flexShrink: 0,
            }}>
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Immersive experience grid */}
      <div className="hp-bespoke-grid-wrap" style={{ padding: '0 48px 160px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Row 1: large left + one tall right */}
        <div className="hp-bespoke-row1" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12, marginBottom: 12 }}>
          <ExperienceCard exp={experiences[0]} height={580} delay={0} />
          <ExperienceCard exp={experiences[1]} height={580} delay={0.1} />
        </div>

        {/* Row 2: 4 equal cards */}
        <div className="hp-bespoke-row2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
          {[experiences[3], experiences[2], experiences[4], experiences[5], experiences[6]].slice(0, 4).map((exp, i) => (
            <ExperienceCard key={exp.title} exp={exp} height={420} delay={i * 0.08} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 72 }}
        >
          <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--champagne)', lineHeight: 1.25, margin: '0 auto 32px', maxWidth: 560 }}>
            Have something in mind that isn&rsquo;t on any list?
          </div>
          <PrimaryCta href="/#contact" label="Make a bespoke request" />
        </motion.div>
      </div>

      {/* Section number bg */}
      <div aria-hidden style={{
        position: 'absolute', right: -20, top: '25%',
        fontFamily: 'var(--font-cormorant)', fontSize: '20vw', fontWeight: 300,
        color: 'rgba(184,151,74,0.12)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>05</div>
    </section>
  )
}

function ExperienceCard({ exp, height, delay }: { exp: typeof experiences[0], height: number, delay: number }) {
  return (
    <motion.div
      className="hp-bespoke-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      data-cursor
      style={{ position: 'relative', overflow: 'hidden', height, cursor: 'none' }}
    >
      <img
        src={exp.img}
        alt={exp.title}
        loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: exp.position,
          transition: 'transform 1.2s cubic-bezier(0.25, 0.1, 0, 1)',
          filter: 'brightness(0.55) contrast(1.1)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
      {/* gradient bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(6,9,15,0.92) 0%, rgba(6,9,15,0.3) 45%, transparent 75%)',
      }} />
      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 28px 24px' }}>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 8 }}>
          {exp.label}
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 300, color: 'var(--champagne)', lineHeight: 1.2, marginBottom: 8 }}>
          {exp.title}
        </div>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, lineHeight: 1.6, color: 'rgba(245,238,221,0.5)', maxWidth: 280 }}>
          {exp.desc}
        </div>
      </div>
      {/* Top right label */}
      <div style={{
        position: 'absolute', top: 20, right: 20,
        width: 32, height: 32, border: '1px solid rgba(212,180,114,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="5" y1="0" x2="5" y2="10" stroke="var(--or)" strokeWidth="0.8"/>
          <line x1="0" y1="5" x2="10" y2="5" stroke="var(--or)" strokeWidth="0.8"/>
        </svg>
      </div>
    </motion.div>
  )
}
