'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import VillaFilters, { VillaFilterState } from './VillaFilters'
import VillaAvailabilityModal from './VillaAvailabilityModal'
import { propertyHref } from '@/lib/slug'
import { displayRate, formatRate, weeklyEquivalent, regionLabel } from '@/lib/property-format'
import type { PropertyCard } from '@/lib/property-service'

interface VillaFleetProps {
  showFilters?: boolean
  limit?: number
}

const PAGE_SIZE = 12

// Villa list for the concierge site. One network call fetches every rental
// villa, everything after that (filter / sort / paginate) is client-side.
export default function VillaFleet({ showFilters = true, limit }: VillaFleetProps) {
  const searchParams = useSearchParams()
  const regionParam = searchParams.get('region')

  const [all, setAll] = useState<PropertyCard[]>([])
  const [loading, setLoading] = useState(true)
  const [inquiryVilla, setInquiryVilla] = useState<PropertyCard | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/properties?limit=500')
        const data = await response.json()
        setAll(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching villas:', error)
        setAll([])
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const bounds = useMemo(() => {
    const beds = all.map(v => v.bedrooms).filter((v): v is number => typeof v === 'number')
    const guests = all.map(v => v.maxGuests).filter((v): v is number => typeof v === 'number')
    const prices = all.map(weeklyEquivalent).filter((v): v is number => typeof v === 'number')
    return {
      minBedrooms: beds.length ? Math.floor(Math.min(...beds)) : 0,
      maxBedrooms: beds.length ? Math.ceil(Math.max(...beds)) : 20,
      minGuests: guests.length ? Math.floor(Math.min(...guests)) : 0,
      maxGuests: guests.length ? Math.ceil(Math.max(...guests)) : 40,
      minPrice: prices.length ? Math.floor(Math.min(...prices)) : 0,
      maxPrice: prices.length ? Math.ceil(Math.max(...prices)) : 200000,
    }
  }, [all])

  const regions = useMemo(
    () => Array.from(new Set(all.map(v => v.region).filter(Boolean))).sort() as string[],
    [all]
  )
  const types = useMemo(
    () => Array.from(new Set(all.map(v => v.type).filter(Boolean))).sort() as string[],
    [all]
  )

  const [filters, setFilters] = useState<VillaFilterState>({
    region: regionParam,
    type: null,
    minBedrooms: 0,
    maxBedrooms: 20,
    minGuests: 0,
    maxGuests: 40,
    minPrice: 0,
    maxPrice: 0,
    sortBy: 'default',
  })

  const boundsInitialized = useRef(false)
  useEffect(() => {
    if (!boundsInitialized.current && all.length > 0) {
      boundsInitialized.current = true
      setFilters(prev => ({
        ...prev,
        minBedrooms: bounds.minBedrooms,
        maxBedrooms: bounds.maxBedrooms,
        minGuests: bounds.minGuests,
        maxGuests: bounds.maxGuests,
        minPrice: bounds.minPrice,
        maxPrice: bounds.maxPrice,
      }))
    }
  }, [all, bounds])

  useEffect(() => {
    setFilters(prev => ({ ...prev, region: regionParam }))
  }, [regionParam])

  const villas = useMemo(() => {
    const filtered = all.filter(v => {
      if (filters.region && (v.region || '').toLowerCase() !== filters.region.toLowerCase()) return false
      if (filters.type && (v.type || '').toLowerCase() !== filters.type.toLowerCase()) return false
      if (filters.minBedrooms && v.bedrooms !== null && v.bedrooms < filters.minBedrooms) return false
      if (filters.maxBedrooms && v.bedrooms !== null && v.bedrooms > filters.maxBedrooms) return false
      if (filters.minGuests && v.maxGuests !== null && v.maxGuests < filters.minGuests) return false
      if (filters.maxGuests && v.maxGuests !== null && v.maxGuests > filters.maxGuests) return false
      const wk = weeklyEquivalent(v)
      if (filters.minPrice && wk !== null && wk < filters.minPrice) return false
      if (filters.maxPrice && wk !== null && wk > filters.maxPrice) return false
      return true
    })

    const sorted = [...filtered]
    if (filters.sortBy === 'price-asc') sorted.sort((a, b) => (weeklyEquivalent(a) ?? Infinity) - (weeklyEquivalent(b) ?? Infinity))
    else if (filters.sortBy === 'price-desc') sorted.sort((a, b) => (weeklyEquivalent(b) ?? -Infinity) - (weeklyEquivalent(a) ?? -Infinity))
    else if (filters.sortBy === 'surface-asc') sorted.sort((a, b) => (a.surface ?? Infinity) - (b.surface ?? Infinity))
    else if (filters.sortBy === 'surface-desc') sorted.sort((a, b) => (b.surface ?? -Infinity) - (a.surface ?? -Infinity))

    return limit ? sorted.slice(0, limit) : sorted
  }, [all, filters, limit])

  const visibleVillas = useMemo(() => villas.slice(0, visibleCount), [villas, visibleCount])
  const hasMore = visibleCount < villas.length

  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [villas])

  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount(prev => Math.min(prev + PAGE_SIZE, villas.length))
      },
      { rootMargin: '600px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, villas.length])

  const resetFilters = () => {
    setFilters({
      region: null,
      type: null,
      minBedrooms: bounds.minBedrooms,
      maxBedrooms: bounds.maxBedrooms,
      minGuests: bounds.minGuests,
      maxGuests: bounds.maxGuests,
      minPrice: bounds.minPrice,
      maxPrice: bounds.maxPrice,
      sortBy: 'default',
    })
  }

  return (
    <section style={{ background: '#06090f', minHeight: '100vh', paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ paddingLeft: 'clamp(32px, 6vw, 96px)', paddingRight: 'clamp(32px, 6vw, 96px)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: '#b8974a' }} />
            <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Villa Collection</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', marginBottom: 40 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.0, color: '#f5eedd', margin: 0 }}>Our residences.</h1>
              {filters.region && (
                <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8974a', margin: '12px 0 0 0' }}>
                  {regionLabel(filters.region)}
                </p>
              )}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.9, color: '#8f8f7f', margin: '0 0 20px' }}>Handpicked villas, chalets and residences for rent. Every property is inspected and staffed, ready for your arrival.</p>
            </div>
          </div>
        </motion.div>

        {showFilters && (
          <VillaFilters
            filters={filters}
            bounds={bounds}
            regions={regions}
            types={types}
            resultCount={villas.length}
            onFiltersChange={setFilters}
            onReset={resetFilters}
          />
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 40, marginBottom: 80 }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, color: '#b8974a' }}>Loading villas...</div>
            </div>
          ) : villas.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, color: '#8f8f7f' }}>No villas found matching your criteria.</div>
            </div>
          ) : (
            visibleVillas.map((villa, i) => {
              const rate = displayRate(villa)
              return (
                <motion.div
                  key={villa.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % PAGE_SIZE) * 0.04, ease: 'easeOut' }}
                >
                  <Link href={propertyHref(villa)} style={{ textDecoration: 'none', display: 'block' }}>
                    <div
                      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#1a1a1a' }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector('img')
                        if (img) img.style.transform = 'scale(1.05)'
                        const badge = e.currentTarget.querySelector<HTMLDivElement>('.view-badge')
                        if (badge) { badge.style.transform = 'translateX(0)'; badge.style.opacity = '1' }
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector('img')
                        if (img) img.style.transform = 'scale(1)'
                        const badge = e.currentTarget.querySelector<HTMLDivElement>('.view-badge')
                        if (badge) { badge.style.transform = 'translateX(130%)'; badge.style.opacity = '0' }
                      }}
                    >
                      {villa.media?.[0]?.url && (
                        <img
                          src={`/uploads/yachts/${villa.media[0].url}`}
                          alt={villa.media?.[0]?.alt || villa.title || 'Villa'}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.9s cubic-bezier(0.25, 0.1, 0, 1)', cursor: 'pointer' }}
                        />
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,15,0.85) 0%, transparent 60%)', pointerEvents: 'none' }} />

                      <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
                        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 300, color: '#f5eedd', lineHeight: 1.2 }}>
                          {villa.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8974a', marginTop: 4 }}>
                          {[villa.city, villa.type].filter(Boolean).join(' · ')}
                        </div>
                      </div>

                      <div
                        className="view-badge"
                        style={{
                          position: 'absolute', top: 20, right: 20,
                          fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: 'rgba(245,238,221,0.6)', background: 'rgba(6,9,15,0.5)', padding: '6px 10px',
                          transform: 'translateX(130%)', opacity: 0,
                          transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0, 1), opacity 0.4s ease',
                          pointerEvents: 'none',
                        }}
                      >
                        View →
                      </div>

                      {villa.region && (
                        <div style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '8px 12px' }}>
                          {regionLabel(villa.region)}
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '18px 0', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
                      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, letterSpacing: '0.1em', color: '#a0a090', marginBottom: 16 }}>
                        {[villa.bedrooms && `${villa.bedrooms} bed`, villa.bathrooms && `${villa.bathrooms} bath`, villa.maxGuests && `${villa.maxGuests} guests`].filter(Boolean).join(' · ')}
                      </div>
                      <div style={{ display: 'flex', gap: 32 }}>
                        {villa.surface && (
                          <div>
                            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.7)', marginBottom: 6, fontWeight: 600 }}>Surface</div>
                            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, fontWeight: 300, color: '#d4b472' }}>{villa.surface} {villa.surfaceUnit === 'm' ? 'm²' : villa.surfaceUnit || 'm²'}</div>
                          </div>
                        )}
                        <div>
                          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,238,221,0.7)', marginBottom: 6, fontWeight: 600 }}>Rate</div>
                          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, fontWeight: 300, color: '#d4b472' }}>
                            {formatRate(rate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <button
                      type="button"
                      onClick={() => setInquiryVilla(villa)}
                      style={{
                        flex: 1, fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#06090f', background: '#b8974a', border: 'none', padding: '13px 16px', cursor: 'pointer', transition: 'background 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#d4b472')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#b8974a')}
                    >
                      Check Availability
                    </button>
                    <Link
                      href={propertyHref(villa)}
                      style={{
                        flex: 1, textAlign: 'center', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#b8974a', background: 'transparent', border: '1px solid rgba(184,151,74,0.4)', padding: '13px 16px', textDecoration: 'none', transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184,151,74,0.1)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>

        {hasMore && (
          <div ref={sentinelRef} style={{ textAlign: 'center', padding: '20px 0 60px' }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(184,151,74,0.5)' }}>
              Loading more residences...
            </div>
          </div>
        )}

        <VillaAvailabilityModal
          isOpen={inquiryVilla !== null}
          onClose={() => setInquiryVilla(null)}
          villa={inquiryVilla ? {
            title: inquiryVilla.title || 'Villa',
            city: inquiryVilla.city,
            region: inquiryVilla.region,
            imageUrl: inquiryVilla.media?.[0]?.url ? `/uploads/yachts/${inquiryVilla.media[0].url}` : null,
          } : { title: '' }}
        />

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 300, color: '#f5eedd', marginBottom: 16 }}>
            Looking for something specific?
          </div>
          <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.8, color: '#8f8f7f', maxWidth: 480, margin: '0 auto 32px' }}>
            Tell us your destination, dates and party size — our team will source a tailored selection.
          </p>
          <a
            href="/#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#06090f', background: '#b8974a', padding: '16px 36px', textDecoration: 'none', transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d4b472')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#b8974a')}
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
