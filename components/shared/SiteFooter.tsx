'use client'
import { useState } from 'react'
import Link from 'next/link'
import { InstagramGlyph, WhatsAppGlyph, LinkedInGlyph } from '@/components/shared/SocialGlyphs'

const EXPLORE = [
  { label: 'Private Aviation', href: '/jet' },
  { label: 'Villas & Residences', href: '/villas' },
  { label: 'Yachting', href: '/yachting' },
  { label: 'Bespoke Requests', href: '/#bespoke' },
  { label: 'Private Events', href: '/events' },
  { label: 'The Journal', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

const LEGAL = [
  { label: 'Legal Notice', href: '/legal-notice' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
]

export function SiteFooter() {
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

  return (
    <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(184,151,74,0.15)', background: 'var(--noir)' }}>
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
            {EXPLORE.map(({ label, href }) => (
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
              <span style={footerGroupSubStyle}>Our European presence</span>
            </a>
            <a href="https://syrama-yachting.com" target="_blank" rel="noopener noreferrer" data-cursor style={footerGroupLinkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--champagne)')}>
              syrama-yachting.com
              <span style={footerGroupSubStyle}>Syrama’s charter division</span>
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
                  color: 'var(--champagne)', letterSpacing: '0.05em'
                }}
              />
              <button
                type="submit"
                data-cursor
                aria-label="Subscribe"
                disabled={newsletterState === 'loading'}
                style={{
                  background: 'none', border: 'none', padding: '8px 0 8px 12px',
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

      {/* Legal links */}
      <nav style={{ maxWidth: 1300, margin: '0 auto', padding: '0 48px 4px', display: 'flex', flexWrap: 'wrap', gap: '10px 28px' }}>
        {LEGAL.map(({ label, href }) => (
          <Link key={label} href={href} data-cursor style={footerLegalStyle}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gris)')}>
            {label}
          </Link>
        ))}
      </nav>

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
const footerLegalStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'var(--gris)', textDecoration: 'none',
  transition: 'color 0.3s ease',
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
