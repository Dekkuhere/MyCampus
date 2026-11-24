import { useEffect, useRef } from 'react'

export default function DotBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'), S = 12
    let W, H, D = 1, raf
    const m = { x: -999, y: -999 }
    const rs = () => { D = devicePixelRatio || 1; W = innerWidth; H = innerHeight; c.width = W * D; c.height = H * D; x.setTransform(D, 0, 0, D, 0, 0) }
    const mv = (e) => { m.x = e.clientX; m.y = e.clientY }
    const lv = () => { m.x = m.y = -999 }
    rs()
    addEventListener('resize', rs); addEventListener('pointermove', mv); document.addEventListener('pointerleave', lv)
    const f = () => {
      x.clearRect(0, 0, W, H); x.fillStyle = 'rgba(110,110,130,.4)'; x.beginPath()
      const hot = []
      for (let i = S / 2; i < W; i += S) for (let j = S / 2; j < H; j += S) {
        const dx = i - m.x, dy = j - m.y, d = Math.sqrt(dx * dx + dy * dy) || 1
        if (d < 80) hot.push([i, j, dx, dy, d]); else { x.moveTo(i + 1, j); x.arc(i, j, 1, 0, 6.3) }
      }
      x.fill()
      hot.forEach((h) => { const t = 1 - h[4] / 80; x.fillStyle = `rgba(92,86,214,${.35 + t * .3})`; x.beginPath(); x.arc(h[0] + h[2] / h[4] * t * 3, h[1] + h[3] / h[4] * t * 3, 1 + t * 1.2, 0, 6.3); x.fill() })
      raf = requestAnimationFrame(f)
    }
    f()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv) }
  }, [])
  return <canvas id="bg" ref={ref} />
}
