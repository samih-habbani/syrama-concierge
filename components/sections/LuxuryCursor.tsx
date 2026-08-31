'use client'
import { useEffect, useRef, useState } from 'react'

export function LuxuryCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Skip on touch / coarse-pointer devices and when reduced motion is requested —
    // the rAF loop is pure overhead there and there is no real cursor to track.
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    // Only hide the native cursor while this component is actually mounted
    // (the homepage). Other routes don't render LuxuryCursor, so gating the
    // `cursor: none` rule on this attribute keeps their cursor visible.
    document.documentElement.setAttribute('data-lux-cursor', '')

    let rx = 0, ry = 0, mx = 0, my = 0
    let raf = 0
    let running = false

    let seen = false
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (!seen) {
        seen = true
        rx = mx; ry = my
        if (dot.current) dot.current.style.opacity = '1'
        if (ring.current) ring.current.style.opacity = '1'
      }
      if (!running) { running = true; raf = requestAnimationFrame(animate) }
    }

    const animate = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      // translate3d keeps this on the compositor — no per-frame layout like left/top.
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`

      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        running = false
        return
      }
      raf = requestAnimationFrame(animate)
    }

    // Event delegation — one listener each, covers dynamically added elements too.
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && t.closest('a, button, [data-cursor]')
    const onOver = (e: MouseEvent) => { if (isInteractive(e.target)) ring.current?.classList.add('hover') }
    const onOut = (e: MouseEvent) => { if (isInteractive(e.target)) ring.current?.classList.remove('hover') }

    document.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.removeAttribute('data-lux-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={ring} className="cursor-ring" aria-hidden="true" style={{ opacity: 0 }} />
    </>
  )
}
