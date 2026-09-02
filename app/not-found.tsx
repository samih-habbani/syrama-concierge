import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main style={{ background: 'var(--noir)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div
        id="main-content"
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '160px 24px 120px',
        }}
      >
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 24 }}>
          Error 404
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(40px, 7vw, 76px)', lineHeight: 1.05, color: 'var(--champagne)', margin: '0 0 20px' }}>
          This page is off the map.
        </h1>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9, color: 'var(--gris)', maxWidth: 440, margin: '0 0 40px' }}>
          The page you are looking for has moved or never existed. Our team can point you the right way.
        </p>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--noir)', background: 'linear-gradient(135deg, var(--or), var(--or-clair))', padding: '16px 34px', textDecoration: 'none' }}>
            Back to home
          </Link>
          <Link href="/#contact" style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--or-clair)', border: '1px solid rgba(184,151,74,0.5)', padding: '16px 34px', textDecoration: 'none' }}>
            Talk to us
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
