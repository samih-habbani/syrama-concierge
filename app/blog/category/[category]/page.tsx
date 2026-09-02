import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogArchive } from '@/components/blog/BlogArchive'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getPostsByCategory, getAllCategoriesInUse, getAllTagsInUse } from '@/lib/blog'
import { categoryLabel, categoryBlurb, isCategory } from '@/lib/blog-taxonomy'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return getAllCategoriesInUse().map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  if (!isCategory(category)) return { title: 'Category not found', robots: { index: false, follow: true } }
  const label = categoryLabel(category)
  return {
    title: `${label} — Journal`,
    description: categoryBlurb(category) ?? `${label} articles from the Syrama Journal.`,
    alternates: { canonical: `/blog/category/${category}` },
    openGraph: { url: `https://www.syrama.ae/blog/category/${category}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!isCategory(category)) notFound()

  const posts = getPostsByCategory(category)
  if (posts.length === 0) notFound()

  const otherCategories = getAllCategoriesInUse().filter((c) => c.slug !== category)
  const tags = getAllTagsInUse().slice(0, 14)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' },
          { name: categoryLabel(category), path: `/blog/category/${category}` },
        ]}
      />
      <BlogArchive
        eyebrow="Category"
        title={categoryLabel(category)}
        blurb={categoryBlurb(category)}
        posts={posts}
        crumb={categoryLabel(category)}
        footerLinks={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {otherCategories.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 14 }}>
                  Other categories
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {otherCategories.map((c) => (
                    <Link key={c.slug} href={`/blog/category/${c.slug}`} style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--or-clair)', textDecoration: 'none', border: '1px solid rgba(184,151,74,0.3)', padding: '9px 16px' }}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 14 }}>
                Topics
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {tags.map((t) => (
                  <Link key={t.slug} href={`/blog/tag/${t.slug}`} style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, color: 'var(--or-clair)', textDecoration: 'none', border: '1px solid rgba(184,151,74,0.25)', padding: '5px 10px' }}>
                    #{t.tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}
