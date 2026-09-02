'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    // Single named ticker callback so cleanup actually removes it (a fresh
    // arrow function each render would leak a running rAF loop on remount).
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Same-page anchor links (`#contact`, `/#bespoke`, …) must scroll smoothly
    // through Lenis instead of the browser's instant jump — otherwise the
    // abrupt reposition reads like a full page reload.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      // Accept `#id` and `/#id` (or the current path + `#id`).
      let hash = ''
      if (href.startsWith('#')) hash = href
      else if (href.startsWith('/#')) hash = href.slice(1)
      else {
        try {
          const url = new URL(href, window.location.origin)
          if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) hash = url.hash
        } catch { /* not a parseable URL — ignore */ }
      }
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -80 })
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [pathname])

  return <>{children}</>
}
