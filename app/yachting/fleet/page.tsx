import type { Metadata } from 'next'
import YachtingNav from '@/components/yachting/YachtingNav'
import FleetWrapper from '@/components/yachting/FleetWrapper'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Our Charter Fleet',
  description: 'Browse our curated fleet of luxury yachts for charter. Filter by destination, budget, guests and length to find the right vessel. Curated by Syrama Dubai.',
  alternates: { canonical: '/yachting/fleet' },
}

export default function FleetPage() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Yachting', path: '/yachting' },
        { name: 'Charter Fleet', path: '/yachting/fleet' },
      ]} />
      <YachtingNav back={{ href: '/yachting', label: 'Destinations' }} />
      <main id="main-content" style={{ paddingTop: 64 }}>
        <FleetWrapper />
      </main>
      <SiteFooter />
    </div>
  )
}
