'use client'
import { useEffect, useRef } from 'react'

export function LuxuryCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0
    let raf: number

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const animate = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (dot.current) {
        dot.current.style.left = `${mx}px`
        dot.current.style.top = `${my}px`
      }
      if (ring.current) {
        ring.current.style.left = `${rx}px`
        ring.current.style.top = `${ry}px`
      }
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => ring.current?.classList.add('hover')
    const onLeave = () => ring.current?.classList.remove('hover')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
