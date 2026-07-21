import { useEffect, useRef } from 'react'

const SPHERE_COUNT = 640
const RING_COUNT = 260
const AUTO_SPIN_SPEED = 0.0022
const FOCAL_LENGTH = 2.6
const DRAG_SENSITIVITY = 0.012
const MOMENTUM_DECAY = 0.94
const RING_TILT = 1.05

const SPHERE_PALETTE = [
  [124, 58, 237], // violet-500
  [168, 85, 247], // violet-400
  [196, 164, 242], // violet-300
  [91, 33, 182], // violet-700
  [99, 102, 241], // indigo-500
  [56, 189, 248], // sky-400
]
const ACCENT_PALETTE = [
  [245, 158, 11], // amber-500
  [236, 72, 153], // pink-500
  [244, 63, 94], // rose-500
  [20, 184, 166], // teal-500
]

function randomColor(accentChance) {
  const palette = Math.random() < accentChance ? ACCENT_PALETTE : SPHERE_PALETTE
  return palette[Math.floor(Math.random() * palette.length)]
}

function buildSpherePoints() {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < SPHERE_COUNT; i++) {
    const y = 1 - (i / (SPHERE_COUNT - 1)) * 2
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    const [r, g, b] = randomColor(0.24)
    points.push({
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
      size: 1.1 + Math.random() * 2.1,
      r,
      g,
      b,
    })
  }
  return points
}

function buildRingPoints() {
  const points = []
  const cosTilt = Math.cos(RING_TILT)
  const sinTilt = Math.sin(RING_TILT)
  for (let i = 0; i < RING_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 1.28 + Math.random() * 0.6
    const jitter = (Math.random() - 0.5) * 0.14
    const x = Math.cos(angle) * radius
    const zFlat = Math.sin(angle) * radius
    const y = jitter * cosTilt - zFlat * sinTilt
    const z = jitter * sinTilt + zFlat * cosTilt
    const [r, g, b] = randomColor(0.55)
    points.push({
      x,
      y,
      z,
      size: 0.7 + Math.random() * 1.5,
      r,
      g,
      b,
      ring: true,
    })
  }
  return points
}

export default function InteractiveGlobe({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const points = [...buildSpherePoints(), ...buildRingPoints()]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let rotY = 0.4
    let rotX = -0.15
    let velY = AUTO_SPIN_SPEED
    let velX = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let raf = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function project(p) {
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const x1 = p.x * cosY + p.z * sinY
      const z1 = -p.x * sinY + p.z * cosY
      const y1 = p.y

      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const y2 = y1 * cosX - z1 * sinX
      const z2 = y1 * sinX + z1 * cosX
      const x2 = x1

      const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z2)
      const R = Math.min(width, height) * 0.36
      return {
        x: width / 2 + x2 * R * scale,
        y: height / 2 + y2 * R * scale,
        z: z2,
        scale,
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height)
      const projected = points.map((p) => ({ ...p, ...project(p) }))
      projected.sort((a, b) => b.z - a.z)

      for (const p of projected) {
        const baseAlpha = p.ring ? 0.16 : 0.22
        const alphaRange = p.ring ? 0.5 : 0.68
        const alpha = baseAlpha + ((1 - p.z) / 2) * alphaRange
        const radius = Math.max(0.3, p.size * p.scale)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha.toFixed(3)})`
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function tick() {
      if (!dragging) {
        rotY += velY
        rotX += velX
        velY *= MOMENTUM_DECAY
        velX *= MOMENTUM_DECAY
        if (Math.abs(velY) < AUTO_SPIN_SPEED) velY = AUTO_SPIN_SPEED
      }
      render()
      raf = requestAnimationFrame(tick)
    }

    function onPointerDown(e) {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      velX = 0
      velY = 0
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }

    function onPointerMove(e) {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      rotY += dx * DRAG_SENSITIVITY
      rotX += dy * DRAG_SENSITIVITY
      rotX = Math.max(-1.1, Math.min(1.1, rotX))
      velY = dx * DRAG_SENSITIVITY * 0.6
      velX = dy * DRAG_SENSITIVITY * 0.6
      if (reducedMotion) render()
    }

    function onPointerUp(e) {
      dragging = false
      canvas.style.cursor = 'grab'
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
    }

    resize()
    canvas.style.cursor = 'grab'
    canvas.style.touchAction = 'none'
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerUp)

    const ro = new ResizeObserver(() => {
      resize()
      if (reducedMotion) render()
    })
    ro.observe(canvas)

    if (reducedMotion) {
      render()
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Interactive rotating globe with an orbiting particle ring, representing RSquared's global network reach — drag to rotate"
      className={className}
    />
  )
}
