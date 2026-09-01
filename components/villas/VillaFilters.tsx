'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomSelect, DualRangeSlider, rangeInputStyles } from '@/components/shared/FilterControls'
import { regionLabel } from '@/lib/property-format'

export interface VillaFilterState {
  region: string | null
  type: string | null
  minBedrooms: number
  maxBedrooms: number
  minGuests: number
  maxGuests: number
  minPrice: number
  maxPrice: number
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'surface-asc' | 'surface-desc'
}

export interface VillaFilterBounds {
  minBedrooms: number
  maxBedrooms: number
  minGuests: number
  maxGuests: number
  minPrice: number
  maxPrice: number
}

interface VillaFiltersProps {
  filters: VillaFilterState
  bounds: VillaFilterBounds
  regions: string[]
  types: string[]
  resultCount: number
  onFiltersChange: (filters: VillaFilterState) => void
  onReset: () => void
}

const SORT_OPTIONS: { value: VillaFilterState['sortBy']; label: string }[] = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'surface-asc', label: 'Surface: Smallest First' },
  { value: 'surface-desc', label: 'Surface: Largest First' },
]

export default function VillaFilters({ filters, bounds, regions, types, resultCount, onFiltersChange, onReset }: VillaFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleFilterChange = (newFilters: Partial<VillaFilterState>) => {
    onFiltersChange({ ...filters, ...newFilters })
  }

  const hasActiveFilters =
    filters.region !== null ||
    filters.type !== null ||
    filters.sortBy !== 'default' ||
    filters.minBedrooms > bounds.minBedrooms ||
    filters.maxBedrooms < bounds.maxBedrooms ||
    filters.minGuests > bounds.minGuests ||
    filters.maxGuests < bounds.maxGuests ||
    filters.minPrice > bounds.minPrice ||
    filters.maxPrice < bounds.maxPrice

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(135deg, rgba(184,151,74,0.08) 0%, rgba(212,180,114,0.03) 100%)',
        border: '1px solid rgba(184,151,74,0.2)',
        borderRadius: 8,
        marginBottom: 60,
      }}
    >
      <style>{rangeInputStyles}</style>
      <div
        style={{
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          borderBottom: isExpanded ? '1px solid rgba(184,151,74,0.15)' : 'none',
        }}
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="villa-filters-panel"
          style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 4 }}>
            REFINE YOUR SEARCH
          </div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, color: '#8f8f7f' }}>
            {resultCount} {resultCount === 1 ? 'villa' : 'villas'} found
            {hasActiveFilters && <span style={{ color: '#b8974a' }}> • Filtered</span>}
          </div>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              style={{
                fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                background: 'transparent', border: '1px solid rgba(184,151,74,0.4)', color: '#b8974a',
                padding: '6px 12px', cursor: 'pointer', transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184,151,74,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Clear Filters
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
            aria-expanded={isExpanded}
            aria-controls="villa-filters-panel"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: '#b8974a', display: 'flex' }}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="villa-filters-panel"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', transitionEnd: { overflow: 'visible' } }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 36 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomSelect
                  label="Destination"
                  placeholder="All Destinations"
                  value={filters.region}
                  options={regions.map(r => ({ value: r, label: regionLabel(r) }))}
                  onChange={(v) => handleFilterChange({ region: v })}
                />
                <CustomSelect
                  label="Type"
                  placeholder="All Types"
                  value={filters.type}
                  options={types.map(t => ({ value: t, label: t }))}
                  onChange={(v) => handleFilterChange({ type: v })}
                />
                <CustomSelect
                  label="Sort By"
                  placeholder="Featured"
                  value={filters.sortBy === 'default' ? null : filters.sortBy}
                  options={SORT_OPTIONS.filter(o => o.value !== 'default')}
                  onChange={(v) => handleFilterChange({ sortBy: (v || 'default') as VillaFilterState['sortBy'] })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <DualRangeSlider
                  label="Bedrooms"
                  min={bounds.minBedrooms}
                  max={bounds.maxBedrooms}
                  valueMin={filters.minBedrooms}
                  valueMax={filters.maxBedrooms}
                  format={(v) => `${v}`}
                  onChange={(minBedrooms, maxBedrooms) => handleFilterChange({ minBedrooms, maxBedrooms })}
                />
                <DualRangeSlider
                  label="Guests"
                  min={bounds.minGuests}
                  max={bounds.maxGuests}
                  valueMin={filters.minGuests}
                  valueMax={filters.maxGuests}
                  format={(v) => `${v}`}
                  onChange={(minGuests, maxGuests) => handleFilterChange({ minGuests, maxGuests })}
                />
                <DualRangeSlider
                  label="Budget / week"
                  min={bounds.minPrice}
                  max={bounds.maxPrice}
                  valueMin={filters.minPrice}
                  valueMax={filters.maxPrice}
                  format={(v) => `€${Math.round(v).toLocaleString('en-US')}`}
                  onChange={(minPrice, maxPrice) => handleFilterChange({ minPrice, maxPrice })}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
