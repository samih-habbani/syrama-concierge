'use client'
import { useState } from 'react'

const SITE_URL = 'https://www.syrama.ae'

export function ShareRow({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}/blog/${slug}`
  const t = encodeURIComponent(title)
  const u = encodeURIComponent(url)

  const targets = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  const style: React.CSSProperties = {
    fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--gris)', textDecoration: 'none',
    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    transition: 'color 0.3s ease',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
      <span style={{ ...style, color: 'var(--or)' }}>Share</span>
      {targets.map((x) => (
        <a
          key={x.label}
          href={x.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          style={style}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--or-clair)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gris)')}
        >
          {x.label}
        </a>
      ))}
      <button
        type="button"
        data-cursor
        onClick={copy}
        style={style}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--or-clair)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gris)')}
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  )
}
