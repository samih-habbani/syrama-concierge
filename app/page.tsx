import type { Metadata } from 'next'
import { Navbar } from '@/components/sections/Navbar'
import { SmoothScroll } from '@/components/sections/SmoothScroll'
import { LuxuryCursor } from '@/components/sections/LuxuryCursor'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Aviation } from '@/components/sections/Aviation'
import { Villas } from '@/components/sections/Villas'
import { Yachting } from '@/components/sections/Yachting'
import { Events } from '@/components/sections/Events'
import { Bespoke } from '@/components/sections/Bespoke'
import { Contact } from '@/components/sections/Contact'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { ServiceJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    url: 'https://www.syrama.ae/',
  },
}

const SERVICES = [
  { name: 'Private Aviation', path: '/jet', description: 'Last-minute private jets, intercontinental charters and helicopter transfers arranged within two hours from Dubai.' },
  { name: 'Luxury Villas & Residences', path: '/villas', description: 'Handpicked ultra-luxury villas, penthouses and estates across the Mediterranean, Caribbean and beyond — fully staffed.' },
  { name: 'Yacht Charters', path: '/yachting', description: 'Superyachts from 30 to 90 metres with elite crew and bespoke itineraries worldwide.' },
  { name: 'Private & Iconic Events', path: '/events', description: 'VIP access, hospitality and full orchestration for the world’s greatest events.' },
  { name: 'Bespoke Requests', path: '/#bespoke', description: 'Impossible-to-find pieces, secret venues and one-off experiences — sourced with discretion.' },
]

export default function Home() {
  return (
    <SmoothScroll>
      {SERVICES.map((s) => (
        <ServiceJsonLd key={s.name} {...s} />
      ))}
      <LuxuryCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <Aviation />
        <Villas />
        <Yachting />
        <Events />
        <Bespoke />
        <Contact />
      </main>
      <SiteFooter />
    </SmoothScroll>
  )
}
