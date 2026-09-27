'use client'
import { useEffect, useState } from 'react'

// Mirrors a `@media (min-width: ...)` check in JS, for cases where React
// must not mount an element at all below the breakpoint (e.g. skipping a
// network request for a video CSS already hides there) rather than just
// hiding it visually. Starts false on both server and first client render
// to avoid a hydration mismatch, then resolves after mount.
export function useMinWidth(px: number): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${px}px)`)
    const update = () => setMatches(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [px])

  return matches
}
