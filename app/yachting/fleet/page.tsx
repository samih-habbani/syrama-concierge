import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import FleetWrapper from '@/components/yachting/FleetWrapper'
import { FleetHeader } from '@/components/yachting/FleetHeader'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getYachts } from '@/lib/yacht-service'

export const metadata: Metadata = {
  title: 'Our Charter Fleet',
  description: 'Browse our curated fleet of luxury yachts for charter. Filter by destination, budget, guests and length to find the right vessel. Curated by Syrama Dubai.',
  alternates: { canonical: '/yachting/fleet' },
  openGraph: {
    title: 'Our Charter Fleet · Syrama',
    description: 'Browse our curated fleet of luxury yachts for charter, filterable by destination, budget, guests and length.',
    url: 'https://www.syrama.ae/yachting/fleet',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Charter Fleet · Syrama',
    description: 'Browse our curated fleet of luxury yachts for charter, filterable by destination, budget, guests and length.',
    images: ['/opengraph-image'],
  },
}

export default async function FleetPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>
}) {
  const { region } = await searchParams
  // Fetched here (server-side) instead of client-side in Fleet — avoids a
  // second client→server round trip on top of the one that already
  // loaded the page, which is what made this listing feel slow on mobile.
  const initialYachts = await getYachts({ type: 'charter', limit: 500 }).catch(() => [])
  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Yachting', path: '/yachting' },
        { name: 'Charter Fleet', path: '/yachting/fleet' },
      ]} />
      <YachtingNav back={{ href: '/yachting', label: 'Destinations' }} />
      <main id="main-content" style={{ paddingTop: 64 }}>
        <FleetHeader region={region} />
        <FleetWrapper initialYachts={initialYachts} />
      </main>
      <SiteFooter />
    </div>
  )
}
