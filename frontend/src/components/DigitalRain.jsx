import { useEffect, useRef } from 'react'

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789$+-*/=%"#&_(),.;:?!<>'

// Lightweight canvas replacement for the old 8 MB background GIF.
export default function DigitalRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const size = 16
    let drops = []
    let frame

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drops = Array.from({ length: Math.ceil(canvas.width / size) }, () =>
        Math.floor((Math.random() * canvas.height) / size),
      )
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${size}px "Share Tech Mono", monospace`
      drops.forEach((y, i) => {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillStyle = Math.random() > 0.975 ? '#d6ffd6' : '#00ff41'
        ctx.fillText(ch, i * size, y * size)
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }

    let last = 0
    const loop = (t) => {
      if (t - last > 50) {
        draw()
        last = t
      }
      frame = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduced) {
      for (let i = 0; i < 60; i++) draw()
    } else {
      frame = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="rain" aria-hidden="true" />
}
