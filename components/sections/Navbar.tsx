'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Aviation', href: '/jet', match: ['/jet'] },
  { label: 'Villas', href: '/villas', match: ['/villas'] },
  { label: 'Yachting', href: '/yachting', match: ['/yachting'] },
  { label: 'Events', href: '/events', match: ['/events'] },
  { label: 'Bespoke', href: '/#bespoke', match: [] },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const onHome = pathname === '/'
  const solid = scrolled || !onHome

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close the mobile menu on route change + lock body scroll while open.
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (match: string[]) => match.some(m => pathname === m || pathname.startsWith(m + '/'))

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: solid ? 'rgba(6,9,15,0.92)' : 'transparent',
          backdropFilter: solid ? 'blur(16px)' : 'none',
          borderBottom: solid ? '1px solid rgba(184,151,74,0.3)' : '1px solid transparent',
          boxShadow: solid ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.6s ease, backdrop-filter 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" data-cursor style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: 'var(--champagne)', textTransform: 'uppercase' }}>
              SYRAMA
            </div>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8f8f7f', marginTop: 2 }}>
              Dubai · Concierge
            </div>
          </Link>

          {/* Desktop links — visible from tablet up; phones use the burger */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-10">
            {links.map(({ label, href, match }) => {
              const active = isActive(match)
              return (
                <Link
                  key={label}
                  href={href}
                  className="navbar-link"
                  data-active={active}
                  data-cursor
                  style={{
                    fontFamily: 'var(--font-tenor)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--or-clair)' : 'var(--gris)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    paddingBottom: 4,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? 'var(--or-clair)' : 'var(--gris)')}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-5">
            <Link
              href="/#contact"
              data-cursor
              className="hidden sm:inline-block whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-tenor)',
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--noir)',
                background: 'linear-gradient(135deg, var(--or), var(--or-clair))',
                padding: '10px 24px',
                textDecoration: 'none',
                transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 20px rgba(184,151,74,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(184,151,74,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,151,74,0.4)'
              }}
            >
              Contact Us
            </Link>

            {/* Hamburger — smartphones only (sm:hidden must win, so no inline display) */}
            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="sm:hidden flex flex-col justify-between shrink-0"
              style={{
                position: 'relative', zIndex: 60,
                width: 26, height: 18,
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              }}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'block', height: 1, width: '100%', background: 'var(--champagne)' }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ display: 'block', height: 1, width: '100%', background: 'var(--champagne)' }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'block', height: 1, width: '100%', background: 'var(--champagne)' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — smartphones only */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="sm:hidden fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--noir)', paddingTop: 100, paddingBottom: 40 }}
          >
            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              {links.map(({ label, href, match }, i) => {
                const active = isActive(match)
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(30px, 9vw, 44px)',
                        fontWeight: 300,
                        color: active ? 'var(--or-clair)' : 'var(--champagne)',
                        textDecoration: 'none',
                        padding: '10px 0',
                        display: 'block',
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + links.length * 0.07 }}
              className="px-8"
              style={{ borderTop: '1px solid rgba(184,151,74,0.2)', paddingTop: 28 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 24 }}>
                <a href="tel:+971505548034" style={contactRow}>
                  <span style={contactLabel}>WhatsApp / Phone</span>
                  <span style={contactValue}>+971 50 554 8034</span>
                </a>
                <a href="mailto:contact@syrama.ae" style={contactRow}>
                  <span style={contactLabel}>Email</span>
                  <span style={contactValue}>contact@syrama.ae</span>
                </a>
              </div>
              <a
                href="https://www.instagram.com/syrama_services/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(184,151,74,0.3)', paddingBottom: 3 }}
              >
                Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const contactRow: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none' }
const contactLabel: React.CSSProperties = { fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.45)' }
const contactValue: React.CSSProperties = { fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: 'var(--or-clair)' }
