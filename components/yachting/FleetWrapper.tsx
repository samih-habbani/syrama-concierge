import { Suspense } from 'react'
import Fleet from './Fleet'
import type { getYachts } from '@/lib/yacht-service'

interface FleetWrapperProps {
  showFilters?: boolean
  limit?: number
  initialYachts?: Awaited<ReturnType<typeof getYachts>>
}

function FleetLoading() {
  return (
    <div style={{ background: '#06090f', minHeight: '100vh', paddingTop: 80, paddingBottom: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 14, color: '#b8974a' }}>Loading yachts...</div>
    </div>
  )
}

export default function FleetWrapper({ showFilters = true, limit, initialYachts }: FleetWrapperProps) {
  return (
    <Suspense fallback={<FleetLoading />}>
      <Fleet showFilters={showFilters} limit={limit} initialYachts={initialYachts} />
    </Suspense>
  )
}
