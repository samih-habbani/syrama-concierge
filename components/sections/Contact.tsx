'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { InstagramGlyph, WhatsAppGlyph, LinkedInGlyph } from '@/components/shared/SocialGlyphs'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40])

  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', requestType: '', message: '' })

  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const [newsletter, setNewsletter] = useState('')
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterState === 'loading' || newsletterState === 'done') return
    setNewsletterState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter }),
      })
      setNewsletterState(res.ok ? 'done' : 'error')
    } catch {
      setNewsletterState('error')
    }
  }

  const inputStyle = (name: string) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? 'var(--or-clair)' : 'rgba(184,151,74,0.2)'}`,
    padding: '14px 0',
    fontFamily: 'var(--font-tenor)',
    fontSize: 14,
    color: 'var(--champagne)',
    outline: 'none',
    letterSpacing: '0.05em',
    transition: 'border-color 0.3s ease',
    cursor: 'none',
  })

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
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '80px 40px' }}
              >
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--or-clair)', letterSpacing: '0.2em', marginBottom: 16 }}>◈</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 300, color: 'var(--champagne)', marginBottom: 16 }}>
                  Request received.
                </div>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, color: 'var(--gris)', lineHeight: 1.8 }}>
                  An advisor will contact you within 2 hours.
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
              >
                <div className="hp-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gris)' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={setField('firstName')}
                      placeholder="Alexander"
                      onFocus={() => setFocused('prenom')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('prenom'), display: 'block', marginTop: 8 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gris)' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={setField('lastName')}
                      onFocus={() => setFocused('nom')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('nom'), display: 'block', marginTop: 8 }}
                    />
                  </div>
                </div>

                <div className="hp-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gris)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={setField('email')}
                      placeholder="you@example.com"
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('email'), display: 'block', marginTop: 8 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gris)' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={setField('phone')}
                      placeholder="+971 …"
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('phone'), display: 'block', marginTop: 8 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gris)' }}>
                    Type of request
                  </label>
                  <select
                    value={form.requestType}
                    onChange={setField('requestType')}
                    onFocus={() => setFocused('type')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('type'), display: 'block', marginTop: 8, appearance: 'none' }}
                  >
                    <option value="" style={{ background: 'var(--bleu-nuit)' }}>Select...</option>
                    {['Private Aviation', 'Villa / Residence', 'Yachting', 'Private Event', 'Bespoke Request'].map(o => (
                      <option key={o} value={o} style={{ background: 'var(--bleu-nuit)' }}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gris)' }}>
                    Your request
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={setField('message')}
                    placeholder="Describe your project..."
                    onFocus={() => setFocused('msg')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('msg'),
                      display: 'block', marginTop: 8,
                      resize: 'none', lineHeight: 1.8,
                    }}
                  />
                </div>

                {error && (
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, color: '#e5a3a3', letterSpacing: '0.03em' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  data-cursor
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, var(--or), var(--or-clair))',
                    color: 'var(--noir)',
                    fontFamily: 'var(--font-tenor)',
                    fontSize: 11,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    padding: '18px 40px',
                    border: 'none',
                    cursor: 'none',
                    alignSelf: 'flex-start',
                    opacity: loading ? 0.6 : 1,
                    transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 4px 20px rgba(184,151,74,0.4)',
                  }}
                  onMouseEnter={e => { if (loading) return; e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(184,151,74,0.6)' }}
                  onMouseLeave={e => { if (loading) return; e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,151,74,0.4)' }}
                >
                  {loading ? 'Sending…' : 'Send request'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(184,151,74,0.15)', background: 'rgba(4,6,11,0.6)' }}>
        <div className="site-footer-grid" style={{ maxWidth: 1300, margin: '0 auto', padding: '72px 48px 44px' }}>

          {/* Brand + socials */}
          <div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 300, letterSpacing: '0.3em', color: 'var(--champagne)', textTransform: 'uppercase' }}>
              Syrama
            </div>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8f8f7f', marginTop: 4 }}>
              Dubai · Private Concierge
            </div>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.9, color: 'var(--gris)', marginTop: 22, maxWidth: 280 }}>
              Exclusive access, absolute discretion — a dedicated advisor for every request.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/syrama_services/', Icon: InstagramGlyph },
                { label: 'WhatsApp', href: 'https://wa.me/971505548034', Icon: WhatsAppGlyph },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samih-habbani/', Icon: LinkedInGlyph },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: '50%',
                    border: '1px solid rgba(184,151,74,0.35)', color: 'var(--or-clair)',
                    transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--noir)'; e.currentTarget.style.borderColor = 'var(--or-clair)'; e.currentTarget.style.background = 'linear-gradient(135deg, var(--or), var(--or-clair))' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--or-clair)'; e.currentTarget.style.borderColor = 'rgba(184,151,74,0.35)'; e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 style={footerHeadingStyle}>Explore</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Private Aviation', href: '/jet' },
                { label: 'Villas & Residences', href: '/villas' },
                { label: 'Yachting', href: '/yachting' },
                { label: 'Private Events', href: '/events' },
                { label: 'Bespoke Requests', href: '/#bespoke' },
                { label: 'Contact', href: '/#contact' },
              ].map(({ label, href }) => (
                <Link key={label} href={href} data-cursor style={footerLinkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--gris)')}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Syrama Group */}
          <div>
            <h3 style={footerHeadingStyle}>Syrama Group</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <a href="https://syrama-services.com" target="_blank" rel="noopener noreferrer" data-cursor style={footerGroupLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--champagne)')}>
                syrama-services.com
                <span style={footerGroupSubStyle}>Notre présence en Europe</span>
              </a>
              <a href="https://syrama-yachting.com" target="_blank" rel="noopener noreferrer" data-cursor style={footerGroupLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--champagne)')}>
                syrama-yachting.com
                <span style={footerGroupSubStyle}>La division Charter de Syrama</span>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={footerHeadingStyle}>Newsletter</h3>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.9, color: 'var(--gris)', margin: '0 0 18px', maxWidth: 300 }}>
              Rare openings, private itineraries and members-only invitations — a few times a year.
            </p>

            {newsletterState === 'done' ? (
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, letterSpacing: '0.05em', color: 'var(--or-clair)' }}>
                You&rsquo;re on the list. Welcome to Syrama.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: '1px solid rgba(184,151,74,0.3)', maxWidth: 320 }}>
                <input
                  type="email"
                  required
                  value={newsletter}
                  onChange={e => { setNewsletter(e.target.value); if (newsletterState === 'error') setNewsletterState('idle') }}
                  placeholder="Your email"
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    padding: '12px 0', fontFamily: 'var(--font-tenor)', fontSize: 13,
                    color: 'var(--champagne)', letterSpacing: '0.05em', cursor: 'none',
                  }}
                />
                <button
                  type="submit"
                  data-cursor
                  aria-label="Subscribe"
                  disabled={newsletterState === 'loading'}
                  style={{
                    background: 'none', border: 'none', cursor: 'none', padding: '8px 0 8px 12px',
                    color: 'var(--or-clair)', display: 'inline-flex', alignItems: 'center',
                  }}
                >
                  {newsletterState === 'loading' ? (
                    <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.1em' }}>…</span>
                  ) : (
                    <svg width="22" height="8" viewBox="0 0 24 8" fill="none">
                      <line x1="0" y1="4" x2="20" y2="4" stroke="currentColor" />
                      <polyline points="16,1 22,4 16,7" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    </svg>
                  )}
                </button>
              </form>
            )}
            {newsletterState === 'error' && (
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, color: '#e5a3a3', marginTop: 10 }}>
                Something went wrong. Please try again.
              </p>
            )}

            <a
              href="mailto:contact@syrama.ae"
              data-cursor
              style={{ display: 'inline-block', marginTop: 28, fontFamily: 'var(--font-cormorant)', fontSize: 19, fontWeight: 300, color: 'var(--or-clair)', textDecoration: 'none' }}
            >
              contact@syrama.ae
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="site-footer-bottom" style={{ borderTop: '1px solid rgba(184,151,74,0.1)', maxWidth: 1300, margin: '0 auto', padding: '24px 48px' }}>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            © 2026 · Syrama · All rights reserved
          </div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Dubai · United Arab Emirates
          </div>
        </div>
      </footer>
    </section>
  )
}

const footerHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em',
  textTransform: 'uppercase', color: 'var(--or)', margin: '0 0 22px', fontWeight: 400,
}
const footerLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tenor)', fontSize: 12, letterSpacing: '0.08em',
  color: 'var(--gris)', textDecoration: 'none', transition: 'color 0.3s ease',
}
const footerGroupLinkStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 5,
  fontFamily: 'var(--font-cormorant)', fontSize: 18, fontWeight: 300,
  color: 'var(--champagne)', textDecoration: 'none', transition: 'color 0.3s ease',
}
const footerGroupSubStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'var(--gris)',
}
