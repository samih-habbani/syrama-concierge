'use client'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

const Arrow = ({ w = 22 }: { w?: number }) => (
  <svg width={w} height="8" viewBox="0 0 24 8" fill="none" aria-hidden style={{ flexShrink: 0 }}>
    <line x1="0" y1="4" x2="20" y2="4" stroke="currentColor" />
    <polyline points="16,1 22,4 16,7" stroke="currentColor" strokeWidth="0.8" fill="none" />
  </svg>
)

function Wrapper({ href, children, style, className, onMouseEnter, onMouseLeave, ariaLabel }: {
  href: string
  children: ReactNode
  style: CSSProperties
  className?: string
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  ariaLabel?: string
}) {
  const shared = { style, className, 'data-cursor': true as const, onMouseEnter, onMouseLeave, 'aria-label': ariaLabel }
  if (/^https?:/.test(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>{children}</a>
  }
  if (href.startsWith('#')) {
    return <a href={href} {...shared}>{children}</a>
  }
  return <Link href={href} {...shared}>{children}</Link>
}

/** Filled gold CTA — use once per section for the primary action. */
export function PrimaryCta({ href, label, ariaLabel }: { href: string; label: string; ariaLabel?: string }) {
  return (
    <Wrapper
      href={href}
      ariaLabel={ariaLabel}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 16,
        fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: 'var(--noir)',
        background: 'linear-gradient(135deg, var(--or), var(--or-clair))',
        padding: '17px 36px', textDecoration: 'none',
        boxShadow: '0 6px 28px rgba(184,151,74,0.45)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.opacity = '0.9'
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 10px 38px rgba(184,151,74,0.65)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 6px 28px rgba(184,151,74,0.45)'
      }}
    >
      {label}
      <Arrow />
    </Wrapper>
  )
}

/** Outlined gold CTA — a clearly visible secondary action. */
export function GhostCta({ href, label, ariaLabel }: { href: string; label: string; ariaLabel?: string }) {
  return (
    <Wrapper
      href={href}
      ariaLabel={ariaLabel}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 16,
        fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'var(--or-clair)',
        border: '1px solid rgba(184,151,74,0.5)',
        padding: '16px 34px', textDecoration: 'none', background: 'transparent',
        transition: 'color 0.3s ease, border-color 0.3s ease, background 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.color = 'var(--noir)'
        el.style.borderColor = 'var(--or-clair)'
        el.style.background = 'linear-gradient(135deg, var(--or), var(--or-clair))'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.color = 'var(--or-clair)'
        el.style.borderColor = 'rgba(184,151,74,0.5)'
        el.style.background = 'transparent'
      }}
    >
      {label}
      <Arrow />
    </Wrapper>
  )
}
