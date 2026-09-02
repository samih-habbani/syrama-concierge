import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd, BlogJsonLd } from '@/components/seo/JsonLd'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { HashtagList } from '@/components/blog/HashtagList'
import { getAllPostSummaries, getAllCategoriesInUse, getAllTagsInUse } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Event coverage, destination notes and concierge insight from Syrama — the Dubai private concierge for aviation, villas, yachting and bespoke events.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'The Syrama Journal',
    description: 'Event coverage, destination notes and concierge insight from Syrama Dubai.',
    url: 'https://www.syrama.ae/blog',
  },
}

export const revalidate = 3600

export default async function BlogIndexPage() {
  const [posts, categories, tags] = await Promise.all([
    getAllPostSummaries(),
    getAllCategoriesInUse(),
    getAllTagsInUse(),
  ])
  const [featured, ...rest] = posts

  return (
    <div style={{ background: 'var(--noir)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }]} />
      <BlogJsonLd posts={posts.map((p) => ({ slug: p.slug, title: p.title, date: p.date }))} />
      <Navbar />

      <main id="main-content" style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '150px 24px 110px' }}>
        {/* Masthead */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1, background: 'var(--or)' }} />
          <span className="section-label">The Journal</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(42px, 7vw, 84px)', lineHeight: 1.02, color: 'var(--champagne)', margin: '0 0 20px' }}>
          Notes from the desk.
        </h1>
        <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 15, lineHeight: 1.9, color: 'var(--gris)', maxWidth: 620, margin: '0 0 44px' }}>
          Event coverage, destination guides and the occasional look behind the concierge desk — written by Sam Habbani.
        </p>

        {/* Category nav */}
        {categories.length > 0 && (
          <nav aria-label="Categories" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 72 }}>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                data-cursor
                style={{
                  fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--or-clair)', textDecoration: 'none',
                  border: '1px solid rgba(184,151,74,0.3)', padding: '10px 18px',
                }}
              >
                {c.label} <span style={{ color: 'var(--gris)' }}>· {c.count}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Featured */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            data-cursor
            className="hp-2col"
            style={{
              display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(28px, 5vw, 64px)',
              alignItems: 'center', textDecoration: 'none', color: 'inherit',
              marginBottom: 96, paddingBottom: 96, borderBottom: '1px solid rgba(184,151,74,0.15)',
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/11' }}>
              <img src={featured.heroImage} alt={featured.heroAlt} loading="eager" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 16 }}>
                Latest · {featured.categoryLabel} · {featured.readingMinutes} min read
              </div>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(30px, 4vw, 46px)', lineHeight: 1.12, color: 'var(--champagne)', margin: '0 0 18px' }}>
                {featured.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, lineHeight: 1.9, color: 'var(--gris)', margin: '0 0 20px', maxWidth: 460 }}>
                {featured.excerpt}
              </p>
              <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--or-clair)', borderBottom: '1px solid rgba(184,151,74,0.4)', paddingBottom: 4 }}>
                Read the article
              </span>
            </div>
          </Link>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="hp-villa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(28px, 4vw, 48px)' }}>
            {rest.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, color: 'var(--gris)' }}>
            The first articles are on their way.
          </p>
        )}

        {/* Hashtag cloud */}
        {tags.length > 0 && (
          <section aria-label="Topics" style={{ marginTop: 96, paddingTop: 48, borderTop: '1px solid rgba(184,151,74,0.15)' }}>
            <HashtagList label="Browse by topic" tags={tags.map((t) => t.tag)} />
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
