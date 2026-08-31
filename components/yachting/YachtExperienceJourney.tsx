'use client'

import { motion, cubicBezier } from 'framer-motion'

const EASE = cubicBezier(0.25, 0.1, 0, 1)

interface YachtExperienceJourneyProps {
  onRequestExperience: () => void
  onWhatsApp: () => void
}

const waterActivities = [
  { name: 'Jet Ski', image: '/assets/experiences_at_sea/jetski.webp' },
  { name: 'Seabob', image: '/assets/experiences_at_sea/seabob.webp' },
  { name: 'E-Foil', image: '/assets/experiences_at_sea/efoil.webp' },
  { name: 'Snorkeling', image: '/assets/experiences_at_sea/snorkling.webp' },
  { name: 'Diving', image: '/assets/experiences_at_sea/diving.webp' },
]

const panels = [
  {
    number: '01',
    title: 'Design your destination',
    text: 'We build the itinerary around what you love — hidden coves, island-hopping, waterside restaurants only reachable by boat, a swim stop, a sunset anchorage, or several destinations in a single day.',
    image: '/assets/destination.webp',
    imagePosition: 'center',
  },
  {
    number: '02',
    title: 'Life on board',
    text: 'A private chef when the yacht allows it, curated catering, champagne on ice, music, decoration and every small request — we shape the atmosphere on board around your day, not the other way around.',
    image: '/assets/private-dining.webp',
    imagePosition: 'center 78%',
  },
  {
    number: '03',
    title: 'Play on the water',
    text: 'Jet ski at sunrise, glide above the water on an e-foil, or explore a hidden reef. Depending on your yacht and destination, we bring the right toys on board.',
    image: '/assets/water-sports.webp',
    imagePosition: 'center',
  },
  {
    number: '04',
    title: 'Your day, your way',
    text: 'A family day at sea, a milestone birthday, a proposal, lunch with friends, a beach club, a sunset cruise or a full day of exploration — our team designs the day around the moment you want to create.',
    image: '/assets/experiences_at_sea/cruising.webp',
    imagePosition: 'center',
  },
]

function JourneyPanel({ panel, reverse }: { panel: typeof panels[number]; reverse: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      viewport={{ once: true, margin: '-80px' }}
      className="journey-panel"
      style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
    >
      <div className="journey-panel-media">
        <img
          src={panel.image}
          alt=""
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: panel.imagePosition, filter: 'brightness(0.72)' }}
        />
      </div>
      <div className="journey-panel-text">
        <div aria-hidden style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: 'rgba(184,151,74,0.3)', lineHeight: 1, marginBottom: 14 }}>
          {panel.number}
        </div>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 300, color: '#f5eedd', lineHeight: 1.25, marginBottom: 16 }}>
          {panel.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: '#8f8f7f', margin: 0, maxWidth: 440 }}>
          {panel.text}
        </p>
      </div>
    </motion.div>
  )
}

export default function YachtExperienceJourney({ onRequestExperience, onWhatsApp }: YachtExperienceJourneyProps) {
  return (
    <section style={{ borderTop: '1px solid rgba(184,151,74,0.12)', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 6vw, 96px)', background: '#06090f' }}>
      <style>{`
        .journey-panel {
          display: flex;
          gap: clamp(24px, 4vw, 56px);
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .journey-panel-media {
          flex: 0 0 56%;
          height: clamp(300px, 40vw, 460px);
          overflow: hidden;
          background: #0a0d12;
        }
        .journey-panel-text { flex: 1 1 auto; }
        .journey-activities {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          max-width: 1200px;
          margin: 40px auto 0;
        }
        @media (max-width: 900px) {
          .journey-panel { flex-direction: column !important; gap: 24px; }
          .journey-panel-media { flex-basis: auto; width: 100%; height: clamp(240px, 60vw, 360px); }
          .journey-activities { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 520px) {
          .journey-activities { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto clamp(56px, 8vw, 96px)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1, background: '#b8974a' }} />
          <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>The Syrama Experience</span>
          <div style={{ width: 32, height: 1, background: '#b8974a' }} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(34px, 4.5vw, 58px)', lineHeight: 1.1, color: '#f5eedd', margin: '0 0 20px' }}>
          Your journey, designed around you
        </h2>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: '#8f8f7f', margin: 0 }}>
          From the destination to life on board, we design every detail of your day at sea.
        </p>
      </motion.div>

      {/* Journey panels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 8vw, 100px)' }}>
        <JourneyPanel panel={panels[0]} reverse={false} />
        <JourneyPanel panel={panels[1]} reverse={true} />
        <div>
          <JourneyPanel panel={panels[2]} reverse={false} />
          <div className="journey-activities">
            {waterActivities.map((activity, i) => (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                viewport={{ once: true, margin: '-40px' }}
                style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
              >
                <img src={activity.image} alt={activity.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)', transition: 'transform 1s cubic-bezier(0.25, 0.1, 0, 1)' }} />
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.9) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 12px', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f5eedd' }}>
                  {activity.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <JourneyPanel panel={panels[3]} reverse={true} />
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', maxWidth: 620, margin: 'clamp(72px, 9vw, 120px) auto 0', paddingTop: 56, borderTop: '1px solid rgba(184,151,74,0.12)' }}
      >
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#f5eedd', margin: '0 0 16px' }}>
          Let us design your day at sea
        </h3>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.8, color: '#8f8f7f', maxWidth: 460, margin: '0 auto 36px' }}>
          Tell us what you have in mind. We&rsquo;ll take care of the yacht, the itinerary and everything in between.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onRequestExperience}
            style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '16px 40px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4b472'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#b8974a'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Design my experience
          </button>
          <button
            type="button"
            onClick={onWhatsApp}
            style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#b8974a', background: 'transparent', padding: '16px 40px', border: '1px solid rgba(184,151,74,0.3)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,151,74,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            WhatsApp us
          </button>
        </div>
      </motion.div>
    </section>
  )
}
