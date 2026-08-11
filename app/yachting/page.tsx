'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import Link from 'next/link'
import { LuxuryCursor } from '@/components/sections/LuxuryCursor'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const destinations = [
  { id: 'med', label: 'Mediterranean', sub: 'French Riviera · Italy · Greece', coords: [14.0, 38.5] as [number, number] },
  { id: 'caribbean', label: 'Caribbean', sub: 'St. Barts · Antigua · BVI', coords: [-63.0, 17.5] as [number, number] },
  { id: 'indian-ocean', label: 'Indian Ocean', sub: 'Maldives · Seychelles', coords: [73.5, 4.0] as [number, number] },
  { id: 'red-sea', label: 'Red Sea', sub: 'Dubai · Oman · Saudi', coords: [38.5, 22.0] as [number, number] },
  { id: 'north-sea', label: 'Northern Europe', sub: 'Norway · Scotland · Iceland', coords: [5.0, 62.0] as [number, number] },
]

export default function YachtingPage() {
  const [active, setActive] = useState<string | null>(null)
  const router = useRouter()

  return (
    <main style={{ background: '#080c16', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LuxuryCursor />
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', background: 'rgba(8,12,22,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 2 }}>Dubai · Concierge</div>
        </Link>
        <Link href="/#contact" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', paddingTop: 80 }}>
        {/* Sidebar */}
        <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid rgba(184,151,74,0.1)', padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 24 }}>Sailing Zones</div>
          {destinations.map(dest => (
            <motion.div
              key={dest.id}
              onMouseEnter={() => setActive(dest.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => router.push('/yachting/fleet')}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              style={{ padding: '14px 16px', borderLeft: `2px solid ${active === dest.id ? '#b8974a' : 'transparent'}`, transition: 'border-color 0.25s ease', background: active === dest.id ? 'rgba(184,151,74,0.04)' : 'transparent', cursor: 'pointer' }}
            >
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, fontWeight: 300, color: active === dest.id ? '#f5eedd' : 'rgba(245,238,221,0.6)', transition: 'color 0.25s ease' }}>{dest.label}</div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 4 }}>{dest.sub}</div>
            </motion.div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 32 }}>
            <Link href="/yachting/fleet" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '14px 24px', textDecoration: 'none' }}>
              View our fleet
              <svg width="16" height="5" viewBox="0 0 16 5" fill="none"><line x1="0" y1="2.5" x2="12" y2="2.5" stroke="currentColor"/><polyline points="9,1 14,2.5 9,4" stroke="currentColor" strokeWidth="0.8" fill="none"/></svg>
            </Link>
          </div>
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
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
                    fill="rgba(184,151,74,0.05)"
                    stroke="rgba(184,151,74,0.12)"
                    strokeWidth={0.5}
                    style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                  />
                ))
              }
            </Geographies>
            {destinations.map(dest => (
              <Marker key={dest.id} coordinates={dest.coords}>
                {/* Invisible large hit area */}
                <circle
                  r={20}
                  fill="transparent"
                  style={{ cursor: 'pointer', pointerEvents: 'all' }}
                  onMouseEnter={() => setActive(dest.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => router.push('/yachting/fleet')}
                />
                {/* Visible dot */}
                <circle
                  r={active === dest.id ? 7 : 5}
                  fill={active === dest.id ? '#b8974a' : 'rgba(184,151,74,0.4)'}
                  stroke="#b8974a"
                  strokeWidth={1}
                  style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
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
