import { useEffect, useRef } from 'react'
import hero from '../assets/hero.png'

export default function Hero() {
  const h = useRef(null), w = useRef(null)
  // On phones, size the heading so its widest line fills ~86% of the screen.
  useEffect(() => {
    const fit = () => {
      if (!h.current || !w.current) return
      if (innerWidth > 640) { h.current.style.fontSize = ''; return }
      h.current.style.fontSize = '100px'
      h.current.style.fontSize = Math.min((100 * innerWidth * 0.86) / w.current.offsetWidth, 200) + 'px'
    }
    fit(); addEventListener('resize', fit); document.fonts?.ready.then(fit)
    return () => removeEventListener('resize', fit)
  }, [])
  return (
    <section id="home">
      <div className="frame hero">
        <div className="hw" ref={w}>
          <h1 ref={h}>Explore<br />the need</h1>
          <div className="tag">Everything ur campus<br />offers in one place</div>
        </div>
        <img src={hero} alt="" />
      </div>
    </section>
  )
}
