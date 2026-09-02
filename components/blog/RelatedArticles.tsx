import type { BlogPostSummary } from '@/lib/blog'
import { ArticleCard } from './ArticleCard'

export function RelatedArticles({ posts }: { posts: BlogPostSummary[] }) {
  if (!posts.length) return null
  return (
    <section aria-label="Related articles" style={{ marginTop: 72, paddingTop: 48, borderTop: '1px solid rgba(184,151,74,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
        <span className="section-label">Keep reading</span>
      </div>
      <div className="hp-villa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {posts.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  )
}
