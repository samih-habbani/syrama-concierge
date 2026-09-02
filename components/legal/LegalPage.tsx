import type { ReactNode } from 'react'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'

type Section = { heading: string; body: ReactNode }

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string
  title: string
  updated: string
  intro?: ReactNode
  sections: Section[]
}) {
  return (
    <main style={{ background: 'var(--noir)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: 820, width: '100%', margin: '0 auto', padding: '160px 24px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ width: 40, height: 1, background: 'var(--or)' }} />
          <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--or)' }}>
            {eyebrow}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)', fontWeight: 300,
          fontSize: 'clamp(38px, 6vw, 64px)', lineHeight: 1.05,
          color: 'var(--champagne)', margin: '0 0 18px',
        }}>
          {title}
        </h1>

        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gris)', marginBottom: 56 }}>
          Last updated · {updated}
        </div>

        {intro && (
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 15, lineHeight: 2, color: 'rgba(245,238,221,0.72)', margin: '0 0 48px', maxWidth: 680 }}>
            {intro}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 400,
                fontSize: 24, color: 'var(--or-clair)', margin: '0 0 14px',
                display: 'flex', gap: 14, alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, color: 'var(--gris)', letterSpacing: '0.1em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.heading}
              </h2>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 2, color: 'rgba(245,238,221,0.68)' }}>
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 72, paddingTop: 32, borderTop: '1px solid rgba(184,151,74,0.15)', fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: 'var(--gris)' }}>
          Questions? Write to{' '}
          <a href="mailto:contact@syrama.ae" style={{ color: 'var(--or-clair)', textDecoration: 'none' }}>contact@syrama.ae</a>.
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

/** Shared list style for legal-page bullet lists. */
export function LegalList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: '10px 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(it => <li key={it}>{it}</li>)}
    </ul>
  )
}
