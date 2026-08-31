'use client'
import Link from 'next/link'

// Lightweight fixed header for the yachting sub-pages (destinations + fleet),
// matching the concierge look. The yacht detail page renders its own nav.
export default function YachtingNav({ back }: { back?: { href: string; label: string } }) {
  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(6,9,15,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(184,151,74,0.12)',
      }}
    >
      <div style={{
        maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px clamp(24px, 6vw, 96px)',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8f8f7f', marginTop: 2 }}>Dubai · Concierge</div>
        </Link>
        {back && (
          <Link href={back.href} style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8f8f7f', textDecoration: 'none' }}>
            ← {back.label}
          </Link>
        )}
      </div>
      <Link
        href="/#contact"
        style={{
          fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#06090f', background: 'linear-gradient(135deg, #b8974a, #d4b472)', padding: '12px 24px',
          textDecoration: 'none', boxShadow: '0 4px 20px rgba(184,151,74,0.35)',
        }}
      >
        Contact Us
      </Link>
      </div>
    </nav>
  )
}
