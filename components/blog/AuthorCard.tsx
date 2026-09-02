import { InstagramGlyph, LinkedInGlyph } from '@/components/shared/SocialGlyphs'

// Sam Habbani's by-line. Appears on every article — and every appearance
// carries outbound links to Instagram, LinkedIn and syrama-yachting.com,
// which is the point: the blog is a distribution surface for those profiles.

const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/syrama_services/', kind: 'icon', Icon: InstagramGlyph },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samih-habbani/', kind: 'icon', Icon: LinkedInGlyph },
] as const

export function AuthorCard({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img
          src="/assets/sam-habbani.jpg"
          alt="Sam Habbani"
          width={44}
          height={44}
          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(0.15)' }}
        />
        <div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--champagne)' }}>Sam Habbani</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gris)' }}>Founder, Syrama</div>
        </div>
      </div>
    )
  }

  return (
    <aside
      aria-label="About the author"
      style={{
        display: 'flex', gap: 24, alignItems: 'flex-start',
        border: '1px solid rgba(184,151,74,0.18)',
        padding: 'clamp(22px, 4vw, 32px)',
        background: 'rgba(184,151,74,0.03)',
      }}
    >
      <img
        src="/assets/sam-habbani.jpg"
        alt="Sam Habbani, founder of Syrama"
        width={84}
        height={84}
        style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0, filter: 'grayscale(0.15) contrast(1.05)' }}
      />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 8 }}>
          Written by
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 300, color: 'var(--champagne)', lineHeight: 1.15 }}>
          Sam Habbani
        </div>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gris)', margin: '4px 0 14px' }}>
          Founder &amp; GM · Syrama
        </div>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: 'var(--gris)', margin: '0 0 18px', maxWidth: 460 }}>
          Sam runs Syrama’s private concierge from Dubai — arranging aviation, villas, yachts and events for a small list of clients worldwide.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Sam Habbani on ${label}`}
              data-cursor
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 38, height: 38, borderRadius: '50%',
                border: '1px solid rgba(184,151,74,0.35)', color: 'var(--or-clair)',
                transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
              }}
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="https://syrama-yachting.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            style={{
              fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--or-clair)', textDecoration: 'none',
              borderBottom: '1px solid rgba(184,151,74,0.35)', paddingBottom: 3,
            }}
          >
            syrama-yachting.com
          </a>
        </div>
      </div>
    </aside>
  )
}
