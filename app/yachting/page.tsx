import type { Metadata } from 'next'
import { Navbar } from '@/components/sections/Navbar'
import DestinationCards from '@/components/yachting/DestinationCards'

export const metadata: Metadata = {
  title: 'Yacht Charter Destinations · Syrama Dubai',
  description: 'Explore luxury yacht charter destinations worldwide — French Riviera, Emirates, Greece, Balearics, Caribbean, Maldives and more. Curated by Syrama Dubai.',
  alternates: { canonical: '/yachting' },
}

export const revalidate = 3600

export default function YachtingPage() {
  return (
    <main style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 96 }}>
        <DestinationCards />
      </div>
    </main>
  )
}
