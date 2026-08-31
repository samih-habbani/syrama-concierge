import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import FleetWrapper from '@/components/yachting/FleetWrapper'

export const metadata: Metadata = {
  title: 'Our Charter Fleet · Syrama Dubai',
  description: 'Browse our curated fleet of luxury yachts for charter. Filter by destination, budget, guests and length to find the right vessel.',
  alternates: { canonical: '/yachting/fleet' },
}

export default function FleetPage() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <YachtingNav back={{ href: '/yachting', label: 'Destinations' }} />
      <main id="main-content" style={{ paddingTop: 64 }}>
        <FleetWrapper />
      </main>
    </div>
  )
}
