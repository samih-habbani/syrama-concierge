import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
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
      <YachtingNav />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 80 }}>
        <DestinationCards />
      </div>
    </main>
  )
}
