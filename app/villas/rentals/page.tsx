import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import VillaFleetWrapper from '@/components/villas/VillaFleetWrapper'
import { VillaFleetHeader } from '@/components/villas/VillaFleetHeader'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getProperties } from '@/lib/property-service'

export const metadata: Metadata = {
  title: 'Villas & Residences for Rent',
  description: 'Browse our curated collection of villas, chalets and residences for rent. Filter by destination, type, bedrooms and budget. Curated by Syrama Dubai.',
  alternates: { canonical: '/villas/rentals' },
  openGraph: {
    title: 'Villas & Residences for Rent · Syrama',
    description: 'Browse our curated collection of villas, chalets and residences for rent, filterable by destination, type, bedrooms and budget.',
    url: 'https://www.syrama.ae/villas/rentals',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villas & Residences for Rent · Syrama',
    description: 'Browse our curated collection of villas, chalets and residences for rent, filterable by destination, type, bedrooms and budget.',
    images: ['/opengraph-image'],
  },
}

export default async function VillaRentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const { region } = await searchParams
  // Fetched here (server-side, during the page's own render) instead of
  // client-side in VillaFleet — the old approach made every visitor's
  // browser wait for the page to load, THEN fire a second request to
  // /api/properties and wait again, adding a full network round-trip
  // (worse than useless on a slow mobile connection). This way the data
  // comes down already embedded in the initial response.
  const initialVillas = await getProperties({ limit: 500 }).catch(() => [])
  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Villas & Residences', path: '/villas' },
        { name: 'For Rent', path: '/villas/rentals' },
      ]} />
      <YachtingNav back={{ href: '/villas', label: 'Destinations' }} />
      <main id="main-content" style={{ paddingTop: 64 }}>
        <VillaFleetHeader region={region} />
        <VillaFleetWrapper initialVillas={initialVillas} />
      </main>
      <SiteFooter />
    </div>
  )
}
