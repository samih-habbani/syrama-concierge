import type { Metadata } from 'next'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Private Jet Charter',
  description:
    'Charter a private jet from Dubai — light jets to VIP airliners, one-way, round-trip or multi-leg, sourced within the hour. Tell us your route with the Syrama Jet Finder.',
  alternates: { canonical: '/jet' },
  openGraph: {
    title: 'Private Jet Charter · Syrama Jet Finder',
    description:
      'Charter a private jet from Dubai — sourced within the hour, absolute discretion.',
    url: 'https://www.syrama.ae/jet',
  },
}

export default function JetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Private Aviation', path: '/jet' }]} />
      <ServiceJsonLd
        name="Private Jet Charter"
        path="/jet"
        description="Last-minute private jets, intercontinental charters and helicopter transfers from Dubai, arranged within two hours."
      />
      {children}
    </>
  )
}
