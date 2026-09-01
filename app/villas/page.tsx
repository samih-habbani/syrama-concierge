import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import VillaDestinationCards from '@/components/villas/VillaDestinationCards'

export const metadata: Metadata = {
  title: 'Villa Rental Destinations · Syrama Dubai',
  description: 'Explore luxury villa rental destinations — French Riviera, Balearic Islands, Courchevel, Paris, Caribbean, Italy, Greece and more. Curated by Syrama Dubai.',
  alternates: { canonical: '/villas' },
}

export default function VillasPage() {
  return (
    <main style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <YachtingNav />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 80 }}>
        <VillaDestinationCards />
      </div>
    </main>
  )
}
