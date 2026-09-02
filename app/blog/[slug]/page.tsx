import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { HashtagList } from '@/components/blog/HashtagList'
import { RelatedArticles } from '@/components/blog/RelatedArticles'
import { ShareRow } from '@/components/blog/ShareRow'
import { getAllSlugs, getPost, getRelatedPosts } from '@/lib/blog'

const SITE_URL = 'https://www.syrama.ae'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article not found', robots: { index: false, follow: true } }

  const image = post.heroImage.startsWith('http') ? post.heroImage : `${SITE_URL}${post.heroImage}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    keywords: post.tags,
    openGraph: {
      type: 'article',
      siteName: 'Syrama · Dubai Private Concierge',
      locale: 'en_US',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ['Sam Habbani'],
      tags: post.tags,
      images: [{ url: image, alt: post.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post)

  return (
    <div style={{ background: 'var(--noir)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ArticleJsonLd
        slug={post.slug}
        title={post.title}
        description={post.excerpt}
        image={post.heroImage}
        datePublished={post.date}
        dateModified={post.updated}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' },
          { name: post.categoryLabel, path: `/blog/category/${post.category}` },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <Navbar />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero photo */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(46vh, 60vw, 70vh)', overflow: 'hidden' }}>
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,9,15,0.5) 0%, rgba(6,9,15,0.2) 40%, var(--noir) 100%)' }} />
        </div>

        <article style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px', marginTop: 'clamp(-120px, -14vw, -160px)', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <nav aria-label="Breadcrumb" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gris)', marginBottom: 22 }}>
            <Link href="/blog" style={{ color: 'var(--gris)', textDecoration: 'none' }}>Journal</Link>
            <span style={{ margin: '0 10px' }}>/</span>
            <Link href={`/blog/category/${post.category}`} style={{ color: 'var(--or-clair)', textDecoration: 'none' }}>
              {post.categoryLabel}
            </Link>
          </nav>

          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(34px, 5.5vw, 60px)', lineHeight: 1.08, color: 'var(--champagne)', margin: '0 0 22px' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18, paddingBottom: 40, marginBottom: 44, borderBottom: '1px solid rgba(184,151,74,0.15)' }}>
            <AuthorCard compact />
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gris)' }}>
              {formatDate(post.date)} · {post.readingMinutes} min read
            </div>
          </div>

          {/* Body */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          {/* Tags */}
          <div style={{ marginTop: 56 }}>
            <HashtagList label="Filed under" tags={post.tags} />
          </div>

          {/* Share */}
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid rgba(184,151,74,0.12)' }}>
            <ShareRow slug={post.slug} title={post.title} />
          </div>

          {/* Author */}
          <div style={{ marginTop: 56 }}>
            <AuthorCard />
          </div>

          {/* CTA */}
          <div style={{ marginTop: 56, padding: 'clamp(28px, 5vw, 44px)', border: '1px solid rgba(184,151,74,0.2)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--champagne)', lineHeight: 1.3, margin: '0 auto 22px', maxWidth: 440 }}>
              Planning something on the calendar?
            </div>
            <Link
              href="/#contact"
              data-cursor
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--noir)',
                background: 'linear-gradient(135deg, var(--or), var(--or-clair))',
                padding: '16px 34px', textDecoration: 'none',
              }}
            >
              Speak to Syrama
            </Link>
          </div>

          <RelatedArticles posts={related} />
        </article>

        <div style={{ height: 100 }} />
      </main>

      <SiteFooter />
    </div>
  )
}
