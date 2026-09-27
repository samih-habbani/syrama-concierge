import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getYachtById, getSimilarYachts } from '@/lib/yacht-service'
import YachtDetailClient from '@/components/yachting/YachtDetailClient'
import { idFromSlug, yachtHref } from '@/lib/slug'
import { seoTitle } from '@/lib/seo-text'

export const revalidate = 86400
export const dynamicParams = true

// Required for `revalidate` to take effect at all: without a
// generateStaticParams export (even one returning an empty array), Next
// treats every request as fully dynamic and never caches the rendered
// page via ISR. The ~360 charter yachts are numerous enough (and change
// often enough) that prerendering them at build time isn't worth it —
// the first visit to each slug renders on demand and is then cached.
export function generateStaticParams() {
  return []
}

const SITE_URL = 'https://www.syrama.ae'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const id = idFromSlug(slug)
  const yacht = id !== null ? await getYachtById(id) : null
  if (!yacht) return { title: 'Yacht Not Found' }

  const canonicalPath = yachtHref(yacht)
  const modelName = `${yacht.model}${yacht.builder ? ` by ${yacht.builder}` : ''}`
  const title = seoTitle(modelName, `${yacht.length}m Charter Yacht`)
  const description = `Charter the ${yacht.model}${yacht.builder ? ` by ${yacht.builder}` : ''}, a ${yacht.length}m yacht${yacht.maxGuests ? ` for up to ${yacht.maxGuests} guests` : ''}${yacht.region ? ` in ${yacht.region}` : ''}. Request availability with Syrama Dubai.`
  const imageUrl = yacht.media?.[0]?.url ? `/uploads/yachts/${yacht.media[0].url}` : undefined

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'website',
      siteName: 'Syrama · Dubai Private Concierge',
      locale: 'en_US',
      title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function CharterYachtDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const id = idFromSlug(slug)
  if (id === null) notFound()

  const yacht = await getYachtById(id)
  if (!yacht) notFound()

  // The concierge site only lists charter yachts — anything else 404s.
  if ((yacht.status || '').toLowerCase() !== 'location') notFound()

  // Redirect an old bare-id link or a stale slug to the canonical URL.
  const canonicalPath = yachtHref(yacht)
  if (`/yachting/fleet/charters/${slug}` !== canonicalPath) {
    permanentRedirect(canonicalPath)
  }

  const similarYachts = await getSimilarYachts(yacht)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: yacht.model,
    brand: yacht.builder || undefined,
    description: `${yacht.model}${yacht.builder ? ` by ${yacht.builder}` : ''}, a ${yacht.length}m yacht${yacht.maxGuests ? ` for up to ${yacht.maxGuests} guests` : ''}.`,
    image: yacht.media?.[0]?.url ? `${SITE_URL}/uploads/yachts/${yacht.media[0].url}` : undefined,
    offers: yacht.priceDay ? {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: yacht.priceDay,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${canonicalPath}`,
    } : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <YachtDetailClient yacht={yacht} similarYachts={similarYachts} />
    </>
  )
}
