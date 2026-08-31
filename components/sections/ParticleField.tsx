'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!

    // Respect reduced-motion: render one static frame, no rAF loop.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.innerWidth < 768

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1 : 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 400

    // Stars — lighter counts on small screens where the fill rate hurts most.
    const count = isSmall ? 1200 : 3000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 1200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800
      sizes[i] = Math.random() * 2.5 + 0.5
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xd4b472) },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.3 + position.x * 0.01) * 1.5;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(uColor, alpha * 0.7);
        }
      `,
      transparent: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Gold dust – smaller, more stars
    const dustCount = isSmall ? 300 : 800
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 600
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 600
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 1.2,
      color: new THREE.Color(0xb8974a),
      transparent: true,
      opacity: 0.4,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    let mouseX = 0, mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let animId = 0
    let running = false

    const render = () => {
      const t = clock.getElapsedTime()
      mat.uniforms.uTime.value = t
      points.rotation.y = t * 0.015 + mouseX * 0.05
      points.rotation.x = mouseY * 0.03
      renderer.render(scene, camera)
      if (running) animId = requestAnimationFrame(render)
    }

    const start = () => {
      if (running || prefersReduced) return
      running = true
      clock.start()
      animId = requestAnimationFrame(render)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(animId)
    }

    // Only animate while the hero is on screen and the tab is visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          window.addEventListener('mousemove', onMouse)
          start()
        } else {
          window.removeEventListener('mousemove', onMouse)
          stop()
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < window.innerHeight) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Always paint at least one frame so it isn't blank before first intersection.
    renderer.render(scene, camera)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
