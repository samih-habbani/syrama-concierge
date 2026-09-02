import type { Metadata } from 'next'
import { Navbar } from '@/components/sections/Navbar'
import { SiteFooter } from '@/components/shared/SiteFooter'
import VillaDestinationCards from '@/components/villas/VillaDestinationCards'

export const metadata: Metadata = {
  title: 'Villa Rental Destinations · Syrama Dubai',
  description: 'Explore luxury villa rental destinations — French Riviera, Balearic Islands, Courchevel, Paris, Caribbean, Italy, Greece and more. Curated by Syrama Dubai.',
  alternates: { canonical: '/villas' },
}

export default function VillasPage() {
  return (
    <main style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 96 }}>
        <VillaDestinationCards />
      </div>
      <SiteFooter />
    </main>
  )
}
