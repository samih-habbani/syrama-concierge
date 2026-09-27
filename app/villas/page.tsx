import type { Metadata } from 'next'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd'
import VillaDestinationCards from '@/components/villas/VillaDestinationCards'

export const metadata: Metadata = {
  title: 'Luxury Villa Rentals — Destinations',
  description:
    'Explore our luxury villa rental destinations — French Riviera, Ibiza, Mykonos, Courchevel, Italy and the Caribbean, each fully staffed and prepared before arrival.',
  alternates: { canonical: '/villas' },
  openGraph: {
    title: 'Luxury Villa Rentals · Syrama Dubai',
    description: 'Handpicked ultra-luxury villas and residences across the Mediterranean and beyond — fully staffed.',
    url: 'https://www.syrama.ae/villas',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Villa Rentals · Syrama Dubai',
    description: 'Handpicked ultra-luxury villas and residences across the Mediterranean and beyond — fully staffed.',
    images: ['/opengraph-image'],
  },
}

export default function VillasPage() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Villas & Residences', path: '/villas' }]} />
      <ServiceJsonLd
        name="Luxury Villa & Residence Rentals"
        path="/villas"
        description="Handpicked ultra-luxury villas, penthouses and estates across the Mediterranean, the Alps, the Caribbean and beyond — fully staffed."
      />
      <Navbar />
      <main id="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 96 }}>
        <VillaDestinationCards />
      </main>
      <SiteFooter />
    </div>
  )
}
