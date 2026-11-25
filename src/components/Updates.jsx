export default function Updates({ onStart }) {
  return (
    <section id="updates">
      <div className="frame" style={{ padding: 0 }}>
        <div className="mid">
          <div>
            <p className="sub" style={{ margin: '0 0 12px' }}>never miss a deadline</p>
            <a className="cta" href="#dashboard" onClick={(e) => { e.preventDefault(); onStart() }}>check ur updates now →</a>
            <div className="news">
              <span>Exam form deadline · 5 Dec</span>
              <span>DBMS assignment due · 24 Nov</span>
              <span>Semester 3 result declared · yesterday</span>
            </div>
          </div>
        </div>
        <footer>
          <span>For1 · student-first campus portal</span>
          <span>No ads. No noise.</span>
        </footer>
      </div>
    </section>
  )
}
