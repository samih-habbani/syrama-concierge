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

export default function Home() {
  return (
    <SmoothScroll>
      <LuxuryCursor />
      <Navbar />
      <Hero />
      <Manifesto />
      <Aviation />
      <Villas />
      <Yachting />
      <Events />
      <Bespoke />
      <Contact />
    </SmoothScroll>
  )
}
