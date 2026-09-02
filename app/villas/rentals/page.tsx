import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import VillaFleetWrapper from '@/components/villas/VillaFleetWrapper'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Villas & Residences for Rent',
  description: 'Browse our curated collection of villas, chalets and residences for rent. Filter by destination, type, bedrooms and budget. Curated by Syrama Dubai.',
  alternates: { canonical: '/villas/rentals' },
}

export default function VillaRentalsPage() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Villas & Residences', path: '/villas' },
        { name: 'For Rent', path: '/villas/rentals' },
      ]} />
      <YachtingNav back={{ href: '/villas', label: 'Destinations' }} />
      <main id="main-content" style={{ paddingTop: 64 }}>
        <VillaFleetWrapper />
      </main>
      <SiteFooter />
    </div>
  )
}
