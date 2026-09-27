import { Suspense } from 'react'
import VillaFleet from './VillaFleet'
import type { PropertyCard } from '@/lib/property-service'

interface VillaFleetWrapperProps {
  showFilters?: boolean
  limit?: number
  initialVillas?: PropertyCard[]
}

function VillaFleetLoading() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh', paddingTop: 80, paddingBottom: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, color: '#b8974a' }}>Loading villas...</div>
    </div>
  )
}

export default function VillaFleetWrapper({ showFilters = true, limit, initialVillas }: VillaFleetWrapperProps) {
  return (
    <Suspense fallback={<VillaFleetLoading />}>
      <VillaFleet showFilters={showFilters} limit={limit} initialVillas={initialVillas} />
    </Suspense>
  )
}
