'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Aviation', 'Villas', 'Yachting', 'Events', 'Bespoke']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(6,9,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(184,151,74,0.3)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.6s ease, backdrop-filter 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ cursor: 'none' }}>
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: 'var(--champagne)', textTransform: 'uppercase' }}>
            SYRAMA
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const href = l === 'Villas' ? '/villas' : l === 'Yachting' ? '/yachting' : l === 'Aviation' ? '/jet' : l === 'Events' ? '/events' : `#${l.toLowerCase()}`
            return (
            <a
              key={l}
              href={href}
              className="navbar-link"
              style={{
                fontFamily: 'var(--font-tenor)',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gris)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative',
                paddingBottom: 4,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--or-clair)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gris)')}
            >
              {l}
            </a>
            )
          })}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          data-cursor
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
            display: 'inline-block',
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
        </a>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'var(--noir)' }}
          >
            {links.map((l, i) => {
              const mhref = l === 'Villas' ? '/villas' : l === 'Yachting' ? '/yachting' : l === 'Aviation' ? '/jet' : l === 'Events' ? '/events' : `#${l.toLowerCase()}`
              return (
              <motion.a
                key={l}
                href={mhref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 42,
                  fontWeight: 300,
                  color: 'var(--champagne)',
                  textDecoration: 'none',
                  padding: '12px 0',
                }}
              >
                {l}
              </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
