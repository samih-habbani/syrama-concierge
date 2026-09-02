import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPropertyById, getSimilarProperties } from '@/lib/property-service'
import VillaDetailClient from '@/components/villas/VillaDetailClient'
import { idFromSlug, propertyHref } from '@/lib/slug'
import { sanitizeDescription, displayRate, regionLabel } from '@/lib/property-format'

export const revalidate = 86400
export const dynamicParams = true

const SITE_URL = 'https://www.syrama.ae'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const id = idFromSlug(slug)
  const villa = id !== null ? await getPropertyById(id) : null
  if (!villa) return { title: 'Villa Not Found' }

  const canonicalPath = propertyHref(villa)
  const where = [villa.city, villa.region ? regionLabel(villa.region) : null].filter(Boolean).join(', ')
  const title = `${villa.title}${where ? ` — ${where}` : ''}`
  const description = `Rent ${villa.title}${villa.bedrooms ? `, a ${villa.bedrooms}-bedroom ${(villa.type || 'villa').toLowerCase()}` : ''}${where ? ` in ${where}` : ''}${villa.maxGuests ? ` for up to ${villa.maxGuests} guests` : ''}. Request availability with Syrama Dubai.`
  const imageUrl = villa.media?.[0]?.url ? `/uploads/yachts/${villa.media[0].url}` : undefined

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
  }
}

export default async function VillaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const id = idFromSlug(slug)
  if (id === null) notFound()

  const villa = await getPropertyById(id)
  if (!villa) notFound()

  const canonicalPath = propertyHref(villa)
  if (`/villas/rentals/${slug}` !== canonicalPath) {
    permanentRedirect(canonicalPath)
  }

  const similar = await getSimilarProperties(villa)
  const rate = displayRate(villa)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: villa.title || undefined,
    address: [villa.city, villa.region ? regionLabel(villa.region) : null].filter(Boolean).join(', ') || undefined,
    image: villa.media?.[0]?.url ? `${SITE_URL}/uploads/yachts/${villa.media[0].url}` : undefined,
    numberOfRooms: villa.bedrooms || undefined,
    priceRange: rate ? `${rate.currency}${rate.amount.toLocaleString('en-US')}/${rate.unit}` : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VillaDetailClient
        villa={villa}
        descriptionHtml={sanitizeDescription(villa.description)}
        similar={similar}
      />
    </>
  )
}
