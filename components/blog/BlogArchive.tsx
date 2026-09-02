import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { ArticleCard } from './ArticleCard'

// Shared shell for /blog/category/[…] and /blog/tag/[…] — an eyebrow,
// a title, a blurb, the post grid and links back out to the wider blog.
export function BlogArchive({
  eyebrow,
  title,
  blurb,
  posts,
  crumb,
  footerLinks,
}: {
  eyebrow: string
  title: string
  blurb: string | null
  posts: BlogPostSummary[]
  crumb: string
  footerLinks?: React.ReactNode
}) {
  return (
    <div style={{ background: 'var(--noir)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main id="main-content" style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '150px 24px 110px' }}>
        <nav aria-label="Breadcrumb" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gris)', marginBottom: 32 }}>
          <Link href="/blog" style={{ color: 'var(--gris)', textDecoration: 'none' }}>Journal</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: 'var(--or-clair)' }}>{crumb}</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
          <span className="section-label">{eyebrow}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(38px, 6vw, 68px)', lineHeight: 1.05, color: 'var(--champagne)', margin: '0 0 18px' }}>
          {title}
        </h1>
        {blurb && (
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 15, lineHeight: 1.9, color: 'var(--gris)', maxWidth: 620, margin: '0 0 56px' }}>
            {blurb}
          </p>
        )}

        <div className="hp-villa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(28px, 4vw, 44px)' }}>
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>

        {footerLinks && <div style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid rgba(184,151,74,0.15)' }}>{footerLinks}</div>}
      </main>
      <SiteFooter />
    </div>
  )
}
