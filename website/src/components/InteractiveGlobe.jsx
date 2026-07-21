import { useEffect, useRef } from 'react'

const SPHERE_COUNT = 640
const RING_COUNT = 260
const AUTO_SPIN_SPEED = 0.0022
const HOVER_SPIN_SPEED = 0.0055
const FOCAL_LENGTH = 2.6
const DRAG_SENSITIVITY = 0.012
const MOMENTUM_DECAY = 0.94
const RING_TILT = 1.05
const HOVER_RADIUS = 95
const HOVER_BOOST = 1.6

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

export default function InteractiveGlobe({ className = '', originX = 0.5, originY = 0.5 }) {
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
    let hovering = false
    let hoverX = null
    let hoverY = null
    let lastX = 0
    let lastY = 0
    let raf = 0

    let effectiveOriginX = originX
    let effectiveOriginY = originY

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (width < 640) {
        effectiveOriginX = 1.02
        effectiveOriginY = 0.32
      } else if (width < 1024) {
        effectiveOriginX = 0.86
        effectiveOriginY = 0.38
      } else {
        effectiveOriginX = originX
        effectiveOriginY = originY
      }
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
        x: width * effectiveOriginX + x2 * R * scale,
        y: height * effectiveOriginY + y2 * R * scale,
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
        let alpha = baseAlpha + ((1 - p.z) / 2) * alphaRange
        let radius = Math.max(0.3, p.size * p.scale)

        if (hoverX !== null) {
          const dist = Math.hypot(p.x - hoverX, p.y - hoverY)
          if (dist < HOVER_RADIUS) {
            const proximity = 1 - dist / HOVER_RADIUS
            alpha = Math.min(1, alpha + proximity * 0.6)
            radius *= 1 + proximity * HOVER_BOOST
          }
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha.toFixed(3)})`
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function tick() {
      if (!dragging) {
        const targetSpeed = hovering ? HOVER_SPIN_SPEED : AUTO_SPIN_SPEED
        velY += (targetSpeed - velY) * 0.03
        rotY += velY
        rotX += velX
        velX *= MOMENTUM_DECAY
      }
      render()
      raf = requestAnimationFrame(tick)
    }

    function localPoint(e) {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onPointerDown(e) {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      velX = 0
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }

    function onPointerMove(e) {
      const p = localPoint(e)
      hoverX = p.x
      hoverY = p.y
      hovering = true

      if (!dragging) {
        if (reducedMotion) render()
        return
      }
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

    function onPointerLeave(e) {
      onPointerUp(e)
      hovering = false
      hoverX = null
      hoverY = null
      if (reducedMotion) render()
    }

    resize()
    canvas.style.cursor = 'grab'
    canvas.style.touchAction = 'none'
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerLeave)

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
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [originX, originY])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Interactive rotating globe with an orbiting particle ring, representing RSquared's global network reach — hover or drag to interact"
      className={className}
    />
  )
}
