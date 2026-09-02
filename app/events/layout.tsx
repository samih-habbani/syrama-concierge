import type { Metadata } from 'next'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Iconic & Private Events',
  description:
    'VIP access, hospitality and full orchestration for the world’s greatest events — Monaco Grand Prix, Cannes, Wimbledon, Art Basel and more. Curated by Syrama Dubai.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Iconic & Private Events · Syrama Dubai',
    description:
      'VIP access, transfers, accommodation and on-site concierge for the world’s greatest events.',
    url: 'https://www.syrama.ae/events',
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Private Events', path: '/events' }]} />
      <ServiceJsonLd
        name="Private & Iconic Events"
        path="/events"
        description="VIP access, private transfers, accommodation, on-site concierge and security for the world’s greatest events."
      />
      {children}
    </>
  )
}
