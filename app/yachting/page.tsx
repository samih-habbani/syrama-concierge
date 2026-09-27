import type { Metadata } from 'next'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd'
import DestinationCards from '@/components/yachting/DestinationCards'

export const metadata: Metadata = {
  title: 'Yacht Charter — Destinations',
  description:
    'Explore luxury yacht charter destinations — French Riviera, Greece, the Balearics, the Caribbean and the Maldives, aboard superyachts from 30 to 90 metres with elite crew.',
  alternates: { canonical: '/yachting' },
  openGraph: {
    title: 'Yacht Charter Destinations · Syrama Dubai',
    description: 'Superyachts from 30 to 90 metres, elite crew, bespoke itineraries — worldwide.',
    url: 'https://www.syrama.ae/yachting',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yacht Charter Destinations · Syrama Dubai',
    description: 'Superyachts from 30 to 90 metres, elite crew, bespoke itineraries — worldwide.',
    images: ['/opengraph-image'],
  },
}

export const revalidate = 3600

export default function YachtingPage() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Yachting', path: '/yachting' }]} />
      <ServiceJsonLd
        name="Luxury Yacht Charters"
        path="/yachting"
        description="Superyachts from 30 to 90 metres with dedicated crew, fine dining and bespoke itineraries across the Mediterranean, Caribbean, Maldives and beyond."
      />
      <Navbar />
      <main id="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 96 }}>
        <DestinationCards />
      </main>
      <SiteFooter />
    </div>
  )
}
