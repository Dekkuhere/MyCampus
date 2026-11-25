import { useEffect } from 'react'

// Fade-up reveal for site slides as they scroll into view.
export default function useReveal(active) {
  useEffect(() => {
    if (!active) return
    document.querySelectorAll('.hw,.hero img,section h2,.sub,.stats,.mid>div,#updates footer').forEach((e) => e.classList.add('rv'))
    document.querySelectorAll('.fan,.three').forEach((e) => e.classList.add('rv-c'))
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.rv,.rv-c').forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [active])
}
