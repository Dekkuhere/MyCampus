import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import hero from '../assets/hero.png'
import icAssign from '../assets/assignments.png'
import icGrade from '../assets/gradecard.png'
import icForms from '../assets/forms.png'
import icEbooks from '../assets/ebooks.png'
import icSol from '../assets/solutions.png'
import icNotes from '../assets/notes.png'
import icPyq from '../assets/pyq.png'

const FAN = [
  ['#assignments', icAssign, 'Assignments', 'Deadlines, PDFs & status'],
  ['#grade', icGrade, 'Gradecard', 'CGPA & semester results'],
  ['#forms', icForms, 'Forms', 'Exam, hall ticket & more'],
  ['#ebooks', icEbooks, 'E-books', 'Search by subject'],
]
const PREP = [
  [icSol, 'Assignment solutions', 'Step-by-step answers'],
  [icNotes, 'Notes', 'Handwritten & topic-wise'],
  [icPyq, 'Finalized sub topics from PYQ', 'What actually gets asked'],
]

function Card({ href, img, title, sub }) {
  const body = (
    <>
      <img className="ic" alt="" src={img} />
      <span><b>{title}</b><small>{sub}</small></span>
    </>
  )
  return href ? <a className="card" href={href}>{body}</a> : <div className="card">{body}</div>
}

export default function Landing({ onStart }) {
  // scroll-reveal
  useEffect(() => {
    document.querySelectorAll('.hw,.hero img,section h2,.sub,.stats,.mid>div,#updates footer').forEach((e) => e.classList.add('rv'))
    document.querySelectorAll('.fan,.three').forEach((e) => e.classList.add('rv-c'))
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target) } }), { threshold: 0.15 })
    document.querySelectorAll('.rv,.rv-c').forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Navbar onStart={onStart} />

      <section id="home"><div className="frame hero">
        <div className="hw">
          <h1>Explore<br />the need</h1>
          <div className="tag">Everything ur campus<br />offers in one place</div>
        </div>
        <img src={hero} alt="" />
      </div></section>

      <section id="dashboard"><div className="frame">
        <h2>get ur campus updates</h2>
        <p className="sub">Everything academic, one tap away. No ads, no noise.</p>
        <div className="fan">{FAN.map(([h, i, t, s]) => <Card key={t} href={h} img={i} title={t} sub={s} />)}</div>
        <div className="stats">
          <div><strong>2</strong>clicks to anything</div>
          <div><strong>0</strong>ads or banners</div>
          <div><strong>30s</strong>to find any resource</div>
        </div>
      </div></section>

      <section id="prep"><div className="frame">
        <h2>get the solutions u need</h2>
        <p className="sub">PYQs, notes and solved assignments, organised by topic.</p>
        <div className="three">{PREP.map(([i, t, s]) => <Card key={t} img={i} title={t} sub={s} />)}</div>
      </div></section>

      <section id="updates"><div className="frame" style={{ padding: 0 }}>
        <div className="mid"><div>
          <p className="sub" style={{ margin: '0 0 12px' }}>never miss a deadline</p>
          <a className="cta" href="#dashboard" onClick={(e) => { e.preventDefault(); onStart() }}>check ur updates now →</a>
          <div className="news">
            <span>Exam form deadline · 5 Dec</span>
            <span>DBMS assignment due · 24 Nov</span>
            <span>Semester 3 result declared · yesterday</span>
          </div>
        </div></div>
        <footer><span>For1 · student-first campus portal</span><span>No ads. No noise.</span></footer>
      </div></section>
    </>
  )
}
