import i1 from '../assets/icon1.png'
import i2 from '../assets/icon2.png'
import i3 from '../assets/icon3.png'
import i4 from '../assets/icon4.png'
import i5 from '../assets/icon5.png'
import i6 from '../assets/icon6.png'
import i7 from '../assets/icon7.png'

function Card({ icon, title, desc, onClick }) {
  const body = (
    <>
      <img className="ic" alt="" src={icon} />
      <span><b>{title}</b><small>{desc}</small></span>
    </>
  )
  return onClick
    ? <a className="card" href="#dashboard" onClick={(e) => { e.preventDefault(); onClick() }}>{body}</a>
    : <div className="card">{body}</div>
}

export function Dashboard({ onStart }) {
  return (
    <section id="dashboard">
      <div className="frame">
        <h2>get ur campus updates</h2>
        <p className="sub">Everything academic, one tap away. No ads, no noise.</p>
        <div className="fan">
          <Card icon={i1} title="Assignments" desc="Deadlines, PDFs & status" onClick={onStart} />
          <Card icon={i2} title="Gradecard" desc="CGPA & semester results" onClick={onStart} />
          <Card icon={i3} title="Forms" desc="Exam, hall ticket & more" onClick={onStart} />
          <Card icon={i4} title="E-books" desc="Search by subject" onClick={onStart} />
        </div>
        <div className="stats">
          <div><strong>2</strong>clicks to anything</div>
          <div><strong>0</strong>ads or banners</div>
          <div><strong>30s</strong>to find any resource</div>
        </div>
      </div>
    </section>
  )
}

export function Prep() {
  return (
    <section id="prep">
      <div className="frame">
        <h2>get the solutions u need</h2>
        <p className="sub">PYQs, notes and solved assignments, organised by topic.</p>
        <div className="three">
          <Card icon={i5} title="Assignment solutions" desc="Step-by-step answers" />
          <Card icon={i6} title="Notes" desc="Handwritten & topic-wise" />
          <Card icon={i7} title="Finalized sub topics from PYQ" desc="What actually gets asked" />
        </div>
      </div>
    </section>
  )
}
