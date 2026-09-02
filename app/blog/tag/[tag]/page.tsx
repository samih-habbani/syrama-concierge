import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogArchive } from '@/components/blog/BlogArchive'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getPostsByTag, getAllTagsInUse } from '@/lib/blog'
import { hashtagBlurb, tagFromSlug, tagSlug } from '@/lib/blog-taxonomy'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllTagsInUse()).map((t) => ({ tag: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params
  const canonical = tagFromSlug(tag)
  return {
    title: `#${canonical} — Journal`,
    description: hashtagBlurb(canonical) ?? `Articles tagged #${canonical} in the Syrama Journal.`,
    alternates: { canonical: `/blog/tag/${tagSlug(canonical)}` },
    openGraph: { url: `https://www.syrama.ae/blog/tag/${tagSlug(canonical)}` },
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const canonical = tagFromSlug(tag)
  const posts = await getPostsByTag(canonical)
  if (posts.length === 0) notFound()

  const otherTags = (await getAllTagsInUse()).filter((t) => t.slug !== tagSlug(canonical))

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/blog' },
          { name: `#${canonical}`, path: `/blog/tag/${tagSlug(canonical)}` },
        ]}
      />
      <BlogArchive
        eyebrow="Topic"
        title={`#${canonical}`}
        blurb={hashtagBlurb(canonical)}
        posts={posts}
        crumb={`#${canonical}`}
        footerLinks={
          otherTags.length > 0 ? (
            <div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 14 }}>
                Related topics
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {otherTags.map((t) => (
                  <Link key={t.slug} href={`/blog/tag/${t.slug}`} style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, color: 'var(--or-clair)', textDecoration: 'none', border: '1px solid rgba(184,151,74,0.25)', padding: '6px 12px' }}>
                    #{t.tag}
                  </Link>
                ))}
              </div>
            </div>
          ) : undefined
        }
      />
    </>
  )
}
