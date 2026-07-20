import { useEffect, useRef, useState } from 'react'

export default function useAutoLoop(length, intervalMs = 3200) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (paused || reducedMotion.current) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [paused, length, intervalMs])

  return { index, setIndex, paused, setPaused }
}
