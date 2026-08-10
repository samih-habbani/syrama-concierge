'use client'
import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { getRegion } from '@/lib/villas-data'
import { notFound } from 'next/navigation'

export default function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = use(params)
  const regionData = getRegion(region)
  if (!regionData) notFound()

  return (
    <main style={{ background: '#06090f', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', background: 'rgba(6,9,15,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 2 }}>Dubai · Concierge</div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Link href="/villas" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a6a5e', textDecoration: 'none' }}>← Destinations</Link>
          <Link href="/#contact" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 'clamp(32px, 6vw, 96px)', paddingRight: 'clamp(32px, 6vw, 96px)', borderBottom: '1px solid rgba(184,151,74,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: '#b8974a' }} />
            <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Private Villas</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a6a5e', marginBottom: 12 }}>{regionData.sub}</div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.0, color: '#f5eedd', margin: 0 }}>{regionData.title}.</h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: '#6a6a5e', margin: '0 0 20px' }}>{regionData.desc}</p>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, fontWeight: 300, color: '#b8974a' }}>{regionData.season}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div style={{ padding: '80px clamp(32px, 6vw, 96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 40 }}>
          {regionData.villas.map((villa, i) => (
            <motion.div key={villa.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.25, 0.1, 0, 1] }} viewport={{ once: true, margin: '-40px' }}>
              <Link href={`/villas/${region}/${villa.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={villa.images[0]} alt={villa.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, fontWeight: 300, color: '#f5eedd', lineHeight: 1.2 }}>{villa.name}</div>
                    <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 4 }}>{villa.location}</div>
                  </div>
                  <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.6)', background: 'rgba(6,9,15,0.5)', padding: '6px 10px' }}>View →</div>
                </div>
                <div style={{ padding: '18px 0', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.1em', color: '#6a6a5e', marginBottom: 12 }}>{villa.detail}</div>
                  <div style={{ display: 'flex', gap: 28 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(106,106,94,0.5)', marginBottom: 4 }}>Bedrooms</div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, fontWeight: 300, color: '#d4b472' }}>{villa.beds}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(106,106,94,0.5)', marginBottom: 4 }}>Surface</div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, fontWeight: 300, color: '#d4b472' }}>{villa.size}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
