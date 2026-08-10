'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import Link from 'next/link'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const destinations = [
  { id: 'french-riviera', label: 'French Riviera', sub: 'Côte d\'Azur', coords: [7.27, 43.7] as [number, number], href: '/villas/french-riviera' },
  { id: 'monaco', label: 'Monaco', sub: 'La Principauté', coords: [7.42, 43.73] as [number, number], href: '/villas/monaco' },
  { id: 'balearic-islands', label: 'Balearic Islands', sub: 'Ibiza · Mallorca', coords: [2.65, 39.5] as [number, number], href: '/villas/balearic-islands' },
  { id: 'greece', label: 'Greece', sub: 'Mykonos · Santorini · Corfu', coords: [25.0, 37.5] as [number, number], href: '/villas/greece' },
  { id: 'italy', label: 'Italy', sub: 'Amalfi · Tuscany · Como', coords: [14.5, 41.0] as [number, number], href: '/villas/italy' },
  { id: 'emirates', label: 'Emirates', sub: 'Dubai · Abu Dhabi', coords: [55.3, 25.2] as [number, number], href: '/villas/emirates' },
  { id: 'caribbean', label: 'Caribbean', sub: 'St. Barts · Mustique', coords: [-62.8, 17.9] as [number, number], href: '/villas/caribbean' },
  { id: 'collection', label: 'Private Collection', sub: 'Worldwide', coords: [-3.0, 55.0] as [number, number], href: '/villas/collection' },
]

export default function VillasPage() {
  const [active, setActive] = useState<string | null>(null)
  const router = useRouter()

  const handleMarkerClick = useCallback((href: string) => {
    router.push(href)
  }, [router])

  return (
    <main style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', background: 'rgba(6,9,15,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 2 }}>Dubai · Concierge</div>
        </Link>
        <Link href="/#contact" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', paddingTop: 80 }}>
        {/* Sidebar */}
        <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid rgba(184,151,74,0.1)', padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 24 }}>Destinations</div>
          {destinations.map(dest => (
            <motion.a
              key={dest.id}
              href={dest.href}
              onMouseEnter={() => setActive(dest.id)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', padding: '14px 16px', borderLeft: `2px solid ${active === dest.id ? '#b8974a' : 'transparent'}`, textDecoration: 'none', transition: 'border-color 0.25s ease', background: active === dest.id ? 'rgba(184,151,74,0.04)' : 'transparent' }}
            >
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, fontWeight: 300, color: active === dest.id ? '#f5eedd' : 'rgba(245,238,221,0.6)', transition: 'color 0.25s ease' }}>{dest.label}</div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 4 }}>{dest.sub}</div>
            </motion.a>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 32, fontFamily: 'var(--font-tenor)', fontSize: 11, lineHeight: 1.8, color: 'rgba(106,106,94,0.6)' }}>
            Click a destination to browse its villas.
          </div>
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [20, 35] }}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(184,151,74,0.06)"
                    stroke="rgba(184,151,74,0.15)"
                    strokeWidth={0.5}
                    style={{ default: { outline: 'none' }, hover: { outline: 'none', fill: 'rgba(184,151,74,0.1)' }, pressed: { outline: 'none' } }}
                  />
                ))
              }
            </Geographies>
            {destinations.map(dest => (
              <Marker key={dest.id} coordinates={dest.coords} onClick={() => handleMarkerClick(dest.href)} style={{ cursor: 'pointer' }}>
                <circle
                  r={active === dest.id ? 7 : 5}
                  fill={active === dest.id ? '#b8974a' : 'rgba(184,151,74,0.5)'}
                  stroke="#b8974a"
                  strokeWidth={1}
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={() => setActive(dest.id)}
                  onMouseLeave={() => setActive(null)}
                />
                {active === dest.id && (
                  <text y={-14} textAnchor="middle" style={{ fontFamily: 'var(--font-tenor)', fontSize: '10px', fill: '#f5eedd', letterSpacing: '0.1em', pointerEvents: 'none' }}>
                    {dest.label}
                  </text>
                )}
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </main>
  )
}
