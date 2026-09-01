import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import VillaFleetWrapper from '@/components/villas/VillaFleetWrapper'

export const metadata: Metadata = {
  title: 'Villas & Residences for Rent · Syrama Dubai',
  description: 'Browse our curated collection of villas, chalets and residences for rent. Filter by destination, type, bedrooms and budget.',
  alternates: { canonical: '/villas/rentals' },
}

export default function VillaRentalsPage() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <YachtingNav back={{ href: '/villas', label: 'Destinations' }} />
      <main id="main-content" style={{ paddingTop: 64 }}>
        <VillaFleetWrapper />
      </main>
    </div>
  )
}
