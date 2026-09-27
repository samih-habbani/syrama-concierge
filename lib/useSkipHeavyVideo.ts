'use client'
import { useEffect, useState } from 'react'

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
  addEventListener?: (type: string, cb: () => void) => void
  removeEventListener?: (type: string, cb: () => void) => void
}

// True when the visitor is on a constrained connection (data-saver on, or a
// slow effective type — the closest signal browsers expose to "not on
// wifi") or has asked for reduced motion. Callers should render a static
// poster image instead of the autoplaying background video in that case.
// Starts false (video) on both server and first client render — the same
// output on both sides avoids a hydration mismatch — then flips after the
// Network Information / matchMedia check runs client-side.
export function useSkipHeavyVideo(): boolean {
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: NetworkInformation }
    const conn = nav.connection
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const evaluate = () => {
      const slowConnection = !!conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType || ''))
      setSkip(motionQuery.matches || slowConnection)
    }
    evaluate()

    conn?.addEventListener?.('change', evaluate)
    motionQuery.addEventListener('change', evaluate)
    return () => {
      conn?.removeEventListener?.('change', evaluate)
      motionQuery.removeEventListener('change', evaluate)
    }
  }, [])

  return skip
}
