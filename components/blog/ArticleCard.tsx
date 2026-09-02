import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function ArticleCard({ post, priority = false }: { post: BlogPostSummary; priority?: boolean }) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        data-cursor
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <div className="article-card-frame" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/2', marginBottom: 22 }}>
          <img
            className="article-card-img"
            src={post.heroImage}
            alt={post.heroAlt}
            loading={priority ? 'eager' : 'lazy'}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'brightness(0.78)',
              transition: 'transform 0.9s cubic-bezier(0.25,0.1,0,1)',
            }}
          />
        </div>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 12 }}>
          {post.categoryLabel} · {post.readingMinutes} min read
        </div>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.2, color: 'var(--champagne)', margin: '0 0 12px' }}>
          {post.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.85, color: 'var(--gris)', margin: '0 0 14px' }}>
          {post.excerpt}
        </p>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gris)' }}>
          {formatDate(post.date)}
        </div>
      </Link>
    </article>
  )
}
